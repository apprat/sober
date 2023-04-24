import Ripple, { Property as RippleProperty } from './ripple'
import Button, { Property as ButtonProperty } from './button'
import Card, { Property as CardProperty } from './card'

interface ComponentMap {
  [Button.name]: ButtonProperty
  [Card.name]: CardProperty
  [Ripple.name]: RippleProperty
}

type PartialValue<T> = { [K in keyof T]: Partial<T[K]> & { [key: string]: unknown } }

// @ts-ignore Undefined module
declare module 'vue' {
  export interface GlobalComponents extends PartialValue<ComponentMap> { }
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends PartialValue<ComponentMap> {
      // @ts-ignore Redefined index
      [name: string]: unknown
    }
  }
  interface Document {
    createElement<K extends keyof ComponentMap>(tagName: K, options?: ElementCreationOptions): Partial<ComponentMap[K]> & HTMLElement
    getElementsByTagName<K extends keyof ComponentMap>(qualifiedName: K): HTMLCollectionOf<Partial<ComponentMap[K]> & HTMLElement>
  }
}

export default () => {
  Ripple.register()
  Button.register()
  Card.register()
  return {
    [Ripple.name]: Ripple.Element,
    [Button.name]: Button.Element,
    [Card.name]: Card.Element,
  }
}