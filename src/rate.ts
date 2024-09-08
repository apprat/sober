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
  --rate-track-color: var(--s-color-secondary-container, #e2e0f9);
  --rate-indicator-color: var(--s-color-primary, #5256a9);
}
.track{
  width: 100%;
  display: flex;
}
.track svg,
::slotted([slot=track]){
  fill: var(--rate-track-color);
  filter: drop-shadow(1em 0 0 var(--rate-track-color)) drop-shadow(2em 0 0 var(--rate-track-color)) drop-shadow(3em 0 0 var(--rate-track-color));
}
.indicator{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 50%;
  overflow: hidden;
  display: flex;
}
.indicator svg,
::slotted([slot=indicator]){
  fill: var(--rate-indicator-color);
  filter: drop-shadow(1em 0 0 var(--rate-indicator-color)) drop-shadow(2em 0 0 var(--rate-indicator-color)) drop-shadow(3em 0 0 var(--rate-indicator-color));
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
<div class="track" part="track">
  <slot name="track">
    <svg viewBox="0 -960 960 960">
      <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
    </svg>
  </slot>
</div>
<div class="indicator" part="indicator">
  <slot name="indicator">
    <svg viewBox="0 -960 960 960">
      <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
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
    const indicator = shadowRoot.querySelector('.indicator') as HTMLDivElement
    const input = shadowRoot.querySelector('input') as HTMLInputElement
    const update = () => {
      const value = Number(input.value)
      const percentage = ((value - this.min) * 100) / this.max - this.min
      indicator.style.width = `${percentage}%`
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