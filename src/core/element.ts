type Prop = string | number | boolean

interface TemplateHTML {
  template: HTMLTemplateElement
  mark: string
}

const getMark = (value: string) => `<!--${value}-->`

export const html = (template: TemplateStringsArray, ...values: (Function | Prop)[]) => {
  return {
    values,
    getTemplateHTML: (): TemplateHTML => {
      const mark = getMark(String(Math.random()).slice(2))
      const t = document.createElement('template')
      t.innerHTML = template.join(mark)
      return { mark, template: t }
    }
  }
}

const walkNode = (list: NodeList, mark: string, templateValue: { value: Function | Prop }) => {
  list.forEach((item) => {
    if (item.nodeType === Node.TEXT_NODE && item.textContent?.includes(mark)) item.textContent = item.textContent.replaceAll(mark, () => String(templateValue.value))
    if (item.nodeType === Node.COMMENT_NODE && item.textContent && mark === getMark(item.textContent)) {
      item.parentNode!.replaceChild(document.createTextNode(String(templateValue.value)), item)
    }
    if (item.nodeType === Node.ELEMENT_NODE) {
      const el = item as Element
      const attrs = el.getAttributeNames()
      attrs.forEach((name) => {
        const old = el.getAttribute(name)
        if (name === 'ref' && old === mark) {
          el.removeAttribute(name)
          return (templateValue.value as Function)(el)
        }
        if (name.startsWith('@')) {
          const [eventName, behavior] = name.slice(1).split('.') //click.stop
          const fn = old === mark && templateValue.value as Function
          el.addEventListener(eventName, (event: Event) => {
            fn && fn(event)
            if (behavior === 'stop') event.stopPropagation()
            if (behavior === 'prevent') event.preventDefault()
          }, { passive: behavior === 'passive' })
          return el.removeAttribute(name)
        }
        old?.includes(mark) && el.setAttribute(name, old.replaceAll(mark, () => String(templateValue.value)))
      })
      walkNode(item.childNodes, mark, templateValue)
    }
  })
}

const templateHTMLCaches: { [key: string]: TemplateHTML } = {}

const documentFromHTML = (name: string, htmls: ReturnType<typeof html>) => {
  if (!templateHTMLCaches[name]) templateHTMLCaches[name] = htmls.getTemplateHTML()
  const { mark, template: OldTemplate } = templateHTMLCaches[name]
  const template = OldTemplate.cloneNode(true) as HTMLTemplateElement
  const templateValue = {
    index: 0,
    get value() {
      const value = htmls.values[this.index]
      this.index++
      return value
    }
  }
  walkNode(template.content.childNodes, mark, templateValue)
  return template.content
}

interface ElementState {
  props: { [name: string]: Prop }
  events?: { [name: string]: (() => unknown) | undefined }
  watches?: { [x: string]: (value: Prop) => unknown }
}

const parsePropType = (value: unknown, old: Prop) => {
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

export const builder = <
  P extends { [x: string]: Prop } = {},
  E extends {} = {},
>(options: {
  name: string
  style?: string
  props?: P
  propSyncs?: (keyof P)[] | true
  setup: (this: P & HTMLElement, shadowRoot: ShadowRoot) => {
    render: () => ReturnType<typeof html>
    created?: () => void
    mounted?: () => void
    unmounted?: () => void
    adopted?: () => unknown
    watches?: { [K in keyof P]?: (value: P[K]) => void }
    expose?: E
  }
}): {
  new(): P & E & HTMLElement
  readonly define: () => void
  prototype: HTMLElement
} => {
  const map = new Map<HTMLElement, ElementState>()
  const attributes: string[] = []
  for (const key in options.props) attributes.push(key)
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(options.style ?? '')
  class CustomElement extends HTMLElement {
    static observedAttributes = attributes
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'closed' })
      const realProps = { ...options.props }
      const elementState: ElementState = { props: { ...options.props } }
      //Allocated before initialization
      const assigned: { [key: string]: unknown } = {}
      for (const key in this) {
        if (key in HTMLElement.prototype) continue
        assigned[key] = this[key]
      }
      for (const key in realProps) {
        const set = (v: unknown) => {
          let value = parsePropType(v, elementState.props[key])
          if (value === realProps[key]) return
          if (options.propSyncs === true || options.propSyncs?.includes(key)) {
            const old = this.getAttribute(key)
            const attrVal = String(value)
            if (old !== null && value === elementState.props[key]) {
              this.removeAttribute(key)
              return
            }
            if (attrVal !== old && value !== elementState.props[key]) {
              this.setAttribute(key, attrVal)
              return
            }
          }
          realProps[key] = value
          elementState.watches?.[key]?.(value)
        }
        Object.defineProperty(this, key, { enumerable: true, get: () => realProps[key], set })
      }
      for (const key in assigned) {
        this[key] = assigned[key]
      }
      const setup = options.setup?.apply(this as never, [shadowRoot])
      shadowRoot.adoptedStyleSheets = [baseStyle, sheet]
      shadowRoot.appendChild(documentFromHTML(options.name, setup.render()))
      elementState.events = {
        adopted: setup.adopted,
        mounted: setup.mounted,
        unmounted: setup.unmounted
      }
      elementState.watches = setup.watches as any
      setup.created?.()
      for (const key in setup.expose) {
        Object.defineProperty(this, key, { get: () => setup.expose?.[key] })
      }
      map.set(this, elementState)
    }
    connectedCallback() {
      map.get(this)?.events?.mounted?.()
    }
    disconnectedCallback() {
      map.get(this)?.events?.unmounted?.()
    }
    adoptedCallback() {
      map.get(this)?.events?.adopted?.()
    }
    attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
      this[name] = newValue ?? undefined
    }
  }
  CustomElement['define'] = function () {
    !customElements.get(options.name) && customElements.define(options.name, this)
  }
  return CustomElement as never
}