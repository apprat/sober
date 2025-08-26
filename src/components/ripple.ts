import { useElement, useProps } from '../core/element.js'
import { device } from '../core/device.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  centered: false
})


const style = /*css*/`
:host{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  .hover{
    position: absolute;
    inset: 0;
    content: '';
    opacity: 0;
    background: var(--ripple-color, currentColor);
    transition: opacity var(--s-motion-duration-short4, ${scheme.motion.duration.short4}) var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  }
  .hovered{
    opacity: var(--ripple-hover-opacity, .08);
  }
  .ripple{
    position: absolute;
    inset: 0;
    opacity: 0;
    border-radius: 50%;
    background: currentColor;
    filter: opacity(var(--ripple-opacity, .18));
    animation-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
    animation-duration: var(--s-motion-duration-long4, ${scheme.motion.duration.long4});
  }
}
`

const template = /*html*/`
<div class="hover" part="hover"></div>
<div class="ripple" part="ripple"></div>
`

export class Ripple extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const ripple = shadowRoot.querySelector<HTMLDivElement>('.ripple')!
    const hover = shadowRoot.querySelector<HTMLDivElement>('.hover')!
    const computedStyle = useComputedStyle(ripple)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('animation-timing-function')
      const duration = computedStyle.getDuration('animation-duration')
      return { easing, duration }
    }
    const run = (event: PointerEvent, parent: HTMLElement) => {
      let size = Math.sqrt(parent.offsetWidth ** 2 + parent.offsetHeight ** 2)
      const coordinate = { x: '50%', y: '50%' }
      if (!this.centered) {
        const { left, top } = parent.getBoundingClientRect()
        const state = { x: event.clientX - left, y: event.clientY - top, h: parent.offsetHeight / 2, w: parent.offsetWidth / 2 }
        const edgeW = (Math.abs(state.h - state.y) + state.h) * 2
        const edgeH = (Math.abs(state.w - state.x) + state.w) * 2
        size = Math.sqrt(edgeW ** 2 + edgeH ** 2)
        coordinate.x = `${state.x}px`
        coordinate.y = `${state.y}px`
      }
      let newRipple = ripple
      if (newRipple.getAnimations().length > 0) {
        newRipple = ripple.cloneNode() as HTMLDivElement
        shadowRoot.appendChild(newRipple)
      }
      const animateOptions = getAnimateOptions()
      parent.setAttribute('ripple-pressed', '')
      const animation = newRipple.animate({
        opacity: [1, 1],
        width: [`${size}px`, `${size}px`],
        height: [`${size}px`, `${size}px`],
        transform: ['translate(-50%, -50%) scale(0)', 'translate(-50%, -50%) scale(1)'],
        left: [coordinate.x, coordinate.x],
        top: [coordinate.y, coordinate.y],
      }, { ...animateOptions, fill: 'forwards' })
      return () => {
        parent.removeAttribute('ripple-pressed')
        const time = Number(animation.currentTime)
        const short = animateOptions.duration / 2
        const diff = animateOptions.duration - short
        const duration = time > diff ? short : animateOptions.duration - time
        const animate = newRipple.animate({ opacity: [1, 0] }, { ...animateOptions, duration, easing: animateOptions.easing, fill: 'forwards' })
        animate.finished.then(() => newRipple !== ripple && shadowRoot.removeChild(newRipple))
      }
    }
    function down(this: HTMLElement, event: PointerEvent) {
      if (event.button !== 0) return
      if (event.pointerType !== 'touch') return document.addEventListener('pointerup', run(event, this), { once: true })
      let stop: Function
      const timer = setTimeout(() => stop = run(event, this), 40)
      const move = () => {
        if (stop) return document.removeEventListener('touchmove', move)
        clearTimeout(timer)
      }
      const remove = () => {
        stop?.()
        document.removeEventListener('touchmove', move)
        document.removeEventListener('touchend', remove)
      }
      document.addEventListener('touchmove', move, { passive: true })
      document.addEventListener('touchend', remove, { passive: true })
    }
    function hovering(this: HTMLElement, event: MouseEvent) {
      if (device.touchEnabled) return
      this.setAttribute('ripple-hovered', '')
      hover.classList.add('hovered')
    }
    function unHovering(this: HTMLElement, event: MouseEvent) {
      if (device.touchEnabled) return
      this.removeAttribute('ripple-hovered')
      hover.classList.remove('hovered')
    }
    return {
      onMounted: (parent) => {
        const parentElement = parent instanceof ShadowRoot ? parent.host : parent
        if (!(parentElement instanceof HTMLElement)) return
        parentElement.addEventListener('pointerdown', down)
        parentElement.addEventListener('mouseenter', hovering)
        parentElement.addEventListener('mouseleave', unHovering)
        return () => {
          parentElement.removeEventListener('pointerdown', down)
          parentElement.removeEventListener('mouseenter', hovering)
          parentElement.removeEventListener('mouseleave', unHovering)
        }
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
    } & Ripple
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