import { useElement, JSXAttributes } from './core/element.js'
import { Popup } from './popup.js'
import './ripple.js'
import './scroll-view.js'

const name = 's-popup-menu'
const props = {
  group: '' as 'start' | 'end' | ''
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  font-size: .875rem;
  color: var(--s-color-on-surface, #1c1b1f);
}
.popup{
  display: block;
}
.container{
  padding: 8px 0;
  max-width: 224px;
  min-height: auto;
  box-sizing: border-box;
}
::slotted(s-popup-menu){
  display: block;
}
::slotted(s-popup-menu[group=start]){
  border-top: solid 1px var(--s-color-outline-variant, #c7c5d0);
  margin-top: 8px;
  padding-top: 8px;
}
::slotted(s-popup-menu[group=end]){
  border-bottom: solid 1px var(--s-color-outline-variant, #c7c5d0);
  margin-bottom: 8px;
  padding-bottom: 8px;
}
`

const template = /*html*/`
<s-popup class="popup">
  <slot slot="trigger" name="trigger"></slot>
  <s-scroll-view class="container" part="container">
    <slot></slot>
  </s-scroll-view>
</s-popup>
`

export class PopupMenu extends useElement({
  style, template, props, syncProps: ['group'],
  setup(shadowRoot) {
    const popup = shadowRoot.querySelector('.popup') as Popup
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLSlotElement
    const show = popup.show.bind(popup)
    const dismiss = popup.dismiss.bind(popup)
    const toggle = popup.toggle.bind(popup)
    trigger.addEventListener('click', (e) => {
      e.stopPropagation()
      show()
    })
    this.addEventListener('menu-item:click', (event) => {
      event.stopPropagation()
      dismiss()
    })
    return {
      mounted: () => {
        if (this.parentNode instanceof PopupMenu) popup.setAttribute('showalign', 'right')
      },
      expose: { show, dismiss, toggle }
    }
  }
}) { }

const itemName = 's-popup-menu-item'
const itemProps = {
}

const itemStyle = /*css*/`
:host{
  display: block;
  height: 44px;
}
.container{
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  position: relative;
}
.text{
  flex-grow: 1;
  padding: 0 16px;
}
::slotted([slot=start]){
  flex-shrink: 0;
  margin-left: 16px;
  margin-right: -4px;
}
::slotted([slot=end]){
  flex-shrink: 0;
  margin-right: 8px;
}
`

const itemTemplate = /*html*/`
<s-ripple class="container" part="container">
  <slot name="start"></slot>
  <div class="text" part="text">
    <slot></slot>
  </div>
  <slot name="end"></slot>
</s-ripple>
`

export class PopupMenuItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLElement
    container.addEventListener('click', () => this.dispatchEvent(new Event('menu-item:click', { bubbles: true })))
  }
}) { }

PopupMenu.define(name)
PopupMenuItem.define(itemName)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
      [itemName]: Partial<typeof itemProps> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: PopupMenu
    [itemName]: PopupMenuItem
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [itemName]: typeof itemProps
  }
}