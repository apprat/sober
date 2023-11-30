import { builder, html } from './core/element'
import './ripple'

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
  color: var(--s-color-on-surface-variant,#40484c);
  position: relative;
  box-sizing: border-box;
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 38%, transparent) !important;
}
:host([type=filled]){
  background: var(--s-color-primary,#006783);
  color: var(--s-color-on-primary,#ffffff);
}
:host([type=filled][disabled=true]){
  background: color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 12%, transparent) !important;
}
:host([type=filled-tonal]){
  background: var(--s-color-secondary-container,#cfe6f2);
  color: var(--s-color-on-secondary-container,#081e27);
}
:host([type=filled-tonal][disabled=true]){
  background: color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 12%, transparent) !important;
}
:host([type=outlined]){
  border: solid 1px var(--s-color-outline,#70787d);
}
:host([type=outlined][disabled=true]){
  background: none !important;
  border-color: color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 12%, transparent);
}
`

const name = 's-icon-button'
const props = {
  disabled: false,
  type: 'standard' as 'standard' | 'filled' | 'filled-tonal' | 'outlined',
}

export default class Component extends builder({
  name, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
        <s-ripple attached="true" centered="true"></s-ripple>
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