import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './core/enum.js'
import './ripple.js'

const name = 's-menu'
const props = {
}

const style = /*css*/`
:host{
  display: flex;
  flex-direction: column;
  font-size: .875rem;
  padding: 4px 0;
}
:host(:nth-of-type(n+2)){
  border-top: solid 1px var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
}
::slotted([slot=label]){
  display: flex;
  align-items: center;
  height: 44px;
  margin: -4px 20px;
  font-size: .75rem;
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
}
`

const template = /*html*/`
<slot name="label"></slot>
<slot></slot>
`

export class Menu extends useElement({
  style, template, props,
  setup() {
  }
}) { }

const itemName = 's-menu-item'
const itemProps = {
  checked: false
}

const itemStyle = /*css*/`
:host{
  display: flex;
  align-items: center;
  height: 40px;
  margin: 4px 8px;
  flex-shrink: 0;
  border-radius: 24px;
  cursor: pointer;
  position: relative;
  padding: 0 20px;
}
:host([checked=true]){
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
}
:host([checked=true]) ::slotted(svg){
  fill: currentColor;
}
.text{
  flex-grow: 1;
  white-space: nowrap;
  display: flex;
  align-items: center;
}
::slotted(svg){
  fill: var(--s-color-on-surface-variant, #46464f);
}
::slotted([slot]){
  height: 24px;
  width: 24px;
  flex-shrink: 0;
}
::slotted([slot=start]){
  margin-left: -4px;
  margin-right: 12px;
}
::slotted([slot=end]){
  margin-right: -8px;
  margin-left: 12px;
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

export class MenuItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: ['checked']
}) { }

Menu.define(name)
MenuItem.define(itemName)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
      [itemName]: Partial<typeof itemProps> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Menu
    [itemName]: MenuItem
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [itemName]: typeof itemProps
  }
}