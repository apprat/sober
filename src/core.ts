import { render, useState, useEffect, createElement } from 'fre'


export class Base {
  state: object = {}
  property: object = {}
  setState!: (value?: object, fn?: Function) => void
  setProperty!: (value?: object, fn?: Function) => void
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
    instance.setState = (value, callback) => {
      callback && callbacks.push(callback)
      setState({ ...state, ...value })
    }
    const [property, setProperty] = useState(instance.property ?? {})
    instance.property = property
    instance.setProperty = (value, callback) => {
      callback && callbacks.push(callback)
      setProperty({ ...state, ...value })
    }
    useEffect(() => () => callbacks.map(callback => callback()))
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

type PropertyValue = string | number | bigint | boolean | Function | undefined

interface States {
  inited: boolean
  attrDefaults: { [key: string]: unknown }
  mounted: boolean
  unmounted: boolean
  adopted: boolean
  parseType: (key: string, value: unknown) => PropertyValue
}

export const define = <
  const N extends string,
  T extends Base,
  P = T extends { property: infer P } ? P : never,
  E = { new(): Partial<P> & HTMLElement }
>(componentName: N, BaseElement: { new(): T }): {
  Element: E
  register: (name?: string) => void
  name: N
} => {
  const maps = new Map<HTMLElement, [States, Base]>()
  const constructor = async (node: HTMLElement, shadowRoot: ShadowRoot) => {
    const instance = new BaseElement()
    instance.shadowRoot = shadowRoot
    instance.node = node
    const component = useComponent(instance)
    const states: States = {
      inited: false,
      attrDefaults: {},
      mounted: false,
      unmounted: false,
      adopted: false,
      parseType: (key, value) => {
        const defaultValue = states.attrDefaults[key]
        if (value === undefined) return defaultValue
        if (typeof defaultValue === 'string') return String(value)
        if (typeof defaultValue === 'number') return Number(value)
        if (typeof defaultValue === 'bigint') return BigInt(String(value))
        if (typeof defaultValue === 'boolean') return Boolean(JSON.parse(String(value ?? true)))
        if (typeof defaultValue === 'function' && typeof value === 'function') return value.bind(instance)
        throw new TypeError()
      }
    }
    const getNewValue = (key: string, value?: PropertyValue) => {
      if (typeof value === 'function') return states.parseType(key, value)
      const old = node.getAttribute(key)
      if (value === undefined && old === null) {
        node.setAttribute(key, String(states.attrDefaults[key]))
        return
      }
      if (old === null || old !== String(value)) {
        node.setAttribute(key, String(value))
        return
      }
      return states.parseType(key, value)
    }
    for (const key in instance.property) {
      Object.defineProperty(node, key, {
        get: () => instance.property[key],
        set: (value: PropertyValue) => {
          const data = getNewValue(key, value)
          if (!data) return
          if (states.inited) return instance.setProperty({ [key]: data })
          instance.property[key] = data
        }
      })
      const value = instance.property[key]
      if (typeof value === 'function') instance.property[key] = value.bind(instance)
      states.attrDefaults[key] = value
    }
    maps.set(node, [states, instance])
    await shadowRender(component, shadowRoot)
    states.inited = true
    instance.onCreated()
    if (states.mounted) instance.onMounted()
    if (states.adopted) instance.onAdopted()
    if (states.unmounted) instance.onUnmounted()
    node.dispatchEvent(new Event('load'))
  }
  const baseElement = new BaseElement()
  class Element extends HTMLElement {
    static observedAttributes = Object.keys(baseElement.property)
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'closed' })
      constructor(this, shadowRoot)
    }
    connectedCallback() {
      const [states, instance] = maps.get(this)!
      if (!states.inited) return states.mounted = true
      instance.onMounted()
    }
    disconnectedCallback() {
      const [states, instance] = maps.get(this)!
      if (!states.inited) return states.unmounted = true
      instance.onUnmounted()
    }
    adoptedCallback() {
      const [states, instance] = maps.get(this)!
      if (!states.inited) return states.adopted = true
      instance.onAdopted()
    }
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      this[name] = newValue ?? undefined
    }
  }
  return {
    Element,
    name: componentName,
    property: baseElement.property,
    register: (name?: string) => {
      name = name ?? componentName
      !customElements.get(name) && customElements.define(name, Element)
      return Element
    }
  } as never
}