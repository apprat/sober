import { builder, html } from './core/element.js'
import './ripple.js'

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  cursor: pointer;
  position: relative;
  color: var(--s-color-on-surface-variant,#40484c);
}
:host([disabled=true]){
  pointer-events: none;
}
:host([checked=true]){
  color: var(--s-color-primary,#006783);
}
.track{
  display: flex;
  align-items: center;
  width: 52px;
  height: 32px;
  border-radius: 20px;
  box-shadow: 0 0 0 2px inset var(--s-color-outline,#70787d);
  position: relative;
}
:host([checked=true]) .track{
  background: var(--s-color-primary,#006783);
  box-shadow: none;
}
:host([disabled=true]) .track{
  background: color-mix(in srgb ,var(--s-color-surface-container-highest,#e6e0e9) 12%, transparent);
  box-shadow: 0 0 0 2px inset color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 12%, transparent);
}
:host([checked=true][disabled=true]) .track{
  background: color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 12%, transparent);
  box-shadow: none;
}
.thumb{
  background: var(--s-color-outline,#70787d);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  transform: scale(1) translateX(8px);
  transition: transform .2s,box-shadow .2s;
  transform-origin: left;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
:host([checked=true]) .thumb{
  background: var(--s-color-on-primary,#ffffff);
  transform: scale(1.5) translateX(16px);
  box-shadow: var(--s-elevation-level1,0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
}
:host([disabled=true]) .thumb{
  background: color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 38%, transparent);
  box-shadow: none;
}
:host([checked=true][disabled=true]) .thumb{
  background: var(--s-color-surface,#fbfcfe);
}
.icon{
  width: 12px;
  height: 12px;
  fill: var(--s-color-primary,#006783);
  opacity: 0;
  transition: opacity .2s;
}
:host([checked=true]) .icon{
  opacity: 1;
}
:host([checked=true][disabled=true]) .icon{
  fill: color-mix(in srgb ,var(--s-color-on-surface,#191c1e) 12%, transparent);
}
.ripple{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: auto;
  transition: transform .2s;
  transform: translateX(-4px);
}
:host([checked=true]) .ripple{
  transform: translateX(16px);
}
`

const name = 's-switch'
const props = {
  disabled: false,
  checked: false
}

export default class Component extends builder({
  name, props, propSyncs: true,
  setup() {
    this.addEventListener('click', () => {
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
    return {
      render: () => html`
        <style>${style}</style>
        <div class="track">
          <div class="thumb">
            <svg class="icon" viewBox="0 -960 960 960">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z">
              </path>
            </svg>
          </div>
        </div>
        <s-ripple attached="true" centered="true" class="ripple"></s-ripple>
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