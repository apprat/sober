type Prop = string | number | boolean

interface ElementData {
  props: { [x: string]: Prop }
  mounted?: Function
  unmounted?: Function
  adopted?: Function
  watches?: { [x: string]: (value: Prop) => void | undefined }
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
baseStyle.replaceSync(/*css*/`
:host{
  user-select: none;
  -webkit-user-select: none;
}
::selection{
  background: var(--s-color-primary, #006783);
  color: var(--s-color-on-primary, #ffffff);
}
`)

export const builder = <
  P extends { [x: string]: Prop } = {},
  E extends {} = {},
>(options: {
  name: string
  style?: string
  props?: P
  propSyncs?: (keyof P)[] | true
  setup: (this: P & HTMLElement, shadowRoot: ShadowRoot) => {
    render: () => DocumentFragment
    created?: () => void
    mounted?: () => void
    unmounted?: () => void
    adopted?: () => void
    watches?: { [K in keyof P]?: (value: P[K]) => void }
    expose?: E
  }
}): {
  new(): P & E & HTMLElement
  readonly define: () => void
  prototype: HTMLElement
} => {
  const map = new Map<HTMLElement, ElementData>()
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
      const elementData: ElementData = { props: { ...options.props } }
      for (const key in realProps) {
        const set = (v: unknown) => {
          let value = parsePropType(v, elementData.props[key])
          if (value === realProps[key]) return
          if (options.propSyncs === true || options.propSyncs?.includes(key)) {
            const old = this.getAttribute(key)
            const attrVal = String(value)
            if (old !== null && value === elementData.props[key]) {
              this.removeAttribute(key)
              return
            }
            if (attrVal !== old && value !== elementData.props[key]) {
              this.setAttribute(key, attrVal)
              return
            }
          }
          realProps[key] = value
          elementData.watches?.[key]?.(value)
        }
        Object.defineProperty(this, key, { enumerable: true, get: () => realProps[key], set })
      }
      const setup = options.setup?.apply(this as never, [shadowRoot])
      shadowRoot.adoptedStyleSheets = [baseStyle, sheet]
      shadowRoot.appendChild(setup.render())
      elementData.adopted = setup.adopted
      elementData.mounted = setup.mounted
      elementData.unmounted = setup.unmounted
      elementData.watches = setup.watches as any
      setup.created?.()
      for (const key in setup.expose) {
        Object.defineProperty(this, key, { get: () => setup.expose?.[key] })
      }
      map.set(this, elementData)
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
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      this[name] = newValue ?? undefined
    }
  }
  CustomElement['define'] = function () {
    !customElements.get(options.name) && customElements.define(options.name, this)
  }
  return CustomElement as never
}

class Ref<T extends Element>{
  constructor(public target: T) { }
}

export const ref = <T extends Element = Element>() => {
  return new Ref(undefined as unknown as T)
}

type TemplateValue = Prop | Ref<Element> | Function

const parse = (random: string, template: TemplateStringsArray, values: TemplateValue[]) => {
  const newValues: TemplateValue[] = []
  let str = ''
  template.raw.forEach((item, index) => {
    const value = values[index] ?? ''
    if (value instanceof Ref || value instanceof Function) {
      str += item + random
      newValues.push(value)
      return
    }
    str += item + value
  })
  const t = document.createElement('template')
  t.innerHTML = str
  let index = 0
  return {
    element: t.content,
    getValue: () => {
      const value = newValues[index]
      index++
      return value
    }
  }
}

export const html = (template: TemplateStringsArray, ...args: TemplateValue[]) => {
  const marker = `<!--${String(Math.random()).slice(2)}-->`
  const obj = parse(marker, template, args)
  const find = (list: NodeList) => list.forEach((item) => {
    if (item.nodeType === Node.ELEMENT_NODE) {
      const element = item as Element
      const attrs = element.getAttributeNames()
      attrs.forEach((name) => {
        const old = element.getAttribute(name)
        if (old !== marker) return
        const value = obj.getValue()
        if (name === 'ref') {
          (value as Ref<Element>).target = element
          element.removeAttribute(name)
          return
        }
        if (name.startsWith('@')) {
          const [eventName, behavior] = name.slice(1).split('.')
          element.addEventListener(eventName, (event: Event) => {
            if (typeof value === 'function') value(event)
            if (behavior) {
              if (behavior === 'stop') event.stopPropagation()
              if (behavior === 'prevent') event.preventDefault()
            }
          }, { passive: behavior === 'passive' })
          element.removeAttribute(name)
          return
        }
        element.setAttribute(name, String(value))
      })
      find(item.childNodes)
      return
    }
    if (item.nodeType === Node.TEXT_NODE) {
      const element = item as Text
      if (item.textContent === marker) element.data = String(obj.getValue())
      return
    }
    if (item.nodeType === Node.COMMENT_NODE) {
      const element = item as Comment
      const value = `<!--${element.textContent}-->`
      if (value === marker) {
        const argsVal = obj.getValue()
        element.parentNode?.replaceChild(document.createTextNode(String(argsVal)), element)
      }
    }
  })
  find(obj.element.childNodes)
  return obj.element
}