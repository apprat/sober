import { defineElement, html } from './core/element'
import { RippleFragment } from './fragment/ripple'

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  font-size: .75rem;
  font-weight: 500;
  height: 80px;
  box-sizing: border-box;
  padding: 12px 0 16px 0;
  width: 100%;
  max-width: 80px;
  text-transform: capitalize;
  color: var(--s-color-on-surface-variant);
}
:host([checked=true]){
  color: var(--s-color-on-surface);
  font-weight: 700;
}
.icon{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 64px;
}
.ripple-wrapper{
  border-radius: 16px !important;
  left: auto !important;
}
:host([checked=true]) .ripple-wrapper{
  background: var(--s-color-secondary-container);
}
::slotted([slot=icon]){
  position: relative;
  pointer-events: none;
}
:host([checked=true]) ::slotted([slot=icon]){
  color: var(--s-color-on-secondary-container);
}
::slotted([slot=text]){
  position: relative;
  pointer-events: none;
  margin-top: 4px;
}
`

const name = 's-navigation-bar-item'
const props = {
  checked: false
}

export default class Component extends defineElement({
  name, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <div class="icon">
        ${RippleFragment(this, true)}
          <slot name="icon"></slot>
        </div>
        <slot name="text"></slot>
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