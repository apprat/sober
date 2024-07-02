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
  min-height: 48px;
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
  height: 100%;
}
.trigger{
  display: flex;
  height: 100%;
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
  padding: 0 var(--padding);
  position: relative;
  margin: 0 calc(var(--border-radius) * -1);
  width: 100%;
}
.text::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: var(--border-radius);
  width: calc(100%  - (var(--border-radius)*2));
  border-bottom: solid var(--border-width) var(--border-color);
}
.top{
  position: absolute;
  pointer-events: none;
  left: var(--border-radius);
  top: 0;
  height: 100%;
  width: calc(100%  - (var(--border-radius) * 2));
  display: flex;
}
.top::before,
.top::after{
  content: '';
  border-top: solid var(--border-width) var(--border-color);
  box-sizing: border-box;
}
.top::before{
  width: calc(var(--padding) - var(--border-radius));
}
.top::after{
  flex-grow: 1;
}
.label{
  color: var(--border-color);
  height: 100%;
  display: flex;
  white-space: nowrap;
  width: 0;
  align-items: center;
  transform: translateX(min(calc(var(--padding) - var(--border-radius)), 0px));
  transition: transform .12s;
}
.value:not(:empty)+.top>.label{
  width: auto;
  transform: translateY(-50%) scale(.8571428571428571);
}
svg{
  width: 24px;
  height: 24px;
  fill: var(--s-color-on-surface, #1c1b1f);
  padding: 2px;
  box-sizing: border-box;
  margin-right: -10px;
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
          <div class="label" part="label">
            <span>${props.label}</span>
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
    const setMinWidth = () => value.style.minWidth = `${label.offsetWidth}px`
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
      value.textContent = options[selectedIndex].textContent
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
      mounted: setMinWidth,
      watches: {
        label: (value) => {
          label.textContent = value
          setMinWidth()
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
  pointer-events: none;
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