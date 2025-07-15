import { Theme } from './theme.js'

type Prop = string | number | boolean

export const supports = { CSSStyleSheet: true, CSSContainer: CSS.supports('container-type', 'size') }

try {
  new CSSStyleSheet()
} catch (error) {
  supports.CSSStyleSheet = false
}

//设置样式
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

//注册Props
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

//注册事件
export const useEvents = <T extends { [key: string]: typeof Event | typeof CustomEvent<any> }>(options: T): { [K in keyof T]: InstanceType<T[K]> } => {
  return options as never
}

type Capitalize<S extends string> = S extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : S
type Merge<A, B, C> = A & B & { [K in keyof C]: C[K] }

//组件参数
type ComponentOptions<
  N extends string,
  Props extends { [key: string]: Prop } = {},
  Expose extends { [key: string]: any } = {},
  Events extends { [key: string]: Event | CustomEvent } = {},
  Methods extends { [key: string]: any } = {}
> = {
  name: N
  style?: string | string[]
  props?: Props
  events?: Events
  methods?: Methods
  template?: string
  focused?: boolean
  setup?: (this: Props & Methods & HTMLElement, shadowRoot: ShadowRoot & { host: Props & Methods & HTMLElement }, props: Props) => Merge<{
    onMounted?: () => void
    onUnmounted?: () => void
    onAttributeChanged?: (key: keyof Props, value: Props[keyof Props]) => void
    onAdopted?: () => void
    expose?: Expose & { [K in keyof Props]?: never }
  },
    { [K in keyof Props as K extends string ? `get${Capitalize<K>}` : never]?: () => Props[K] },
    { [K in keyof Props as K extends string ? `set${Capitalize<K>}` : never]?: (v: Props[K], old: Props[K]) => void }
  > | void
}

//组件实例化返回值
type ComponentReturn<Props, Expose, Events, OnEvents> = Props & Expose & OnEvents & {
  addEventListener<K extends keyof Events>(type: K, listener: (this: ComponentReturn<Props, Expose, Events, OnEvents>, ev: Events[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof Events>(type: K, listener: (this: ComponentReturn<Props, Expose, Events, OnEvents>, ev: Events[K]) => any, options?: boolean | EventListenerOptions): void
} & HTMLElement

const baseStyle = /*css*/`
:host{
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}
:host(:focus-visible){
  outline: auto 1px var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
`

//注册组件
export const useElement = <
  N extends string,
  Props extends { [key: string]: Prop } = {},
  Expose extends { [key: string]: any } = {},
  Events extends { [key: string]: Event | CustomEvent } = {},
  Methods extends { [key: string]: any } = {}
>(options: ComponentOptions<N, Props, Expose, Events, Methods>): {
  new(): ComponentReturn<Props, Expose, Events, { [K in keyof Events as K extends string ? `on${K}` : never]: ((event: Events[K]) => void) | null }>
  prototype: HTMLElement
  tagName: N
} & Methods => {
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
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = options.template ?? ''
      setStyle(shadowRoot, [baseStyle, ...options.style ? (Array.isArray(options.style) ? options.style : [options.style]) : []])
      const props = { ...options.props }
      let setup: ReturnType<typeof options.setup>
      let tabIndex = this.tabIndex
      if (options.focused) {
        if (this.tabIndex === -1) this.tabIndex = 0
        this.addEventListener('keydown', (e) => {
          if (!['Enter', ' '].includes(e.key)) return
          this.click()
        })
      }
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
              tabIndex = this.tabIndex
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
      //自定义事件
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
      setup = options.setup?.call(this as any, shadowRoot as never, props as never)
      for (const key in setup?.expose ?? {}) Object.defineProperty(this, key, { get: () => setup?.expose?.[key] })
      for (const key in ahead) this[key as keyof this] = ahead[key] as never
      map.set(this, setup)
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
      if (state.events.includes(key)) return this[key as keyof this] = (value ? new Function('event', value) : null) as never
      this[state.upperPropKeys[key] as keyof this] = value as never
    }
  }
  !customElements.get(options.name) && customElements.define(options.name, Component)
  return Component as never
}

const throttleMap: Function[] = []
export const useThrottle = (fn: Function) => {
  if (throttleMap.includes(fn)) return
  throttleMap.push(fn)
  Promise.resolve().then(() => throttleMap.splice(throttleMap.indexOf(fn), 1) && fn())
}

const throttleDelayMap: Function[] = []
export const useThrottleDelay = (fn: Function, delay = 0) => {
  if (throttleDelayMap.includes(fn)) return
  throttleDelayMap.push(fn)
  setTimeout(() => throttleDelayMap.splice(throttleDelayMap.indexOf(fn), 1) && fn(), delay)
}