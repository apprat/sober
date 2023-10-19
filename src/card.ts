import { defineElement, html } from './core/element'
import { RippleFragment } from './fragment/ripple'

const style = /*css*/`
:host{
  display: block;
  background: var(--s-color-surface-container-low);
  box-shadow: var(--s-elevation-level1);
  transition: box-shadow .2s;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
}
:host([disabled=true]){
  pointer-events: none;
  opacity: .38;
}
:host([type=filled]){
  background: var(--s-color-surface-container-highest);
  box-shadow: none;
}
:host([type=outlined]){
  background: var(--s-color-surface);
  border: solid 1px var(--s-color-outline-variant);
  box-shadow: none;
}
@media (pointer: coarse){
  :host(:active){
    box-shadow: var(--s-elevation-level2);
  }
  :host([type=filled]:active),
  :host([type=outlined]:active){
    box-shadow: var(--s-elevation-level1);
  }
}
@media (pointer: fine){
  :host(:hover){
    box-shadow: var(--s-elevation-level2);
  }
  :host([type=filled]:hover),
  :host([type=outlined]:hover){
    box-shadow: var(--s-elevation-level1);
  }
}
`

const name = 's-card'
const props = {
  disabled: false,
  type: 'elevated' as 'elevated' | 'filled' | 'outlined'
}

export default class Component extends defineElement({
  name, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <slot></slot>
        ${RippleFragment(this)}
      `
    }
  }
}) { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}