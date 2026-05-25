import { useElement, useProps } from '../core/elements.js'
import { device } from '../core/device.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import { oneEvent } from '../core/utils/oneEvent.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  disabled: false,
  hoverDisabled: false,
  $ancestorLevel: -1,
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
  animation-timing-function: ${scheme.motion.easing.standard};
  animation-duration: ${scheme.motion.duration.long4};
  transition-duration: ${scheme.motion.duration.short4};
}
.hover,
.container,
.ripple{
  position: absolute;
  inset: 0;
  animation-timing-function: inherit;
  animation-duration: inherit;
}
.hover{
  opacity: 0;
  transition-property: opacity;
  background: var(--s-ripple-color, currentColor);
  &.hovered{
    opacity: var(--s-ripple-hover-opacity, .08);
  }
}
.ripple{
  opacity: 0;
  border-radius: 50%;
  background: var(--s-ripple-color, currentColor);
  filter: opacity(var(--s-ripple-opacity, .1));
}
`

const template = /*html*/`
<slot></slot>
<div class="container" part="container">
  <div class="hover" part="hover"></div>
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
    const hover = shadowRoot.querySelector<HTMLDivElement>('.hover')!
    const computedStyle = useComputedStyle(ripple)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('animation-timing-function')
      const duration = computedStyle.getDuration('animation-duration')
      return { easing, duration }
    }
    const start = (event: PointerEvent) => {
      const cssDisabled = computedStyle.getValue('--s-ripple-disabled')
      const rippled = ['', 'none'].includes(cssDisabled) ? this.disabled : Boolean(cssDisabled)
      if (rippled || event.button !== 0) return
      const run = (event: PointerEvent) => startRipple({ root: this, ripple, container, event, animateOptions: getAnimateOptions() })
      if (event.pointerType === 'mouse') return document.addEventListener('pointerup', run(event), { once: true })
      const cssDelay = computedStyle.getValue('--s-ripple-delay')
      const delay = ['', 'none'].includes(cssDelay) ? this.delay : Number(cssDelay)
      if (delay <= 0) return document.addEventListener('touchend', run(event), { once: true })
      let stop: Function | null = null
      const timer = setTimeout(() => stop = run(event), delay)
      const calcel = (e: TouchEvent) => {
        clearTimeout(timer)
        stop && stop()
        if (e.type === 'touchmove') return
        !stop && run(event)()
      }
      oneEvent([{ element: document, events: ['touchcancel', 'touchmove', 'touchend'] }], calcel)
    }
    const hovering = (event: MouseEvent) => {
      if (!device.mouseEnabled) return
      const force = event.type === 'mouseenter'
      const cssDisabled = computedStyle.getValue('--s-ripple-hover-disabled')
      const hovered = ['', 'none'].includes(cssDisabled) ? this.hoverDisabled : Boolean(cssDisabled)
      !hovered && hover.classList.toggle('hovered', force)
      info.parentNode?.toggleAttribute('hovered', force)
    }
    const down = (event: PointerEvent) => {
      if (!info.parentNode) return
      event.button === 0 && info.parentNode?.setAttribute('pressed', '')
      document.addEventListener(event.pointerType === 'mouse' ? 'mouseup' : 'touchend', () => info.parentNode?.removeAttribute('pressed'), { once: true })
      start(event)
    }
    const addEvent = () => {
      if (!info.parentNode) return
      let parent = info.parentNode
      if (this.ancestorLevel > -1 && this.parentNode) {
        let ancestor: HTMLElement = this
        for (let i = -1; i < this.ancestorLevel; i++) {
          if (ancestor.assignedSlot) {
            ancestor = ancestor.assignedSlot
            continue
          }
          if (!ancestor.parentNode) return
          if (ancestor.parentNode instanceof ShadowRoot) {
            const host = ancestor.parentNode.host
            if (!(host instanceof HTMLElement)) return
            ancestor = host
            continue
          }
          if (!(ancestor.parentNode instanceof HTMLElement)) return
          ancestor = ancestor.parentNode
        }
        parent = ancestor
      }
      parent.addEventListener('mouseenter', hovering)
      parent.addEventListener('mouseleave', hovering)
      parent.addEventListener('pointerdown', down)
      info.parentNode = parent
    }
    const removeEvent = () => {
      info.parentNode?.removeEventListener('mouseenter', hovering)
      info.parentNode?.removeEventListener('mouseleave', hovering)
      info.parentNode?.removeEventListener('pointerdown', down)
    }
    return {
      onMounted: addEvent,
      onUnmounted: removeEvent,
      ancestorLevel: () => {
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