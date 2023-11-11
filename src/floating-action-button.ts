import { defineElement, html } from './core/element'
import { RippleFragment } from './fragment/ripple'

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  height: 56px;
  width: 56px;
  margin: 16px;
  border-radius: 16px;
  color: var(--s-color-on-primary-container);
  background: var(--s-color-primary-container);
  transition: box-shadow .2s;
  font-size: .875rem;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
  text-transform: capitalize;
  box-shadow: var(--s-elevation-level2);
}
:host([size=small]){
  height: 48px;
  width: 48px;
}
:host([extended=true]){
  padding: 0 16px;
  width: auto;
  height: 56px;
}
:host(:not([extended=true])[size=large]){
  height: 96px;
  width: 96px;
}
:host(:not([extended=true])[size=large]) ::slotted(*){
  width: 36px;
  height: 36px;
  font-size: 36px;
}
::slotted([slot=start]){
  margin: 0 4px 0 0;
}
@media (pointer: coarse){
  :host(:active){
    box-shadow: var(--s-elevation-level4);
  }
}
@media (pointer: fine){
  :host(:hover){
    box-shadow: var(--s-elevation-level4);
  }
}
`

const name = 's-floating-action-button'
const props = {
  size: 'medium' as 'medium' | 'small' | 'large',
  extended: false,
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