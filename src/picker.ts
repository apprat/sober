import { useElement, JSXAttributes } from './core/element.js'
import { Popup } from './popup.js'
import './ripple.js'
import './scroll-view.js'

const name = 's-picker'
const props = {
  disabled: false,
  label: ''
}

const style = /*css*/`
:host{
  display: inline-block;
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
.trigger{
  color: var(--s-color-on-surface, #1c1b1f);
  display: flex;
  align-items: center;
  height: var(--height);
  position: relative;
  cursor: pointer;
  border-radius: var(--border-radius);
}
.trigger::before,
.trigger::after{
  content: '';
  width: var(--border-radius);
  height: 100%;
  box-sizing: border-box;
  border-radius: var(--border-radius);
  border: solid var(--border-width) var(--border-color);
}
.trigger::before{
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}
.trigger::after{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}
.text{
  display: flex;
  height: var(--height);
  align-items: center;
  position: relative;
  padding: 0 var(--padding, 16px);
  color: var(--s-color-on-surface, #1c1b1f);
  white-space: nowrap;
  margin: 0 calc(var(--border-radius) * -1);
}
.text::before{
  position: absolute;
  left: var(--border-radius);
  bottom: 0;
  content: '';
  width: calc(100% - (var(--border-radius) * 2));
  box-sizing: border-box;
  border-bottom: solid var(--border-width) var(--border-color);
}
.top{
  pointer-events: none;
  height: 100%;
  display: flex;
}
.top::after,
.top::before{
  position: absolute;
  left: var(--border-radius);
  top: 0;
  width: calc(100%  - (var(--border-radius)*2));
  content: '';
  border-top: solid var(--border-width) var(--border-color);
}
.top::after{
  content: none;
}
.label{
  color: var(--border-color);
  display: flex;
  align-items: center;
  transition: transform .12s;
}
.label:empty{
  display: none;
}
.value:not(:empty)+.top{
  position: absolute;
  left: var(--border-radius);
  top: 0;
  width: calc(100%  - (var(--border-radius)*2));
}
.value:not(:empty)+.top::before,
.value:not(:empty)+.top::after{
  content: '';
  position: static;
}
.value:not(:empty)+.top::before{
  width: calc(var(--padding) - var(--border-radius) - 4px);
  flex-shrink: 0;
}
.value:not(:empty)+.top::after{
  flex-grow: 1;
}
.value:not(:empty)+.top>.label{
  transform: translateY(-50%) scale(.8571428571428571);
}
svg{
  width: 24px;
  height: 24px;
  fill: currentColor;
  padding: 2px;
  box-sizing: border-box;
  margin-right: -8px;
  flex-shrink: 0;
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
        <div class="value"></div>
        <div class="top">
          <div class="label">${props.label}</div>
        </div>
        <svg viewBox="0 -960 960 960" slot="end">
          <path d="M480-360 280-560h400L480-360Z"></path>
        </svg>
      </div>
      <s-ripple attached="true" ></s-ripple>
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
    const label = shadowRoot.querySelector('.label') as HTMLDivElement
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
      value.textContent = options[selectedIndex].textContent!
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
        show: () => popup.show(),
        dismiss: () => popup.dismiss()
      }
    }
  }
}) { }

const itemName = 's-picker-item'
const itemProps = {
  selected: false
}

const itemStyle = /*css*/`
:host{
  display: flex;
  height: 44px;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  padding: 0 16px;
}
:host([selected=true]){
  background: var(--s-color-surface-container-highest, #e5e1e6);
}
`

const itemTemplate = /*html*/`
<slot></slot>
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