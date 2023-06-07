import { KebabToCamel } from './utils'

export const css = (text: TemplateStringsArray) => text.join()

export class VNode {
  constructor(public type: string | null | ((this: { parentNode: Node }, props: {}) => Element), public props: { [name: string]: unknown }) { }
}

type CreateElementContainer = { parent: Node, parentNode: Node }

class CreateElement {
  refs: { [name: string]: HTMLElement } = {}
  private marks: { SVG?: boolean } = {}
  private createChildren(children: unknown, container: CreateElementContainer) {
    const child = Array.isArray(children) ? children : [children]
    for (const item of child) {
      if (item instanceof VNode) {
        this.create(item, container)
        continue
      }
      container.parent.appendChild(document.createTextNode(String(item)))
    }
  }
  private create(vnode: VNode, container: CreateElementContainer) {
    if (vnode.type === null) throw new TypeError()
    if (typeof vnode.type === 'function') {
      container.parent.appendChild(vnode.type.apply({ parentNode: container.parentNode }, [vnode.props]))
      return
    }
    if (vnode.type === 'svg') this.marks.SVG = true
    const node = this.marks.SVG ? document.createElementNS('http://www.w3.org/2000/svg', vnode.type) : document.createElement(vnode.type)
    container.parent.appendChild(node)
    for (const key in vnode.props) {
      const item = vnode.props[key]
      if (key === 'children') {
        this.createChildren(item, { parent: node, parentNode: node })
        continue
      }
      if (key.match(/on[A-Z]/g) && typeof item === 'function') {
        node.addEventListener(key.slice(2).toLocaleLowerCase(), (e) => item(e))
        continue
      }
      if (key === 'ref' && typeof item === 'string') {
        this.refs[item] = node as never
        continue
      }
      node.setAttribute(key, String(item))
    }
    if (vnode.type === 'svg') this.marks.SVG = false
  }
  constructor(vnode: VNode, element: ShadowRoot) {
    const fragment = document.createDocumentFragment()
    const container: CreateElementContainer = { parent: fragment, parentNode: element.host }
    if (vnode.type === null) this.createChildren(vnode.props.children as VNode, container)
    if (typeof vnode.type === 'string') this.create(vnode, container)
    if (typeof vnode.type === 'function') fragment.appendChild(vnode.type.apply({ parentNode: element }, [vnode.props]))
    element.appendChild(fragment)
  }
}

type Prop = string | number | boolean | undefined

class State {
  defaultValues: { [name: string]: Prop } = {}
  mounted?: Function
  unmounted?: Function
  adopted?: Function
  changed?: Function
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

type ThisElement<P> = Readonly<{
  shadowRoot: ShadowRoot
  host: HTMLElement & Partial<P>
  props: P
  refs: { [name: string]: HTMLElement }
}>

export const defineElement = <
  P extends { [name: string]: Prop } = {},
  E extends {} = {},
  EF extends { [name: string]: Function } = {}
>(options: {
  name: string
  props?: P
  expose?: E
  setup: (this: ThisElement<P>) => {
    render: () => VNode
    created?: () => void
    mounted?: () => void
    unmounted?: () => void
    adopted?: () => void
    changed?: (name: keyof P) => void
    expose?: EF
  }
}): Readonly<{ Element: { new(): Partial<P> & Readonly<EF> & HTMLElement, prototype: HTMLElement }, register: () => void } & E> => {
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
            state.changed?.(key)
          }
        }
        Object.defineProperty(this, key, descriptor)
        Object.defineProperty(props, key, descriptor)
      }
      const thisElement = { shadowRoot, host: this, props, refs: {} } as any
      const setup = options.setup?.apply(thisElement)
      thisElement.refs = new CreateElement(setup.render(), shadowRoot).refs
      //
      state.adopted = setup.adopted?.bind(thisElement)
      state.mounted = setup.mounted?.bind(thisElement)
      state.unmounted = setup.unmounted?.bind(thisElement)
      state.changed = setup.changed?.bind(thisElement)
      const funs = setup.created?.apply(thisElement)
      for (const key in setup.expose) this[key as string] = funs
      maps.set(this, state)
    }
    connectedCallback() {
      maps.get(this)?.mounted?.()
    }
    disconnectedCallback() {
      maps.get(this)?.unmounted?.()
    }
    adoptedCallback() {
      maps.get(this)?.adopted?.()
    }
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      this[name] = newValue ?? undefined
    }
  }
  return {
    Element: CustomElement,
    register: () => !customElements.get(options.name) && customElements.define(options.name, CustomElement),
    ...options.expose
  } as never
}

export type IntrinsicElement<N extends string, T extends {}> = {
  [K in KebabToCamel<N>]: Partial<T> & { [name: string]: any }
} & { [K in N]: Partial<T> & { [name: string]: any } }