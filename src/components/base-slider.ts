import { useElement, useProps, useThrottle } from '../core/element.js'
import { Theme } from '../core/theme.js'
import { device } from '../core/device.js'
import './ripple.js'

const props = useProps({
  $start: 0,
  $end: 50,
  $step: 1,
  $min: 0,
  $max: 100,
  disabled: false,
  mode: ['range', 'single', 'single-reversed'],
  variant: ['standard', 'segmented'],
  orientation: ['horizontal', 'vertical'],
})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8px;
  cursor: pointer;
  position: relative;
  color: var(--s-color-primary, ${Theme.colorPrimary});
  transition-property: none;
  transition-timing-function: var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
  transition-duration: var(--s-motion-duration-short4, ${Theme.motionDurationShort4});
  --base-slider-gap: 3px;
  --base-slider-thumb-size: 16px;
  --base-slider-thumb-width: var(--base-slider-thumb-size);
  --base-slider-thumb-height: var(--base-slider-thumb-size);
  --base-slider-thumb-start-width: var(--base-slider-thumb-width);
  --base-slider-thumb-start-height: var(--base-slider-thumb-height);
  --base-slider-thumb-end-width: var(--base-slider-thumb-width);
  --base-slider-thumb-end-height: var(--base-slider-thumb-height);
}
:host([disabled=true]){
  pointer-events: none !important;
}
.layuot{
  all: inherit;
  display: contents;
}
slot:is([name=track-start], [name=track-fill], [name=track-end], [name=thumb-start], [name=thumb-end]){
  display: flex;
  justify-content: center;
  align-items: center;
  transition-property: inherit;
  transition-timing-function: inherit;
  transition-duration: inherit;
  box-sizing: border-box;
  flex-shrink: 0;
  position: absolute;
}
slot:is([name=track-start], [name=track-fill], [name=track-end]){
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  border-radius: 4px;
  height: 100%;
  left: 0;
  --s-private-thumb-start-size: var(--base-slider-thumb-start-width);
  --s-private-thumb-end-size: var(--base-slider-thumb-end-width);
  --s-private-start-offset: calc((0px - var(--s-private-thumb-start-size) / 2) / 50 * var(--s-private-start) + var(--s-private-thumb-start-size) / 2);
  --s-private-end-offset: calc((0px - var(--s-private-thumb-end-size) / 2) / 50 * var(--s-private-end) + var(--s-private-thumb-end-size) / 2);
}
slot[name=track-start]{
  --s-private-size: calc(var(--s-private-start) * 1% + var(--s-private-start-offset));
  width: var(--s-private-size);
}
slot[name=track-fill]{
  --s-private-position: calc(var(--s-private-start) * 1% + var(--s-private-start-offset));
  --s-private-size: calc(var(--s-private-diff) * 1% - var(--s-private-start-offset) + var(--s-private-end-offset));
  width: var(--s-private-size);
  left: var(--s-private-position);
  background: currentColor;
}
slot[name=track-end]{
  --s-private-size: calc((100 - var(--s-private-end)) * 1% - var(--s-private-end-offset));
  width: var(--s-private-size);
  right: 0;
  left: auto;
}
slot:is([name=thumb-start], [name=thumb-end]){
  background: currentColor;
  border-radius: 50%;
  &::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    opacity: 0;
    background: currentColor;
    transform: scale(1);
    transition-property: transform, opacity;
    transition-timing-function: inherit;
    transition-duration: inherit;
  }
}
slot[name=thumb-start]{
  width: var(--base-slider-thumb-start-width);
  height: var(--base-slider-thumb-start-height);
  left: calc(var(--s-private-start) * 1%);
  transform: translateX(calc(var(--s-private-start) * -1%));
}
slot[name=thumb-end]{
  width: var(--base-slider-thumb-end-width);
  height: var(--base-slider-thumb-end-height);
  left: calc(var(--s-private-end) * 1%);
  transform: translateX(calc(var(--s-private-end) * -1%));
}
:host(:is([start-hovered], [start-pressed])) slot[name=thumb-start]::before,
:host(:is([end-hovered], [end-pressed])) slot[name=thumb-end]::before{
  transform: scale(2);
  opacity: .2;
}
:host([variant=segmented]){
  slot:is([name=track-start], [name=track-fill], [name=track-end]){
    --s-private-start-offset: calc((0px - var(--s-private-thumb-start-size) / 2) / 50 * var(--s-private-start) + var(--s-private-thumb-start-size) + var(--base-slider-gap));
    --s-private-end-offset: calc((0px - var(--s-private-thumb-end-size) / 2) / 50 * var(--s-private-end) + var(--s-private-thumb-end-size) / 2);
  }
  slot[name=track-start]{
    --s-private-size: calc(var(--s-private-start) * 1% + var(--s-private-start-offset) - var(--base-slider-gap) * 2 - var(--s-private-thumb-start-size));
  }
  slot[name=track-fill]{
    --s-private-position: calc(var(--s-private-start) * 1% + var(--s-private-start-offset));
    --s-private-size: calc(var(--s-private-diff) * 1% - var(--s-private-start-offset) + var(--s-private-end-offset) - var(--s-private-thumb-end-size) / 2 - var(--base-slider-gap));
  }
  slot[name=track-end]{
    --s-private-size: calc((100 - var(--s-private-end)) * 1% - var(--s-private-end-offset) - var(--s-private-thumb-end-size) / 2 - var(--base-slider-gap));
  }
}
:host([variant=segmented]:is([mode=single], [mode=single-reversed])){
  slot[name=track-fill]{
    --s-private-size: calc(var(--s-private-diff) * 1% + var(--s-private-end-offset) - var(--s-private-thumb-end-size) / 2 - var(--base-slider-gap));
  }
}
:host(:is([mode=single], [mode=single-reversed])){
  slot:is([name=track-start], [name=thumb-start]) {
    display: none;
  }
  slot[name=track-fill]{
    --s-private-position: 0px;
    --s-private-size: calc(var(--s-private-diff) * 1% + var(--s-private-end-offset));
  }
}
:host([mode=single-reversed]){
  slot[name=track-fill]{
    left: auto;
    right: var(--s-private-position);
  }
  slot[name=track-end]{
    left: 0;
    right: auto;
  }
  slot[name=thumb-end]{
    left: auto;
    right: calc(var(--s-private-end) * 1%);
    transform: translateX(calc(var(--s-private-end) * 1%));
  }
}
:host([orientation=vertical]){
  width: 8px;
  height: 300px;
  display: inline-flex;
  vertical-align: middle;
  slot:is([name=track-start], [name=track-fill], [name=track-end]){
    width: 100%;
    left: auto;
    bottom: 0;
    height: var(--s-private-size);
    --s-private-thumb-start-size: var(--base-slider-thumb-start-height);
    --s-private-thumb-end-size: var(--base-slider-thumb-end-height);
  }
  slot[name=track-fill]{
    bottom: var(--s-private-position);
    height: var(--s-private-size);
  }
  slot[name=track-end]{
    inset: auto;
    top: 0;
  }
  slot:is([name=thumb-start], [name=thumb-end]){
    left: auto;
    right: auto;
  }
  slot[name=thumb-start]{
    bottom: calc(var(--s-private-start) * 1%);
    transform: translateY(calc(var(--s-private-start) * 1%));
  }
  slot[name=thumb-end]{
    bottom: calc(var(--s-private-end) * 1%);
    transform: translateY(calc(var(--s-private-end) * 1%));
  }
}
:host([orientation=vertical][mode=single-reversed]){
  slot:is([name=thumb-start], [name=thumb-end]){
    right: auto;
    top: calc(var(--s-private-end) * 1%);
    transform: translateY(calc(var(--s-private-end) * -1%));
  }
  slot[name=track-fill]{
    right: auto;
    top: var(--s-private-position);
  }
  slot[name=track-end]{
    inset: auto;
    bottom: 0;
  }
}
`

const template = /*html*/`
<div class="layuot" part="layuot">
  <slot name="track-start" part="track-start"></slot>
  <slot name="track-end" part="track-end"></slot>
  <slot part="custom"></slot>
  <slot name="track-fill" part="track-fill"></slot>
  <slot name="thumb-start" part="thumb-start"></slot>
  <slot name="thumb-end" part="thumb-end"></slot>
