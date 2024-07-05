import { useElement, JSXAttributes } from './core/element.js'
import './ripple.js'

const name = 's-card'
const props = {
  type: 'elevated' as 'elevated' | 'filled' | 'outlined',
  clickable: false
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  background: var(--s-color-surface-container-low, #f6f2f7);
  box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .1));
  border-radius: 12px;
  position: relative;
  font-size: .875rem;
  box-sizing: border-box;
  max-width: 280px;
  color: var(--s-color-on-surface, #1c1b1f);
  overflow: hidden;
}
:host([type=filled]){
  background: var(--s-color-surface-container-highest, #e5e1e6);
  box-shadow: none;
}
:host([type=outlined]){
  background: var(--s-color-surface, #fffbff);
  border: solid 1px var(--s-color-outline-variant, #c7c5d0);
  box-shadow: none;
}
:host([clickable=true]){
  cursor: pointer;
  transition: box-shadow .12s;
}
:host([clickable=true]) .ripple{
  display: block;
}
.action{
  display: flex;
  justify-content: flex-end;
}
.ripple{
  display: none;
  border-radius: 0;
}
::slotted([slot=image]){
  display: block;
  height: 128px;
  background: var(--s-color-surface-container-high, #eae7ec);
}
::slotted([slot=headline]){
  font-size: 1.5rem;
  line-height: 1.6;
  margin: 16px 16px 0 16px;
}
::slotted([slot=subhead]){
  font-size: 1rem;
  line-height: 1.6;
  margin: 4px 16px;
}
::slotted([slot=text]){
  line-height: 1.6;
  margin: 8px 16px;
  color: var(--s-color-on-surface-variant, #46464f);
}
::slotted(s-button[slot=action]){
  margin: 16px 4px;
}
::slotted(s-button[slot=action]:last-of-type){
  margin-right: 16px;
}
@media (pointer: fine){
  :host([clickable=true][type=filled]:hover),
  :host([clickable=true][type=outlined]:hover){
    box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .1));
  }
  :host([clickable=true]:hover){
    box-shadow: var(--s-elevation-level2, 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
  }
}
`

const template = /*html*/`
<slot name="start"></slot>
<slot name="image"></slot>
<slot name="headline"></slot>
<slot name="subhead"></slot>
<slot name="text"></slot>
<slot></slot>
<div class="action" part="action">
  <slot name="action"></slot>
</div>
<slot name="end"></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`

export class Card extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const action = shadowRoot.querySelector('slot[name=action]') as HTMLElement
    action.addEventListener('pointerdown', (e) => e.stopPropagation())
  }
}) { }

Card.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Card
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}