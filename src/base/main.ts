import Button from '../button'
import Pointer from '../pointer'
import Icon from '../icon'
import FloatingActionButton from '../floating-action-button'
import Checkbox from '../checkbox'
import RadioButton from '../radio-button'
import Switch from '../switch'
import Tab from '../tab'
import TabItem from '../tab-item'

const components = {
  Button,
  Pointer,
  FloatingActionButton,
  Icon,
  Checkbox,
  RadioButton,
  Switch,
  Tab,
  TabItem
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