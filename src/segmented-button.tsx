import { defineComponent } from './core/runtime'
import type SegmentedButtonItem from './segmented-button-item'

const style = /*css*/`
:host{
  display: flex;
}
`

const name = 's-segmented-button'
const props = {
  select: 0
}

const Component = defineComponent({
  name, props,
  setup() {
    const state: { items: SegmentedButtonItem[], selectItem?: SegmentedButtonItem } = { items: [] }
    const render = () => {
      const old = state.selectItem
      state.selectItem = state.items[this.props.select]
      if (!state.selectItem) {
        if (old) old.checked = false
        return
      }
      if (!state.selectItem.checked) state.selectItem.checked = true
      state.items.forEach((value) => {
        if (value === state.selectItem || !value.checked) return
        value.checked = false
      })
    }
    const onTabChange = (event: Event) => {
      const target = event.target as unknown as SegmentedButtonItem
      const index = state.items.indexOf(target)
      if (index !== this.props.select) {
        this.props.select = index
        this.host.dispatchEvent(new Event('change'))
      }
    }
    const onSlotChange = () => {
      const slot = this.refs.slot as HTMLSlotElement
      state.items = slot.assignedElements() as SegmentedButtonItem[]
      render()
    }
    return {
      watches: {
        select: render
      },
      render: () => <>
        <style>{style}</style>
        <slot ref="slot" onSlotChange={onSlotChange} onClick={onTabChange}></slot>
      </>
    }
  }
})

export default class extends Component { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}