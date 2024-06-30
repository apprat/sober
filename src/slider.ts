import { useElement, JSXAttributes, LowercaseKeys } from './core/element.js'
import { device } from './core/utils.js'

const name = 's-slider'
const props = {
  disabled: false,
  labeled: false,
  ranged: false,
  max: 100,
  min: 0,
  step: 1,
  value: 0,
  valueStart: 0,
  valueEnd: 0
}

const style = /*css*/`
:host{
  display: block;
  color: var(--s-color-primary, #5256a9);
  height: 16px;
  cursor: pointer;
  position: relative;
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb, var(--s-color-on-surface, #1c1b1f) 38%, transparent) !important;
}
.container{
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  pointer-events: none;
}
.track,
.indicator{
  height: 4px;
  border-radius: 2px;
  position: absolute;
  right: 0;
}
.track{
  background: var(--s-color-secondary-container, #e2e0f9);
  width: calc(100% - 20px);
}
:host([disabled=true]) .track{
  background: color-mix(in srgb, var(--s-color-on-surface, #1c1b1f) 12%, transparent) !important;
}
.indicator{
  left: 0;
  width: 0;
  background: currentColor;
}
.handle{
  position: relative;
  height: 16px;
  width: 16px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}
.thumb{
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background: currentColor;
  box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
}
.thumb::before{
  content: '';
  position: absolute;
  left: -10px;
  top: -10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: color-mix(in srgb, currentColor 20%, transparent);
  transform: scale(0);
  transition: transform .12s;
}
.active .thumb::before{
  transform: scale(1);
}
.label{
  position: absolute;
  bottom: 100%;
  margin-bottom: 12px;
  background: var(--s-color-inverse-surface, #313034);
  color: var(--s-color-inverse-on-surface, #f3eff4);
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 0 6px;
  height: 24px;
  font-size: .75rem;
  transform: scale(0);
  transform-origin: center bottom;
  transition: transform .12s;
  opacity: .85;
  z-index: 1;
  display: none;
}
.active .label{
  transform: scale(1);
}
:host([labeled=true]) .label{
  display: flex;
}
input{
  margin: 0;
  height: 100%;
  width: 100%;
  cursor: inherit;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
`

const template = /*html*/`
<div class="container" part="container">
  <div class="indicator" part="indicator"></div>
  <div class="track" part="track"></div>
  <div class="handle" part="handle">
    <div class="thumb" part="thumb"></div>
    <div class="label" part="label"></div>
  </div>
</div>
<input
  type="range"
  max="${props.max}"
  min="${props.min}"
  step="${props.step}"
  value="${props.value}"
/>
`

export class Slider extends useElement({
  style, template, props, syncProps: ['disabled', 'labeled', 'ranged'],
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const indicator = shadowRoot.querySelector('.indicator') as HTMLDivElement
    const track = shadowRoot.querySelector('.track') as HTMLDivElement
    const handle = shadowRoot.querySelector('.handle') as HTMLDivElement
    const label = shadowRoot.querySelector('.label') as HTMLDivElement
    const input = shadowRoot.querySelector('input') as HTMLInputElement
    const update = () => {
      const value = Number(input.value)
      const percentage = ((value - this.min) * 100) / this.max - this.min
      handle.style.left = `calc(${percentage}% - ${percentage * 0.16}px)`
      indicator.style.width = `calc(${percentage}% - ${4 + (percentage * 0.16)}px)`
      track.style.width = `calc(${100 - percentage}% - ${20 - (percentage * 0.16)}px)`
      label.textContent = String(value)
    }
    input.addEventListener('change', () => this.dispatchEvent(new Event('change')))
    input.addEventListener('input', () => {
      this.value = Number(input.value)
      this.dispatchEvent(new Event('input'))
    })
    input.addEventListener('mousedown', (event) => event.button === 0 && !device.touched && container.classList.add('active'))
    input.addEventListener('mouseup', () => !device.touched && container.classList.remove('active'))
    input.addEventListener('touchstart', () => device.touched && container.classList.add('active'), { passive: true })
    input.addEventListener('touchend', () => device.touched && container.classList.remove('active'), { passive: true })
    input.addEventListener('touchcancel', () => device.touched && container.classList.remove('active'), { passive: true })
    return {
      watches: {
        max: (value) => {
          input.max = String(value)
          update()
        },
        min: (value) => {
          input.min = String(value)
          update()
        },
        step: (value) => {
          input.step = String(value)
          update()
        },
        value: (value) => {
          input.value = String(value)
          update()
        }
      }
    }
  }
}) { }

Slider.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<LowercaseKeys<typeof props>> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Slider
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: LowercaseKeys<typeof props>
  }
}