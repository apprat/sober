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
  for (const key in components) {
    components[key as keyof typeof components].register()
  }
  return components
}

export default components

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // @ts-ignore redefined index
      [name: string]: any
    }
  }
}