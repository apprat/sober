import { render, useState, useEffect, createElement } from 'fre'

export class Base {
  state: object = {}
  property: object = {}
  setState!: (value?: object) => Promise<void>
  setProperty!: (value?: object) => Promise<void>
  shadowRoot!: ShadowRoot
  node!: HTMLElement
  onCreated() { }
  onMounted() { }
  onUnmounted() { }
  onAdopted() { }
  render() { }
}

const useComponent = (instance: Base) => {
  return () => {
    const [state, setState] = useState(instance.state)
    instance.state = state
    const callbacks: Function[] = []
    instance.setState = (value) => new Promise((resolve) => {
      setState({ ...state, ...value })
      callbacks.push(resolve)
    })
    const [property, setProperty] = useState(instance.property ?? {})
    instance.property = property
    instance.setProperty = (value) => new Promise((resolve) => {
      setProperty({ ...property, ...value })
      callbacks.push(resolve)
    })
    useEffect(() => () => {
      callbacks.map(callback => callback())
    })
    return instance.render()
  }
}

const shadowRender = (component: Function, node: Node) => {
  return new Promise<void>(resolve => {
    const wrapper = () => {
      useEffect(() => { resolve() }, [])
      return component()
    }
    render(createElement(wrapper, {}), node)
  })
}

const kebabToCamel = (value: string) => value.replace(/-([a-z])/g, (substring, item: string) => item.toUpperCase())
const camelToKebab = (value: string) => value.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())

type PropertyValue = string | number | bigint | boolean | Function | undefined

class States {
  inited = false
  attrDefaults: { [key: string]: PropertyValue } = {}
  unmounted = false
  unmount() {
    this.inited ? this.instance.onUnmounted() : this.unmounted = true
  }
  adopted = false
  adopt() {
    this.inited ? this.instance.onAdopted() : this.adopted = true
  }
  mounted = false
  mount() {
    this.inited ? this.instance.onMounted() : this.mounted = true
  }
  constructor(public instance: Base) { }
  private parseType(key: string, value: unknown): PropertyValue {
    const defaultValue = this.attrDefaults[key]
    if (typeof defaultValue === 'string') return String(value)
    if (typeof defaultValue === 'number') return Number(value)
    if (typeof defaultValue === 'bigint') return BigInt(String(value))
    if (typeof defaultValue === 'boolean') {
      if (value === '') return false
      if (String(key) === value) return true
      return Boolean(JSON.parse(String(value)))
    }
    if (typeof defaultValue === 'function' && typeof value === 'function') return value
    throw new TypeError()
  }
  parsePropertyValue(key: string, value: unknown) {
    if (typeof value === 'function') return value
    const kebabKey = camelToKebab(key)
    const old = this.instance.node.getAttribute(kebabKey)
    if (value === undefined) {
      return old === null ? this.attrDefaults[key] : this.instance.node.removeAttribute(kebabKey) as undefined
    }
    const strValue = String(value)
    if (old === null || strValue !== String(old)) return this.instance.node.setAttribute(kebabKey, strValue) as undefined
    return this.parseType(key, value)
  }
}

const elementMaps = new Map<HTMLElement, States>()

const constructor = async (BaseElement: typeof Base, node: HTMLElement, shadowRoot: ShadowRoot) => {
  const instance = new BaseElement()
  instance.shadowRoot = shadowRoot
  instance.node = node
  const component = useComponent(instance)
  const states = new States(instance)
  for (const key in instance.property) {
    Object.defineProperty(node, key, {
      get: () => instance.property[key],
      set: (value: unknown) => {
        const data = states.parsePropertyValue(key, value)
        if (data === undefined) return
        if (states.inited) return instance.setProperty({ [key]: data })
        instance.property[key] = data
      }
    })
    const value = instance.property[key]
    if (typeof value === 'function') instance.property[key] = value.bind(instance)
    states.attrDefaults[key] = value
  }
  for (const name of Object.getOwnPropertyNames(BaseElement)) {
    if (['length', 'name', 'prototype'].includes(name)) continue
    node[name] = BaseElement[name]
  }
  elementMaps.set(node, states)
  await shadowRender(component, shadowRoot)
  states.inited = true
  instance.onCreated()
  if (states.mounted) instance.onMounted()
  if (states.adopted) instance.onAdopted()
  if (states.unmounted) instance.onUnmounted()
  node.dispatchEvent(new Event('load'))
}

export const define = <
  const N extends string,
  T extends typeof Base,
  O = T extends { new(): infer K } ? K : {},
  P = O extends { property: infer K, } ? K : {},
  E = { new(): Partial<P> & HTMLElement, prototype: HTMLElement },
  M = Omit<T, 'prototype'>
>(componentName: N, BaseElement: T): {
  Element: E & M
  register: (name?: string) => void
  name: N
} => {
  const attributes: string[] = []
  for (const key in new BaseElement().property) attributes.push(camelToKebab(key))
  class Element extends HTMLElement {
    static observedAttributes = attributes
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'closed' })
      constructor(BaseElement, this, shadowRoot)
    }
    connectedCallback() {
      elementMaps.get(this)!.mount()
    }
    disconnectedCallback() {
      elementMaps.get(this)!.unmount()
    }
    adoptedCallback() {
      elementMaps.get(this)!.adopt()
    }
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      this[kebabToCamel(name)] = newValue ?? undefined
    }
  }
  return {
    Element,
    name: componentName,
    register: (name?: string) => {
      name = name ?? componentName
      !customElements.get(name) && customElements.define(name, Element)
      return Element
    }
  } as never
}