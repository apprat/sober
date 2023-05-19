import { VNode, createElement } from './createElement'
import { KebabToCamel } from './utils'

export type IntrinsicElement<N extends string, T extends {}> = {
  [K in KebabToCamel<N>]: Partial<T> & { [name: string]: any }
} & { [K in N]: Partial<T> & { [name: string]: any } }

export class Ref<T = HTMLElement> {
  value?: T
}

type PropertyValue = string | number | boolean | Function | undefined

export class Component<T = {}> {
  property: T = {} as never
  refs?: { [name: string]: Ref }
  element!: HTMLElement & T
  shadowRoot!: ShadowRoot
  onPropertyChanged?(name: string): unknown
  onCreated?(): unknown
  onMounted?(): unknown
  onUnmounted?(): unknown
  onAdopted?(): unknown
  render?(): VNode
}

class State {
  defaultValues: { [name: string]: PropertyValue } = {}
  constructor(public component: Component) { }
  parseTargetType(value: unknown, target: PropertyValue): PropertyValue {
    switch (typeof target) {
      case 'function':
        if (typeof value === 'function') return value
        break
      case 'string':
        return String(value)
      case 'number':
        return Number(value)
      case 'boolean':
        return Boolean(JSON.parse(String(value || 0)))
      case 'undefined':
        return target
      default:
        throw new TypeError()
    }
  }
}

const constructor = (element: HTMLElement, TypeComponent: typeof Component) => {
  const component = new TypeComponent()
  component.shadowRoot = element.attachShadow({ mode: 'closed' })
  component.element = element
  const state = new State(component)
  for (const key in component.property) {
    const item = component.property[key]
    if (typeof item === 'function') component.property[key] = item.bind(component)
    state.defaultValues[key] = item
    Object.defineProperty(element, key, {
      enumerable: true,
      get: () => component.property[key],
      set: (val: unknown) => {
        let value = state.parseTargetType(val, state.defaultValues[key])
        if (value === component.property[key] || typeof value === 'function') return
        const old = element.getAttribute(key)
        if (value === undefined) {
          if (old !== null) return element.removeAttribute(key)
          value = state.defaultValues[key]
        } else {
          if (old === null || String(value) !== old) return element.setAttribute(key, String(value))
        }
        component.property[key] = value
        component.onPropertyChanged?.(key)
      }
    })
  }
  component.render && component.shadowRoot.appendChild(createElement(component.render()))
  component.onCreated?.()
  return state
}

export const define = <
  T extends typeof Component<any>,
  O = T extends { new(): infer K } ? K : {},
  P = O extends { property: infer K, } ? K : {},
  E = { new(): Partial<P> & HTMLElement, prototype: HTMLElement },
  M extends { [name: string]: Function } = {}>
  (name: string, TypeComponent: T, method?: M): Readonly<{ Element: E, register: () => void } & M> => {
  const maps = new Map<HTMLElement, State>()
  const attributes = Object.keys(new TypeComponent().property)
  class CustomElement extends HTMLElement {
    static observedAttributes = attributes
    constructor() {
      super()
      maps.set(this, constructor(this, TypeComponent))
    }
    connectedCallback() {
      maps.get(this)?.component.onMounted?.()
    }
    disconnectedCallback() {
      maps.get(this)?.component.onUnmounted?.()
    }
    adoptedCallback() {
      maps.get(this)?.component.onAdopted?.()
    }
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      this[name] = newValue ?? undefined
    }
  }
  return {
    Element: CustomElement,
    register: () => !customElements.get(name) && customElements.define(name, CustomElement),
    ...method
  } as never
}