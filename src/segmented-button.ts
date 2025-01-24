import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import { Select } from './core/utils/select.js'
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
  flex-shrink: 0;
}
`
const template = /*html*/`<slot></slot>`

class SSegmentedButton extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector('slot') as HTMLSlotElement
    const select = new Select({ context: this, class: SSegmentedButtonItem, slot })
    return {
      expose: {
        get value() {
          return select.value
        },
        get options() {
          return select.list
        },
        get selectedIndex() {
          return select.selectedIndex
        },
      },
      props: {
        value: (value) => select.value = value
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
  height: 100%;
  min-width: 48px;
  padding: 0 16px;
  text-transform: capitalize;
  font-weight: 500;
  font-size: .875rem;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
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

class SSegmentedButtonItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: ['selected', 'disabled'],
  setup() {
    this.addEventListener('click', () => {
      if (!(this.parentNode instanceof SSegmentedButton) || this.selected) return
      if (this.selectable) this.dispatchEvent(new Event(`${name}:select`, { bubbles: true }))
    })
    return {
      props: {
        selected: () => {
          if (!(this.parentNode instanceof SSegmentedButton)) return
          this.dispatchEvent(new Event(`${name}:update`, { bubbles: true }))
        }
      }
    }
  }
}) { }

SSegmentedButton.define(name)
SSegmentedButtonItem.define(itemName)

export { SSegmentedButton as SegmentedButton, SSegmentedButtonItem as SegmentedButtonItem }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SSegmentedButton
    [itemName]: SSegmentedButtonItem
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
        //@ts-ignore
        [itemName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof itemProps>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [itemName]: typeof itemProps
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [itemName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof itemProps>
    }
  }
}