import { builder, html } from './core/element.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  background: var(--s-color-surface-container-low, #f3f3f6);
  box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .1));
  border-radius: 12px;
  position: relative;
  font-size: .875rem;
  box-sizing: border-box;
  max-width: 280px;
  color: var(--s-color-on-surface, #1a1c1e);
  overflow: hidden;
}
:host([type=filled]){
  background: var(--s-color-surface-container-highest, #e2e2e5);
  box-shadow: none;
}
:host([type=outlined]){
  background: var(--s-color-surface, #fcfcff);
  border: solid 1px var(--s-color-outline-variant, #c1c7ce);
  box-shadow: none;
}
:host([clickable=true]){
  cursor: pointer;
  transition: box-shadow .2s;
}
:host([clickable=true]) .ripple{
  display: block;
}
.action{
  display: flex;
  justify-content: flex-end;
  padding: 0 12px;
}
.ripple{
  display: none;
  border-radius: 0;
}
::slotted([slot=image]){
  display: block;
  height: 128px;
  background: var(--s-color-surface-container-high, #e8e8eb);
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
  color: var(--s-color-on-surface-variant, #41474d);
}
::slotted(s-button[slot=action]){
  margin: 16px 4px;
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

const name = 's-card'
const props = {
  type: 'elevated' as 'elevated' | 'filled' | 'outlined',
  clickable: false
}

export default class Card extends builder({
  name, style, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <slot name="start"></slot>
        <slot name="image"></slot>
        <slot name="headline"></slot>
        <slot name="subhead"></slot>
        <slot name="text"></slot>
        <slot></slot>
        <div class="action">
          <slot name="action" @mousedown="${(event: MouseEvent) => event.stopPropagation()}"></slot>
        </div>
        <slot name="end"></slot>
        <s-ripple class="ripple" attached="true"></s-ripple>
      `
    }
  }
}) { }

Card.define()

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