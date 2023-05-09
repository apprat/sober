import Button from './button'
import Icon from './icon'
import FloatingActionButton from './floating-action-button'
import Ripple from './ripple'
import Checkbox from './checkbox'

const register = () => {
  return {
    [Button.name]: Button.register(),
    [Ripple.name]: Ripple.register(),
    [FloatingActionButton.name]: FloatingActionButton.register(),
    [Icon.name]: Icon.register(),
    [Checkbox.name]: Checkbox.register()
  }
}

export default register

type ComponentMap<N = ReturnType<typeof register>> = {
  [K in keyof N]: N[K] extends { new(): infer P & HTMLElement } ? P : never
}

type PartialValue<T> = { [K in keyof T]: T[K] & { [key: string]: unknown } }

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
    createElement<K extends keyof ComponentMap>(tagName: K, options?: ElementCreationOptions): ComponentMap[K] & HTMLElement
    getElementsByTagName<K extends keyof ComponentMap>(qualifiedName: K): HTMLCollectionOf<ComponentMap[K] & HTMLElement>
  }
}