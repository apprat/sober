export * from './types/HTMLAttributes.js'

const supports = { CSSStyleSheet: true }

try {
  new CSSStyleSheet()
} catch (error) {
  supports.CSSStyleSheet = false
}

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

const baseStyle = /*css*/`:host{ user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: transparent }`

const setStyle = (shadowRoot: ShadowRoot, css?: string) => {
  if (supports.CSSStyleSheet) {
    const baseStyleEl = new CSSStyleSheet()
    baseStyleEl.replaceSync(baseStyle)
    shadowRoot.adoptedStyleSheets.push(baseStyleEl)
    if (css) {
      const styleEl = new CSSStyleSheet()
      styleEl.replaceSync(css)
      shadowRoot.adoptedStyleSheets.push(styleEl)
    }
    return
  }
  if (css) {
    const styleEl = document.createElement('style')
    styleEl.textContent = css
    shadowRoot.insertBefore(styleEl, shadowRoot.firstChild)
  }
  const baseStyleEl = document.createElement('style')
  baseStyleEl.textContent = baseStyle
  shadowRoot.insertBefore(baseStyleEl, shadowRoot.firstChild)
}

type Setup<P, E> = (this: P & HTMLElement, shadowRoot: ShadowRoot) => {
  mounted?: () => void
  unmounted?: () => void
  adopted?: () => unknown
  expose?: E
  props?: { [K in keyof P]?: (k: P[K]) => unknown }
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
      shadowRoot.innerHTML = options.template ?? ''
      setStyle(shadowRoot, options.style)
      const props = { ...options.props }
      const advance: { [key: string]: any } = {}
      for (const key in options.props) {
        const newVal = this[key as never]
        if (newVal !== undefined && newVal !== props[key]) {
          advance[key] = newVal
        }
        Object.defineProperty(this, key, {
          configurable: true,
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
            setups?.props?.[key]?.(value as never)
          }
        })
      }
      const setups = options.setup?.apply(this as any, [shadowRoot])
      const exposeDescriptors = Object.getOwnPropertyDescriptors(setups?.expose ?? {})
      for (const key in exposeDescriptors) {
        const item = exposeDescriptors[key]
        const old = Object.getOwnPropertyDescriptor(this, key)
        if (old) {
          if (item.value) old.value == item.value
          if (item.get) old.get = item.get
          if (item.set) old.set = item.set
          Object.defineProperty(this, key, old)
          continue
        }
        Object.defineProperty(this, key, item)
      }
      for (const key in advance) {
        if (options.syncProps === true || options.syncProps?.includes(key)) {
          this.setAttribute(key, String(parseType(advance[key], options.props![key])))
        }
        this[key] = advance[key]
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