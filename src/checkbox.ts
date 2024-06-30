import { useElement, JSXAttributes } from './core/element.js'
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
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  width: 40px;
  aspect-ratio: 1;
  border-radius: 50%;
  color: var(--s-color-primary, #5256a9);
}
:host([disabled=true]){
  pointer-events: none !important;
}
.icon{
  width: 60%;
  height: 60%;
  fill: currentColor;
}
.color{
  color: var(--s-color-on-surface-variant, #46464f);
}
:host([checked=true]) .color,
:host([indeterminate=true]) .color{
  color: currentColor;
}
:host([disabled=true]) .color{
  color: color-mix(in srgb ,var(--s-color-on-surface, #1c1b1f) 38%, transparent) !important;
}
`

const svgData = {
  indeterminate: 'M280-440h400v-80H280v80Zm-80 320q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z',
  uncheck: 'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z',
  checked: 'm424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z'
}

const template = /*html*/`
<svg class="icon color" viewBox="0 -960 960 960">
  <path d="${svgData.uncheck}"></path>
</svg>
<s-ripple class="color" attached="true" part="ripple"></s-ripple>
`

export class Checkbox extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const iconPath = shadowRoot.querySelector('path') as SVGPathElement
    this.addEventListener('click', () => {
      if (this.indeterminate) return this.indeterminate = false
      this.checked = !this.checked
      this.dispatchEvent(new Event('change'))
    })
    return {
      watches: {
        indeterminate: (value) => iconPath.setAttribute('d', value ? svgData.indeterminate : (this.checked ? svgData.checked : svgData.uncheck)),
        checked: (value) => !this.indeterminate && iconPath.setAttribute('d', value ? svgData.checked : svgData.uncheck)
      }
    }
  }
}) { }

Checkbox.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Checkbox
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}