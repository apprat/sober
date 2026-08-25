import { useProps, useElement, useThrottle, print } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { bezier } from '../core/utils/bezier.js'

const config = {
  size: 40,
  path: 100,
  duration: 5400,
  segment: 667,
  expand: [0, 1350, 2700, 4050],
  collapse: [667, 2017, 3367, 4717],
  tail: -20,
  extra: 250,
  rotate: 1520
} as const

const ease = bezier(.4, 0, .2, 1)
const fraction = (time: number, delay: number) => {
  if (time <= delay) return 0
  if (time >= delay + config.segment) return 1
  return ease((time - delay) / config.segment)
}
const step = 80
const times = [...new Set([0, config.duration,
  ...[...config.expand, ...config.collapse].flatMap((start) => Array.from({ length: Math.ceil(config.segment / step) + 1 }, (_, i) => Math.min(start + i * step, start + config.segment)))
])].sort((a, b) => a - b)
const animationStyle = { indicator: '', track: '' }
const dashGap = 'var(--s_spinner-dash-gap)'
for (const play of times) {
  let s = config.rotate * play / config.duration + config.tail
  let e = config.rotate * play / config.duration
  for (let i = 0; i < 4; i++) {
    e += fraction(play, config.expand[i]) * config.extra
    s += fraction(play, config.collapse[i]) * config.extra
  }
  s = s / 360
  e = e / 360
  const len = (e - s) * 100
  const off = s * 100
  const t = play / config.duration * 100
  animationStyle.indicator += `${t}%{stroke-dasharray: ${len} ${100 - len}; stroke-dashoffset: ${-off};}`
  animationStyle.track += `${t}%{stroke-dasharray: calc(${100 - len}px - ${dashGap} * 2) calc(${len}px + ${dashGap} * 2);stroke-dashoffset: calc((${off + len}px + ${dashGap}) * -1);}`
}
const indeterminateStyle = `@keyframes indicator{${animationStyle.indicator}}@keyframes track{${animationStyle.track}}`

const props = useProps({
  indeterminate: false,
  $max: 100,
  $value: 0,
  strokeWidth: 4,
  strokeGap: 4,
})

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  transition-property: none;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  color: ${scheme.color.primary};
  stroke: ${scheme.color.secondaryContainer};
}
.layout{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-grow: 1;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  &.min{
    .track{
      stroke-dasharray: 100px 0px;
      stroke-dashoffset: 0px;
    }
    .indicator{
      opacity: 0;
    }
  }
  &.max .track{
    opacity: 0;
  }
}
.icon{
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  display: block;
  transition-timing-function: inherit;
  transition-duration: inherit;
}
.track,
.indicator{
  transform: rotate(-90deg);
  stroke: var(--s-spinner-indicator-color, currentColor);
  opacity: var(--s-spinner-indicator-opacity, 1);
  fill: none;
  stroke-linecap: round;
  transform-origin: center;
  transition-timing-function: inherit;
  transition-duration: inherit;
  stroke-width: var(--s_spinner-stroke-width, 4px);
  transition-property: stroke-dasharray, stroke-dashoffset;
}
.track{
  opacity: var(--s-spinner-track-opacity, 1);
  stroke-dasharray: var(--s_spinner-track-dasharray);
  stroke-dashoffset: var(--s_spinner-track-dashoffset);
  stroke: var(--s-spinner-track-color, inherit);
}
.indicator{
  stroke-dasharray: var(--s_spinner-indicator-dasharray);
}
.text{
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
:host([indeterminate]){
  .track,
  .indicator{
    animation-duration: ${config.duration}ms;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .track{
    animation-name: track;
    opacity: var(--s-spinner-track-opacity, 1);
  }
  .indicator{
    animation-name: indicator;
    opacity: var(--s-spinner-indicator-opacity, 1);
  }
}
`

const template = /*html*/`
<div class="layout min" part="layout">
  <svg class="icon" part="icon" viewBox="0 0 ${config.size} ${config.size}">
    <circle pathLength="${config.path}" cx="20" cy="20" r="18" class="track" part="track"></circle>
    <circle pathLength="${config.path}" cx="20" cy="20" r="18" class="indicator" part="indicator"></circle>
  </svg>
  <div class="text" part="text">
    <slot></slot>
  </div>
</div>
`

export class Spinner extends useElement({
  style: [style, indeterminateStyle], props, template,
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const getGapPerimeter = () => (this.strokeWidth + this.strokeGap) / (Math.PI * (config.size - this.strokeWidth)) * config.path
    const updateGap = () => layout.style.setProperty('--s_spinner-dash-gap', `${getGapPerimeter()}px`)
    updateGap()
    const renderValue = () => {
      const v = Math.min(this.value, this.max) / this.max * 100
      const gap = getGapPerimeter()
      const offset = v + gap
      layout.classList.toggle('min', v === 0)
      layout.classList.toggle('max', offset + gap > 100)
      layout.style.setProperty('--s_spinner-track-dasharray', `${100 - v - gap * 2}px ${v + gap * 2}px`)
      layout.style.setProperty('--s_spinner-track-dashoffset', `${offset * -1}px`)
      layout.style.setProperty('--s_spinner-indicator-dasharray', `${v}px ${100 - v}px`)
    }
    const updateStroke = () => {
      console.log('set w', this.strokeWidth)
      layout.style.setProperty('--s_spinner-stroke-width', `${this.strokeWidth}px`)
      updateGap()
      useThrottle(renderValue)
    }
    return {
      value: () => useThrottle(renderValue),
      strokeWidth: updateStroke,
      strokeGap: updateStroke
    }
  }
}) { }

const name = Spinner.define('s-spinner')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Spinner
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [Alert.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
    } & Spinner
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