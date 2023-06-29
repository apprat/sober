import Button from '../button'
import Pointer from '../pointer'
import Icon from '../icon'
import FAB from '../floating-action-button'
import Checkbox from '../checkbox'
import RadioButton from '../radio-button'
import Switch from '../switch'
import Tab from '../tab'
import TabItem from '../tab-item'
import Dialog from '../dialog'
import Label from '../label'
import Snackbar from '../snackbar'

const components = {
  Button,
  Pointer,
  FAB,
  Icon,
  Checkbox,
  RadioButton,
  Switch,
  Tab,
  TabItem,
  Dialog,
  Label,
  Snackbar
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

new Snackbar.Make('xx')