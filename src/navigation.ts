import { builder, html } from './core/element.js'
import Item from './navigation-item.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: var(--s-color-surface, #fcfcff);
  box-shadow: var(--s-elevation-level2, 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
  position: relative;
}
:host([mode=rail]){
  flex-direction: column;
  justify-content: flex-start;
  width: 80px;
  box-shadow: none;
  height: 100%;
  background: none;
}
::slotted(s-navigation-item){
  height: 64px;
}
:host([mode=rail]) ::slotted(s-navigation-item){
  height: 72px;
}
:host([mode=rail]) ::slotted(s-icon-button[slot=start]){
  width: 56px;
  height: 56px;
  margin: 16px 0 8px 0;
  border-radius: var(--s-shape-corner-medium, 12px);
}
:host([mode=rail]) ::slotted([slot=end]){
  flex-grow: 1;
}
`

const name = 's-navigation'
const props = {
  mode: 'bottom' as 'bottom' | 'rail'
}

export default class Component extends builder({
  name, style, props, propSyncs: true,
  setup() {
    let slot: HTMLSlotElement
    let options: Item[] = []
    let selectIndex = -1
    let changing = false
    const slotChange = () => {
      options = slot.assignedElements().filter((item) => item instanceof Item) as Item[]
      selectIndex = options.findIndex((item) => item.checked)
    }
    this.addEventListener('navigation-item:change', (event: Event) => {
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