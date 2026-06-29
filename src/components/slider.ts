import { useProps, useElement, useThrottle } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { BaseSlider } from './base-slider.js'

const props = useProps({
  $value: 50,
  $start: 0,
  $end: 50,
  $step: 1,
  $min: 0,
  $max: 100,
  name: '',
  $stepMarks: '',
  $defaultValue: 50,
  $defaultStart: 0,
  $defaultEnd: 0,
  disabled: false,
  readOnly: false,
  showValue: false,
  showDivisions: false,
  clickable: true,
  touchScrollPriority: false,
  mode: ['single', 'reversed', 'range'],
  slidingMode: ['thumb', 'all', 'all-cumulative'],
  orientation: ['horizontal', 'vertical'],
  size: ['extra-small', 'small', 'medium', 'large', 'extra-large']
})

const events = {
  formatvalue: CustomEvent<{ format: (fn: (value: number, type?: 'start' | 'end') => string) => void }>
}

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  transition-property: none;
  padding: 0 4px;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  color: ${scheme.color.primary};
}
.slider{
  color: inherit;
  height: 100%;
  flex-grow: 1;
  --s_slider-size: var(--s-slider-size, 44px);
  --s_slider-track-size: var(--s-slider-track-size, 16px);
  --s_slider-track-border-radius: var(--s-slider-track-border-radius, 8px);
  --s_slider-thumb-size: var(--s-slider-thumb-size, 4px);
  --s-base-slider-track-edge-offset: 4px;
  &::part(thumb-start),
  &::part(thumb-end){
    border-radius: 2px;
  }
  &::part(thumb-start)::before,
  &::part(thumb-start)::after,
  &::part(thumb-end)::before,
  &::part(thumb-end)::after{
    aspect-ratio: 1;
    -webkit-aspect-ratio: 1;
    height: var(--s_slider-thumb-height, auto);
    width: var(--s_slider-thumb-width, auto);
    border-radius: 50%;
  }
  &[mode=range]{
    &::part(track-fill){
      border-radius: 2px;
    }
  }
  .value{
    display: none;
    justify-content: center;
    align-items: center;
    height: 44px;
    min-width: 48px;
    white-space: nowrap;
    padding: 0 16px;
    border-radius: 24px;
    position: absolute;
    font-weight: 500;
    line-height: 1;
    opacity: 0;
    transform: translateY(50%) scale(0.5);
    bottom: calc(100% + 4px);
    pointer-events: none;
    font-size: calc(var(--s-font-size, 1) * 14px);
    transition-property: opacity, transform;
    background: ${scheme.color.inverseSurface};
    color: ${scheme.color.inverseOnSurface};
  }
  .marks{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    inset: 0;
    position: absolute;
    pointer-events: none;
    &.fill{
      display: none;
      color: ${scheme.color.onPrimary};
    }
    &::before,
    &::after,
    .mark{
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: currentColor;
      position: absolute;
    }
  }
}
:host(:not([orientation=vertical])){
  .slider{
    --s_slider-thumb-height: calc(100% + 4px);
    --s-base-slider-thumb-width: var(--s_slider-thumb-size);
    --s-base-slider-thumb-height: var(--s_slider-size);
    height: var(--s_slider-size);
    &[start-pressed]{
      --s-base-slider-thumb-start-width: 2px;
    }
    &[end-pressed]{
      --s-base-slider-thumb-end-width: 2px;
    }
    &::part(track-start),
    &::part(track-end),
    &::part(track-fill){
      height: var(--s_slider-track-size);
    }
    &:not([mode]){
      &::part(track-fill){
        border-radius: var(--s_slider-track-border-radius) 2px 2px var(--s_slider-track-border-radius);
      }
    }
    &:not([mode=reversed]){
      &::part(track-start){
        border-radius: var(--s_slider-track-border-radius) 2px 2px var(--s_slider-track-border-radius);
      }
      &::part(track-end){
        border-radius: 2px var(--s_slider-track-border-radius) var(--s_slider-track-border-radius) 2px;
      }
    }
    &[mode=reversed]{
      &::part(track-end){
        border-radius: var(--s_slider-track-border-radius) 2px 2px var(--s_slider-track-border-radius);
      }
      &::part(track-fill){
        border-radius: 2px var(--s_slider-track-border-radius) var(--s_slider-track-border-radius) 2px;
      }
      .marks{
        &.track{
          clip-path: polygon(0 0, var(--s_base-slider-track-end-size) 0, var(--s_base-slider-track-end-size) 100%, 0% 100%);
        }
        &.fill{
          clip-path: polygon(calc(100% - var(--s_base-slider-track-fill-size)) 0, 100% 0, 100% 100%, calc(100% - var(--s_base-slider-track-fill-size)) 100%);
        }
      }
      .mark.end{
        left: 0;
      }
    }
    &[mode=range] .marks{
      &.track{
        clip-path: polygon(var(--s_base-slider-track-start-size) 0%, var(--s_base-slider-track-start-size) 100%, 100% 100%, 100% 0, calc(100% - var(--s_base-slider-track-end-size)) 0, calc(100% - var(--s_base-slider-track-end-size)) 100%, 0 100%, 0 0);
      }
      &.fill{
        clip-path: polygon(var(--s_base-slider-track-fill-position) 0, max(calc(var(--s_base-slider-track-fill-size) + var(--s_base-slider-track-fill-position)), var(--s_base-slider-track-fill-position)) 0, max(calc(var(--s_base-slider-track-fill-size) + var(--s_base-slider-track-fill-position)), var(--s_base-slider-track-fill-position)) 100%, var(--s_base-slider-track-fill-position) 100%);
      }
    }
    .marks{
      &.track{
        clip-path: polygon(calc(100% - var(--s_base-slider-track-end-size)) 0, 100% 0, 100% 100%, calc(100% - var(--s_base-slider-track-end-size)) 100%);
      }
      &.fill{
        clip-path: polygon(0 0, var(--s_base-slider-track-fill-size) 0, var(--s_base-slider-track-fill-size) 100%, 0% 100%);
      }
      &::before{
        left: 0;
      }
      &::after{
        right: 0;
      }
      .mark{
        left: var(--s_slider-mark-offset);
        transform: translateX(calc(var(--s_slider-mark-offset) * -1));
      }
    }
  }
}
:host([orientation=vertical]){
  height: 300px;
  display: inline-flex;
  vertical-align: middle;
  padding: 4px 0;
  .slider{
    --s_slider-thumb-width: calc(100% + 4px);
    --s-base-slider-thumb-height: var(--s_slider-thumb-size);
    --s-base-slider-thumb-width: var(--s_slider-size);
    margin: var(--s-base-slider-track-edge-offset) 0;
    height: 100%;
    width: var(--s_slider-size);
    &::part(track-start),
    &::part(track-end),
    &::part(track-fill){
      width: var(--s_slider-track-size);
    }
    &:not([mode]){
      &::part(track-fill){
        border-radius: 2px 2px var(--s_slider-track-border-radius) var(--s_slider-track-border-radius);
      }
    }
    &:not([mode=reversed]){
      &::part(track-start){
        border-radius: 2px 2px var(--s_slider-track-border-radius) var(--s_slider-track-border-radius);
      }
      &::part(track-end){
        border-radius: var(--s_slider-track-border-radius) var(--s_slider-track-border-radius) 2px 2px;
      }
    }
    &[mode=reversed]{
      &::part(track-end){
        border-radius: 2px 2px var(--s_slider-track-border-radius) var(--s_slider-track-border-radius);
      }
      &::part(track-fill){
        border-radius: var(--s_slider-track-border-radius) var(--s_slider-track-border-radius) 2px 2px;
      }
      .marks{
        &::after{
          bottom: auto;
          top: 0;
        }
        &.track{
          clip-path: polygon(0 calc(100% - var(--s_base-slider-track-end-size)), 100% calc(100% - var(--s_base-slider-track-end-size)), 100% 100%, 0 100%);
        }
        &.fill{
          clip-path: polygon(0 0, 100% 0, 100% var(--s_base-slider-track-fill-size), 0 var(--s_base-slider-track-fill-size));
        }
      }
    }
    &[mode=range] .marks{
      &.track{
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--s_base-slider-track-start-size)), 0 calc(100% - var(--s_base-slider-track-start-size)), 0 100%, 100% 100%, 100% var(--s_base-slider-track-end-size), 0% var(--s_base-slider-track-end-size));
      }
      &.fill{
        clip-path: polygon(0 min(calc(100% - var(--s_base-slider-track-fill-size) - var(--s_base-slider-track-fill-position)), calc(100% - var(--s_base-slider-track-fill-position))), 100% min(calc(100% - var(--s_base-slider-track-fill-size) - var(--s_base-slider-track-fill-position)), calc(100% - var(--s_base-slider-track-fill-position))), 100% calc(100% - var(--s_base-slider-track-fill-position)), 0 calc(100% - var(--s_base-slider-track-fill-position)));
      }
    }
    .value{
      bottom: auto;
      right: calc(100% + 4px);
    }
    .marks{
      &.track{
        clip-path: polygon(0 0, 100% 0, 100% var(--s_base-slider-track-end-size), 0 var(--s_base-slider-track-end-size));
      }
      &.fill{
        clip-path: polygon(0 calc(100% - var(--s_base-slider-track-fill-size)), 100% calc(100% - var(--s_base-slider-track-fill-size)), 100% 100%, 0% 100%);
      }
      &::before{
        bottom: 0;
      }
      &::after{
        top: 0;
      }
      .mark{
        left: auto;
        bottom: var(--s_slider-mark-offset);
        transform: translateY(calc(var(--s_slider-mark-offset) * 1));
      }
    }
  }
}
:host([size=small]){
  &:host(:not([orientation=vertical])){
    .slider{
      --s——slider-track-size: var(--s-slider-track-size: 24px);
    }
  }
}
:host([size=medium]){
  .slider{
    --s_slider-size: var(--s-slider-size, 52px);
    --s_slider-track-size: var(--s-slider-track-size, 40px);
    --s_slider-track-border-radius: var(--s-slider-track-border-radius, 12px);
  }
}
:host([size=large]){
  .slider{
    --s_slider-size: var(--s-slider-size, 68px);
    --s_slider-track-size: var(--s-slider-track-size, 56px);
    --s_slider-track-border-radius: var(--s-slider-track-border-radius, 16px);
  }
}
:host([size=extra-large]){
  .slider{
    --s_slider-size: var(--s-slider-size, 108px);
    --s_slider-track-size: var(--s-slider-track-size, 96px);
    --s_slider-track-border-radius: var(--s-slider-track-border-radius, 28px);
  }
}
:host([disabled]){
  pointer-events: none;
  color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent);
  .slider{
    &::part(track-start),
    &::part(track-end){
      background: color-mix(in srgb, ${scheme.color.onSurface} 12%, transparent);
    }
  }
}
:host([readOnly]){
  pointer-events: none;
}
:host(:focus-visible){
  outline: none;
  .slider{
    &::part(thumb-start),
    &::part(thumb-end){
      outline: solid 4px currentColor;
      outline-offset: 4px;
    }
  }
}
:host([showValue]){
  .slider{
    .value{
      display: flex;
    }
    &[start-pressed] .value.start,
    &[end-pressed] .value.end{
      opacity: 1;
      transform: translateY(0%) scale(1);
    }
  }
}
:host([showDivisions]){
  .slider .marks.fill{
    display: flex; 
  }
}
@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled]){
    opacity: .38;
    color: ${scheme.color.onSurface} !important;
    .slider{
      &::part(track-start),
      &::part(track-end){
        opacity: .24;
        background: ${scheme.color.onSurface} !important;
      }
    }
  }
}
`

const template = /*html*/`
<s-base-slider variant="segmented" class="slider" part="base-slider" tabindex="-1">
  <div class="marks track" part="marks" slot="middle"></div>
  <div class="marks fill" part="marks"></div>
  
  <div slot="thumb-start" class="value start">50</div>
  <div slot="thumb-end" class="value end">50</div>
