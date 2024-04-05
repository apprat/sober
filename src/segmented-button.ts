import { builder, html } from './core/element.js'
import Item from './segmented-button-item.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  border: solid 1px var(--s-color-outline, #72787e);
  border-radius: 20px;
  height: 40px;
  overflow: hidden;
}
`

const name = 's-segmented-button'
const props = {
}

export default class Component extends builder({
  name, style, props,
  setup() {
    let slot: HTMLSlotElement
    let options: Item[] = []
    let selectIndex = -1
    let changing = false
    const slotChange = () => {
      options = slot.assignedElements().filter((item) => item instanceof Item) as Item[]
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
        <slot ref="${(el: HTMLSlotElement) => slot = el}" @slotchange="${slotChange}"></slot>
        <slot name="end"></slot>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}