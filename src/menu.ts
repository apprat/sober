import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'
import { Fold } from './fold.js'
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
  flex-shrink: 0;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
:host(:nth-of-type(n+2)){
  border-top: solid 1px var(--s-color-surface-variant, ${Theme.colorSurfaceVariant});
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
  checked: false,
  folded: true
}

const itemStyle = /*css*/`
:host{
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 4px 8px;
}
.container{
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: 24px;
  padding: 0 20px;
  flex-shrink: 0;
}
:host([checked=true]) .container{
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  color: var(--s-color-on-secondary-container, ${Theme.colorOnSecondaryContainer});
}
.text{
  flex-grow: 1;
  white-space: nowrap;
  display: flex;
  align-items: center;
}
.toggle-icon{
  width: 24px;
  height: 24px;
  display: none;
  margin-right: -8px;
  margin-left: 12px;
  transform: rotate(-90deg);
  transition: transform .2s ease-out;
  fill: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
.show-menu .toggle-icon{
  display: block;
}
:host([folded=false]) .toggle-icon{
  transform: rotate(0deg);
}
.fold{
  flex-shrink: 0;
}
.show-menu+.fold{
  margin: 0 -8px;
}
.menu{
  display: block;
  padding-top: 8px;
}
::slotted([slot=start]),
::slotted([slot=end]){
  height: 24px;
  width: 24px;
  flex-shrink: 0;
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  fill: currentColor;
}
::slotted([slot=start]){
  margin-left: -4px;
  margin-right: 12px;
}
::slotted([slot=end]){
  margin-right: -8px;
  margin-left: 12px;
}
:host([checked=true]) ::slotted([slot=start]),
:host([checked=true]) ::slotted([slot=end]){
  color: currentColor;
}
::slotted([slot=menu]){
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
}
`

const itemTemplate = /*html*/`
<s-ripple class="container" part="container">
  <slot name="start"></slot>
  <div class="text" part="text">
    <slot></slot>
  </div>
  <slot name="end">
    <svg viewBox="0 -960 960 960" class="toggle-icon">
      <path d="M480-360 280-560h400L480-360Z"></path>
    </svg>
  </slot>
</s-ripple>
<s-fold class="fold" part="fold" folded="${itemProps.folded}">
  <slot name="menu" class="menu"></slot>
</s-fold>
`

export class MenuItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: ['checked', 'folded'],
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container')!
    const fold = shadowRoot.querySelector('.fold') as Fold
    const menu = shadowRoot.querySelector('slot[name=menu]') as HTMLSlotElement
    fold.addEventListener('click', (event) => event.stopPropagation())
    menu.addEventListener('slotchange', () => container.classList[menu.assignedElements().length > 0 ? 'add' : 'remove']('show-menu'))
    container.addEventListener('click', () => {
      if (!container.classList.contains('show-menu')) return
      this.folded = !this.folded
    })
    return {
      props: {
        folded: (value) => fold.folded = value
      }
    }
  }
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