import { useElement, useProps } from '../core/element.js'
import { device } from '../core/device.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  centered: false,
  disabled: false
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
}
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
`

const template = /*html*/`
<slot></slot>
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
    const state = { parent: undefined as HTMLElement | undefined }
    const run = (event: PointerEvent) => {
      if (!state.parent) throw new Error('No parent element')
      let size = Math.sqrt(this.offsetWidth ** 2 + this.offsetHeight ** 2)
      const coordinate = { x: '50%', y: '50%' }
      if (!this.centered) {
        const rect = this.getBoundingClientRect()
        const x = Math.max(rect.left, Math.min(event.clientX, rect.left + rect.width))
        const y = Math.max(rect.top, Math.min(event.clientY, rect.top + rect.height))
        const state = { x: x - rect.left, y: y - rect.top, h: rect.height / 2, w: rect.width / 2 }
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
      state.parent.setAttribute('ripple-pressed', '')
      const animation = newRipple.animate({
        opacity: [1, 1],
        width: [`${size}px`, `${size}px`],
        height: [`${size}px`, `${size}px`],
        transform: ['translate(-50%, -50%) scale(0)', 'translate(-50%, -50%) scale(1)'],
        left: [coordinate.x, coordinate.x],
        top: [coordinate.y, coordinate.y],
      }, { ...animateOptions, fill: 'forwards' })
      const parentRect = state.parent.getBoundingClientRect()
      const touchmove = () => {
        if (!state.parent) return
        const rect = state.parent.getBoundingClientRect()
        if (rect.top === parentRect.top && rect.left === parentRect.left) return
        remove()
      }
      state.parent.addEventListener('touchmove', touchmove)
      const remove = () => {
        if (!state.parent?.hasAttribute('ripple-pressed')) return
        state.parent.removeAttribute('ripple-pressed')
        state.parent.removeEventListener('touchmove', touchmove)
        const time = Number(animation.currentTime)
        const short = animateOptions.duration / 2
        const diff = animateOptions.duration - short
        const duration = time > diff ? short : animateOptions.duration - time
        const animate = newRipple.animate({ opacity: [1, 0] }, { ...animateOptions, duration, easing: animateOptions.easing, fill: 'forwards' })
        animate.finished.then(() => newRipple !== ripple && newRipple.isConnected && shadowRoot.removeChild(newRipple))
      }
      return remove
    }
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return
      if (event.pointerType !== 'touch') return document.addEventListener('pointerup', run(event), { once: true })
      const data: { timer?: number, upper?: boolean } = {}
      let remove: Function
      data.timer = setTimeout(() => {
        remove = run(event)
        document.removeEventListener('touchmove', move)
        if (data.upper) remove()
      }, 50)
      document.addEventListener('touchend', () => {
        if (!remove) return data.upper = true
        remove()
      }, { once: true })
      const move = () => clearTimeout(data.timer)
      document.addEventListener('touchmove', move, { once: true })
    }
    const hovering = (force = true) => {
      if (device.touchEnabled || this.disabled) return
      state.parent?.toggleAttribute('ripple-hovered', force)
      hover.classList.toggle('hovered', force)
    }
    return {
      onMounted: (parent) => {
        const parentElement = parent instanceof ShadowRoot ? parent.host : parent
        if (!(parentElement instanceof HTMLElement)) return
        state.parent = parentElement
        const hover = () => hovering()
        const unHover = () => hovering(false)
        parentElement.addEventListener('pointerdown', down)
        parentElement.addEventListener('mouseenter', hover)
        parentElement.addEventListener('mouseleave', unHover)
        return () => {
          delete state.parent
          parentElement.removeEventListener('pointerdown', down)
          parentElement.removeEventListener('mouseenter', hover)
          parentElement.removeEventListener('mouseleave', unHover)
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