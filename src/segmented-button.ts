import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './core/enum.js'
import Select from './core/select.js'
import './ripple.js'

const name = 's-segmented-button'
const props = {
  value: ''
}

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  border: solid 1px var(--s-color-outline, ${Theme.colorOutline});
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
    const select = new Select({ context: this, selectClass: SegmentedButtonItem, slot })
    return {
      expose: {
        get value() {
          return select.value
        },
        set value(value) {
          select.value = value
        },
        get options() {
          return select.selects
        },
        get selectedIndex() {
          return select.selectedIndex
        },
      }
    }
  }
}) { }

const itemName = 's-segmented-button-item'
const itemProps = {
  selected: false,
  disabled: false,
  selectable: true,
  value: ''
}

const itemStyle = /*css*/`
:host{
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
  height: 100%;
  min-width: 48px;
  padding: 0 16px;
  text-transform: capitalize;
  font-weight: 500;
  font-size: .875rem;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  border-left: solid 1px var(--s-color-outline, ${Theme.colorOutline});
}
:host(:first-child){
  border-left-color: transparent;
  margin-left: -1px;
}
:host([selected=true]){
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 38%, transparent);
}
::slotted([slot]){
  width: 18px;
  height: 18px;
  color: inherit;
  fill: currentColor;
  flex-shrink: 0;
}
::slotted([slot=start]){
  margin-right: 4px;
}
::slotted([slot=end]){
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
      if (!(this.parentNode instanceof SegmentedButton) || this.selected) return
      if (this.selectable) this.dispatchEvent(new Event(`${name}:select`, { bubbles: true }))
    })
    return {
      props: {
        selected: () => {
          if (!(this.parentNode instanceof SegmentedButton)) return
          this.dispatchEvent(new Event(`${name}:update`, { bubbles: true }))
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