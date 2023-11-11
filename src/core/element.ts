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

export const defineElement = <
  P extends { [x: string]: Prop } = {},
  S extends {} = {},
  E extends {} = {}
>(options: {
  name: string
  props?: P
  propSyncs?: (keyof P)[] | true
  statics?: S
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
  new(): P & Readonly<E> & HTMLElement
  prototype: HTMLElement
} & Readonly<S> => {
  const maps = new Map<HTMLElement, ElementData>()
  const attributes: string[] = []
  for (const key in options.props) attributes.push(key)
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
      const style = document.createElement('style')
      style.textContent = `:host{ user-select: none; -webkit-user-select: none }`
      shadowRoot.appendChild(style)
      shadowRoot.appendChild(setup.render())
      elementData.adopted = setup.adopted
      elementData.mounted = setup.mounted
      elementData.unmounted = setup.unmounted
      elementData.watches = setup.watches as any
      setup.created?.()
      for (const key in setup.expose) {
        Object.defineProperty(this, key, { get: () => setup.expose?.[key] })
      }
      maps.set(this, elementData)
    }
    connectedCallback() {
      maps.get(this)?.mounted?.()
    }
    disconnectedCallback() {
      maps.get(this)?.unmounted?.()
    }
    adoptedCallback() {
      maps.get(this)?.adopted?.()
    }
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      this[name] = newValue ?? undefined
    }
  }
  for (const key in options.statics) CustomElement[key as string] = options.statics[key]
  !customElements.get(options.name) && customElements.define(options.name, CustomElement)
  return CustomElement as never
}

class Ref<T extends Element>{
  constructor(public target: T) { }
}

export const ref = <T extends Element = Element>() => {
  return new Ref(undefined as unknown as T)
}

type TemplateValue = Prop | Ref<Element> | DocumentFragment | Function

const parse = (random: string, template: TemplateStringsArray, values: TemplateValue[]) => {
  const newValues: TemplateValue[] = []
  let str = ''
  template.raw.forEach((item, index) => {
    const value = values[index] ?? ''
    if (value instanceof Ref || value instanceof DocumentFragment || value instanceof Function) {
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
          element.addEventListener(name.slice(1), value as EventListener)
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
        element.parentNode?.replaceChild(argsVal instanceof DocumentFragment ? argsVal : document.createTextNode(String(argsVal)), element)
      }
    }
  })
  find(obj.element.childNodes)
  return obj.element
}