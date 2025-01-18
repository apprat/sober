import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import './ripple.js'

const name = 's-checkbox'
const props = {
  disabled: false,
  checked: false,
  indeterminate: false
}

const style = /*css*/`
:host{
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  white-space: nowrap;
  height: 40px;
  flex-shrink: 0;
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
:host([checked=true]){
  color: var(--s-color-primary, ${Theme.colorPrimary});
}
:host([disabled=true]){
  pointer-events: none;
}
.container{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
}
:host([disabled=true]) .container{
  color: var(--s-color-on-surface, ${Theme.colorOnSurface}) !important;
  opacity: .38 !important;
}
.icon{
  width: 60%;
  height: 60%;
  fill: currentColor;
}
.checked,
.indeterminate{
  position: absolute;
  transform: scale(.5);
  opacity: 0;
  transition: transform .1s ease-out, opacity .1s ease-out;
}
:host([checked=true]:not([indeterminate=true])) .checked,
:host([indeterminate=true]) .indeterminate{
  opacity: 1;
  transform: scale(1);
}
`

const template = /*html*/`
<div class="container" part="container">
  <svg class="icon uncheck" viewBox="0 -960 960 960">
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"></path>
  </svg>
  <svg class="icon checked" viewBox="0 -960 960 960">
    <path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"></path>
  </svg>
  <svg class="icon indeterminate" viewBox="0 -960 960 960">
    <path d="M280-440h400v-80H280v80Zm-80 320q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"></path>
  </svg>
  <s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
</div>
<slot></slot>
`

export class Checkbox extends useElement({
  style, template, props, syncProps: true,
  setup() {
    this.addEventListener('click', () => {
      if (this.indeterminate) this.indeterminate = false
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
  }
}) { }

Checkbox.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Checkbox
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}