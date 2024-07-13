import { useElement, JSXAttributes } from './core/element.js'
import { Popup } from './popup.js'
import './scroll-view.js'

const name = 's-picker'
const props = {
  disabled: false,
  label: ''
}

const style = /*css*/`
:host{
  display: inline-grid;
  vertical-align: middle;
  font-size: .875rem;
  --height: 48px;
  --border-radius: 4px;
  --border-color: var(--s-color-outline, #777680);
  --border-width: 1px;
  --padding: 16px;
}
:host([disabled=true]){
  pointer-events: none;
  opacity: .38;
}
.popup{
  display: grid;
}
.trigger{
  display: flex;
  height: var(--height);
  cursor: pointer;
  border-radius: var(--border-radius);
  position: relative;
}
.trigger::before,
.trigger::after{
  content: '';
  height: 100%;
  width: var(--border-radius);
  border: solid var(--border-width) var(--border-color);
  box-sizing: border-box;
  flex-shrink: 0;
}
.trigger::before{
  border-right: none;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
}
.trigger::after{
  border-left: none;
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}
.text{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 0 calc(var(--border-radius) * -1);
}
.text::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: var(--border-radius);
  width: calc(100%  - (var(--border-radius)*2));
  border-bottom: solid var(--border-width) var(--border-color);
}
.content{
  display: flex;
  flex-direction: column;
  height: 100%;
  pointer-events: none;
}
.content>.value{
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin-right: 12px;
  color: var(--s-color-on-surface, #1c1b1f);
}
.content>.label{
  transform: translateY(-100%);
  height: 100%;
  flex-shrink: 0;
  display: flex;
  margin: 0 var(--border-radius);
}
.content>.label::before,
.content>.label::after{
  content: '';
  border-top: solid var(--border-width) var(--border-color);
}
.content>.label::after{
  flex-grow: 1;
}
.content>.label>span{
  height: 100%;
  display: flex;
  align-items: center;
  border-top: solid var(--border-width) var(--border-color);
  transition: transform .12s;
  padding: 0 calc(var(--padding) - var(--border-radius) + 12px) 0 calc(var(--padding) - var(--border-radius));
  color: var(--border-color);
}
.content>.value:not(:empty)+.label>span{
  transform: translateY(-50%) scale(.8571428571428571);
  border-top: none;
  padding: 0;
}
.content>.value:not(:empty)+.label::before{
  width: calc(var(--padding) - var(--border-radius));
}
.content>.value:not(:empty)+.label::after{
  min-width: calc(var(--padding) - var(--border-radius));
}
svg{
  width: 24px;
  height: 24px;
  fill: var(--s-color-on-surface, #1c1b1f);
  padding: 2px;
  box-sizing: border-box;
  flex-shrink: 0;
  position: absolute;
  right: calc(var(--padding) - 12px);
}
.container{
  padding: 8px 0;
}
`

const template = /*html*/ `
<s-popup class="popup">
  <slot slot="trigger" name="trigger">
    <div class="trigger" part="trigger">
      <div class="text">
        <div class="content">
          <div class="value"></div>
          <div class="label">
            <span></span>
          </div>
        </div>
        <svg viewBox="0 -960 960 960" slot="end">
          <path d="M480-360 280-560h400L480-360Z"></path>
        </svg>
      </div>
      <s-ripple attached="true" part="ripple"></s-ripple>
    </div>
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
    const slot = shadowRoot.querySelector('#slot') as HTMLSlotElement
    const label = shadowRoot.querySelector('.label>span') as HTMLDivElement
    const value = shadowRoot.querySelector('.value') as HTMLDivElement
    let options: PickerItem[] = []
    let selectedIndex = -1
    let changed = false
    const update = (target: PickerItem) => {
      if (options.length === 0 || !target.selected) {
        value.textContent = ''
        selectedIndex = -1
        return
      }
      for (const item of options) {
        if (item === target) continue
        if (item.selected) {
          item.removeAttribute('selected')
        }
      }
      selectedIndex = options.indexOf(target)
      value.textContent = options[selectedIndex]?.value === '' ? options[selectedIndex].textContent : options[selectedIndex].value
      if (changed) {
        this.dispatchEvent(new Event('change'))
        changed = false
        popup.dismiss()
      }
    }
    slot.addEventListener('slotchange', () => {
      let target: null | PickerItem = null
      selectedIndex = -1
      options = slot.assignedElements().filter((item) => {
        if (item instanceof PickerItem) {
          if (item.selected) target = item
          return true
        }
      }) as PickerItem[]
      if (target) update(target)
    })
    this.addEventListener('picker-item:update', (event: Event) => {
      event.stopPropagation()
      update(event.target as PickerItem)
    })
    this.addEventListener('picker-item:change', (event: Event) => {
      event.stopPropagation()
      changed = true
    })
    return {
      watches: {
        label: (value) => {
          label.textContent = value
        }
      },
      expose: {
        get options() {
          return options
        },
        get selectedIndex() {
          return selectedIndex
        },
        show: popup.show.bind(popup),
        dismiss: popup.dismiss.bind(popup),
        toggle: popup.toggle.bind(popup)
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
  height: 44px;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0 16px;
}
:host([selected=true]){
  background: var(--s-color-secondary-container, #e5e1e6);
  color: var(--s-color-on-secondary-container, #1c1b1f);
  pointer-events: none;
}
::slotted([slot=start]){
  flex-shrink: 0;
  margin-left: -4px;
  margin-right: 4px;
  color: inherit;
}
::slotted([slot=end]){
  flex-shrink: 0;
  margin-right: -4px;
  margin-left: 4px;
  color: inherit;
}
`

const itemTemplate = /*html*/`
<slot name="start"></slot>
<slot></slot>
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
      if (this.parentNode instanceof Picker) {
        this.dispatchEvent(new Event('picker-item:change', { bubbles: true }))
      }
      this.selected = true
    })
    return {
      watches: {
        selected: () => {
          if (!(this.parentNode instanceof Picker)) return
          this.dispatchEvent(new Event('picker-item:update', { bubbles: true }))
        }
      }
    }
  }
}) { }

Picker.define(name)
PickerItem.define(itemName)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
      [itemName]: Partial<typeof itemProps> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Picker
    [itemName]: PickerItem
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [itemName]: typeof itemProps
  }
}