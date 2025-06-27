import { useElement, useProps, useThrottle } from '../core/element.js'
import { Theme } from '../core/theme.js'
import { device } from '../core/device.js'
import './ripple.js'

const name = 's-base-slider'
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
  --base-slider-gap: 3px;
  --base-slider-thumb-size: 16px;
  --base-slider-thumb-width: var(--base-slider-thumb-size);
  --base-slider-thumb-height: var(--base-slider-thumb-size);
}
:host([disabled=true]){
  pointer-events: none !important;
}
slot:is([name=track-start], [name=track-fill], [name=track-end]){
  display: flex;
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  border-radius: 4px;
  height: 100%;
  position: absolute;
  left: 0;
  --s-private-thumb-size: var(--base-slider-thumb-width);
  --s-private-sum: calc(var(--s-private-value) * 1% + var(--s-private-thumb-size) / 2 - var(--s-private-thumb-size) / 100 * var(--s-private-value));
  width: var(--s-private-sum);
}
slot[name=track-fill]{
  --s-private-size: calc(var(--s-private-value-size) * 1% - (var(--s-private-thumb-size) / 100 * var(--s-private-value-size)));
  width: var(--s-private-size);
  left: var(--s-private-sum);
  background: currentColor;
}
slot[name=track-end]{
  right: 0;
  left: auto;
}
slot:is([name=thumb-start], [name=thumb-end]){
  display: flex;
  background: currentColor;
  border-radius: 50%;
  width: var(--base-slider-thumb-width);
  height: var(--base-slider-thumb-height);
  flex-shrink: 0;
  position: absolute;
  left: calc(var(--s-private-value) * 1%);
  transform: translateX(calc(var(--s-private-value) * -1%));
  &::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0;
    background: currentColor;
    transform: scale(1);
    transition-property: transform, opacity;
    transition-timing-function: var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
    transition-duration: var(--s-motion-duration-short4, ${Theme.motionDurationShort4});
  }
}

