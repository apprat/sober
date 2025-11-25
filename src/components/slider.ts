import { useProps, useElement, useThrottle } from '../core/element.js'
import * as scheme from '../core/scheme.js'
import { BaseSlider } from './base-slider.js'

const props = useProps({
  $value: 50,
  $start: 0,
  $end: 50,
  $step: 1,
  $min: 0,
  $max: 100,
  readOnly: false,
  disabled: false,
  labeled: false,
  marks: '',
  mode: ['single', 'reversed', 'range'],
  slidingMode: ['thumb', 'all', 'all-cumulative'],
  orientation: ['horizontal', 'vertical'],
  size: ['medium', 'small', 'extra-small', 'large', 'extra-large']
})

const events = {
  label: CustomEvent<{ format: (fn: (value: number) => string) => void, name: 'start' | 'end' }>,
}

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  height: 48px;
  border-radius: 4px;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  font-size: calc(var(--s-font-size) * 14px);
  color: ${scheme.color.primary};
}
.thumb-end,
.thumb-start{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: currentColor;
  border-radius: 2px;
  transition-property: width, border-radius;
  will-change: width;
}
.label{
  filter: opacity(.9);
  position: absolute;
  background: ${scheme.color.inverseSurface};
  color: ${scheme.color.inverseOnSurface};
  border-radius: 24px;
  padding: 8px 12px;
  bottom: 100%;
  margin-bottom: 4px;
  display: none;
  opacity: 0;
  white-space: nowrap;
  transform: scale(.5);
  transform-origin: bottom;
  transition-property: opacity, transform;
}
.marker{
  inset: 0;
  border: solid calc(var(--s-base-slider-thumb-width) / 2) transparent;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  --s_start: var(--s_track-start-size);
  --s_end: calc(100% - var(--s_track-end-size));
  clip-path: polygon(0 0, var(--s_start) 0, var(--s_start) 100%, var(--s_end) 100%, var(--s_end) 0, 100% 0, 100% 100%, 0 100%);
  span{
    position: absolute;
    width: 4px;
    height: 4px;
    transform: translateX(-50%);
    background: currentColor;
    border-radius: 50%;
    left: var(--s_left);
    &.first{
      transform: translateX(2px);
      left: 0;
    }
    &.last{
      right: 0;
      left: auto;
      transform: translateX(-2px);
    }
  }
}
.base-slider{
  color: inherit;
  height: 100%;
  flex-grow: 1;
  --s-base-slider-gap: 6px;
  --s-base-slider-thumb-width: 4px;
  --s-base-slider-thumb-height: 44px;
  &::part(track-start),
  &::part(track-end){
    overflow: hidden;
  }
  &::part(track-fill){
    border-radius: 8px 2px 2px 8px;
  }
  &::part(track-end){
    border-radius: 2px 8px 8px 2px;
  }
  &::part(thumb-start),
  &::part(thumb-end){
    background: none;
  }
  &::part(thumb-start)::before,
  &::part(thumb-start)::after,
  &::part(thumb-end)::before,
  &::part(thumb-end)::after{
    height: 48px;
    width: 48px;
    border-radius: 50%;
    transition-duration: inherit;
    transition-timing-function: inherit;
  }
  &[mode=reversed]{
    &::part(track-fill){
      border-radius: 2px 8px 8px 2px;
    }
    &::part(track-end){
      border-radius: 8px 2px 2px 8px;
    }
    .marker{
      --s_start: var(--s_track-end-size);
      --s_end: 100%;
      span{
        right: var(--s_left);
        left: auto;
        transform: translateX(50%);
        &.first{
          transform: translateX(-2px);
          right: 0;
        }
        &.last{
          left: 0;
          right: auto;
          transform: translateX(2px);
        }
      }
    }
  }
  &[mode=range]{
    &::part(track-fill){
      border-radius: 2px;
    }
    &::part(track-start){
      border-radius: 8px 2px 2px 8px;
    }
  }
  &[end-pressed] .thumb-end,
  &[start-pressed] .thumb-start{
    border-radius: 1px;
    width: 50%;
  }
}
:host([disabled]){
  pointer-events: none;
  color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
  .base-slider{
    &::part(track-start),
    &::part(track-end){
      background: color-mix(in srgb, ${scheme.color.onSurface} 12%, transparent) !important;
    }
  }
}
:host([labeled]){
  .base-slider{
    .label{
      display: flex;
    }
    &[end-pressed] .thumb-end>.label,
    &[start-pressed] .thumb-start>.label{
      opacity: 1;
      transform: scale(1);
    }
  }
}
:host([orientation=vertical]){
  width: 48px;
  height: 300px;
  display: inline-flex;
  vertical-align: middle;
  .label{
    bottom: auto;
    right: 100%;
    margin-bottom: auto;
    margin-right: 4px;
    transform-origin: right;
  }
  .marker{
    border-width: calc(var(--s-base-slider-thumb-height) / 2);
    clip-path: polygon(0 0, 100% 0, 100% var(--s_start), 0 var(--s_start), 0 var(--s_end), 100% var(--s_end), 100% 100%, 0 100%);
    --s_start: var(--s_track-end-size);
    --s_end: calc(100% - var(--s_track-start-size));
    span{
      bottom: var(--s_left);
      left: auto !important;
      right: auto !important;
      transform: none;
      transform: translateY(50%);
      &.first{
        transform: translateY(-2px);
        bottom: 0;
      }
      &.last{
        bottom: auto;
        top: 0;
        transform: translateY(2px);
      }
    } 
  }
  .base-slider{
    width: 100%;
    flex-grow: 1;
    --s-base-slider-thumb-width: 44px;
    --s-base-slider-thumb-height: 4px;
    &::part(track-end){
      border-radius: 8px 8px 2px 2px;
    }
    &::part(track-fill){
      border-radius: 2px 2px 8px 8px;
    }
    .thumb-end,
    .thumb-start{
      transition-property: height, border-radius;
      will-change: height;
    }
    &[end-pressed] .thumb-end,
    &[start-pressed] .thumb-start{
      width: 100%;
      height: 50%;
    }
    &[mode=reversed]{
      &::part(track-fill){
        border-radius: 8px 8px 2px 2px;
      }
      &::part(track-end){
        border-radius: 2px 2px 8px 8px;
      }
      .marker{
        --s_start: 0%;
        --s_end: calc(100% - var(--s_track-end-size));
        span{
          &.first{
            top: 0;
            bottom: auto;
            transform: translateY(2px);
          }
          &.last{
            top: auto;
            bottom: 0;
            transform: translateY(-2px);
          }
        }
      }
    }
    &[mode=range]{
      &::part(track-start){
        border-radius: 2px 2px 8px 8px;
      }
      &::part(track-fill){
        border-radius: 2px;
      }
    }
  }
}
@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled]){
    color: ${scheme.color.outline} !important;
    .base-slider{
      &::part(track-start),
      &::part(track-end){
        background: ${scheme.color.surfaceContainerHighest} !important;
      }
    }
  }
}
`

const template = /*html*/`
<s-base-slider variant="segmented" mode="${props.mode}" min="${props.min}" max="${props.max}" step="${props.step}" class="base-slider" part="base-slider" tabindex="-1">
  <div slot="thumb-start" class="thumb-start">
    <div class="label">22</div>
  </div>
  <div slot="thumb-end" class="thumb-end">
    <div class="label">33</div>
  </div>
  <div class="marker" slot="middle">
    <span class="first"></span>
    <span class="last"></span>
  </div>
