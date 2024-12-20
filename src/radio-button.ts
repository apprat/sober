import { useElement } from './core/element.js'
import { Theme } from './page.js'
import './ripple.js'

const name = 's-radio-button'
const props = {
  disabled: false,
  checked: false,
  name: '',
  value: ''
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
  pointer-events: none !important;
}
.container{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  position: relative;
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
.checked{
  position: absolute;
  background: currentColor;
  border-radius: 50%;
  transform: scale(0);
  opacity: 0;
  transition: transform .1s ease-out, opacity .1s ease-out;
}
:host([checked=true]) .checked{
  transform: scale(.4);
  opacity: 1;
}
`

const template = /*html*/`
<div class="container" part="container">
  <svg class="icon" viewBox="0 -960 960 960">
    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
  </svg>
  <div class="icon checked"></div>
  <s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
</div>
<slot></slot>
`

export class RadioButton extends useElement({
  style, template, props, syncProps: true,
  setup() {
    this.addEventListener('click', () => {
      this.checked = true
      if (this.name) {
        document.querySelectorAll<typeof this>(`${this.tagName}[name='${this.name}']`).forEach((item) => {
          if (item === this) return
          item.checked = false
        })
      }
      this.dispatchEvent(new Event('change'))
    })
  }
}) { }

RadioButton.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: RadioButton
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