:host(:is([thumb-start-hovered], [thumb-start-pressed])) slot[name=thumb-start]::before,
:host(:is([thumb-end-hovered], [thumb-end-pressed])) slot[name=thumb-end]::before{
  transform: scale(2);
  opacity: .2;
}
:host([variant=segmented]){
  slot:is([name=track-start], [name=track-end]){
    --s-private-sum: calc(var(--s-private-value) * 1% - (var(--s-private-thumb-size) / 100 * var(--s-private-value)) - var(--base-slider-gap));
  }
  slot[name=track-fill]{
    --s-private-size: calc(var(--s-private-value-size) * 1% - (var(--s-private-thumb-size) / 100 * var(--s-private-value-size)) - var(--base-slider-gap) * 2 - var(--s-private-thumb-size));
    --s-private-sum: calc(var(--s-private-value) * 1% + (var(--s-private-thumb-size) - (var(--s-private-thumb-size) / 100 * var(--s-private-value))) + var(--base-slider-gap));
  }
}
:host([variant=segmented]:is([mode=single], [mode=single-reversed])){
  slot[name=track-fill]{
    --s-private-size: calc(var(--s-private-value-size) * 1% - (var(--s-private-thumb-size) / 100 * var(--s-private-value-size)) - var(--base-slider-gap));
  }
}
:host(:is([mode=single], [mode=single-reversed])){
  slot:is([name=track-start], [name=thumb-start]) {
    display: none;
  }
  slot[name=track-fill]{
    --s-private-size: calc(var(--s-private-value-size) * 1% + var(--s-private-thumb-size) / 2 - var(--s-private-thumb-size) / 100 * var(--s-private-value-size));
    --s-private-sum: 0;
  }
}
:host([mode=single-reversed]){
  slot[name=track-fill]{
    left: auto;
    right: var(--s-private-sum);
  }
  slot[name=track-end]{
    left: 0;
    right: auto;
  }
  slot[name=thumb-end]{
    left: auto;
    right: calc(var(--s-private-value) * 1%);
    transform: translateX(calc(var(--s-private-value) * 1%));
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
    height: var(--s-private-sum);
    --s-private-thumb-size: var(--base-slider-thumb-height);
  }
  slot[name=track-fill]{
    bottom: var(--s-private-sum);
    height: var(--s-private-size);
  }
  slot[name=track-end]{
    inset: auto;
    top: 0;
  }
  slot:is([name=thumb-start], [name=thumb-end]){
    left: auto;
    bottom: calc(var(--s-private-value) * 1%);
    transform: translateY(calc(var(--s-private-value) * 1%));
  }
}
:host([orientation=vertical][mode=single-reversed]){
  slot:is([name=thumb-start], [name=thumb-end]){
    right: auto;
    top: calc(var(--s-private-value) * 1%);
    transform: translateY(calc(var(--s-private-value) * -1%));
  }
  slot[name=track-fill]{
    right: auto;
    top: var(--s-private-sum);
  }
  slot[name=track-end]{
    inset: auto;
    bottom: 0;
  }
}
`

const template = /*html*/`
<slot name="track-start" part="track-start"></slot>
<slot name="track-end" part="track-end"></slot>
<slot name="track-fill" part="track-fill"></slot>
<slot></slot>
<slot name="thumb-start" part="thumb-start"></slot>
<slot name="thumb-end" part="thumb-end"></slot>
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
  props, template, style, focused: true,
  setup(shadowRoot, props) {
    const trackStartSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=track-start]')!
    const trackFillSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=track-fill]')!
    const trackEndSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=track-end]')!
    const thumbStartSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=thumb-start]')!
    const thumbEndSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=thumb-end]')!
    const getPercent = (v: number) => ((v - this.min) / (this.max - this.min)) * 100
    const getSingle = () => ['single', 'single-reversed'].includes(this.mode)
    const getThumb = (xy: number, size: number) => {
      if (getSingle()) return 'end'
      const closer = whichIsCloser((xy / size * 100), getPercent(this.start), getPercent(this.end))
      return (['end', 'start', 'end'] as const)[closer]
    }
    const render = () => {
      const start = findClosestStep(getPercent(this.start), this.step / this.max * 100, 100)
      const end = findClosestStep(getPercent(this.end), this.step / this.max * 100, 100)
      const [first, last] = start < end ? [start, end] : [end, start]
      const name = '--s-private-value'
      trackStartSlot.style.setProperty(name, `${first}`)
      trackEndSlot.style.setProperty(name, `${100 - last}`)
      trackFillSlot.style.setProperty(`${name}-size`, `${last - first}`)
      trackFillSlot.style.setProperty(name, `${first}`)
      thumbStartSlot.style.setProperty(name, `${start}`)
      thumbEndSlot.style.setProperty(name, `${end}`)
    }
    this.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return
      const orientation = getOrientation(this.orientation)
      const rect = this.getBoundingClientRect()
      const size = this[orientation.offset]
      const isVertical = this.orientation === 'vertical'
      const reversed = this.mode === 'single-reversed'
      const getXY = (v: number) => {
        if ((reversed && !isVertical) || (isVertical && !reversed)) return size - v
        return v
      }
      const firstXY = getXY(event[orientation.client] - rect[orientation.rect])
      const key = getThumb(firstXY, size)
      const oldValue = this[key]
      const pressed = `thumb-${key}-pressed`
      this.setAttribute(pressed, '')
      const indicatorSize = { start: thumbStartSlot, end: thumbEndSlot }[key][orientation.offset] / size * 100
      const change = (xy: number) => {
        const offset = Math.min(Math.max(0 + indicatorSize / 2, (xy / size * 100)), 100 - indicatorSize / 2)
        const percent = ((offset - indicatorSize / 2) / (100 - indicatorSize)) * 100
        const newValue = findClosestStep(this.min + (percent / 100) * (this.max - this.min), this.step, this.max)
        const old = this[key]
        this[key] = newValue
        if (old !== newValue) this.dispatchEvent(new Event('input'))
      }
      change(firstXY)
      const move = (event: PointerEvent | TouchEvent) => {
        const e = event instanceof TouchEvent ? event.touches[0] : event
        event.cancelable && event.preventDefault()
        change(getXY(e[orientation.client] - rect[orientation.rect]))
      }
      const eventNames = device.touchEnabled ? { move: 'touchmove', up: 'touchend' } as const : { move: 'pointermove', up: 'pointerup' } as const
      document.addEventListener(eventNames.move, move, { passive: false })
      document.addEventListener(eventNames.up, () => {
        this.removeAttribute(pressed)
        if (oldValue !== this[key]) this.dispatchEvent(new Event('change'))
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
    thumbStartSlot.onmouseenter = () => !device.touchEnabled && this.setAttribute('thumb-start-hovered', '')
    thumbStartSlot.onmouseleave = () => !device.touchEnabled && this.removeAttribute('thumb-start-hovered')
    thumbEndSlot.onmouseenter = () => !device.touchEnabled && this.setAttribute('thumb-end-hovered', '')
    thumbEndSlot.onmouseleave = () => !device.touchEnabled && this.removeAttribute('thumb-end-hovered')
    const update = () => useThrottle(render)
    update()
    return {
      start: { get: () => getSingle() ? 0 : Math.max(Math.min(props.start, props.max), props.min), set: update },
      end: { get: () => Math.max(Math.min(props.end, props.max), props.min), set: update },
      step: { get: () => props.max % props.step === 0 ? props.step : 1, set: update },
      max: { get: () => props.max <= 1 ? 1 : props.max, set: update },
      min: {
        get: () => {
          if (props.min > props.max) return 0
          return props.min % props.step === 0 ? props.min : 0
        },
        set: update
      },
      mode: update
    }
  }
}) { }

BaseSlider.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: BaseSlider
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
    } & BaseSlider
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