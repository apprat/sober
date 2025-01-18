import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
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
}
.popup{
  display: block;
}
.container{
  padding: 4px 0;
  max-width: 224px;
  min-height: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
::slotted(s-popup-menu[group=start]){
  border-top: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  margin-top: 4px;
  padding-top: 4px;
}
::slotted(s-popup-menu[group=end]){
  border-bottom: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  margin-bottom: 4px;
  padding-bottom: 4px;
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
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const popup = shadowRoot.querySelector('.popup') as Popup
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLSlotElement
    trigger.addEventListener('click', (e) => {
      e.stopPropagation()
      popup.show()
    })
    this.addEventListener(`${name}:click`, (event) => {
      event.stopPropagation()
      popup.close()
    })
    return {
      mounted: () => {
        if (this.parentNode instanceof PopupMenu) popup.setAttribute('align', 'right')
      },
      expose: {
        show: popup.show.bind(popup),
        close: popup.close.bind(popup),
        toggle: popup.toggle.bind(popup)
      }
    }
  }
}) { }

const itemName = 's-popup-menu-item'
const itemProps = {
}

const itemStyle = /*css*/`
:host{
  display: flex;
  align-items: center;
  height: 40px;
  margin: 0 4px;
  padding: 0 12px;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
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
::slotted([slot]){
  flex-shrink: 0;
}
::slotted([slot=start]){
  margin-left: -4px;
  margin-right: 8px;
}
::slotted([slot=end]){
  margin-left: 8px;
  margin-right: -6px;
}
`

const itemTemplate = /*html*/`
<slot name="start"></slot>
<div class="text" part="text">
  <slot></slot>
</div>
<slot name="end"></slot>
<s-ripple attached="true"></s-ripple>
`

export class PopupMenuItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  setup() {
    this.addEventListener('click', () => this.dispatchEvent(new Event(`${name}:click`, { bubbles: true })))
  }
}) { }

PopupMenu.define(name)
PopupMenuItem.define(itemName)

declare global {
  interface HTMLElementTagNameMap {
    [name]: PopupMenu
    [itemName]: PopupMenuItem
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