export * from './types/HTMLAttributes.js'

type Prop = string | number | boolean

const parseType = (value: unknown, old: Prop) => {
  if (value === undefined) return old
  if (typeof old === 'string') return String(value)
  if (typeof old === 'number') return Number(value)
  if (typeof old === 'boolean') {
    if (typeof value === 'boolean') return value
    return value === 'true' ? true : false
  }
  throw new TypeError()
}

const baseStyle = new CSSStyleSheet()
baseStyle.replaceSync(/*css*/`:host{ user-select: none;-webkit-user-select: none }`)

type Setup<P, E> = (this: P & HTMLElement, shadowRoot: ShadowRoot) => {
  mounted?: () => void
  unmounted?: () => void
  adopted?: () => unknown
  watches?: {
    [K in keyof P]?: (value: P[K]) => void
  }
  expose?: E
} | void

export const useElement = <
  P extends { [key: string]: Prop } = {},
  E extends {} = {}
>(options: {
  style?: string
  props?: P
  syncProps?: (keyof P)[] | true
  template?: string
  setup?: Setup<P, E>
}): {
  new(): P & E & HTMLElement
  readonly define: (name: string) => void
  prototype: HTMLElement
} => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(options.style ?? '')
  const attrs: string[] = []
  const upperAttrs: { [key: string]: string } = {}
  for (const key in options.props) {
    const value = key.toLowerCase()
    attrs.push(value)
    upperAttrs[value] = key
  }
  const map = new Map<HTMLElement, ReturnType<Setup<P, E>>>()
  class Protoptype extends HTMLElement {
    static observedAttributes = attrs
    static define(name: string) {
      customElements.define(name, this)
    }
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.adoptedStyleSheets = [baseStyle, sheet]
      shadowRoot.innerHTML = options.template ?? ''
      const props = { ...options.props }
      const setups = options.setup?.apply(this as any, [shadowRoot])
      for (const key in options.props) {
        Object.defineProperty(this, key, {
          get: () => props[key],
          set: (v) => {
            const value = parseType(v, options.props![key])
            if (value === props[key]) return
            if (options.syncProps === true || options.syncProps?.includes(key)) {
              const lowerKey = key.toLowerCase()
              const attrValue = this.getAttribute(lowerKey)
              const valueStr = String(value)
              if (value === options.props?.[key] && attrValue !== null) {
                this.removeAttribute(lowerKey)
                return
              }
              if (value !== options.props?.[key] && attrValue !== valueStr) {
                this.setAttribute(lowerKey, valueStr)
                return
              }
            }
            props[key] = value
            setups?.watches?.[key]?.(value as never)
          }
        })
      }
      for (const key in setups?.expose) {
        Object.defineProperty(this, key, { get: () => setups?.expose![key as never] })
      }
      map.set(this, setups)
    }
    connectedCallback() {
      map.get(this)?.mounted?.()
    }
    disconnectedCallback() {
      map.get(this)?.unmounted?.()
    }
    adoptedCallback() {
      map.get(this)?.adopted?.()
    }
    attributeChangedCallback(key: string, _: unknown, newValue: string | null) {
      this[upperAttrs[key]] = newValue ?? undefined
    }
  }
  return Protoptype as never
}

export type LowercaseKeys<T> = {
  [K in keyof T as K extends string ? Lowercase<K> : never]: T[K]
}