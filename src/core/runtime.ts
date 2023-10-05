import { KebabToCamel, kebabToCamel, camelToKebab } from './utils'

export class VNode {
  constructor(public type: string | null | ((props: unknown) => Element), public props: { [name: string]: unknown }) { }
}

class CreateElement {
  refs: { [name: string]: HTMLElement } = {}
  private marks: { SVG?: boolean } = {}
  private createChildren(children: unknown, container: Node) {
    const child = Array.isArray(children) ? children : [children]
    for (const item of child) {
      if (item instanceof VNode) {
        this.create(item, container)
        continue
      }
      container.appendChild(document.createTextNode(String(item)))
    }
  }
  private create(vnode: VNode, container: Node) {
    if (vnode.type === null) throw new TypeError()
    if (typeof vnode.type === 'function') {
      container.appendChild(vnode.type.apply({}, [vnode.props]))
      return
    }
    if (vnode.type === 'svg') this.marks.SVG = true
    const node = this.marks.SVG ? document.createElementNS('http://www.w3.org/2000/svg', vnode.type) : document.createElement(vnode.type)
    container.appendChild(node)
    for (const key in vnode.props) {
      const item = vnode.props[key]
      if (key === 'children') {
        this.createChildren(item, node)
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
    if (vnode.type === null) this.createChildren(vnode.props.children as VNode, fragment)
    if (typeof vnode.type === 'string') this.create(vnode, fragment)
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
    if (value === undefined) return target
    switch (typeof target) {
      case 'string':
        return String(value)
      case 'number':
        return Number(value)
      case 'boolean':
        return Boolean(JSON.parse(String(value || 0)))
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
  SS extends {} = {},
  E extends {} = {}
>(options: {
  name: N
  props?: P
  propSyncs?: (keyof P)[] | true
  statics?: SS
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
  new(): Partial<P> & Readonly<E> & HTMLElement
  prototype: HTMLElement
  /**
   * Register this element
   */
  readonly register: () => void
} & Readonly<SS> => {
  const maps = new Map<HTMLElement, State>()
  const attributes: string[] = []
  for (const key in options.props) attributes.push(camelToKebab(key))
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
            if (options.propSyncs === true || options.propSyncs?.includes(key)) {
              const old = this.getAttribute(camelToKebab(key))
              if (value === undefined) {
                if (old !== null) return this.removeAttribute(key)
                value = state.defaultValues[key]
              } else {
                if (old === null || String(value) !== old) return this.setAttribute(camelToKebab(key), String(value))
              }
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
  for (const key in options.statics) CustomElement[key as string] = options.statics[key]
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