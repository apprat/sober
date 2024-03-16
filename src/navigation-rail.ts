import { builder, html } from './core/element.js'
import type Item from './navigation-rail-item.js'

const style = /*css*/`
:host{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 100%;
  overflow: hidden;
}
::slotted([slot=start]){
  flex-shrink: 0;
}
::slotted(s-icon-button[slot=menu]){
  width: 56px;
  height: 56px;
  margin: 16px 0 8px 0;
  border-radius: 12px;
}
::slotted([slot=end]){
  flex-grow: 1;
  width: 100%;
}
`

const name = 's-navigation-rail'
const props = {
}

export default class Component extends builder({
  name, style, props, propSyncs: true,
  setup() {
    let options: Item[] = []
    let selectIndex = -1
    let changing = false
    const slotChange = () => {
      options = Array.from(this.children) as Item[]
      selectIndex = options.findIndex((item) => item.checked)
    }
    this.addEventListener('item:change', (event: Event) => {
      event.stopPropagation()
      if (changing) return
      changing = true
      if (!event.target) return
      const target = event.target as Item
      selectIndex = -1
      options.forEach((item, index) => {
        if (item === target && target.checked) return selectIndex = index
        item.checked && (item.checked = false)
      })
      changing = false
      this.dispatchEvent(new Event('change'))
    })
    return {
      expose: {
        get options() {
          return options
        },
        get selectIndex() {
          return selectIndex
        }
      },
      render: () => html`
        <slot name="start"></slot>
        <slot name="menu"></slot>
        <slot @slotchange="${slotChange}"></slot>
        <slot name="end"></slot>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}