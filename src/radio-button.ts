import { builder, html } from './core/element.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  color: var(--s-color-primary, #006495);
}
:host([disabled=true]){
  pointer-events: none;
}
.icon{
  width: 60%;
  height: 60%;
  fill: currentColor;
}
.color{
  color: var(--s-color-on-surface-variant, #41474d);
}
:host([checked=true]) .color,
:host([indeterminate=true]) .color{
  color: currentColor;
}
:host([disabled=true]) .color{
  color: color-mix(in srgb ,var(--s-color-on-surface, #1a1c1e) 38%, transparent) !important;
}
`

const name = 's-radio-button'
const props = {
  disabled: false,
  checked: false,
  name: ''
}

const svgData = {
  uncheck: 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
  checked: 'M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
}

export default class RadioButton extends builder({
  name, style, props, propSyncs: true,
  setup() {
    let iconPath: SVGAElement
    return {
      created: () => {
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
      },
      watches: {
        checked: (value) => iconPath.setAttribute('d', value ? svgData.checked : svgData.uncheck)
      },
      render: () => html`
        <svg class="icon color" viewBox="0 -960 960 960">
          <path ref="${(el: SVGAElement) => iconPath = el}" d="${svgData.uncheck}"></path>
        </svg>
        <s-ripple class="color" attached="true" centered="true"></s-ripple>
      `
    }
  }
}) { }

RadioButton.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: RadioButton
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}