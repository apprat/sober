import { builder, html } from './core/element'
import './ripple'

const style = /*css*/`
:host{
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--s-color-on-surface,#191c1e);
  height: 40px;
  text-transform: capitalize;
  font-weight: 500;
  font-size: .875rem;
  border: solid 1px var(--s-color-outline,#70787d);
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
  background: var(--s-color-secondary-container,#cfe6f2);
  color: var(--s-color-on-secondary-container,#081e27);
}
:host([disabled=true]){
  pointer-events: none;
  border-top-color: color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 12%, transparent);
  border-bottom-color: color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 12%, transparent);
  color: color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 38%, transparent);
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
  name, props, propSyncs: true,
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
        <style>${style}</style>
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