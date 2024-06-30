import { useElement, JSXAttributes, LowercaseKeys } from './core/element.js'

const name = 's-rate'
const props = {
  readOnly: false,
  max: 10,
  min: 0,
  value: 5,
  step: 1
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  font-size: 24px;
  position: relative;
  overflow: hidden;
  width: calc(1em * 5);
  --rate-unchecked-color: var(--s-color-secondary-container, #e2e0f9);
  --rate-checked-color: var(--s-color-primary, #5256a9);
}
.unchecked{
  width: 100%;
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

const template = /*html*/`
<div class="unchecked" part="unchecked">
  <slot name="unchecked">
    <svg viewBox="0 -960 960 960">
      <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Z"/>
    </svg>
  </slot>
</div>
<div class="checked" part="checked">
  <slot name="checked">
    <svg viewBox="0 -960 960 960">
      <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Z"/>
    </svg>
  </slot>
</div>
<input
  type="range"
  max="${props.max}"
  min="${props.min}"
  step="${props.step}"
  value="${props.value}"
/>
`

export class Rate extends useElement({
  style, template, props, syncProps: ['readOnly'],
  setup(shadowRoot) {
    const checked = shadowRoot.querySelector('.checked') as HTMLDivElement
    const input = shadowRoot.querySelector('input') as HTMLInputElement
    const update = () => {
      const value = Number(input.value)
      const percentage = ((value - this.min) * 100) / this.max - this.min
      checked.style.width = `${percentage}%`
    }
    input.addEventListener('change', () => this.dispatchEvent(new Event('change')))
    input.addEventListener('input', () => {
      update()
      this.dispatchEvent(new Event('input'))
    })
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
      }
    }
  }
}) { }

Rate.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<LowercaseKeys<typeof props>> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Rate
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: LowercaseKeys<typeof props>
  }
}