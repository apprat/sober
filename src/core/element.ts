import * as scheme from './scheme.js'
import { device } from './device.js'

type Prop = string | number | boolean

export const supports = {
  CSS: {
    StyleSheet: true,
    positionAnchor: CSS.supports('position-anchor', 'auto')
  }
}

try {
  new CSSStyleSheet()
} catch (error) {
  supports.CSS.StyleSheet = false
}

const setStyle = (shadowRoot: ShadowRoot, css: string) => {
  if (!supports.CSS.StyleSheet) {
    const el = document.createElement('style')
    el.textContent = css
    shadowRoot.appendChild(el)
    return el
  }
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(css)
  shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet]
  return sheet
}

const removeStyle = (shadowRoot: ShadowRoot, target: HTMLStyleElement | CSSStyleSheet) => {
  if (target instanceof HTMLStyleElement) {
    shadowRoot.removeChild(target)
    return
  }
  shadowRoot.adoptedStyleSheets = shadowRoot.adoptedStyleSheets.filter((sheet) => sheet !== target)
}

const baseStyle = /*css*/`
:host{
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline-width: 3px;
  outline-offset: 2px;
  outline-color: ${scheme.color.onSurfaceVariant};
}
:host(:focus-visible){
  outline-style: solid;
}
slot,
div,
div::before,
div::after,
slot::before,
slot::after{
  transition-property: none;
  transition-timing-function: inherit;
  transition-duration: inherit;
}
slot{
  border-radius: inherit;
}
:host, *{
  box-sizing: border-box;
  touch-action: pan-y pan-x;
}
@media (any-pointer: fine) {
  ::-webkit-scrollbar{
    background: var(--s-scrollbar-color, transparent);
    width: var(--s-scrollbar-width, 6px);
    height: var(--s-scrollbar-height, 6px);
    border-radius: var(--s-scrollbar-radius, 0);
  }
  ::-webkit-scrollbar-thumb{
    background: var(--s-scrollbar-thumb-color, ${scheme.color.outlineVariant});
    border-radius: var(--s-scrollbar-thumb-radius, 3px);
  }
  @supports not selector(::-webkit-scrollbar) {
    *{
      scrollbar-width: thin;
      scrollbar-color: var(--s-scrollbar-thumb-color, ${scheme.color.outlineVariant}) var(--s-scrollbar-color, transparent);
    }
  }
}
`

class PropMeta {
  key: string
  value: Prop
  types: string[] = []
  capitalize: string
  synced: boolean
  constructor(key: string, value: Prop | string[]) {
    const synced = !key.startsWith('$')
    this.key = synced ? key : key.slice(1)
    this.capitalize = this.key.charAt(0).toUpperCase() + this.key.slice(1)
    this.synced = synced
    if (Array.isArray(value)) {
      this.types = value
      this.value = value[0]
      return
    }
    this.value = value
  }
  to(v: any): Prop {
    switch (typeof this.value) {
      case 'string':
        if (this.types.length > 0) return this.types.includes(v) ? v : this.value
        return String(v)
      case 'number':
        const num = v === null ? this.value : Number(v)
        return isNaN(num) ? this.value : num
      case 'boolean':
        if (typeof v === 'boolean') return v
        return v === '' ? true : v !== 'false'
    }
  }
}

