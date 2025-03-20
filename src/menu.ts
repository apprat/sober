import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
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
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
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

class SMenu extends useElement({
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
  margin: 4px 8px 4px 0;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
.container{
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: 0 24px 24px 0;
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
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin: 0 -8px 0 0;
}
.menu{
  display: block;
  padding-top: 8px;
}
::slotted(svg),
::slotted(s-icon){
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  fill: currentColor;
  height: 24px;
  width: 24px;
}
:host([checked=true]) ::slotted(svg),
:host([checked=true]) ::slotted(s-icon){
  color: currentColor;
}
::slotted([slot]){
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
::slotted([slot=menu]){
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
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

class SMenuItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: true,
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
      folded: (value) => fold.folded = value
    }
  }
}) { }

SMenu.define(name)
SMenuItem.define(itemName)

export { SMenu as Menu, SMenuItem as MenuItem }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SMenu
    [itemName]: SMenuItem
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
    }
  }
}

