import { KebabToCamel } from './utils'

export class VNode {
  constructor(public type: string | null, public props: { [name: string]: unknown }) { }
}

class CreateElement {
  refs: { [name: string]: HTMLElement } = {}
  private marks: { SVG?: boolean } = {}
  private children(children: unknown) {
    const elements: Node[] = []
    if (children === undefined) return elements
    if (children instanceof VNode) {
      const node = this.node(children)
      !Array.isArray(node) ? elements.push(node) : node.forEach((value) => elements.push(value))
      return elements
    }
    if (!Array.isArray(children)) {
      elements.push(document.createTextNode(String(children)))
      return elements
    }
    children.forEach((item) => {
      if (item instanceof VNode) {
        const node = this.node(item)
        !Array.isArray(node) ? elements.push(node) : node.forEach((value) => elements.push(value))
        return
      }
      elements.push(document.createTextNode(String(item)))
    })
    return elements
  }
  private node(vnode: VNode) {
    if (vnode.type === 'svg') this.marks.SVG = true
    const el = this.marks.SVG ? document.createElementNS('http://www.w3.org/2000/svg', vnode.type!) : document.createElement(vnode.type!)
    el.append(...this.children(vnode.props.children))
    if (this.marks.SVG) this.marks.SVG = false
    for (const key in vnode.props) {
      if (key === 'children') continue
      const item = vnode.props[key]
      if (key.match(/on[A-Z]/g) && typeof item === 'function') {
        el.addEventListener(key.slice(2).toLocaleLowerCase(), (e) => item(e))
        continue
      }
      if (key === 'ref' && typeof item === 'string') {
        this.refs[item] = el as never
        continue
      }
      el.setAttribute(key, String(item))
    }
    return el
  }
  constructor(vnode: VNode, element: Node) {
    const elements = vnode.type === null ? this.children(vnode.props.children) : [this.node(vnode)]
    const fragment = document.createDocumentFragment()
    elements.forEach((value) => fragment.append(value))
    element.appendChild(fragment)
  }
}

type Prop = string | number | boolean | undefined

class State {
  defaultValues: { [name: string]: Prop } = {}
  onMounted?(): unknown
  onUnmounted?(): unknown
  onAdopted?(): unknown
  onPropsChanged?(name: string): unknown
  parseTargetType(value: unknown, target: Prop): Prop {
    switch (typeof target) {
      case 'string':
        return String(value)
      case 'number':
        return Number(value)
      case 'boolean':
        return Boolean(JSON.parse(String(value || 0)))
      case 'undefined':
        return target
      default:
        throw new TypeError()
    }
  }
}

type PrimaryElement<P> = Readonly<{
  element: HTMLElement & Partial<P>
  shadowRoot: ShadowRoot
  props: P
}>

type AdvancedElement<P, D> = PrimaryElement<P> & D
type ThisElement<P, D> = AdvancedElement<P, D> & Readonly<{ refs: { [name: string]: HTMLElement } }>

export const defineElement = <
  P extends { [name: string]: Prop } = {},
  E extends { [name: string]: Function } = {},
  F extends { [name: string]: Function } | void = void,
  D = {}
>(options: {
  name: string
  props?: P
  expose?: E
  setup?: (this: PrimaryElement<P>) => D
  render: (this: AdvancedElement<P, D>) => VNode
  created?: (this: ThisElement<P, D>) => F
  mounted?: (this: ThisElement<P, D>) => unknown
  unmounted?: (this: ThisElement<P, D>) => unknown
  adopted?: (this: ThisElement<P, D>) => unknown
  propsChanged?: (this: ThisElement<P, D>, name: keyof P) => unknown
}): Readonly<{ Element: { new(): Partial<P> & Readonly<F> & HTMLElement, prototype: HTMLElement }, register: () => void } & E> => {
  const maps = new Map<HTMLElement, State>()
  const attributes = Object.keys(options.props ?? {})
  class CustomElement extends HTMLElement {
    static observedAttributes = attributes
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'closed' })
      const oldProps = { ...options.props }
      const props = {}
      const state = new State()
      for (const key in oldProps) {
        const item = oldProps![key] as Prop
        state.defaultValues[key] = item
        const descriptor = {
          enumerable: true,
          get: () => oldProps[key],
          set: (v: unknown) => {
            let value = state.parseTargetType(v, state.defaultValues[key])
            if (value === oldProps[key]) return
            const old = this.getAttribute(key)
            if (value === undefined) {
              if (old !== null) return this.removeAttribute(key)
              value = state.defaultValues[key]
            } else {
              if (old === null || String(value) !== old) return this.setAttribute(key, String(value))
            }
            oldProps[key] = value
            state.onPropsChanged?.(key)
          }
        }
        Object.defineProperty(this, key, descriptor)
        Object.defineProperty(props, key, descriptor)
      }
      const oldElement = { element: this, shadowRoot, props } as any
      const setup = options.setup?.apply(oldElement)
      const thisElement = { element: this, shadowRoot, props, ...setup } as any
      thisElement.refs = new CreateElement(options.render.apply(thisElement), shadowRoot).refs
      state.onAdopted = options.adopted?.bind(thisElement)
      state.onMounted = options.mounted?.bind(thisElement)
      state.onUnmounted = options.unmounted?.bind(thisElement)
      state.onPropsChanged = options.propsChanged?.bind(thisElement)
      const funs = options.created?.apply(thisElement)
      for (const key in funs) this[key as string] = funs
      maps.set(this, state)
    }
    connectedCallback() {
      maps.get(this)?.onMounted?.()
    }
    disconnectedCallback() {
      maps.get(this)?.onUnmounted?.()
    }
    adoptedCallback() {
      maps.get(this)?.onAdopted?.()
    }
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      this[name] = newValue ?? undefined
    }
  }
  return {
    Element: CreateElement,
    register: () => !customElements.get(options.name) && customElements.define(options.name, CustomElement),
    ...options.expose
  } as never
}

export type IntrinsicElement<N extends string, T extends {}> = {
  [K in KebabToCamel<N>]: Partial<T> & { [name: string]: any }
} & { [K in N]: Partial<T> & { [name: string]: any } }