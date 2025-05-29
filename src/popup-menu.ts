import { useElement, useProps } from './core/element.js'
import { Theme } from './core/theme.js'
import { Popup } from './popup.js'
import './ripple.js'
import './scroll-view.js'

const name = 's-popup-menu'
const props = useProps({
  group: ['', 'start', 'end']
})

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
  box-sizing: border-box;
  padding: 4px 0;
  max-width: 224px;
  min-height: auto;
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
  style, template, props,
  setup(shadowRoot) {
    const popup = shadowRoot.querySelector<Popup>('.popup')!
    const trigger = shadowRoot.querySelector<HTMLSlotElement>('slot[name=trigger]')!
    trigger.onclick = (event) => {
      event.stopPropagation()
      popup.show()
    }
    this.addEventListener(`${name}:click`, (event) => {
      event.stopPropagation()
      popup.close()
    })
    popup.onclose = (event) => {
      const target = event.target as Popup
      if (target.parentNode instanceof ShadowRoot) {
        const parent = target.parentNode.host
        if (parent.parentNode instanceof PopupMenu) {
          parent.parentNode.close()
        }
      }
    }
    return {
      onMounted: () => {
        this.parentNode instanceof PopupMenu && popup.setAttribute('align', 'right')
      },
      expose: {
        get show() {
          return popup.show
        },
        get toggle() {
          return popup.toggle
        },
        get close() {
          return popup.close
        }
      }
    }
  }
}) { }

const itemName = 's-popup-menu-item'

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
::slotted(:is(svg, s-icon)){
  fill: currentColor;
  height: 24px;
  width: 24px;
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
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
        [itemName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & PopupMenu
    [itemName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes
    } & PopupMenuItem
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props>
      //@ts-ignore
      [itemName]: IntrinsicElements['div']
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [itemName]: JSX.HTMLAttributes<HTMLElement>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [itemName]: JSXInternal.HTMLAttributes<HTMLElement>
    }
  }
}