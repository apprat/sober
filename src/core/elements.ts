import * as scheme from './scheme.js'

const pointerMedia = matchMedia('(any-pointer: coarse)')
const pointerMedia2 = matchMedia('(any-pointer: fine)')
const orientationMedia = matchMedia('(orientation: portrait)')

export const device = {
  get touchEnabled() {
    return pointerMedia.matches
  },
  get mouseEnabled() {
    return pointerMedia2.matches
  },
  orientation: {
    get portrait() {
      return orientationMedia.matches
    }
  }
}

const supports = {
  CSS: { CSSStyleSheet: false }
}

try {
  new CSSStyleSheet()
  if ('adoptedStyleSheets' in ShadowRoot.prototype && 'replaceSync' in CSSStyleSheet.prototype) {
    supports.CSS.CSSStyleSheet = true
  }
} catch (error) { }

const createStyleSheet = (css: string) => {
  if (supports.CSS.CSSStyleSheet && 'adoptedStyleSheets' in ShadowRoot.prototype) {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(css)
    return sheet
  }
  const el = document.createElement('style')
  el.textContent = css
  return el
}

type TransformProps<T> = {
  -readonly [K in keyof T as K extends `$${infer NK}` ? NK : K]
  : T[K] extends readonly string[] ? T[K][number]
  : T[K] extends string ? string
  : T[K] extends number ? number
  : T[K] extends boolean ? boolean
  : T[K]
}
type El<Props, Expose, Events extends RawoObject> = Props & Expose & HTMLElement & {
  addEventListener<K extends keyof Events>(type: K, listener: (this: El<Props, Expose, Events>, ev: InstanceType<Events[K]>) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof Events>(type: K, listener: (this: El<Props, Expose, Events>, ev: InstanceType<Events[K]>) => any, options?: boolean | EventListenerOptions): void
} & {
  [K in keyof Events as K extends string ? `on${K}` : never]: ((this: El<Props, Expose, Events>, e: InstanceType<Events[K]>) => any) | null
}
type Prop = string | number | boolean
type RawoObject<T = any> = { [key: string]: T }
type RawProps = { [key: string]: Prop | string[] }
type RawStates = 'focusable' | 'focusableOnly' | 'pressable' | 'hoverable' | 'formable'
type SetupCallInfo<P, S extends RawStates[]> = {
  props: P
  isConnected: boolean
  parentNode?: HTMLElement
  internals: 'formable' extends S[number] ? ElementInternals : undefined
}
type Merge<T, R> = T & { [K in keyof R]: R[K] }
type SetupReturn<Props, Expose> = Merge<{
  onMounted?: () => void
  onUnmounted?: () => void
  onAttributeChanged?: (key: keyof Props, value: Props[keyof Props]) => void
  onAdopted?: () => void
  onFormAssociated?: () => void
  onFormReset?: () => void
  onDisabledStateChanged?: (disabled: boolean) => void
  expose?: Expose & { [K in keyof Props]?: Props[K] }
}, { [K in keyof Props]?: (v: Props[K], old: Props[K]) => void }> | void
type MapValue<S, P, States extends RawStates[]> = {
  setup: S
  info: SetupCallInfo<P, States>
  shadowRoot: ShadowRoot
  customStyles: (HTMLStyleElement | CSSStyleSheet)[]
}
type UseProps<T> = {
  values: TransformProps<T>
  metadata: RawoObject<{
    synced: boolean
    types?: string[]
    defaultValue: Prop
    transform: (value: unknown) => Prop
  }>
  caseKeys: RawoObject<string>
}

const baseStyle = /*css*/`
:host,
*{
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline-width: 3px;
  outline-offset: 2px;
  outline-style: none;
  outline-color: currentColor;
  box-sizing: border-box;
  touch-action: pan-y pan-x;
}
:host(:focus-visible),
*:focus-visible{
  outline-style: solid;
}
*,
::before,
::after,
::slotted(svg){
  transition-timing-function: inherit;
  transition-duration: inherit;
}
svg,
::slotted(svg){
  flex-shrink: 0;
  fill: currentColor;
}
slot{
  all: inherit;
  display: contents;
}
.hide{
  display: none;
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
@media (prefers-reduced-motion: reduce) {
  :host{
    transition-duration: 0s !important;
  }
}
`

const baseSheet = createStyleSheet(baseStyle)

export const useProps = <const T extends RawProps = {}>(data: T): UseProps<T> => {
  const values: RawoObject = {}
  const metadata: RawoObject = {}
  const caseKeys: RawoObject = {}
  for (const key in data) {
    const item = data[key]
    const notSynced = key.startsWith('$')
    const name = notSynced ? key.slice(1) : key
    const isArray = Array.isArray(item)
    let defaultValue = isArray ? item[0] : item
    const types = isArray ? item : undefined
    const transform = (v: unknown) => {
      if (typeof defaultValue === 'number') {
        const num = Number(v)
        return isNaN(num) ? defaultValue : num
      }
      if (typeof defaultValue === 'boolean') {
        if (typeof v === 'boolean') return v
        return v === '' ? true : v !== 'false'
      }
      if (typeof defaultValue === 'string') {
        if (types) return types.includes(v) ? v : defaultValue
        return String(v)
      }
      throw new Error('Unknown Type')
    }
    values[name] = defaultValue
    metadata[name] = { synced: !notSynced, types, defaultValue, transform }
    caseKeys[name.toLowerCase()] = name
  }
  return { values, metadata, caseKeys } as UseProps<T>
}

export const useElement = <
  Props extends RawoObject<Prop>,
  Expose extends RawoObject = {},
  Events extends RawoObject = {},
  States extends RawStates[] = []
>(options: {
  props?: { values: Props, metadata: UseProps<Props>['metadata'], caseKeys: RawoObject<string> }
  events?: Events
  style?: string | string[]
  template?: string
  states?: States
  setup?: (this: Props & HTMLElement, shadowRoot: ShadowRoot, info: SetupCallInfo<Props, States>) => SetupReturn<Props, Expose>
}): {
  new(): El<Props, Expose, Events>
  prototype: HTMLElement
  connectedNodes: (El<Props, Expose, Events> & HTMLElement)[]
  define<T extends string>(name: T): T
  addStyle(css: string): number
  removeStyle(index?: number): void
} => {
  const map = new WeakMap<HTMLElement, MapValue<SetupReturn<Props, Expose>, Props, States>>()
  const templateNode = document.createElement('template')
  templateNode.innerHTML = options.template ?? ''
  const template = templateNode.content
  const styles: (HTMLStyleElement | CSSStyleSheet)[] = [baseSheet]
  const customStyles: (HTMLStyleElement | CSSStyleSheet)[] = []
  if (options.style) {
    const css = Array.isArray(options.style) ? options.style : [options.style]
    css.forEach((item) => styles.push(createStyleSheet(item)))
  }
  const attributes = Object.keys(options.props?.caseKeys ?? {})
  for (const key in options.events) {
    attributes.push(`on${key}`)
  }
  const addCustomStyles = (mapValue: MapValue<SetupReturn<Props, Expose>, Props, States>, item: HTMLStyleElement | CSSStyleSheet) => {
    if (item instanceof HTMLStyleElement) {
      const node = item.cloneNode(true) as HTMLStyleElement
      mapValue.customStyles.push(node)
      return mapValue.shadowRoot.appendChild(node)
    }
    mapValue.shadowRoot.adoptedStyleSheets = [...mapValue.shadowRoot.adoptedStyleSheets, item]
    mapValue.customStyles.push(item)
  }
  class Component extends HTMLElement {
    declare disabled?: boolean
    declare readOnly?: boolean
    static observedAttributes = attributes
    static formAssociated = options.states?.includes('formable')
    static connectedNodes: (El<Props, Expose, Events> & HTMLElement)[] = []
    static define(name: string) {
      if (!customElements.get(name)) customElements.define(name, this)
      return name
    }
    static addStyle(css: string) {
      const sheet = createStyleSheet(css)
      const index = customStyles.length
      customStyles.push(sheet)
      this.connectedNodes.forEach((el) => {
        const mapValue = map.get(el)
        if (mapValue) addCustomStyles(mapValue, sheet)
      })
      return index
    }
    static removeStyle(index?: number) {
      customStyles.splice(index ?? 0, index === undefined ? customStyles.length : 1)
      this.connectedNodes.forEach((el) => {
        const mapValue = map.get(el)
        if (!mapValue) return
        mapValue.customStyles.forEach((item, key) => {
          if (index !== undefined && key !== index) return
          mapValue.customStyles.splice(key, 1)
          if (item instanceof HTMLStyleElement) return item.remove()
          const idx = mapValue.shadowRoot.adoptedStyleSheets.indexOf(item)
          mapValue.shadowRoot.adoptedStyleSheets.splice(idx, 1)
          mapValue.shadowRoot.adoptedStyleSheets = mapValue.shadowRoot.adoptedStyleSheets
        })
      })
    }
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open', serializable: true })
      //布局和样式
      styles.forEach((item) => {
        if (item instanceof HTMLStyleElement) return shadowRoot.appendChild(item.cloneNode(true))
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, item]
      })
      shadowRoot.appendChild(template.cloneNode(true))
      //数据
      const props = options.props
      const info = {
        props: { ...props?.values } as RawoObject<Prop>,
        isConnected: false,
        internals: options.states?.includes('formable') ? this.attachInternals() : undefined
      }
      //组件未初始化前的赋值
      const beforeAttrs: RawoObject = {}
      //getter and setter
      for (const key in info.props) {
        if (!(key in HTMLElement.prototype)) {
          const beforeValue = this[key as keyof this] as never
          if (beforeValue !== undefined) beforeAttrs[key] = beforeValue
          this[key as keyof this] = info.props[key] as never
        }
        Object.defineProperty(this, key, {
          configurable: true,
          get: () => info.props[key],
          set: (v) => {
            const metadata = props?.metadata[key]
            if (!metadata) return
            const value = v === null ? metadata.defaultValue : metadata.transform(v)
            if (metadata.synced) {
              const lowerKey = key.toLowerCase()
              const valueStr = value === true ? '' : String(value)
              if (value === metadata.defaultValue && this.hasAttribute(lowerKey)) return this.removeAttribute(lowerKey)
              if (value !== metadata.defaultValue && this.getAttribute(lowerKey) !== valueStr) return this.setAttribute(lowerKey, valueStr)
            }
            if (value === this[key as keyof this]) return
            const old = info.props[key]
            info.props[key] = value
            if ((options.states?.includes('focusable') || options.states?.includes('focusableOnly')) && ['disabled', 'readOnly'].includes(key)) {
              info.props.disabled || info.props.readOnly ? this.removeAttribute('tabindex') : this.setAttribute('tabindex', '0')
            }
            setup?.[key]?.(value as never, old as never)
            setup?.onAttributeChanged?.(key, value as never)
          }
        })
      }
      const setup = options.setup?.call(this as never, shadowRoot, info as never)
      //setup导出
      for (const key in setup?.expose) {
        const desc = Object.getOwnPropertyDescriptor(this, key)
        if (!desc) {
          Object.defineProperty(this, key, { get: () => setup.expose?.[key] })
          continue
        }
        desc.get = () => setup.expose?.[key]
        Object.defineProperty(this, key, desc)
      }
      //自定义属性事件绑定
      const events: RawoObject<((e: Event) => void) | null> = {}
      for (const key in options.events) {
        const name = `on${key}`
        const beforeFun = this[name as keyof this] as never
        if (typeof beforeFun === 'function') events[key] = beforeFun
        Object.defineProperty(this, name, {
          configurable: true,
          get: () => events[key] ?? null,
          set: (v) => events[key] = typeof v === 'function' ? v : null
        })
        this.addEventListener(key, (e) => events[key] && events[key].bind(this)(e))
      }
      //组件未初始化前的赋值调用
      Promise.resolve().then(() => {
        for (const key in beforeAttrs) this[key as keyof this] = beforeAttrs[key] as never
      })
      map.set(this, { setup, info, customStyles: [], shadowRoot } as never)
      //绑定状态
      if (options.states?.includes('hoverable')) {
        const name = 'hover'
        const hovering = (e: PointerEvent) => {
          if (!device.mouseEnabled || e.pointerType !== 'mouse') return
          this.toggleAttribute(name, e.type === 'pointerenter')
        }
        this.addEventListener('pointerenter', hovering)
        this.addEventListener('pointerleave', hovering)
        this.addEventListener('pointercancel', hovering)
      }
      if (options.states?.includes('pressable')) {
        const name = 'pressed'
        this.addEventListener('pointerdown', (e) => {
          if (e.button !== 0) return
          this.setAttribute(name, '')
          const remove = () => {
            this.removeAttribute(name)
            document.removeEventListener('pointerup', remove)
            document.removeEventListener('pointercancel', remove)
          }
          document.addEventListener('pointerup', remove)
          document.addEventListener('pointercancel', remove)
        })
      }
      if (options.states?.includes('focusable')) focusKeydownClick(this)
    }
    formAssociatedCallback() {
      map.get(this)?.setup?.onFormAssociated?.()
    }
    formResetCallback() {
      map.get(this)?.setup?.onFormReset?.()
    }
    disabledStateChangedCallback(disabled: boolean) {
      const mapValue = map.get(this)
      mapValue?.setup?.onDisabledStateChanged?.(disabled)
      if (typeof this.disabled === 'boolean') this.disabled = disabled
    }
    adoptedCallback() {
      map.get(this)?.setup?.onAdopted?.()
    }
    attributeChangedCallback(name: string, _: unknown, value: string | null) {
      if (name.slice(2) in (options.events ?? {})) return this[name as keyof this] = (value ? new Function('event', value) : null) as never
      this[options.props?.caseKeys[name] as keyof this] = value as never
    }
    connectedCallback() {
      //@ts-ignore
      this.constructor.connectedNodes.push(this)
      const mapValue = map.get(this)
      if (!mapValue) return
      mapValue.info.isConnected = true
      customStyles.forEach((item) => addCustomStyles(mapValue, item))
      if (options.states?.includes('focusable') || options.states?.includes('focusableOnly')) {
        if (!this.disabled && !this.readOnly && !this.hasAttribute('tabindex')) this.tabIndex = 0
      }
      const parent = this.parentNode instanceof ShadowRoot ? this.parentNode.host : this.parentNode
      mapValue.info.parentNode = !(parent instanceof HTMLElement) ? undefined : parent
      Promise.resolve().then(() => mapValue.setup?.onMounted?.())
    }
    disconnectedCallback() {
      //@ts-ignore
      const connected = this.constructor.connectedNodes as HTMLElement[]
      connected.splice(connected.indexOf(this), 1)
      const mapValue = map.get(this)
      if (!mapValue) return
      mapValue.info.isConnected = false
      mapValue.info.parentNode = undefined
      mapValue.setup?.onUnmounted?.()
    }
  }
  return Component as never
}

