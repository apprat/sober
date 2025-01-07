import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import { Popup } from './popup.js'
import { Field } from './field.js'
import { Select } from './core/utils/select.js'
import './ripple.js'
import './scroll-view.js'

const name = 's-picker'
const props = {
  disabled: false,
  label: '',
  value: ''
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  font-size: .875rem;
  flex-shrink: 0;
  --picker-border-radius: 4px;
  --picker-border-color: var(--s-color-outline, ${Theme.colorOutline});
  --picker-border-width: 1px;
  --picker-padding: 16px;
  --picker-height: 48px;
}
:host([disabled=true]){
  pointer-events: none;
  opacity: .38;
}
.popup{
  display: block;
  cursor: pointer;
}
.field{
  --field-border-radius: var(--picker-border-radius);
  --field-border-color: var(--picker-border-color);
  --field-border-width: var(--picker-border-width);
  --field-padding: var(--picker-padding);
  height: var(--picker-height);
  width: 100%;
}
.view{
  width: 100%;
  padding-left: var(--picker-padding);
}
.ripple{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
svg{
  width: 24px;
  height: 24px;
  fill: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  padding: 2px;
  box-sizing: border-box;
  flex-shrink: 0;
  margin-left: -12px;
  margin-right: 4px;
}
.container{
  max-height: 408px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-size: .875rem;
  padding: 4px 0;
  gap: 4px;
}
`

const template = /*html*/`
<s-popup class="popup">
  <slot name="trigger" slot="trigger">
    <s-field fixed="false" class="field" part="field">
      <div class="label" slot="label"></div>
      <div class="view"></div>
      <svg viewBox="0 -960 960 960" slot="end">
          <path d="M480-360 280-560h400L480-360Z"></path>
        </svg>
      <s-ripple class="ripple" attached="true"></s-ripple>
    </s-field>
  </slot>
  <s-scroll-view class="container" part="container">
    <slot id="slot"></slot>
  </s-scroll-view>
</s-popup>
`

export class Picker extends useElement({
  style, template, props, syncProps: ['disabled'],
  setup(shadowRoot) {
    const popup = shadowRoot.querySelector('.popup') as Popup
    const field = shadowRoot.querySelector('.field') as Field
    const label = shadowRoot.querySelector('.label') as HTMLDivElement
    const view = shadowRoot.querySelector('.view') as HTMLDivElement
    const slot = shadowRoot.querySelector('#slot') as HTMLSlotElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const select = new Select({ context: this, class: PickerItem, slot })
    //show
    popup.addEventListener('show', () => {
      field.focused = true
      field.fixed = true
      container.style.minWidth = `${this.offsetWidth}px`
      select.select && container.scrollTo({ top: (select.select.offsetTop - container.offsetTop) - (container.offsetHeight / 2) + (select.select.offsetHeight / 2) })
    })
    //close
    popup.addEventListener('close', () => {
      field.focused = false
      !select.select && (field.fixed = false)
    })
    popup.addEventListener('closed', () => container.style.removeProperty('min-width'))
    select.onUpdate = () => {
      if (!select.select) {
        field.fixed = false
        view.textContent = ''
        return
      }
      field.fixed = true
      view.textContent = select.select.textContent
    }
    select.onSelect = popup.close
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
        show: popup.show.bind(popup),
        toggle: popup.toggle.bind(popup),
        close: popup.close.bind(popup)
      },
      props: {
        label: (value) => label.textContent = value,
        value: (value) => select.value = value,
      }
    }
  }
}) { }

const itemName = 's-picker-item'
const itemProps = {
  selected: false,
  value: ''
}

const itemStyle = /*css*/`
:host{
  display: flex;
  align-items: center;
  height: 40px;
  margin: 0 4px;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  flex-shrink: 0;
  padding: 0 12px;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
:host([selected=true]){
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
}
.text{
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
::slotted(svg),
::slotted(s-icon){
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  fill: currentColor;
  height: 24px;
  width: 24px;
}
:host([selected=true]) ::slotted(svg),
:host([selected=true]) ::slotted(s-icon){
  color: currentColor;
}
::slotted([slot]){
  flex-shrink: 0;
}
::slotted([slot=start]){
  margin-left: -4px;
  margin-right: 8px;
}
::slotted([slot=end]){
  margin-left: 8px;
  margin-right: -4px;
}
`

const itemTemplate = /*html*/`
<slot name="start"></slot>
<div class="text" part="text">
  <slot></slot>
</div>
<slot name="end"></slot>
<s-ripple part="ripple" attached="true" ></s-ripple>
`

export class PickerItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: ['selected'],
  setup() {
    this.addEventListener('click', () => {
      if (this.selected) return
      if (!(this.parentNode instanceof Picker)) return
      this.dispatchEvent(new Event(`${name}:select`, { bubbles: true }))
    })
    return {
      props: {
        selected: () => {
          if (!(this.parentNode instanceof Picker)) return
          this.dispatchEvent(new Event(`${name}:update`, { bubbles: true }))
        }
      }
    }
  }
}) { }

Picker.define(name)
PickerItem.define(itemName)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Picker
    [itemName]: PickerItem
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
