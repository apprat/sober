import { useElement, JSXAttributes } from './core/element.js'
import { device } from './core/utils.js'

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
.animation {
  background: var(--ripple-color, currentColor);
  border-radius: 50%;
  transition: opacity .8s;
  opacity: var(--ripple-opacity, .2);
  width: var(--size);
  height: var(--size);
  position: absolute;
  transform: translate(-50%, -50%) scale(0);
  left: var(--x);
  top: var(--y);
}
.container::before{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: inherit;
  background: var(--ripple-color, currentColor);
  filter: opacity(0);
  transition: filter .12s;
  will-change: filter;
}
.container.hover::before{
  filter: opacity(.1);
}
`

const template = /*html*/`
<slot></slot>
<div class="container" part="container"></div>
`

const pointerUp = (fn: Function) => {
  const up = () => {
    fn()
    document.removeEventListener('pointerup', up)
    document.removeEventListener('pointercancel', up)
  }
  document.addEventListener('pointerup', up)
  document.addEventListener('pointercancel', up)
}

export class Ripple extends useElement({
  style, template, props, syncProps: ['attached'],
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const hover = () => !device.touched && container.classList.add('hover')
    const unHover = () => !device.touched && container.classList.remove('hover')
    const run = (event: PointerEvent, upped?: boolean) => {
      const el = document.createElement('div')
      el.className = 'animation'
      const { offsetWidth, offsetHeight } = container
      let size = Math.sqrt(offsetWidth * offsetWidth + offsetHeight * offsetHeight)
      const coordinate = { x: '50%', y: '50%' }
      if (!this.centered) {
        const { left, top } = container.getBoundingClientRect()
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
      el.setAttribute('style', `--size: ${size}px;--x: ${coordinate.x};--y: ${coordinate.y};`)
      const remove = () => el.isConnected && container.removeChild(el)
      el.addEventListener('transitionend', remove, { once: true })
      el.addEventListener('transitioncancel', remove, { once: true })
      const end = () => el.style.opacity = '0'
      container.appendChild(el)
      el.animate([
        { transform: 'translate(-50%, -50%) scale(0)' },
        { transform: 'translate(-50%, -50%) scale(1)' }
      ], { duration: 800, fill: 'forwards', easing: 'cubic-bezier(.2, .9, .1, .9)' })
      if (!upped) return pointerUp(end)
      window.getComputedStyle(el).top
      end()
    }
    const start = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return run(event)
      //触屏设备延迟80ms触发优先响应滚动
      let upped = false
      const clear = () => clearTimeout(timer)
      const timer = setTimeout(() => {
        run(event, upped)
        document.removeEventListener('pointermove', clear)
      }, 80)
      pointerUp(() => upped = true)
      document.addEventListener('pointermove', clear, { once: true })
    }
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return
      start(event)
    }
    let target: HTMLElement = this
    const addEvents = () => {
      target = this.attached ? ((this.parentNode instanceof ShadowRoot ? this.parentNode.host : this.parentNode) as HTMLElement) : this
      target?.addEventListener('mouseover', hover)
      target?.addEventListener('mouseleave', unHover)
      target?.addEventListener('wheel', unHover, { passive: true })
      target?.addEventListener('pointerdown', down)
    }
    const removeEvents = () => {
      target?.removeEventListener('mouseover', hover)
      target?.removeEventListener('mouseleave', unHover)
      target?.removeEventListener('wheel', unHover)
      target?.removeEventListener('pointerdown', down)
    }
    return {
      mounted: addEvents,
      unmounted: removeEvents,
      watches: {
        attached: () => {
          removeEvents()
          addEvents()
        }
      }
    }
  }
}) { }

Ripple.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Ripple
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}