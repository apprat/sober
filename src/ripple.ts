import { useElement } from './core/element.js'
import { mediaQueryList } from './core/utils/mediaQuery.js'

const name = 's-ripple'
const props = {
  centered: false,
  attached: false
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  --ripple-color: currentColor;
}
:host([attached=true]){
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: inherit;
}
.container{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: inherit;
}
.container::before{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: inherit;
  background: var(--ripple-color);
  opacity: 0;
  transition: opacity .1s ease-out;
}
.container.hover::before{
  opacity: .12;
}
.ripple {
  color: color-mix(in srgb, var(--ripple-color) 24%, transparent);
  background: currentColor;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translate(-50%, -50%) scale(0);
  filter: blur(8px);
  left: 0;
  top: 0;
}
`

const template = /*html*/`
<slot></slot>
<div class="container" part="container">
  <div class="ripple"></div>
</div>
`

export class Ripple extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const ripple = shadowRoot.querySelector('.ripple') as HTMLDivElement
    const hover = () => !mediaQueryList.pointerCoarse.matches && container.classList.add('hover')
    const unHover = () => !mediaQueryList.pointerCoarse.matches && container.classList.remove('hover')
    const state = { parentNode: null as null | HTMLElement, rippled: false }
    const run = (event: PointerEvent) => {
      const { offsetWidth, offsetHeight } = this
      let size = Math.sqrt(offsetWidth * offsetWidth + offsetHeight * offsetHeight)
      const coordinate = { x: '50%', y: '50%' }
      if (!this.centered) {
        const { left, top } = this.getBoundingClientRect()
        const x = event.clientX - left
        const y = event.clientY - top
        const h = offsetHeight / 2
        const w = offsetWidth / 2
        const edgeW = (Math.abs(h - y) + h) * 2
        const edgeH = (Math.abs(w - x) + w) * 2
        size = Math.sqrt(edgeW * edgeW + edgeH * edgeH)
        coordinate.x = `${x}px`
        coordinate.y = `${y}px`
      }
      let newRipple = ripple
      let callback = () => { }
      if (state.rippled) {
        newRipple = ripple.cloneNode() as HTMLDivElement
        container.appendChild(newRipple)
        callback = () => newRipple.remove()
      } else {
        state.rippled = true
        callback = () => state.rippled = false
      }
      const parent = (state.parentNode ?? this)
      parent.setAttribute('rippled', '')
      const keyframes = { transform: 'translate(-50%, -50%) scale(1)', boxShadow: '0 0 0 16px currentColor', opacity: 1, width: `${size}px`, height: `${size}px`, left: `${coordinate.x}`, top: `${coordinate.y}` }
      const animation = newRipple.animate([{ ...keyframes, transform: 'translate(-50%, -50%) scale(0)' }, keyframes], { duration: 800, fill: 'forwards', easing: 'cubic-bezier(.2, .9, .1, .9)' })
      const remove = () => {
        parent.removeAttribute('rippled')
        const time = Number(animation.currentTime)
        newRipple.animate([{ opacity: 1 }, { opacity: 0 }], { duration: time > 600 ? 200 : 800 - time, fill: 'forwards' }).finished.then(callback)
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
      target.addEventListener('mouseover', hover)
      target.addEventListener('mouseleave', unHover)
      target.addEventListener('wheel', unHover, { passive: true })
      target.addEventListener('pointerdown', down)
    }
    const remove = () => {
      if (!state.parentNode) return
      state.parentNode.removeEventListener('mouseover', hover)
      state.parentNode.removeEventListener('mouseleave', unHover)
      state.parentNode.removeEventListener('wheel', unHover)
      state.parentNode.removeEventListener('pointerdown', down)
      state.parentNode = null
    }
    add(this)
    return {
      mounted: () => {
        if (this.attached && this.parentNode) {
          state.parentNode = (this.parentNode instanceof ShadowRoot ? this.parentNode.host : this.parentNode) as HTMLElement
          add(state.parentNode)
        }
      },
      unmounted: () => this.attached && remove(),
      props: {
        attached: (value) => {
          if (!this.isConnected) return
          if (!value) return remove()
          const target = (this.parentNode instanceof ShadowRoot ? this.parentNode.host : this.parentNode) as HTMLElement
          add(target)
        }
      }
    }
  }
}) { }

Ripple.define(name)

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
  export interface GlobalComponents {
    [name]: typeof props
  }
}