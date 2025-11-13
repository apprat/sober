import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { BaseSlider } from './base-slider.js'

const props = useProps({
  $value: 0,
  $start: 0,
  $end: 0,
  $step: 1,
  $min: 0,
  $max: 100,
  readOnly: false,
  disabled: false,
  labeled: false,
  mode: ['single', 'single-reversed', 'range'],
  slidingMode: ['thumb', 'all', 'all-cumulative'],
  orientation: ['horizontal', 'vertical'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large']
})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  height: 48px;
  border-radius: 4px;
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
.base-slider{
  height: 100%;
  flex-grow: 1;
  --s-base-slider-gap: 6px;
  --s-base-slider-thumb-width: 4px;
  --s-base-slider-thumb-height: 44px;
  &::part(track-start){
    overflow: hidden;
  }
  &::part(track-fill){
    border-radius: 8px 2px 2px 8px;
  }
  &::part(track-end){
    border-radius: 2px 8px 8px 2px;
    justify-content: flex-end;
    overflow: hidden;
  }
  &::part(thumb-start),
  &::part(thumb-end){
    border-radius: 2px;
  }
  &::part(thumb-start)::before,
  &::part(thumb-start)::after,
  &::part(thumb-end)::before,
  &::part(thumb-end)::after{
    height: 48px;
    width: auto;
    border-radius: 50%;
    aspect-ratio: 1;
    -webkit-aspect-ratio: 1;
    transition-duration: inherit;
    transition-timing-function: inherit;
  }
  &[start-pressed]{
    --s-base-slider-thumb-start-width: 2px;
  }
  &[end-pressed]{
    --s-base-slider-thumb-end-width: 2px;
  }
  &[mode=single-reversed]{
    &::part(track-fill){
      border-radius: 2px 8px 8px 2px;
    }
    &::part(track-end){
      border-radius: 8px 2px 2px 8px;
      justify-content: flex-start;
    }
  }
  &[mode=range]{
    &::part(track-fill){
      border-radius: 2px;
    }
    &::part(track-start){
      border-radius: 8px 2px 2px 8px;
      justify-content: flex-start;
    }
  }
}
.dot{
  width: 4px;
  background: currentColor;
  height: 4px;
  border-radius: 50%;
  margin: 0 4px;
  flex-shrink: 0;
}
.marker{
  height: 100%;
  position: relative;
  --background: red;
  width: 100%;
}
`

const template = /*html*/`
<s-base-slider variant="segmented" mode="${props.mode}" class="base-slider" part="base-slider" tabindex="-1">
  <div class="dot" part="dot" slot="track-start"></div>
  <div class="dot" part="dot" slot="track-end"></div>
</s-base-slider>
`

export class Slider extends useElement({
  style, props, template,
  focused: true,
  pressed: true,
  hovered: true,
  setup(shadowRoot) {
    const baseSlider = shadowRoot.querySelector<BaseSlider>('.base-slider')!
    baseSlider.oninput = () => {
      this.dispatchEvent(new Event('input'))
    }
    baseSlider.onchange = () => this.dispatchEvent(new Event('change'))
    this.addEventListener('keydown', (e) => {
      if (this.readOnly || !baseSlider.keydown(e.key)) return
      e.preventDefault()
    })
    return {
      setValue: (value) => this.mode !== 'range' && (baseSlider.end = value),
      setStart: () => { },
      setStep: (value) => baseSlider.step = value,
      setMax: (value) => baseSlider.max = value,
      setMin: (value) => baseSlider.min = value,
      setOrientation: (value) => baseSlider.orientation = value,
      setMode: (value) => baseSlider.mode = value,
      setSlidingMode: (value) => baseSlider.slidingMode = value
    }
  }
}) { }

const name = Slider.define('s-slider')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Slider
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
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & Slider
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props>
    }
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

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}