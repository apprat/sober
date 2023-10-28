import { defineElement, html } from './core/element'
import { RippleFragment } from './fragment/ripple'

const style = /*css*/`
:host{
  display: block;
  background: var(--s-color-surface-container-low);
  box-shadow: var(--s-elevation-level1);
  border-radius: 12px;
  position: relative;
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
`

const name = 's-card'
const props = {
  type: 'elevated' as 'elevated' | 'filled' | 'outlined'
}

export default class Component extends defineElement({
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