export const useProps = <const T extends { [key: string]: Prop | string[] } = {}>(options: T): {
  -readonly [K in keyof T as K extends `$${infer NK}` ? NK : K]
  : T[K] extends readonly string[] ? T[K][number]
  : T[K] extends string ? string
  : T[K] extends number ? number
  : T[K] extends boolean ? boolean
  : T[K]
} => {
  const props: { [key: string]: Prop } = {}
  const meta: { [key: string]: PropMeta } = {}
  for (const key in options) {
    const propMeta = new PropMeta(key, options[key])
    props[propMeta.key] = propMeta.value
    meta[propMeta.key] = propMeta
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

type ReturnType<T extends ((...args: any) => any) | undefined> = T extends (...args: any) => infer R ? R : T

export const setKeydownClick = (el: HTMLElement | HTMLElement[]) => {
  const arr = Array.isArray(el) ? el : [el]
  arr.forEach((v) => {
    v.addEventListener('keydown', (e) => {
      if (!['Enter', ' '].includes(e.key)) return
      v.click()
    })
  })
}

export const useElement = <
  Props extends { [key: string]: Prop } = {},
  Expose extends { [key: string]: any } = {},
  Events extends { [key: string]: any } = {},
  FormAssociated extends boolean = false
>(options: {
  style?: string | string[]
  props?: Props
  events?: Events
  template?: string
  focused?: true | 'keydown'
  pressed?: true
  hovered?: true
  formAssociated?: FormAssociated
  setup?: (this: Props & HTMLElement, shadowRoot: ShadowRoot, info: { props: Props, isConnected: boolean, internals: FormAssociated extends true ? ElementInternals : undefined }) => Merge<{
    onMounted?: () => void | (() => void)
    onUnmounted?: () => void
    onAttributeChanged?: (key: keyof Props, value: Props[keyof Props]) => void
    onAdopted?: () => void
    onFormAssociated?: () => void
    onFormReset?: () => void
    onDisabledStateChanged?: (disabled: boolean) => void
    expose?: Expose & { [K in keyof Props]?: never }
  },
    { [K in keyof Props as K extends string ? `get${Capitalize<K>}` : never]?: () => Props[K] },
    { [K in keyof Props as K extends string ? `set${Capitalize<K>}` : never]?: (v: Props[K], old: Props[K]) => void }
  > | void
}): {
  new(): El<Props, Expose, Events>,
  prototype: HTMLElement,
  define<T extends string>(name: T): T,
  connects: (El<Props, Expose, Events> & HTMLElement)[],
  setStyle(style: string): void
} => {
  const observedAttributes: string[] = []
  const state = {
    lowerKeys: {} as { [key: string]: string },
    metaProps: options.props?.$meta as unknown as { [key: string]: PropMeta } ?? {},
    events: [] as string[]
  }
  for (const key in state.metaProps ?? {}) {
    const lower = key.toLowerCase()
    state.lowerKeys[lower] = key
    observedAttributes.push(lower)
  }
  for (const key in options.events) {
    const k = `on${key}`
    observedAttributes.push(k)
    if (k in HTMLElement.prototype) continue
    state.events.push(k)
  }
  type MapValue = {
    setup: ReturnType<typeof options.setup>,
    info: { props: Props, isConnected: boolean, internals: FormAssociated extends true ? ElementInternals : undefined },
    style?: CSSStyleSheet | HTMLStyleElement
  }
  const map = new WeakMap<HTMLElement, MapValue>()
  const t = document.createElement('template')
  t.innerHTML = options.template ?? ''
  const info: { style?: string, template: Node } = { template: t.content }
  class Component extends HTMLElement {
    static get formAssociated() {
      return options.formAssociated
    }
    static observedAttributes = observedAttributes
    static connects: HTMLElement[] = []
    static define(name: string) {
      !customElements.get(name) && customElements.define(name, this)
      return name
    }
    static setStyle(style?: string) {
      style ? info.style = style : delete info.style
      this.connects.forEach((el) => {
        const mapValue = map.get(el)
        if (!mapValue) return
        const shadowRoot = el.shadowRoot!
        if (!style) {
          mapValue.style && removeStyle(shadowRoot, mapValue.style)
          return delete mapValue.style
        }
        if (mapValue.style) removeStyle(shadowRoot, mapValue.style)
        mapValue.style = setStyle(shadowRoot, style)
      })
    }
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open', serializable: true })
      shadowRoot.appendChild(info.template.cloneNode(true))
      const styles = [baseStyle, ...Array.isArray(options.style) ? options.style : [options.style]]
      const sheets: CSSStyleSheet[] = []
      let style: undefined | CSSStyleSheet | HTMLStyleElement
      for (const item of styles) {
        if (!item) continue
        setStyle(shadowRoot, item)
      }
      if (info.style) {
        const out = setStyle(shadowRoot, info.style)
        style = out
      }
      if (sheets.length > 0) shadowRoot.adoptedStyleSheets = sheets
      const props = { ...options.props } as Props
      const mapValue: MapValue = {
        setup: null as any, style,
        info: { props, isConnected: false, internals: (options.formAssociated ? this.attachInternals() : undefined) as any }
      }
      map.set(this, mapValue)
      options.focused === 'keydown' && setKeydownClick(this)
      if (options.pressed) {
        const name = 'pressed'
        this.addEventListener('pointerdown', (e) => {
          if (e.button !== 0) return
          this.setAttribute(name, '')
          document.addEventListener(e.pointerType === 'mouse' ? 'mouseup' : 'touchend', () => this.removeAttribute(name), { once: true })
        })
      }
      if (options.hovered) {
        const name = 'hovered'
        this.addEventListener('pointerenter', () => {
          if (!device.mouseEnabled) return
          this.setAttribute(name, '')
          this.addEventListener('pointerleave', () => this.removeAttribute(name), { once: true })
        })
      }
      const ahead: { [key: string]: unknown } = {}
      for (const key in props) {
        const initValue = this[key as keyof this] as any
        if (initValue !== undefined) ahead[key] = initValue
        Object.defineProperty(this, key, {
          configurable: true,
          get: () => mapValue.setup?.[`get${state.metaProps[key].capitalize}`]?.() ?? props[key],
          set: (v) => {
            const meta = state.metaProps[key]
            const value = v === null ? meta.value : meta.to(v)
            if (meta.synced) {
              const lowerKey = key.toLowerCase()
              const attrValue = this.getAttribute(lowerKey)
              const valueStr = value === true ? '' : String(value)
              const hasAttr = this.hasAttribute(lowerKey)
              if (value === meta.value && hasAttr) return this.removeAttribute(lowerKey)
              if (value !== meta.value && attrValue !== valueStr) return this.setAttribute(lowerKey, valueStr)
            }
            if (value === this[key as keyof this]) return
            const old = props[key]
            props[key] = value as never
            if (options.focused && ['disabled', 'readOnly'].includes(key)) {
              //@ts-ignore
              (props.disabled || props.readOnly) ? this.removeAttribute('tabindex') : this.setAttribute('tabindex', '0')
            }
            const call = mapValue.setup?.[`set${state.metaProps[key].capitalize}`] as any
            call?.(value as never, old as never)
            mapValue.setup?.onAttributeChanged?.(key, value as never)
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
      mapValue.setup = options.setup?.call(this as any, shadowRoot as any, mapValue.info)
      for (const key in mapValue.setup?.expose ?? {}) Object.defineProperty(this, key, { get: () => mapValue.setup?.expose?.[key] })
      for (const key in ahead) this[key as keyof this] = ahead[key] as never
    }
    formAssociatedCallback() {
      map.get(this)?.setup?.onFormAssociated?.()
    }
    disabledStateChangedCallback(disabled: boolean) {
      const mapValue = map.get(this)
      mapValue?.setup?.onDisabledStateChanged?.(disabled)
      //@ts-ignore
      if (typeof mapValue?.info.props.disabled === 'boolean') this.disabled = disabled
    }
    formResetCallback() {
      map.get(this)?.setup?.onFormReset?.()
    }
    connectedCallback() {
      //@ts-ignore
      this.constructor.connects.push(this)
      const mapValue = map.get(this)
      if (!mapValue) return
      if (info.style && !mapValue.style) {
        mapValue.style = setStyle(this.shadowRoot!, info.style)
      }
      if (!info.style && mapValue.style) {
        removeStyle(this.shadowRoot!, mapValue.style)
        delete mapValue.style
      }
      mapValue.info.isConnected = true
      //@ts-ignore
      if (options.focused && !this.disabled && !this.readOnly && !this.hasAttribute('tabindex')) this.tabIndex = 0
      const call = mapValue?.setup?.onMounted?.()
      if (call) mapValue!.setup!.onUnmounted = call
    }
    disconnectedCallback() {
      //@ts-ignore
      const connects = this.constructor.connects as HTMLElement[]
      connects.splice(connects.indexOf(this), 1)
      const mapValue = map.get(this)
      if (!mapValue) return
      mapValue.info.isConnected = false
      mapValue?.setup?.onUnmounted?.()
    }
    adoptedCallback() {
      map.get(this)?.setup?.onAdopted?.()
    }
    attributeChangedCallback(key: string, _: unknown, value: string | null) {
      if (state.events.includes(key)) return this[key as keyof this] = (value ? new Function('event', value) : null) as never
      this[state.lowerKeys[key] as keyof this] = value as never
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