</s-base-slider>
`

export class Slider extends useElement({
  style, props, events, template,
  focused: true,
  pressed: true,
  hovered: true,
  setup(shadowRoot, info) {
    const baseSlider = shadowRoot.querySelector<BaseSlider>('.base-slider')!
    const marker = shadowRoot.querySelector<HTMLDivElement>('.marker')!
    const labels = {
      start: shadowRoot.querySelector<HTMLDivElement>('.thumb-start>.label')!,
      end: shadowRoot.querySelector<HTMLDivElement>('.thumb-end>.label')!
    }
    baseSlider.onchange = () => this.dispatchEvent(new Event('change'))
    baseSlider.oninput = () => this.dispatchEvent(new Event('input'))
    baseSlider.onpress = (e) => {
      if (!this.labeled) return
      const { name } = e.detail
      type FormatCallback = (value: number) => string
      let callback: FormatCallback = (value) => value.toString()
      const format = (fn: FormatCallback) => callback = fn
      this.dispatchEvent(new CustomEvent('label', { detail: { format, name } }))
      const show = () => {
        const v = callback(this[name])
        labels[name].textContent = v
      }
      show()
      baseSlider.addEventListener('input', show)
      baseSlider.addEventListener('pressout', () => baseSlider.removeEventListener('input', show), { once: true })
    }
    this.addEventListener('keydown', (e) => {
      if (this.readOnly || !baseSlider.keydown(e.key)) return
      e.preventDefault()
    })
    const defMarks = marker.innerHTML
    const createMark = (value: number) => {
      const span = document.createElement('span')
      const val = ((value - this.min) / (this.max - this.min)) * 100
      span.style.setProperty('--s_left', `${val}%`)
      span.classList.toggle('first', value === this.min)
      span.classList.toggle('last', value === this.max)
      return span
    }
    const renderMarks = () => {
      marker.innerHTML = ''
      if (this.marks === '') return marker.innerHTML = defMarks
      const framgent = document.createDocumentFragment()
      if (this.marks === 'all') {
        for (let i = this.min; i <= this.max; i += this.step) framgent.appendChild(createMark(i))
        return marker.appendChild(framgent)
      }
      for (const v of this.marks.split(',')) {
        const num = Number(v)
        if (isNaN(num) || num > this.max || num < this.min) continue
        framgent.appendChild(createMark(num))
      }
      marker.appendChild(framgent)
    }
    return {
      onAttributeChanged: (name) => ['max', 'min', 'step', 'marks'].includes(name) && useThrottle(renderMarks),
      setValue: (v) => baseSlider.end = v,
      getValue: () => baseSlider.end,
      setStart: (v) => baseSlider.start = v,
      getStart: () => baseSlider.start,
      setEnd: (v) => baseSlider.end = v,
      getEnd: () => baseSlider.end,
      setStep: (v) => baseSlider.step = v,
      setMax: (v) => baseSlider.max = v,
      setMin: (v) => baseSlider.min = v,
      setOrientation: (v) => baseSlider.orientation = v,
      setMode: (v) => baseSlider.mode = v,
      setSlidingMode: (v) => baseSlider.slidingMode = v,
      setMarks: (v) => baseSlider.steps = v === 'all' ? '' : v
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