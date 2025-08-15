import { useProps, useElement } from '../core/element.js'
import { BaseSlider } from './base-slider.js'

const props = useProps({
  $value: 0,
  $start: 0,
  $end: 0,
  $step: 1,
  $min: 0,
  $max: 100,
  disabled: false,
  labeled: false,
  stoped: false,
  mode: ['single', 'single-reversed', 'range'],
  orientation: ['horizontal', 'vertical'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large']
})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  height: 24px;
}
.base-slider{
  height: 100%;
  flex-grow: 1;
  --base-slider-gap: 6px;
  --base-slider-thumb-width: 4px;
  --base-slider-thumb-height: 28px;
}
.base-slider{
  &::part(track-start),
  &::part(track-fill),
  &::part(track-end){
    border-radius: 4px;
    height: 12px;
    overflow: hidden;
  }
  &::part(track-end){
    border-radius: 2px 6px 6px 2px;
  }
  &::part(track-fill){
    border-radius: 6px 2px 2px 6px;
  }
  &::part(track-start)::before,
  &::part(track-end)::before{
    content: '';
    position: absolute;
    right: 4px;
    width: 4px;
    height: 4px;
    background: currentColor;
    border-radius: 50%;
  }
  &::part(track-start)::before{
    left: 4px;
  }
  &::part(thumb-start),
  &::part(thumb-end){
    border-radius: 4px;
  }
  &::part(thumb-start)::before,
  &::part(thumb-end)::before{
    display: none;
  }
}
.base-slider[moving]{
  transition-property: none;
}
.base-slider[end-pressed]{
  &::part(thumb-end){
  }
}
`

const template = /*html*/`
<s-base-slider variant="segmented" mode="${props.mode}" class="base-slider" part="base-slider">
</s-base-slider>
`

export class Slider extends useElement({
  style, props, template,
  setup(shadowRoot) {
    const baseSlider = shadowRoot.querySelector<BaseSlider>('.base-slider')!
    return {
      setValue: (value) => this.mode !== 'range' && (baseSlider.end = value),
      setStart: () => { },
      setEnd: () => { },
      setStep: (value) => baseSlider.step = value,
      setMax: (value) => baseSlider.max = value,
      setMin: (value) => baseSlider.min = value,
      setOrientation: (value) => baseSlider.orientation = value,
      setMode: (value) => baseSlider.mode = value,
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