const throttleMap = new WeakMap<Function, any>()
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

const throttleMapDelay = new WeakMap<Function, number>()
export const useThrottleDelay = <T extends any[]>(fn: (...args: T) => void, time: number, ...args: T) => {
  const has = throttleMapDelay.get(fn)
  if (has) clearTimeout(has)
  const timer = setTimeout(() => {
    fn(...args)
    throttleMapDelay.delete(fn)
  }, time)
  throttleMapDelay.set(fn, timer)
}

export const focusKeydownClick = (...nodes: HTMLElement[]) => {
  nodes.forEach((node) => {
    node.addEventListener('keydown', (e) => {
      if (node.hasAttribute('readonly') || !['Enter', ' '].includes(e.key)) return
      node.click()
      e.preventDefault()
    })
  })
}

export const getParentDepth = (el: HTMLElement & { parentDepth: number }) => {
  if (el.parentDepth <= -1 || !el.parentNode) return
  let ancestor: HTMLElement = el
  for (let i = -1; i < el.parentDepth; i++) {
    if (ancestor.assignedSlot) {
      ancestor = ancestor.assignedSlot
      continue
    }
    if (!ancestor.parentNode) return
    if (ancestor.parentNode instanceof ShadowRoot) {
      const host = ancestor.parentNode.host
      if (!(host instanceof HTMLElement)) return
      ancestor = host
      continue
    }
    if (!(ancestor.parentNode instanceof HTMLElement)) return
    ancestor = ancestor.parentNode
  }
  return ancestor
}

// const div = document.createElement('div')
// div.setAttribute('style', `position: fixed;font-size: 12px; width: 100%;top: 0;left: 0; pointer-events: none;z-index: 99;color: #fff;background: rgba(0,0,0,0.8);`)
// document.body.appendChild(div)

// export const print = (...values: any[]) => {
//   const fragment = document.createDocumentFragment()
//   values.forEach((value) => {
//     const text = document.createTextNode(`${String(value)},`)
//     fragment.appendChild(text)
//   })
//   div.appendChild(fragment)
//   div.appendChild(document.createElement('hr'))
// }