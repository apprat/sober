import { builder, html } from './core/element.js'
import './ripple.js'

const style = /*css*/`
:host{
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
  background: var(--s-color-primary,#6750a4);
  color: var(--s-color-on-primary,#ffffff);
  transition: box-shadow .2s;
}
:host([disabled=true]){
  box-shadow: none !important;
  pointer-events: none !important;
  background: color-mix(in srgb ,var(--s-color-on-surface,#1d1b20) 12%, transparent) !important;
  color: color-mix(in srgb ,var(--s-color-on-surface,#1d1b20) 38%, transparent) !important;
}
:host([type=elevated]){
  background: var(--s-color-surface-container-low,#f7f2fa);
  color: var(--s-color-primary,#6750a4);
  box-shadow: var(--s-elevation-level1,0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
}
:host([type=filled-tonal]){
  background: var(--s-color-secondary-container,#e8def8);
  color: var(--s-color-on-secondary-container,#1d192b);
}
:host([type=outlined]){
  border: solid 1px var(--s-color-outline,#79747e);
  background: none;
  color: var(--s-color-primary,#6750a4);
}
:host([type=outlined][disabled=true]){
  background: none !important;
  border-color: color-mix(in srgb ,var(--s-color-on-surface,#1d1b20) 12%, transparent);
}
:host([type=text]){
  background: none;
  color: var(--s-color-primary,#6750a4);
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
  :host([type=elevated]:active){
    box-shadow: var(--s-elevation-level2,0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
  }
  :host(:active),
  :host([type=filled-tonal]:active){
    box-shadow: var(--s-elevation-level1,0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
  }
  :host([type=outlined]:active),
  :host([type=text]:active){
    box-shadow: none;
  }
}
@media (pointer: fine){
  :host([type=elevated]:hover){
    box-shadow: var(--s-elevation-level2,0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
  }
  :host(:hover),
  :host([type=filled-tonal]:hover){
    box-shadow: var(--s-elevation-level1,0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
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
  type: 'filled' as 'filled' | 'elevated' | 'filled-tonal' | 'outlined' | 'text'
}

export default class Component extends builder({
  name, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <slot name="start"></slot>
        <slot></slot>
        <s-ripple attached="true"></s-ripple>
      `
    }
  }
}) { }

Component.define()

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
