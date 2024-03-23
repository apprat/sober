import { builder, html } from './core/element.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--s-color-on-surface, #1a1c1e);
  height: 40px;
  text-transform: capitalize;
  font-weight: 500;
  font-size: .875rem;
  border: solid 1px var(--s-color-outline, #72787e);
  position: relative;
  cursor: pointer;
}
:host(:first-child){
  border-radius: 20px 0 0 20px;
}
:host(:last-child){
  border-radius: 0 20px 20px 0;
}
:host(:not(:last-child)){
  border-right: none;
}
:host([checked=true]){
  background: var(--s-color-secondary-container, #d4e4f6);
  color: var(--s-color-on-secondary-container, #0d1d29);
}
:host([disabled=true]){
  pointer-events: none;
  border-top-color: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 12%, transparent);
  border-bottom-color: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 12%, transparent);
  color: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 38%, transparent);
}
:host([disabled=true]:not(:last-child)){
  margin-left: -1px;
}
::slotted(s-icon){
  width: 18px;
  height: 18px;
  margin-right: 4px;
  flex-shrink: 0;
  pointer-events: none;
}
`

const name = 's-segmented-button-item'
const props = {
  checked: false,
  disabled: false
}

export default class Component extends builder({
  name, style, props, propSyncs: true,
  setup() {
    this.addEventListener('click', () => this.checked = true)
    return {
      watches: {
        checked: () => {
          if (!this.parentNode) return
          this.dispatchEvent(new Event('item:change', { bubbles: true }))
        }
      },
      render: () => html`
        <s-ripple attached="true"></s-ripple>
        <slot name="start"></slot>
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