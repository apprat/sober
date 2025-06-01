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
type PropsMeta = { [key: string]: { to: (v: any) => Prop, def: Prop, sync: boolean } }
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
      to: (v) => {
        switch (typeof value) {
          case 'string':
            const val = String(v)
            return state.types.length > 0 ? (state.types.includes(val) ? val : state.types[0]) : val
          case 'number':
            const num = Number(v)
            return isNaN(num) ? value : num
          case 'boolean':
            return typeof v === 'boolean' ? v : v === 'true'
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

//组件参数
type ComponentOptions<
  Props extends { [key: string]: Prop } = {},
  Expose extends { [key: string]: any } = {},
  Events extends { [key: string]: Event | CustomEvent } = {},
  Methods extends { [key: string]: any } = {}
> = {
  style?: string | string[]
  props?: Props
  events?: Events
  methods?: Methods
  template?: string
  setup?: (this: Props & Methods & HTMLElement, shadowRoot: ShadowRoot) => {
    onMounted?: () => void
    onUnmounted?: () => void
    onAdopted?: () => void
    expose?: Expose & { [K in keyof Props]?: never }
  } & {
    [K in keyof Props]?: ((v: Props[K], old: Props[K]) => void) | { get?: (old: Props[K]) => Props[K], set?: (v: Props[K], old: Props[K]) => void }
  } | void
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
*{
  outline: none;
}
`

//注册组件
export const useElement = <
  Props extends { [key: string]: Prop } = {},
  Expose extends { [key: string]: any } = {},
  Events extends { [key: string]: Event | CustomEvent } = {},
  Methods extends { [key: string]: any } = {}
>(options: ComponentOptions<Props, Expose, Events, Methods>): {
  new(): ComponentReturn<Props, Expose, Events, { [K in keyof Events as K extends string ? `on${K}` : never]: ((event: Events[K]) => void) | null }>
  readonly define: (name: string) => void
  prototype: HTMLElement
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
    static define(name: string) {
      customElements.define(name, this)
    }
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = options.template ?? ''
      setStyle(shadowRoot, [baseStyle, ...options.style ? (Array.isArray(options.style) ? options.style : [options.style]) : []])
      const props = { ...options.props }
      let setup: ReturnType<typeof options.setup>
      const ahead: { [key: string]: unknown } = {}
      for (const key in props) {
        const initValue = this[key as keyof this] as any
        if (initValue !== undefined) ahead[key] = initValue
        Object.defineProperty(this, key, {
          configurable: true,
          get: () => {
            const call = setup?.[key]
            if (!call || typeof call === 'function' || !call.get) return props[key]
            return call.get?.(props[key] as never)
          },
          set: (v) => {
            const meta = state.metaProps[key]
            const value = v === undefined ? meta.def : meta.to(v)
            if (meta.sync) {
              const lowerKey = key.toLowerCase()
              const attrValue = this.getAttribute(lowerKey)
              const valueStr = String(value)
              if (value === meta.def && attrValue !== null) return this.removeAttribute(lowerKey)
              if (value !== meta.def && attrValue !== valueStr) return this.setAttribute(lowerKey, valueStr)
            }
            if (value === this[key as keyof this]) return
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
      //自定义事件
      const customEvents: { [key: string]: ((e: Event) => void) } = {}
      for (const key of state.events) {
        const k = key as keyof this
        if (typeof this[k] === 'function') {
          customEvents[key] = this[k] as any
        }
        Object.defineProperty(this, key, {
          configurable: true,
          get: () => customEvents[key] ?? null,
          set: (v) => customEvents[key] = typeof v === 'function' ? v : undefined
        })
        this.addEventListener(key.slice(2), (event) => customEvents[key] && customEvents[key].bind(this)(event))
      }
      setup = options.setup?.call(this as any, shadowRoot)
      // //导出expose
      for (const key in setup?.expose ?? {}) Object.defineProperty(this, key, { get: () => setup?.expose?.[key] })
      //重新赋值
      for (const key in ahead) this[key as keyof this] = ahead[key] as never
      //@ts-ignore 清除生命周期
      this.connectedCallback = this.disconnectedCallback = this.adoptedCallback = this.attributeChangedCallback = undefined
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
      this[state.upperPropKeys[key] as keyof this] = (value ?? undefined) as never
    }
  }
  for (const key in options.methods) {
    Component[key as keyof typeof Component] = options.methods[key]
  }
  return Component as any
}