</div>
`

const whichIsCloser = (v: number, start: number, end: number) => {
  const toSatart = Math.abs(v - start)
  const toEnd = Math.abs(v - end)
  return toSatart < toEnd ? 1 : toEnd < toSatart ? 2 : 0
}
const findClosestStep = (num: number, step: number, max: number) => {
  const res = Math.max(0, Math.min(max / step, Math.round(num / step)))
  return res * step
}
const getOrientation = (orientation: 'horizontal' | 'vertical') => {
  const data = {
    horizontal: { offset: 'offsetWidth', rect: 'left', client: 'clientX' },
    vertical: { offset: 'offsetHeight', rect: 'top', client: 'clientY' }
  } as const
  return data[orientation]
}

export class BaseSlider extends useElement({
  name: 's-base-slider',
  props, template, style, focused: true,
  setup(shadowRoot, props) {
    const layuot = shadowRoot.querySelector<HTMLDivElement>('.layuot')!
    const thumbStartSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=thumb-start]')!
    const thumbEndSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=thumb-end]')!
    const getPercent = (v: number) => ((v - this.min) / (this.max - this.min)) * 100
    const getSingle = () => ['single', 'single-reversed'].includes(this.mode)
    const render = () => {
      const [start, end] = [
        findClosestStep(getPercent(this.start), this.step / this.max * 100, 100),
        findClosestStep(getPercent(this.end), this.step / this.max * 100, 100)
      ].sort((a, b) => a - b)
      const name = '--s-private'
      layuot.style.setProperty(`${name}-diff`, `${end - start}`)
      layuot.style.setProperty(`${name}-start`, `${start}`)
      layuot.style.setProperty(`${name}-end`, `${end}`)
    }
    this.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return
      const orientation = getOrientation(this.orientation)
      const state = {
        rect: this.getBoundingClientRect(),
        size: this[orientation.offset],
        isVertical: this.orientation === 'vertical',
        reversed: this.mode === 'single-reversed',
        key: 'end' as 'start' | 'end',
        oldStart: this.start,
        oldEnd: this.end,
        singled: getSingle()
      }
      const getPosition = (v: number) => {
        if ((state.reversed && !state.isVertical) || (state.isVertical && !state.reversed)) return state.size - v
        return v
      }
      const firstPosition = getPosition(event[orientation.client] - state.rect[orientation.rect])
      if (!state.singled) {
        const closer = whichIsCloser((firstPosition / state.size * 100), getPercent(this.start), getPercent(this.end))
        state.key = (['end', 'start', 'end'] as const)[closer]
      }
      this.setAttribute('pressed', '')
      this.setAttribute(`${state.key}-pressed`, '')
      const change = (xy: number, call?: (v: number) => void) => {
        const indicatorSize = { start: thumbStartSlot, end: thumbEndSlot }[state.key][orientation.offset] / state.size * 100
        const offset = Math.min(Math.max(0 + indicatorSize / 2, (xy / state.size * 100)), 100 - indicatorSize / 2)
        const percent = ((offset - indicatorSize / 2) / (100 - indicatorSize)) * 100
        const newValue = findClosestStep(this.min + (percent / 100) * (this.max - this.min), this.step, this.max)
        const old = this[state.key]
        if (old !== newValue) {
          call?.(newValue)
          this[state.key] = newValue
          render()
          this.dispatchEvent(new Event('input'))
        }
      }
      change(firstPosition)
      const move = (event: PointerEvent | TouchEvent) => {
        const e = event instanceof TouchEvent ? event.touches[0] : event
        event.cancelable && event.preventDefault()
        const xy = getPosition(e[orientation.client] - state.rect[orientation.rect])
        this.setAttribute('moving', '')
        change(xy, (v) => {
          if (state.singled) return
          const is = {
            start: { before: v <= props.end, after: v > props.end },
            end: { before: v < props.start, after: v >= props.start },
          }[state.key]
          this.toggleAttribute('start-pressed', is.before)
          this.toggleAttribute('end-pressed', is.after)
        })
      }
      const eventNames = device.touchEnabled ? { move: 'touchmove', up: 'touchend' } as const : { move: 'pointermove', up: 'pointerup' } as const
      document.addEventListener(eventNames.move, move, { passive: false })
      document.addEventListener(eventNames.up, () => {
        this.removeAttribute('start-pressed')
        this.removeAttribute('end-pressed')
        this.removeAttribute('moving')
        this.removeAttribute('pressed')
        if (props.start > props.end) {
          const start = props.start
          const end = props.end
          props.start = end
          props.end = start
        }
        if (state.oldStart !== this.start || state.oldEnd !== this.end) this.dispatchEvent(new Event('change'))
        document.removeEventListener(eventNames.move, move)
      }, { once: true })
    })
    this.addEventListener('keydown', (event) => {
      const map = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'] as const
      let key = event.key as typeof map[number]
      if (!map.includes(key)) return
      event.preventDefault()
      const reversed = () => {
        if (this.mode === 'single-reversed') {
          const map = { ArrowLeft: 'ArrowRight', ArrowRight: 'ArrowLeft' } as const
          key = map[key as keyof typeof map] ?? key
        }
      }
      reversed()
      if (this.orientation === 'vertical') {
        const map = { ArrowLeft: 'ArrowUp', ArrowRight: 'ArrowDown', ArrowUp: 'ArrowRight', ArrowDown: 'ArrowLeft' } as const
        key = map[key]
        reversed()
      }
      const call = {
        ArrowLeft: () => this.end = this.end - this.step,
        ArrowRight: () => this.end = this.end + this.step,
        ArrowUp: () => this.start = this.start - this.step,
        ArrowDown: () => this.start = this.start + this.step
      }
      call[key]()
    })
    thumbStartSlot.onmouseenter = () => !device.touchEnabled && this.setAttribute('start-hovered', '')
    thumbStartSlot.onmouseleave = () => !device.touchEnabled && this.removeAttribute('start-hovered')
    thumbEndSlot.onmouseenter = () => !device.touchEnabled && this.setAttribute('end-hovered', '')
    thumbEndSlot.onmouseleave = () => !device.touchEnabled && this.removeAttribute('end-hovered')
    useThrottle(render)
    return {
      onAttributeChanged: (name) => ['start', 'end', 'max', 'min', 'step'].includes(name) && useThrottle(render),
      getStart: () => {
        if (getSingle()) return 0
        return Math.max(Math.min(props.start, props.max), props.min)
      },
      getEnd: () => Math.min(Math.max(props.end, props.min), props.max),
      getStep: () => props.max % props.step === 0 ? props.step : 1,
      getMax: () => props.max <= 1 ? 1 : props.max,
      getMin: () => {
        if (props.min > props.max) return 0
        return props.min % props.step === 0 ? props.min : 0
      }
    }
  }
}) { }


declare global {
  interface HTMLElementTagNameMap {
    [BaseSlider.tagName]: BaseSlider
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [BaseSlider.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [BaseSlider.tagName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & BaseSlider
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [BaseSlider.tagName]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [BaseSlider.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [BaseSlider.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}