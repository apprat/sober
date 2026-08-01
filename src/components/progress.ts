import { useProps, useElement, useThrottle } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { bezier } from '../core/utils/bezier.js'

const config = {
  duration: 1800,
  gap: 4,
  fps: 60,
} as const

const animations = [[1267, 533, bezier(0.2, 0, 0.8, 1)], [1000, 567, bezier(0.4, 0, 1, 1)], [333, 850, bezier(0, 0, 0.65, 1)], [0, 750, bezier(0.1, 0, 0.45, 1)]] as const
const getAnimationValue = (elapsed: number, delay: number, duration: number, easing: ReturnType<typeof bezier>) => {
  if (elapsed <= delay) return 0
  if (elapsed >= delay + duration) return 1
  return easing((elapsed - delay) / duration)
}
const formatNumber = (value: number) => Number(value.toFixed(5))
const createSegmentStyle = (start: number, end: number, startGap = 0, endGap = 0) => {
  if (end <= start) return 'left:0;width:0;visibility:hidden;'
  const left = `calc(${formatNumber(start * 100)}% + ${startGap}px)`
  const width = `max(0px,calc(${formatNumber((end - start) * 100)}% - ` + `${startGap + endGap}px))`
  return `left:${left};width:${width};visibility:visible;`
}
const getFrame = (elapsed: number) => {
  const [lateStart, lateEnd, earlyStart, earlyEnd] = animations.map(([delay, duration, easing]) => getAnimationValue(elapsed, delay, duration, easing))
  return [
    createSegmentStyle(0, lateStart, 0, config.gap),
    createSegmentStyle(lateStart, lateEnd),
    createSegmentStyle(lateEnd, earlyStart, lateEnd > 0 ? config.gap : 0, earlyStart < 1 ? config.gap : 0),
    createSegmentStyle(earlyStart, earlyEnd),
    createSegmentStyle(earlyEnd, 1, earlyEnd > 0 ? config.gap : 0)
  ]
}
const segments = [0, 1, 2, 3, 4] as const
const createKeyframes = () => {
  const count = Math.round((config.duration / 1000) * config.fps)
  const rules = segments.map((_, index) => `@keyframes indeterminate-${index}{`)
  for (let i = 0; i <= count; i++) {
    const progress = i / count
    const percentage = formatNumber(progress * 100)
    const styles = getFrame(progress * config.duration)
    styles.forEach((style, index) => rules[index] += `${percentage}%{${style}}`)
  }
  return rules.map((rule) => `${rule}}`).join('')
}

const indeterminateStyle = createKeyframes()

const props = useProps({
  indeterminate: false,
  $max: 100,
  $value: 0,
})

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  height: 4px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  overflow: hidden;
  color: ${scheme.color.primary};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.layout{
  display: contents;
  border-radius: inherit;
  border-color: inherit;
  &::before,
  &::after,
  .track,
  .indicator{
    position: absolute;
    border-radius: inherit;
    contain: strict;
    inset: 0;
    will-change: transform;
    background: ${scheme.color.secondaryContainer};
  }
  .indicator{
    background: currentColor;
  }
  .late{
    transform: translateX(-100%);
  }
  .early{
    transform: translateX(calc(var(--s_progress-value) + 4px));
  }
  .between{
    transform: translateX(calc((100% - var(--s_progress-value)) * -1));
  }
  &.min .early{
    transform: translateX(0%);
  }
}
.stop{
  position: absolute;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  height: 100%;
  right: 0;
  border-radius: 50%;
  background: currentColor;
}
:host([size=large]){
  height: 8px;
  border-radius: 4px;
}
:host([indeterminate]){
  .stop{
    display: none;
  }
  .layout{
    &::before,
    &::after,
    .track,
    .indicator{
      content: '';
      transform: none;
      height: 100%;
      contain: strict;
      animation-duration: ${config.duration}ms;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-fill-mode: both;
    }
    &::before{
      animation-name: indeterminate-0;
    }
    .late{
      animation-name: indeterminate-1;
    }
    .early{
      animation-name: indeterminate-2;
    }
    .between{
      animation-name: indeterminate-3;
    }
    &::after{
      animation-name: indeterminate-4;
    }
  }
}
`

const template = /*html*/`
<div class="layout min" part="layout">
  <div class="indicator late" part="late"></div>
  <div class="track early" part="early"></div>
  <div class="indicator between" part="between"></div>
</div>
<div class="stop" part="stop"></div>
`

export class Progress extends useElement({
  style: [style, indeterminateStyle], props, template,
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const rander = () => {
      layout.classList.toggle('min', this.value === 0)
      layout.style.setProperty('--s_progress-value', `${Math.min(this.value, this.max) / this.max * 100}%`)
    }
    return {
      value: () => useThrottle(rander)
    }
  }
}) { }

const name = Progress.define('s-progress')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Progress
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
    } & Progress
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