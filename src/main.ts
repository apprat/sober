import Button from './button'
import Checkbox from './checkbox'
import Dialog from './dialog'
import FloatingActionButton from './floating-action-button'
import IconButton from './icon-button'
import Icon from './icon'
import Label from './label'
import Layer from './layer'
import RadioButton from './radio-button'
import Scrollbar from './scrollbar'
import SegmentedButtonItem from './segmented-button-item'
import SegmentedButton from './segmented-button'
import Slider from './slider'
import Snackbar from './snackbar'
import Switch from './switch'
import TabItem from './tab-item'
import Tab from './tab'
import Table from './table'
import Thead from './thead'
import Tbody from './tbody'
import Tr from './tr'
import Th from './th'
import Td from './td'
import Tooltip from './tooltip'
import TopAppBar from './top-app-bar'

const components = {
  Button,
  Checkbox,
  Dialog,
  FloatingActionButton,
  IconButton,
  Icon,
  Label,
  Layer,
  RadioButton,
  Scrollbar,
  SegmentedButtonItem,
  SegmentedButton,
  Slider,
  Snackbar,
  Switch,
  TabItem,
  Tab,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Tooltip,
  TopAppBar
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
