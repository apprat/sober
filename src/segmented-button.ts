import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'
import './ripple.js'

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  border: solid 1px var(--s-color-outline, #777680);
  border-radius: 20px;
  height: 40px;
  overflow: hidden;
}
`

const name = 's-segmented-button'
const props = {
}

export class SegmentedButton extends builder({
  name, style, props,
  setup() {
    let options: SegmentedButtonItem[] = []
    let selectedIndex = -1
    let timer = -1
    let changed = false
    const slotChange = (_: Event, el: HTMLSlotElement) => {
      options = el.assignedElements().filter((item) => item instanceof SegmentedButtonItem) as SegmentedButtonItem[]
      selectedIndex = -1
      let target: null | SegmentedButtonItem = null
      for (const item of options) {
        if (item.selected) target = item
      }
      if (target) update(target)
    }
    const update = (target: SegmentedButtonItem) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (!target.selected) return (selectedIndex = -1)
        options.forEach((item) => {
          if (item === target) return
          if (item.selected) item.removeAttribute('selected')
        })
        selectedIndex = options.indexOf(target)
        if (changed) {
          this.dispatchEvent(new Event('change'))
          changed = false
        }
      }, 0)
    }
    this.addEventListener('segmented-button-item:update', (event: Event) => {
      event.stopPropagation()
      update(event.target as SegmentedButtonItem)
    })
    this.addEventListener('segmented-button-item:change', (event: Event) => {
      event.stopPropagation()
      changed = true
    })
    return {
      expose: {
        get options() {
          return options
        },
        get selectedIndex() {
          return selectedIndex
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
  color: var(--s-color-on-surface, #1c1b1f);
  height: 100%;
  min-width: 48px;
  padding: 0 16px;
  text-transform: capitalize;
  font-weight: 500;
  font-size: .875rem;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  border-left: solid 1px var(--s-color-outline, #777680);
}
:host(:first-child){
  border-left-color: transparent;
  margin-left: -1px;
}
:host([selected=true]){
  background: var(--s-color-secondary-container, #e2e0f9);
  color: var(--s-color-on-secondary-container, #191a2c);
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb, var(--s-color-on-surface, #1c1b1f) 38%, transparent);
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
  selected: false,
  disabled: false,
  selectable: true
}

export class SegmentedButtonItem extends builder({
  name: itemName,
  style: itemStyle,
  props: itemProps,
  propSyncs: ['selected', 'disabled'],
  setup() {
    this.addEventListener('click', () => {
      if (this.selectable) {
        this.selected = true
        this.dispatchEvent(new Event('segmented-button-item:change', { bubbles: true }))
      }
    })
    return {
      watches: {
        selected: () => {
          this.dispatchEvent(new Event('segmented-button-item:update', { bubbles: true }))
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