import { useElement, useProps, getParentDepth } from '../core/elements.js'
import { device } from '../core/device.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import { oneEvent } from '../core/utils/one-event.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  disabled: false,
  disabledHover: false,
  $parentDepth: -1,
  $delay: 0
})

const events = {
  opened: Event,
  closed: Event
}

const style = /*css*/`
:host{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  transition-property: none;
  transition-duration: ${scheme.motion.duration.short4};
  animation-duration: ${scheme.motion.duration.long4};
  animation-timing-function: ${scheme.motion.easing.standard};
}
.mask,
.container,
.ripple{
  position: absolute;
  inset: 0;
  animation-timing-function: inherit;
  animation-duration: inherit;
}
.mask{
  opacity: 0;
  transition-property: opacity;
  background: var(--s-ripple-color, currentColor);
  &.hover{
    opacity: var(--s-ripple-hover-opacity, .08);
  }
}
.ripple{
  opacity: 0;
  border-radius: 50%;
  background: var(--s-ripple-color, currentColor);
  filter: opacity(var(--s-ripple-opacity, .1));
}
@media (prefers-reduced-motion: reduce) {
  :host{
    animation-duration: 0s;
    transition-duration: 0s;
  }
}
`

const template = /*html*/`
<slot></slot>
<div class="container" part="container">
  <div class="mask" part="mask"></div>
  <div class="ripple" part="ripple"></div>
</div>
`

const startRipple = (options: {
  root: HTMLElement,
  ripple: HTMLElement,
  container: HTMLDivElement,
  event: PointerEvent,
  animateOptions: { duration: number, easing: string }
}) => {
  let size = Math.sqrt(options.container.offsetWidth ** 2 + options.container.offsetHeight ** 2)
  const rect = options.container.getBoundingClientRect()
  const x = Math.max(rect.left, Math.min(options.event.clientX, rect.left + rect.width))
  const y = Math.max(rect.top, Math.min(options.event.clientY, rect.top + rect.height))
  const state = { x: x - rect.left, y: y - rect.top, h: rect.height / 2, w: rect.width / 2 }
  const edgeW = (Math.abs(state.h - state.y) + state.h) * 2
  const edgeH = (Math.abs(state.w - state.x) + state.w) * 2
  size = Math.sqrt(edgeW ** 2 + edgeH ** 2)
  const coordinate = { x: `${state.x}px`, y: `${state.y}px` }
  let newRipple = options.ripple
  if (newRipple.getAnimations().length > 0) {
    newRipple = options.ripple.cloneNode() as HTMLDivElement
    options.container.appendChild(newRipple)
  }
  const animation = newRipple.animate({
    opacity: [1, 1],
    width: [`${size}px`, `${size}px`],
    height: [`${size}px`, `${size}px`],
    transform: ['translate(-50%, -50%) scale(0)', 'translate(-50%, -50%) scale(1)'],
    left: [coordinate.x, coordinate.x],
    top: [coordinate.y, coordinate.y],
  }, { ...options.animateOptions, fill: 'forwards' })
  animation.finished.then(() => options.root.dispatchEvent(new Event('opened')))
  options.root.dispatchEvent(new Event('open'))
  return () => {
    const time = Number(animation.currentTime)
    const short = options.animateOptions.duration / 2
    const diff = options.animateOptions.duration - short
    const duration = time > diff ? short : options.animateOptions.duration - time
    const animate = newRipple.animate({ opacity: [1, 0] }, { ...options.animateOptions, duration, easing: options.animateOptions.easing, fill: 'forwards' })
    animate.finished.then(() => newRipple !== options.ripple && newRipple.isConnected && options.container.removeChild(newRipple))
    animate.finished.then(() => options.root.dispatchEvent(new Event('closed')))
    options.root.dispatchEvent(new Event('close'))
  }
}

export class Ripple extends useElement({
  style, template, props, events,
  setup(shadowRoot, info) {
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const ripple = shadowRoot.querySelector<HTMLDivElement>('.ripple')!
    const mask = shadowRoot.querySelector<HTMLDivElement>('.mask')!
    const computedStyle = useComputedStyle(ripple)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('animation-timing-function')
      const duration = computedStyle.getDuration('animation-duration')
      return { easing, duration }
    }
    const start = (event: PointerEvent) => {
      const cssDisabled = computedStyle.getValue('--s-ripple-disabled')
      const disabled = ['', 'none'].includes(cssDisabled) ? this.disabled : Boolean(cssDisabled)
      if (disabled) return
      const run = (event: PointerEvent) => startRipple({ root: this, ripple, container, event, animateOptions: getAnimateOptions() })
      if (event.pointerType === 'mouse') return oneEvent([{ element: document, events: ['pointerup', 'pointercancel'] }], run(event))
      const cssDelay = computedStyle.getValue('--s-ripple-delay')
      const delay = ['', 'none'].includes(cssDelay) ? this.delay : Number(cssDelay)
      if (delay <= 0) return oneEvent([{ element: document, events: ['touchcancel', 'touchend'] }], run(event))
      let stop: Function | null = null
      const timer = setTimeout(() => stop = run(event), delay)
      const cancel = (e: TouchEvent) => {
        clearTimeout(timer)
        stop && stop()
        if (e.type === 'touchmove') return
        !stop && run(event)()
      }
      oneEvent([{ element: document, events: ['touchcancel', 'touchmove', 'touchend'] }], cancel)
    }
    const hovering = (event: PointerEvent) => {
      if (!device.mouseEnabled || event.pointerType !== 'mouse') return
      const force = event.type === 'pointerenter'
      const cssDisabled = computedStyle.getValue('--s-ripple-disabled-hover')
      const hover = ['', 'none'].includes(cssDisabled) ? this.disabledHover : Boolean(cssDisabled)
      !hover && mask.classList.toggle('hover', force)
      info.parentNode?.toggleAttribute('hover', force)
    }
    const down = (event: PointerEvent) => {
      if (!info.parentNode || event.button !== 0) return
      info.parentNode?.setAttribute('pressed', '')
      const remove = () => {
        info.parentNode?.removeAttribute('pressed')
        document.removeEventListener('pointerup', remove)
        document.removeEventListener('pointercancel', remove)
      }
      document.addEventListener('pointerup', remove)
      document.addEventListener('pointercancel', remove)
      if (event.pointerType === 'mouse' && !device.mouseEnabled) return
      start(event)
    }
    const addEvent = () => {
      if (!info.parentNode) return
      let parent = getParentDepth(this) || info.parentNode
      parent.addEventListener('pointerenter', hovering)
      parent.addEventListener('pointerleave', hovering)
      parent.addEventListener('pointercancel', hovering)
      parent.addEventListener('pointerdown', down)
      info.parentNode = parent
    }
    const removeEvent = () => {
      info.parentNode?.removeEventListener('pointerenter', hovering)
      info.parentNode?.removeEventListener('pointerleave', hovering)
      info.parentNode?.removeEventListener('pointercancel', hovering)
      info.parentNode?.removeEventListener('pointerdown', down)
    }
    return {
      onMounted: addEvent,
      onUnmounted: removeEvent,
      parentDepth: () => {
        removeEvent()
        addEvent()
      }
    }
  }
}) { }

const name = Ripple.define('s-ripple')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Ripple
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
    } & Ripple
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