</s-base-slider>
`

export class Slider extends useElement({
  style, props, events, template,
  states: ['focusableOnly', 'pressable', 'hoverable', 'formable'],
  setup(shadowRoot, info) {
    const slider = shadowRoot.querySelector<BaseSlider>('.slider')!
    const startValue = shadowRoot.querySelector<HTMLDivElement>('.value.start')!
    const endValue = shadowRoot.querySelector<HTMLDivElement>('.value.end')!
    const marks = shadowRoot.querySelector<HTMLDivElement>('.marks')!
    const marksFill = shadowRoot.querySelector<HTMLDivElement>('.marks.fill')!
    this.addEventListener('keydown', (e) => slider.keydown(e.key) && e.preventDefault())
    slider.onchange = () => this.dispatchEvent(new Event('change'))
    slider.addEventListener('input', () => {
      if (slider.mode === 'range') {
        info.props.start = slider.start
        info.props.end = slider.end
      } else {
        info.props.value = slider.end
      }
      updateFrom()
      this.dispatchEvent(new Event('input'))
    })
    const showValue = (name: 'start' | 'end') => {
      if (!this.showValue) return
      type Fn = (v: number, n?: typeof name) => string
      let format: Fn = (v) => String(v)
      this.dispatchEvent(new CustomEvent('formatvalue', { detail: { format: (v: Fn) => format = v } }))
      const el = name === 'start' ? startValue : endValue
      const call = () => el.textContent = format(slider[name], this.mode === 'range' ? name : undefined)
      el.textContent = call()
      const remove = () => {
        slider.removeEventListener('pressend', remove)
        slider.removeEventListener('input', call)
      }
      slider.addEventListener('input', call)
      slider.addEventListener('pressend', remove)
    }
    slider.onpressstart = (e) => showValue(e.detail.name)
    const setDivisions = () => {
      marks.innerHTML = ''
      marksFill.innerHTML = ''
      if (!this.showDivisions) return
      const arr = this.stepMarks !== '' ? this.stepMarks.split(',').map(Number) : Array.from({ length: (this.max - this.min) / this.step + 1 }, (_, idx) => this.min + idx * this.step)
      const fragment = document.createDocumentFragment()
      arr.forEach((v) => {
        if (v === this.min || v === this.max) return
        const mark = document.createElement('div')
        mark.className = 'mark'
        mark.style.setProperty('--s_slider-mark-offset', `${(v - this.min) / (this.max - this.min) * 100}%`)
        fragment.appendChild(mark)
      })
      const fragmentFill = fragment.cloneNode(true)
      marks.appendChild(fragment)
      marksFill.appendChild(fragmentFill)
    }
    const setValue = () => {
      if (this.mode !== 'range') return slider.end = info.props.value
      slider.start = info.props.start
      slider.end = info.props.end
    }
    const updateFrom = () => {
      const formdata = new FormData()
      if (this.mode === 'range') {
        formdata.append(this.name, String(this.start))
        formdata.append(this.name, String(this.end))
      } else {
        formdata.append(this.name, String(this.value))
      }
      info.internals.setFormValue(formdata)
    }
    updateFrom()
    return {
      onAttributeChanged: (name, value) => {
        const marks = ['stepMarks', 'step', 'min', 'max', 'showDivisions']
        if (['mode', 'slidingMode', 'orientation', 'clickable', 'touchScrollPriority', ...marks].includes(name)) (slider as any)[name] = value
        if (marks.includes(name)) useThrottle(setDivisions)
        if (['value', 'start', 'end'].includes(name)) setValue()
      },
      onFormReset: () => {
        this.start = this.defaultStart
        this.end = this.defaultEnd
        this.value = this.defaultValue
      },
      mode: (v) => {
        slider.mode = v
        setValue()
      }
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
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
      $props: HTMLAttributes & Partial<typeof props.values>
    } & Slider
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}