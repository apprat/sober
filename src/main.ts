import Button from './button'
import Checkbox from './checkbox'
import Dialog from './dialog'
import FloatingActionButton from './floating-action-button'
import IconButton from './icon-button'
import Icon from './icon'
import Label from './label'
import Pointer from './pointer'
import RadioButton from './radio-button'
import Snackbar from './snackbar'
import Switch from './switch'
import TabItem from './tab-item'
import Tab from './tab'
import Tooltip from './tooltip'

const components = {
  Button,
  Checkbox,
  Dialog,
  FloatingActionButton,
  IconButton,
  Icon,
  Label,
  Pointer,
  RadioButton,
  Snackbar,
  Switch,
  TabItem,
  Tab,
  Tooltip
}

export const registerAll = () => {
  for (const key in components) {
    components[key as keyof typeof components].register()
  }
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