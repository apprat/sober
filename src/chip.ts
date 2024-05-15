import { builder, html } from './core/element.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  padding: 0 16px;
  height: 32px;
  border: solid 1px var(--s-color-color-outline, #79747E);
  border-radius: 8px;
  box-sizing: border-box;
  font-size: .875rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
:host([type=elevated]){
  border: none;
  box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
}
:host([type=filled-tonal]){
  background: var(--s-color-secondary-container, #d4e4f6);
  color: var(--s-color-on-surface-variant, #41474d);
  border: none;
}
.ripple{
  display: none;
  border-radius: 0;
}
:host([clickable=true]) .ripple{
  display: block;
}
::slotted(*){
  width: 18px;
  height: 18px;
}
::slotted([slot=start]){
  margin: 0 8px 0 -8px;
}
::slotted([slot=end]){
  margin: 0 -8px 0 8px;
}
::slotted(s-icon-button[slot=action]){
  margin: 0 -12px 0 8px;
  width: 24px;
  height: 24px;
  padding: 3px;
  flex-shrink: 0;
}
`

const name = 's-chip'
const props = {
  type: 'outlined' as 'outlined' | 'elevated' | 'filled-tonal',
  clickable: false
}

export class Chip extends builder({
  name, style, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
        <slot name="action" @pointerdown.stop></slot>
        <s-ripple class="ripple" attached="true"></s-ripple>
      `
    }
  }
}) { }

Chip.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Chip
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}