import { defineElement, html } from './core/element'
import { RippleFragment } from './fragment/ripple'

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 48px;
  position: relative;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 500;
  text-transform: capitalize;
  padding: 0 16px;
  overflow: hidden;
}
:host([checked=true]){
  color: var(--s-color-primary);
  pointer-events: none;
}
::slotted(*){
  pointer-events: none;
}
::slotted([slot=icon]){
  height: 36px;
  align-items: end;
}
::slotted([slot=icon]:only-child){
  height: 24px;
  align-items: center;
}
::slotted([slot=text]){
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
  height: 26px;
  margin-top: 1px;
}
::slotted([slot=text]:only-child){
  height: auto;
  margin-top: 0;
}
`

const name = 's-tab-item'
const props = {
  checked: false
}

export default class Component extends defineElement({
  name, props, propSyncs: true,
  setup() {
    return {
      render: () => html`
        <style>${style}</style>
        <slot name="icon"></slot>
        <slot name="text"></slot>
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