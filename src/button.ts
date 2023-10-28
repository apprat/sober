import { defineElement, html } from './core/element'
import { RippleFragment } from './fragment/ripple'

const style = /*css*/`
:host{
  user-select: none;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  display: inline-flex;
  vertical-align: middle;
  border-radius: 20px;
  padding: 0 24px;
  height: 40px;
  text-transform: capitalize;
  position: relative;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  color: var(--s-color-primary);
  background: var(--s-color-surface-container-low);
  transition: box-shadow .2s;
  box-shadow: var(--s-elevation-level1);
}
:host([disabled=true]){
  box-shadow: none !important;
  pointer-events: none !important;
  background: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent) !important;
  color: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent) !important;
}
:host([type=filled]){
  background: var(--s-color-primary);
  color: var(--s-color-on-primary);
  box-shadow: none;
}
:host([type=filled-tonal]){
  background: var(--s-color-secondary-container);
  color: var(--s-color-on-secondary-container);
  box-shadow: none;
}
:host([type=outlined]){
  border: solid 1px var(--s-color-outline);
  background: none;
  box-shadow: none;
  color: var(--s-color-primary);
}
:host([type=outlined][disabled=true]){
  background: none !important;
  border-color: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent);
}
:host([type=text]){
  box-shadow: none;
  background: none;
  color: var(--s-color-primary);
  padding: 0 12px;
}
:host([type=text][disabled=true]){
  background: none !important;
}
::slotted(*){
  color: inherit;
}
::slotted(s-icon){
  width: 18px;
  height: 18px;
}
::slotted([slot=start]){
  margin: 0 4px 0 -8px;
}
:host([type=text]) ::slotted([slot=start]){
  margin: 0 4px 0 -4px;
}
@media (pointer: coarse){
  :host(:active){
    box-shadow: var(--s-elevation-level2);
  }
  :host([type=filled]:active),
  :host([type=filled-tonal]:active){
    box-shadow: var(--s-elevation-level1);
  }
  :host([type=outlined]:active),
  :host([type=text]:active){
    box-shadow: none;
  }
}
@media (pointer: fine){
  :host(:hover){
    box-shadow: var(--s-elevation-level2);
  }
  :host([type=filled]:hover),
  :host([type=filled-tonal]:hover){
    box-shadow: var(--s-elevation-level1);
  }
  :host([type=outlined]:hover),
  :host([type=text]:hover){
    box-shadow: none;
  }
}
`

const name = 's-button'
const props = {
  disabled: false,
  type: 'elevated' as 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text'
}

export default class Component extends defineElement({
  name, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <slot name="start"></slot>
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