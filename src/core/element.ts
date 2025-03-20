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

const baseStyle = /*css*/`
:host{
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}
`

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

export const useElement = <
  P extends { [key: string]: Prop } = {},
  E extends {} = {}
>(options: {
  style?: string
  props?: P
  syncProps?: (keyof P)[] | true
  template?: string
  setup?: (this: P & HTMLElement, shadowRoot: ShadowRoot) => {
    onMounted?: () => void
    onUnmounted?: () => void
    onAdopted?: () => void
    expose?: E
  } & {
    [K in keyof P]?: ((v: P[K], old: P[K]) => void) | { get?: (old: P[K]) => P[K], set?: (v: P[K], old: P[K]) => void }
  } | void
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
  type ReturnType<T extends ((...args: any) => any) | undefined> = T extends (...args: any) => infer R ? R : T
  let fragment: null | DocumentFragment = null
  const map: { [key: symbol]: ReturnType<typeof options.setup> } = {}
  class Prototype extends HTMLElement {
    symbol = Symbol()
    static observedAttributes = attrs
    static define(name: string) {
      customElements.define(name, this)
    }
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      if (!fragment) {
        const template = document.createElement('template')
        template.innerHTML = options.template ?? ''
        fragment = template.content
      }
      shadowRoot.appendChild(fragment.cloneNode(true))
      setStyle(shadowRoot, options.style)
      const props = { ...options.props }
      for (const key in options.props) {
        const k = key as keyof this
        if (this[k] !== undefined) {
          props[key] == this[k]
          continue
        }
        this[k] = props[key] as never
      }
      const setup = options.setup?.apply(this as any, [shadowRoot])
      for (const key in options.props) {
        Object.defineProperty(this, key, {
          configurable: true,
          get: () => {
            const call = setup?.[key]
            if (!call || typeof call === 'function' || !call.get) return props[key]
            return call.get?.(props[key] as never)
          },
          set: (v) => {
            const value = parseType(v, options.props![key])
            if (value === this[key as keyof this]) return
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
            const old = props[key]
            props[key] = value
            const call = setup?.[key]
            if (!call) return
            try {
              typeof call === 'function' ? call(value as never, old as never) : call.set?.(value as never, old as never)
            } catch (error) {
              props[key] = old
              throw error
            }
          }
        })
      }
      for (const key in setup?.expose) {
        Object.defineProperty(this, key, { get: () => setup?.expose?.[key] })
      }
      map[this.symbol] = setup
    }
    connectedCallback() {
      map[this.symbol]?.onMounted?.()
    }
    disconnectedCallback() {
      map[this.symbol]?.onUnmounted?.()
    }
    adoptedCallback() {
      map[this.symbol]?.onAdopted?.()
    }
    attributeChangedCallback(key: string, _: unknown, value: string | null) {
      this[upperAttrs[key] as keyof this] = (value ?? undefined) as never
    }
  }
  return Prototype as never
}