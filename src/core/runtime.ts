import { KebabToCamel, kebabToCamel, camelToKebab } from './utils'

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
  watched?: Function
  watches?: { [key: string]: Function | undefined }
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

type ThisComponent<P> = Readonly<{
  shadowRoot: ShadowRoot
  host: Partial<P> & HTMLElement
  props: P
  refs: { [name: string]: HTMLElement }
}>


export const defineComponent = <
  N extends string,
  P extends { [name: string]: Prop } = {},
  PT extends {} = {},
  E extends {} = {}
>(options: {
  name: N
  props?: P
  prototypes?: PT
  dependencies?: { register: () => void }[]
  setup: (this: ThisComponent<P>) => {
    render: () => VNode
    created?: () => void
    mounted?: () => void
    unmounted?: () => void
    adopted?: () => void
    watched?: (key: keyof P) => void
    watches?: {
      [K in keyof P]?: () => void
    }
    expose?: E
  }
}): {
  readonly name: N
  new(): Partial<P> & Readonly<E> & HTMLElement
  prototype: HTMLElement
  /**
   * Register this element
   */
  readonly register: () => void
} & Readonly<PT> => {
  const maps = new Map<HTMLElement, State>()
  const attributes: string[] = []
  for (const key in options.props) attributes.push(camelToKebab(key))
  class CustomElement extends HTMLElement {
    static observedAttributes = attributes
    //@ts-ignore
    static name = options.name
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
            const old = this.getAttribute(camelToKebab(key))
            if (value === undefined) {
              if (old !== null) return this.removeAttribute(key)
              value = state.defaultValues[key]
            } else {
              if (old === null || String(value) !== old) return this.setAttribute(camelToKebab(key), String(value))
            }
            oldProps[key] = value
            state.watched?.(key)
            state.watches?.[key]?.()
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
      state.watched = setup.watched?.bind(thisElement)
      state.watches = setup.watches
      setup.created?.apply(thisElement)
      for (const key in setup.expose) {
        Object.defineProperty(this, key, {
          get: () => setup.expose?.[key]
        })
      }
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
      this[kebabToCamel(name)] = newValue ?? undefined
    }
  }
  for (const key in options.prototypes) CustomElement[key as string] = options.prototypes[key]
  CustomElement['register'] = () => {
    if (customElements.get(options.name)) return
    options.dependencies?.forEach((value) => value.register())
    customElements.define(options.name, CustomElement)
  }
  return CustomElement as never
}

export type IntrinsicElement<N extends string, T extends {} = {}> = {
  [K in KebabToCamel<N>]: Partial<T> & { [name: string]: any }
} &
  { [K in N]: Partial<T> & { [name: string]: any } }