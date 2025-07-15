import { useElement, useProps } from '../core/element.js'
import { device } from '../core/device.js'
import { convertCSSDuration } from '../core/utils/CSS.js'
import { Theme } from '../core/theme.js'

const props = useProps({
  attached: false,
  centered: false
})


const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
}
:host([attached=true]),
.container,
.container::before,
.ripple{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: inherit;
}
.container{
  overflow: hidden;
  &::before{
    content: '';
    opacity: 0;
    background: var(--ripple-color, currentColor);
    transition: opacity var(--s-motion-duration-short4, ${Theme.motionDurationShort2}) var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
  }
  &.hovered::before{
    opacity: var(--ripple-hover-opacity, .08);
  }
}
.ripple{
  opacity: 0;
  border-radius: 50%;
  background: currentColor;
  filter: opacity(var(--ripple-opacity, .18));
}
`

const template = /*html*/`
<slot></slot>
<div class="container" part="container">
  <div class="ripple" part="ripple"></div>
</div>
`

export class Ripple extends useElement({
  name: 's-ripple',
  style, template, props,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const ripple = shadowRoot.querySelector<HTMLDivElement>('.ripple')!
    const computedStyle = getComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getPropertyValue('--s-motion-easing-standard') || Theme.motionEasingStandard
      const duration = computedStyle.getPropertyValue('--s-motion-duration-long4') || Theme.motionDurationLong4
      const shortDuration = computedStyle.getPropertyValue('--s-motion-duration-short4') || Theme.motionDurationShort4
      return { easing: easing, duration: convertCSSDuration(duration), shortDuration: convertCSSDuration(shortDuration) }
    }
    const hover = () => !device.touchEnabled && container.classList.add('hovered')
    const unHover = () => !device.touchEnabled && container.classList.remove('hovered')
    const state = { parentNode: null as null | HTMLElement, pressed: false }
    const run = (event: PointerEvent) => {
      const { offsetWidth, offsetHeight } = this
      let size = Math.sqrt(offsetWidth ** 2 + offsetHeight ** 2)
      const coordinate = { x: '50%', y: '50%' }
      if (!this.centered) {
        const { left, top } = this.getBoundingClientRect()
        const x = event.clientX - left
        const y = event.clientY - top
        const h = offsetHeight / 2
        const w = offsetWidth / 2
        const edgeW = (Math.abs(h - y) + h) * 2
        const edgeH = (Math.abs(w - x) + w) * 2
        size = Math.sqrt(edgeW ** 2 + edgeH ** 2)
        coordinate.x = `${x}px`
        coordinate.y = `${y}px`
      }
      let newRipple = ripple
      let callback = () => { }
      if (state.pressed) {
        newRipple = ripple.cloneNode() as HTMLDivElement
        container.appendChild(newRipple)
        callback = () => newRipple.remove()
      } else {
        state.pressed = true
        callback = () => state.pressed = false
      }
      const parent = (state.parentNode ?? this)
      const animateOptions = getAnimateOptions()
      parent.setAttribute('pressed', '')
      const animation = newRipple.animate({
        opacity: [1, 1],
        width: [`${size}px`, `${size}px`],
        height: [`${size}px`, `${size}px`],
        transform: ['translate(-50%, -50%) scale(0)', 'translate(-50%, -50%) scale(1)'],
        left: [coordinate.x, coordinate.x],
        top: [coordinate.y, coordinate.y],
      }, { ...animateOptions, fill: 'forwards' })
      const remove = () => {
        parent.removeAttribute('pressed')
        const time = Number(animation.currentTime)
        const diff = animateOptions.duration - animateOptions.shortDuration
        const duration = time > diff ? animateOptions.shortDuration : animateOptions.duration - time
        newRipple.animate({ opacity: [1, 0] }, { duration, easing: animateOptions.easing, fill: 'forwards' }).finished.then(callback)
      }
      return remove
    }
    const down = async (event: PointerEvent) => {
      if (event.button !== 0) return
      const data: { timer?: number, upper?: boolean } = {}
      if (event.pointerType !== 'touch') {
        document.addEventListener('pointerup', run(event), { once: true })
        return
      }
      let remove: Function
      //优先响应触屏滚动
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
    const add = (target: HTMLElement) => {
      target.addEventListener('mouseenter', hover)
      target.addEventListener('mouseleave', unHover)
      target.addEventListener('wheel', unHover, { passive: true })
      target.addEventListener('pointerdown', down)
    }
    const remove = () => {
      if (!state.parentNode) return
      state.parentNode.removeEventListener('mouseenter', hover)
      state.parentNode.removeEventListener('mouseleave', unHover)
      state.parentNode.removeEventListener('wheel', unHover)
      state.parentNode.removeEventListener('pointerdown', down)
      state.parentNode = null
    }
    add(this)
    return {
      onMounted: () => {
        if (this.attached && this.parentNode) {
          state.parentNode = (this.parentNode instanceof ShadowRoot ? this.parentNode.host : this.parentNode) as HTMLElement
          add(state.parentNode)
        }
      },
      onUnmounted: () => this.attached && remove(),
      setAttached: (value) => {
        if (!this.isConnected) return
        if (!value) return remove()
        const target = (this.parentNode instanceof ShadowRoot ? this.parentNode.host : this.parentNode) as HTMLElement
        add(target)
      }
    }
  }
}) { }

declare global {
  interface HTMLElementTagNameMap {
    [Ripple.tagName]: typeof Ripple
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [Ripple.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [Ripple.tagName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & typeof Ripple
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [Ripple.tagName]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Ripple.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Ripple.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}