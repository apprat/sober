import { builder, html } from './core/element.js'
import './ripple.js'

const style = /*css*/`
:host{
  display: block;
  background: var(--s-color-surface-container-low,#f7f2fa);
  box-shadow: var(--s-elevation-level1,0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
  border-radius: 12px;
  position: relative;
}
:host([type=filled]){
  background: var(--s-color-surface-container-highest,#e6e0e9);
  box-shadow: none;
}
:host([type=outlined]){
  background: var(--s-color-surface,#fbfcfe);
  border: solid 1px var(--s-color-outline-variant,#dce4e9);
  box-shadow: none;
}
`

const name = 's-card'
const props = {
  type: 'elevated' as 'elevated' | 'filled' | 'outlined'
}

export default class Component extends builder({
  name, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <slot></slot>
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