export const supports = { CSSStyleSheet: true, CSSContainer: CSS.supports('container-type', 'size') }

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
  const all = [baseStyle, css]
  for (const css of all) {
    if (!css) continue
    if (!supports.CSSStyleSheet) {
      const el = document.createElement('style')
      el.textContent = css
      shadowRoot.insertBefore(el, shadowRoot.firstChild)
      continue
    }
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(css)
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet]
  }
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
    expose?: E & { [K in keyof P]?: never }
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
  const map = new Map<HTMLElement, ReturnType<typeof options.setup>>()
  class Prototype extends HTMLElement {
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
      const ahead: { [key: string]: unknown } = {}
      for (const key in options.props) {
        const k = key as keyof this
        if (this[k] !== undefined) {
          ahead[key] = this[k]
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
      for (const key in ahead) {
        this[key as keyof this] = ahead[key] as never
      }
      map.set(this, setup)
      //@ts-ignore
      this.connectedCallback = this.disconnectedCallback = this.adoptedCallback = this.attributeChangedCallback = undefined
    }
    connectedCallback() {
      map.get(this)?.onMounted?.()
    }
    disconnectedCallback() {
      map.get(this)?.onUnmounted?.()
    }
    adoptedCallback() {
      map.get(this)?.onAdopted?.()
    }
    attributeChangedCallback(key: string, _: unknown, value: string | null) {
      this[upperAttrs[key] as keyof this] = (value ?? undefined) as never
    }
  }
  return Prototype as never
}