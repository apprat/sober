import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'
import './ripple.js'

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  border: solid 1px var(--s-color-outline, #72787e);
  border-radius: var(--s-shape-corner-full, 7680px);
  height: 40px;
  overflow: hidden;
}
`

const name = 's-segmented-button'
const props = {
}

export default class SegmentedButton extends builder({
  name, style, props,
  setup() {
    let options: SegmentedButtonItem[] = []
    let selectIndex = -1
    let changing = false
    const slotChange = (_: Event, el: HTMLSlotElement) => {
      options = el.assignedElements().filter((item) => item instanceof SegmentedButtonItem) as SegmentedButtonItem[]
      selectIndex = options.findIndex((item) => item.checked)
    }
    this.addEventListener('segmented-button-item:change', (event: Event) => {
      event.stopPropagation()
      if (changing) return
      changing = true
      if (!event.target) return
      const target = event.target as SegmentedButtonItem
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
        <slot @slotchange="${slotChange}"></slot>
      `
    }
  }
}) { }

const itemStyle = /*css*/`
:host{
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--s-color-on-surface, #1a1c1e);
  height: 100%;
  min-width: 48px;
  padding: 0 16px;
  text-transform: capitalize;
  font-weight: 500;
  font-size: .875rem;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  border-left: solid 1px var(--s-color-outline, #72787e);
}
:host(:first-child){
  border-left-color: transparent;
  margin-left: -1px;
}
:host([checked=true]){
  background: var(--s-color-secondary-container, #d4e4f6);
  color: var(--s-color-on-secondary-container, #0d1d29);
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 38%, transparent);
}
::slotted(s-icon){
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
::slotted(s-icon[slot=start]){
  margin-right: 4px;
}
::slotted(s-icon[slot=end]){
  margin-right: 4px;
}
`

const itemName = 's-segmented-button-item'
const itemProps = {
  checked: false,
  disabled: false,
  selectable: true
}

export class SegmentedButtonItem extends builder({
  name: itemName,
  style: itemStyle,
  props: itemProps,
  propSyncs: ['checked', 'disabled'],
  setup() {
    this.addEventListener('click', () => this.selectable && (this.checked = true))
    return {
      watches: {
        checked: () => {
          if (!this.parentNode) return
          this.dispatchEvent(new Event('segmented-button-item:change', { bubbles: true }))
        }
      },
      render: () => html`
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
        <s-ripple class="ripple" attached="true"></s-ripple>
      `
    }
  }
}) { }

SegmentedButton.define()
SegmentedButtonItem.define()


declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
      [itemName]: Partial<typeof itemProps> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: SegmentedButton
    [itemName]: SegmentedButtonItem
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [itemName]: typeof itemProps
  }
}