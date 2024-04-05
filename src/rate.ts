import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  font-size: 24px;
  position: relative;
  overflow: hidden;
  --rate-unchecked-color: var(--s-color-surface-container-highest, #e2e2e5);
  --rate-checked-color: var(--s-color-primary, #006495);
}
.unchecked{
  width: calc(1em * 5);
  display: flex;
}
.unchecked svg,
::slotted([slot=unchecked]){
  fill: var(--rate-unchecked-color);
  filter: drop-shadow(1em 0 0 var(--rate-unchecked-color)) drop-shadow(2em 0 0 var(--rate-unchecked-color)) drop-shadow(3em 0 0 var(--rate-unchecked-color));
}
.checked{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 50%;
  overflow: hidden;
  display: flex;
}
.checked svg,
::slotted([slot=checked]){
  fill: var(--rate-checked-color);
  filter: drop-shadow(1em 0 0 var(--rate-checked-color)) drop-shadow(2em 0 0 var(--rate-checked-color)) drop-shadow(3em 0 0 var(--rate-checked-color));
}
svg,
::slotted(*){
  height: 1em;
  width: 1em;
  flex-shrink: 0;
}
input{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0;
  margin: 0;
}
:host([readonly=true]) input{
  display: none;
}
`

const name = 's-rate'
const props = {
  readonly: false,
  max: 10,
  min: 0,
  value: 5,
  step: 1
}

export default class Component extends builder({
  name, style, props, propSyncs: ['readonly'],
  setup() {
    let checked: HTMLDivElement
    let input: HTMLInputElement
    const update = () => {
      const value = Number(input.value)
      const percentage = ((value - this.min) * 100) / this.max - this.min
      checked.style.width = `${percentage}%`
    }
    return {
      watches: {
        max: (value) => {
          const val = String(value)
          if (input.max === val) return
          input.max = val
          update()
        },
        min: (value) => {
          const val = String(value)
          if (input.min === val) return
          input.min = val
          update()
        },
        step: (value) => {
          const val = String(value)
          if (input.step === val) return
          input.step = val
          update()
        },
        value: (value) => {
          const val = String(value)
          if (input.value === val) return
          input.value = val
          update()
        }
      },
      render: () => html`
        <div class="unchecked">
          <slot name="unchecked">
            <svg viewBox="0 -960 960 960">
              <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
            </svg>
          </slot>
        </div>
        <div class="checked" ref="${(el: HTMLDivElement) => checked = el}">
          <slot name="checked">
            <svg viewBox="0 -960 960 960">
              <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
            </svg>
          </slot>
        </div>
        <input
          type="range"
          ref="${(el: HTMLInputElement) => input = el}"
          max="${this.max}"
          min="${this.min}"
          step="${this.step}"
          value="${this.value}"
          @change="${() => this.dispatchEvent(new Event('change'))}"
          @input="${() => { update(); this.dispatchEvent(new Event('input')) }}"
        />
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}