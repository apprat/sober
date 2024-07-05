import { useElement, JSXAttributes } from './core/element.js'
import './ripple.js'

const name = 's-segmented-button'
const props = {
}

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
const template = /*html*/`<slot></slot>`

export class SegmentedButton extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector('slot') as HTMLSlotElement
    let options: SegmentedButtonItem[] = []
    let selectedIndex = -1
    let changed = false
    const update = (target: SegmentedButtonItem) => {
      if (options.length === 0 || !target.selected) return (selectedIndex = -1)
      let old: SegmentedButtonItem | null = null
      for (const item of options) {
        if (item === target) continue
        if (item.selected) {
          old = item
          item.removeAttribute('selected')
        }
      }
      selectedIndex = options.indexOf(target)
      if (changed) {
        this.dispatchEvent(new Event('change'))
        changed = false
      }
    }
    slot.addEventListener('slotchange', () => {
      let target: null | SegmentedButtonItem = null
      selectedIndex = -1
      options = slot.assignedElements().filter((item) => {
        if (item instanceof SegmentedButtonItem) {
          if (item.selected) target = item
          return true
        }
      }) as SegmentedButtonItem[]
      if (target) update(target)
    })
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
      }
    }
  }
}) { }

const itemName = 's-segmented-button-item'
const itemProps = {
  selected: false,
  disabled: false,
  selectable: true
}

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
  color: inherit;
  flex-shrink: 0;
}
::slotted(s-icon[slot=start]){
  margin-right: 4px;
}
::slotted(s-icon[slot=end]){
  margin-right: 4px;
}
`

const itemTemplate =/*html*/`
<slot name="start"></slot>
<slot></slot>
<slot name="end"></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`

export class SegmentedButtonItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: ['selected', 'disabled'],
  setup() {
    this.addEventListener('click', () => {
      if (this.selectable) {
        if (this.selected) return
        if (this.parentNode instanceof SegmentedButton) {
          this.dispatchEvent(new Event('navigation-item:change', { bubbles: true }))
        }
        this.selected = true
      }
    })
    return {
      watches: {
        selected: () => {
          if (!(this.parentNode instanceof SegmentedButton)) return
          this.dispatchEvent(new Event('segmented-button-item:update', { bubbles: true }))
        }
      }
    }
  }
}) { }

SegmentedButton.define(name)
SegmentedButtonItem.define(itemName)


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