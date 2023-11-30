import { builder, html } from './core/element'
import './ripple'

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
  color: var(--s-color-on-surface-variant,#40484c);
  transition: font-weight .2s;
}
:host([checked=true]){
  color: var(--s-color-primary,#006783);
  font-weight: 600;
}
.icon{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 64px;
}
::slotted([slot=icon]){
  position: relative;
  pointer-events: none;
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
        <div class="icon">
          <slot name="icon"></slot>
        </div>
        <slot name="text"></slot>
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