import { builder, html, ref } from './core/element.js'
import './ripple.js'

const style = /*css*/`
:host{
  flex-shrink: 0;
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
  width: 100%;
  max-width: 80px;
  text-transform: capitalize;
  color: var(--s-color-on-surface-variant,#40484c);
  transition: color .2s;
}
:host([checked=true]){
  color: var(--s-color-primary,#006783);
}
.icon{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  width: 48px;
  border-radius: 16px;
}
.icon::before{
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  left: 0;
  top: 0;
  transform: scale(0);
  transition: transform .2s;
  background: var(--s-color-secondary-container);
}
:host([checked=true]) .icon::before{
  transform: scale(1);
}
.badge{
  background: var(--s-color-error, #ba1a1a);
  color: var(--s-color-on-error, #ffffff);
  position: absolute;
  right: 16px;
  top: 12px;
  padding: 3px 6px;
  border-radius: 12px;
  font-size: .625rem;
}
.badge:empty{
  display: none;
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

const name = 's-navigation-rail-item'
const props = {
  checked: false,
  badge: ''
}

export default class Component extends builder({
  name, props, propSyncs: true,
  setup() {
    const badge = ref()
    this.addEventListener('click', () => this.checked = true)
    return {
      watches: {
        checked: () => {
          if (!this.parentNode) return
          this.dispatchEvent(new Event('item:change', { bubbles: true }))
        },
        badge: (value) => badge.target.textContent = value
      },
      render: () => html`
        <style>${style}</style>
        <div class="icon">
          <slot name="icon"></slot>
        </div>
        <slot name="text"></slot>
        <div class="badge" ref="${badge}"></div>
        <s-ripple attached="true" class="ripple"></s-ripple>
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