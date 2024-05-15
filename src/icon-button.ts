import { builder, html } from './core/element.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--s-color-on-surface-variant, #41474d);
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}
:host([disabled=true]){
  pointer-events: none !important;
  color: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 38%, transparent) !important;
}
:host([type=filled]){
  background: var(--s-color-primary, #006495);
  color: var(--s-color-on-primary, #ffffff);
}
:host([type=filled][disabled=true]){
  background: color-mix(in srgb ,var(--s-color-on-surface, #1a1c1e) 12%, transparent) !important;
}
:host([type=filled-tonal]){
  background: var(--s-color-secondary-container, #d4e4f6);
  color: var(--s-color-on-secondary-container, #0d1d29);
}
:host([type=filled-tonal][disabled=true]){
  background: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 12%, transparent) !important;
}
:host([type=outlined]){
  border: solid 1px var(--s-color-outline, #72787e)
}
:host([type=outlined][disabled=true]){
  border-color: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e)) !important;
}
.ripple{
  border-radius: 0;
}
::slotted(*){
  color: inherit;
}
`

const name = 's-icon-button'
const props = {
  disabled: false,
  type: 'standard' as 'standard' | 'filled' | 'filled-tonal' | 'outlined',
}

export class IconButton extends builder({
  name, style, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
        <s-ripple class="ripple" attached="true" centered="true"></s-ripple>
      `
    }
  }
}) { }

IconButton.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: IconButton
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}