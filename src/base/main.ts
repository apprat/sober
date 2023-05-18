import Button from '../button'
import Icon from '../icon'
import FloatingActionButton from '../floating-action-button'
import Ripple from '../ripple'
import Checkbox from '../checkbox'
import RadioButton from '../radio-button'
import Switch from '../switch'
import Slider from '../slider'

const components = {
  Button,
  Ripple,
  FloatingActionButton,
  Icon,
  Checkbox,
  RadioButton,
  Switch,
  Slider
}

export const registerAll = () => {
  const global: { [name: string]: unknown } = {}
  for (const key in components) {
    const item = components[key]
    global[key] = item
    item.register()
  }
  globalThis.Sober = global as never
}

type Components = typeof components

type Maps = { [K in keyof Components as Components[K]['name']]: Components[K] extends { Element: { new(): infer P } } ? P : never }

type PartialMaps = {
  [K in keyof Maps]: (Maps[K] extends infer P & HTMLElement ? P : never) & { [name: string]: unknown }
}

// @ts-ignore undefined module
declare module 'vue' {
  export interface GlobalComponents extends PartialMaps { }
}

declare global {
  var Sober: Components
  namespace JSX {
    interface IntrinsicElements extends PartialMaps {
      // @ts-ignore redefined index
      [name: string]: unknown
    }
  }
  interface Document {
    createElement<K extends keyof Maps>(tagName: K, options?: ElementCreationOptions): Maps[K]
    getElementsByTagName<K extends keyof Maps>(qualifiedName: K): HTMLCollectionOf<Maps[K]>
  }
}