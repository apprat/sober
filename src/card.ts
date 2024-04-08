import { builder, html } from './core/element.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  min-width: 192px;
  background: var(--s-color-surface-container-low, #f3f3f6);
  box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
  border-radius: var(--s-shape-corner-medium, 12px);
  position: relative;
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
`

const name = 's-card'
const props = {
  type: 'elevated' as 'elevated' | 'filled' | 'outlined'
}

export default class Component extends builder({
  name, style, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <slot></slot>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}