import { useElement } from './core/element.js'
import { mediaQueryList } from './core/utils/mediaQuery.js'
import { convertCSSDuration } from './core/utils/CSSUtils.js'
import { Theme } from './core/theme.js'

type Props = {
  centered: boolean
  attached: boolean
}

const name = 's-ripple'
const props: Props = {
  centered: false,
  attached: false
}

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
.container-inner,
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
}
.container-inner{
  filter: blur(8px);
}
.container::before{
  content: '';
  opacity: 0;
  background: var(--ripple-color, currentColor);
  transition: opacity var(--s-motion-duration-short4, ${Theme.motionDurationShort2}) var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
}
.container.hover::before{
  opacity: var(--ripple-hover-opacity, .12);
}
.ripple {
  width: 0;
  height: 0;
  border-radius: 50%;
  background: currentColor;
  opacity: 0;
  overflow: hidden;
  transform: translate(-50%, -50%);
  filter: opacity(var(--ripple-opacity, .18));
}
`

const template = /*html*/`
<slot></slot>
<div class="container" part="container">
<div class="container-inner"><div class="ripple"></div></div>
</div>
`

class Ripple extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const innerContainer = shadowRoot.querySelector<HTMLDivElement>('.container-inner')!
    const ripple = shadowRoot.querySelector<HTMLDivElement>('.ripple')!
    const computedStyle = getComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getPropertyValue('--s-motion-easing-standard') || Theme.motionEasingStandard
      const duration = computedStyle.getPropertyValue('--s-motion-duration-long4') || Theme.motionDurationLong4
      const shortDuration = computedStyle.getPropertyValue('--s-motion-duration-short4') || Theme.motionDurationShort4
      return { easing: easing, duration: convertCSSDuration(duration), shortDuration: convertCSSDuration(shortDuration) }
    }
    const hover = () => !mediaQueryList.anyPointerCoarse.matches && container.classList.add('hover')
    const unHover = () => !mediaQueryList.anyPointerCoarse.matches && container.classList.remove('hover')
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
        innerContainer.appendChild(newRipple)
        callback = () => newRipple.remove()
      } else {
        state.pressed = true
        callback = () => state.pressed = false
      }
      const parent = (state.parentNode ?? this)
      const animateOptions = getAnimateOptions()
      parent.setAttribute('pressed', '')
      const boxShadow = `0 0 0 ${size / 2 + 16}px currentColor`
      const animation = newRipple.animate({
        opacity: [1, 1],
        boxShadow: [boxShadow, boxShadow],
        clipPath: [`circle(0)`, `circle(${size / 2 + 16}px)`],
        left: [coordinate.x, coordinate.x],
        top: [coordinate.y, coordinate.y],
      }, { duration: animateOptions.duration, fill: 'forwards', easing: animateOptions.easing })
      const remove = () => {
        parent.removeAttribute('pressed')
        const time = Number(animation.currentTime)
        const diff = animateOptions.duration - animateOptions.shortDuration
        newRipple.animate({ opacity: [1, 0] }, { duration: time > diff ? animateOptions.shortDuration : animateOptions.duration - time, easing: animateOptions.easing, fill: 'forwards' }).finished.then(callback)
      }
      return remove
    }
    const down = async (event: PointerEvent) => {
      if (event.button !== 0) return
      const data: { timer?: number, upper?: boolean } = {}
      if (event.pointerType === 'mouse') {
        document.addEventListener('pointerup', run(event), { once: true })
      }
      if (event.pointerType === 'touch') {
        let remove: Function
        //优先响应触屏滚动
        data.timer = setTimeout(() => {
          remove = run(event)
          document.removeEventListener('touchmove', move)
          if (data.upper) remove()
        }, 40)
        document.addEventListener('touchend', () => {
          if (!remove) return data.upper = true
          remove()
        }, { once: true })
        const move = () => clearTimeout(data.timer)
        document.addEventListener('touchmove', move, { once: true })
      }
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
      attached: (value) => {
        if (!this.isConnected) return
        if (!value) return remove()
        const target = (this.parentNode instanceof ShadowRoot ? this.parentNode.host : this.parentNode) as HTMLElement
        add(target)
      }
    }
  }
}) { }

Ripple.define(name)

export { Ripple }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Ripple
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
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
      $props: HTMLAttributes & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}