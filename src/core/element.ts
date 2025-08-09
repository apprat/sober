import * as scheme from './scheme.js'

type Prop = string | number | boolean

export const supports = { CSSStyleSheet: true, CSSContainer: CSS.supports('container-type', 'size') }

try {
  new CSSStyleSheet()
} catch (error) {
  supports.CSSStyleSheet = false
}

const setStyle = (shadowRoot: ShadowRoot, cssStr: string[]) => {
  for (const css of cssStr) {
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

const baseStyle = /*css*/`
:host{
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}
:host(:focus-visible){
  outline: auto 1px var(--s-color-on-surface-variant, ${scheme.color.onSurfaceVariant});
}
*,
::before,
::after{
  transition-property: none;
  transition-timing-function: inherit;
  transition-duration: inherit;
  animation-timing-function: inherit;
  animation-duration: inherit;
}
@media (pointer: fine) {
  ::-webkit-scrollbar{
    background: var(--s-scrollbar-color, transparent);
    width: var(--s-scrollbar-width, 6px);
    height: var(--s-scrollbar-height, 6px);
    border-radius: var(--s-scrollbar-radius, 0);
  }
  ::-webkit-scrollbar-thumb{
    background: var(--s-scrollbar-thumb-color, var(--s-color-outline-variant, ${scheme.color.outlineVariant}));
    border-radius: var(--s-scrollbar-thumb-radius, 3px);
  }
  @supports not selector(::-webkit-scrollbar) {
    *{
      scrollbar-width: thin;
      scrollbar-color: var(--s-scrollbar-thumb-color, var(--s-color-outline-variant, ${scheme.color.outlineVariant})) var(--s-scrollbar-color, transparent);
    }
  }
}
`

type PropsMeta = { [key: string]: { to: (v: any) => Prop, capitalize: string, def: Prop, sync: boolean } }
export const useProps = <const T extends { [key: string]: Prop | string[] } = {}>(options: T): {
  -readonly [K in keyof T as K extends `$${infer NK}` ? NK : K]
  : T[K] extends string[] ? T[K][number]
  : T[K] extends string ? string
  : T[K] extends number ? number
  : T[K] extends boolean ? boolean
  : never
} => {
  const props: { [key: string]: Prop } = {}
  const meta: PropsMeta = {}
  for (const key in options) {
    let value = options[key] as Prop
    const state = { key: key as string, sync: true, types: [] as string[] }
    if (key.startsWith('$')) {
      state.key = key.slice(1)
      state.sync = false
    }
    if (Array.isArray(value)) {
      state.types = value
      value = state.types[0]
    }
    props[state.key] = value
    meta[state.key] = {
      sync: state.sync,
      def: value,
      capitalize: state.key.charAt(0).toUpperCase() + state.key.slice(1),
      to: (v) => {
        switch (typeof value) {
          case 'string':
            if (!v) return value
            const val = String(v)
            return state.types.length > 0 ? (state.types.includes(val) ? val : state.types[0]) : val
          case 'number':
            const num = v === null ? value : Number(v)
            return isNaN(num) ? value : num
          case 'boolean':
            if (typeof v === 'boolean') return v
            return v === null ? value : v !== 'false'
        }
      }
    }
  }
  Object.defineProperty(props, '$meta', { value: meta })
  return props as never
}

type Capitalize<S extends string> = S extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : S
type Merge<A, B, C> = A & B & { [K in keyof C]: C[K] }

type El<Props, Expose, Events extends { [key: string]: any }> = Props & Expose & HTMLElement & {
  addEventListener<K extends keyof Events>(type: K, listener: (this: El<Props, Expose, Events>, ev: InstanceType<Events[K]>) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof Events>(type: K, listener: (this: El<Props, Expose, Events>, ev: InstanceType<Events[K]>) => any, options?: boolean | EventListenerOptions): void
} & {
  [K in keyof Events as K extends string ? `on${K}` : never]: ((this: El<Props, Expose, Events>, e: InstanceType<Events[K]>) => any) | null
}

export const useElement = <
  N extends string,
  Props extends { [key: string]: Prop } = {},
  Expose extends { [key: string]: any } = {},
  Events extends { [key: string]: any } = {},
>(options: {
  name: N
  style?: string | string[]
  props?: Props
  events?: Events
  template?: string
  focused?: boolean
  setup?: (this: Props & HTMLElement, shadowRoot: ShadowRoot, props: Props) => Merge<{
    onMounted?: () => void
    onUnmounted?: () => void
    onAttributeChanged?: (key: keyof Props, value: Props[keyof Props]) => void
    onAdopted?: () => void
    expose?: Expose & { [K in keyof Props]?: never }
  },
    { [K in keyof Props as K extends string ? `get${Capitalize<K>}` : never]?: () => Props[K] },
    { [K in keyof Props as K extends string ? `set${Capitalize<K>}` : never]?: (v: Props[K], old: Props[K]) => void }
  > | void
}): {
  new(): El<Props, Expose, Events>
  prototype: HTMLElement
  tagName: N
  define(name?: string): void
} => {
  const state = {
    observedAttributes: [] as string[],
    upperPropKeys: {} as { [key: string]: string },
    metaProps: options.props?.$meta as unknown as PropsMeta ?? {},
    events: [] as string[]
  }
  for (const key in state.metaProps ?? {}) {
    const value = key.toLowerCase()
    state.observedAttributes.push(value)
    state.upperPropKeys[value] = key
  }
  for (const key in options.events) {
    const k = `on${key}`
    state.observedAttributes.push(k)
    if (k in HTMLElement.prototype) continue
    state.events.push(k)
  }
  type ReturnType<T extends ((...args: any) => any) | undefined> = T extends (...args: any) => infer R ? R : T
  const map = new Map<HTMLElement, ReturnType<typeof options.setup>>()
  class Component extends HTMLElement {
    static observedAttributes = state.observedAttributes
    static tagName = options.name
    static define(name?: string) {
      !customElements.get(name ?? options.name) && customElements.define(name ?? options.name, this)
    }
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = options.template ?? ''
      setStyle(shadowRoot, [baseStyle, ...options.style ? (Array.isArray(options.style) ? options.style : [options.style]) : []])
      const props = { ...options.props }
      let setup: ReturnType<typeof options.setup>
      let tabIndex = this.tabIndex
      options.focused && this.addEventListener('keydown', (e) => {
        if (!['Enter', ' '].includes(e.key)) return
        e.preventDefault()
        this.click()
      })
      const ahead: { [key: string]: unknown } = {}
      for (const key in props) {
        const initValue = this[key as keyof this] as any
        if (initValue !== undefined) ahead[key] = initValue
        Object.defineProperty(this, key, {
          configurable: true,
          get: () => setup?.[`get${state.metaProps[key].capitalize}`]?.() ?? props[key],
          set: (v) => {
            if (v === undefined) return
            const meta = state.metaProps[key]
            const value = meta.to(v)
            if (meta.sync) {
              const lowerKey = key.toLowerCase()
              const attrValue = this.getAttribute(lowerKey)
              const valueStr = String(value)
              if (value === meta.def && attrValue !== null) return this.removeAttribute(lowerKey)
              if (value !== meta.def && attrValue !== valueStr) return this.setAttribute(lowerKey, valueStr)
            }
            if (value === this[key as keyof this]) return
            if (options.focused && key === 'disabled') {
              if (value) {
                tabIndex = this.tabIndex
                this.tabIndex = -1
              }
              this.tabIndex = value ? -1 : tabIndex
            }
            const old = props[key]
            props[key] = value
            const call = setup?.[`set${state.metaProps[key].capitalize}`] as any
            call?.(value as never, old as never)
            setup?.onAttributeChanged?.(key, value as never)
          }
        })
      }
      const customEvents: { [key: string]: ((e: Event) => void) } = {}
      for (const key of state.events) {
        const k = key as keyof this
        if (typeof this[k] === 'function') customEvents[key] = this[k] as any
        Object.defineProperty(this, key, {
          configurable: true,
          get: () => customEvents[key] ?? null,
          set: (v) => customEvents[key] = typeof v === 'function' ? v : undefined
        })
        this.addEventListener(key.slice(2), (event) => customEvents[key] && customEvents[key].bind(this)(event))
      }
      setup = options.setup?.call(this as any, shadowRoot, props as never)
      for (const key in setup?.expose ?? {}) Object.defineProperty(this, key, { get: () => setup?.expose?.[key] })
      for (const key in ahead) this[key as keyof this] = ahead[key] as never
      map.set(this, setup)
    }
    connectedCallback() {
      if (options.focused && this.tabIndex === -1) this.tabIndex = 0
      map.get(this)?.onMounted?.()
    }
    disconnectedCallback() {
      map.get(this)?.onUnmounted?.()
    }
    adoptedCallback() {
      map.get(this)?.onAdopted?.()
    }
    attributeChangedCallback(key: string, _: unknown, value: string | null) {
      if (state.events.includes(key)) return this[key as keyof this] = (value ? new Function('event', value) : null) as never
      this[state.upperPropKeys[key] as keyof this] = value as never
    }
  }
  return Component as never
}

const throttleMap = new Map<Function, any>()
export const useThrottle = <T extends any[]>(fn: (...args: T) => void, ...args: T) => {
  if (throttleMap.has(fn)) {
    throttleMap.set(fn, args)
    return
  }
  throttleMap.set(fn, args)
  Promise.resolve().then(() => {
    fn(...throttleMap.get(fn))
    throttleMap.delete(fn)
  })
}