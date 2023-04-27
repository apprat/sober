import Button, { Property as ButtonProperty } from './button'
import Card, { Property as CardProperty } from './card'
import Carousel, { Property as CarouselProperty } from './carousel'
import Checkbox, { Property as CheckboxProperty } from './checkbox'
import Chip, { Property as ChipProperty } from './chip'
import Icon, { Property as IconProperty } from './icon'

import Ripple, { Property as RippleProperty } from './ripple'

interface ComponentMap {
  [Button.name]: ButtonProperty
  [Card.name]: CardProperty
  [Carousel.name]: CarouselProperty
  [Checkbox.name]: CheckboxProperty
  [Chip.name]: ChipProperty
  [Icon.name]: IconProperty

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
  Icon.register()
  return {
    [Ripple.name]: Ripple.Element,
    [Button.name]: Button.Element,
    [Card.name]: Card.Element,
    [Icon.name]: Icon.Element
  }
}