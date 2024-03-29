import { builder, html } from './core/element.js'
import { device } from './core/utils.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

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
  opacity: var(--ripple-opacity, .24);
  width: var(--size);
  height: var(--size);
  position: absolute;
  transform: translate(-50%, -50%) scale(0);
  left: var(--x);
  top: var(--y);
  animation: ripple 800ms cubic-bezier(.2, .9, .1, .9);
  animation-fill-mode: forwards;
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
  transition: filter .2s;
  will-change: filter;
}
.container.hover::before{
  filter: opacity(.12);
}
@keyframes ripple{
  0% {transform: translate(-50%,-50%) scale(0)}
  100% {transform: translate(-50%,-50%) scale(1)}
}
`

const name = 's-ripple'
const props = {
  centered: false,
  attached: false
}

export default class Component extends builder({
  name, style, props, propSyncs: ['attached'],
  setup() {
    let container: HTMLDivElement
    const hover = () => !device.touched && container.classList.add('hover')
    const unHover = () => !device.touched && container.classList.remove('hover')
    const that = this
    const action = {
      get root(): HTMLElement {
        if (!that.attached || !that.parentNode) return that
        if (that.parentNode instanceof ShadowRoot) return that.parentNode.host as HTMLElement
        return that.parentNode as HTMLElement
      }
    }
    const start = (event: { clientX: number, clientY: number }) => {
      const animation = document.createElement('div')
      animation.className = 'animation'
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
      animation.setAttribute('style', `--size: ${size}px;--x: ${coordinate.x};--y: ${coordinate.y};`)
      container.appendChild(animation)
      const remove = () => animation.isConnected && container.removeChild(animation)
      const up = () => {
        document.removeEventListener('mouseup', up)
        document.removeEventListener('touchend', up)
        animation.addEventListener('transitionend', remove)
        animation.style.opacity = '0'
      }
      document.addEventListener('mouseup', up)
      document.addEventListener('touchend', up)
      animation.addEventListener('animationcancel', remove)
      animation.addEventListener('transitioncancel', remove)
    }
    let timer: number[] = []
    const stop = () => {
      if (timer.length === 0) return
      timer.map((item) => clearTimeout(item))
      timer = []
    }
    const down = (event: MouseEvent) => !device.touched && event.button === 0 && start(event)
    const touch = (event: TouchEvent) => timer.push(setTimeout(() => start(event.targetTouches[0]), 80))
    const addEvents = () => {
      action.root.addEventListener('mouseover', hover)
      action.root.addEventListener('mouseleave', unHover)
      action.root.addEventListener('wheel', unHover, { passive: true })
      action.root.addEventListener('mousedown', down)
      action.root.addEventListener('touchstart', touch, { passive: true })
      action.root.addEventListener('touchmove', stop, { passive: true })
    }
    const removeEvents = () => {
      action.root.removeEventListener('mouseover', hover)
      action.root.removeEventListener('mouseleave', unHover)
      action.root.removeEventListener('wheel', unHover)
      action.root.removeEventListener('mousedown', down)
      action.root.removeEventListener('touchstart', touch)
      action.root.removeEventListener('touchmove', stop)
    }
    return {
      mounted: addEvents,
      unmounted: removeEvents,
      watches: {
        attached: () => {
          removeEvents()
          addEvents()
        }
      },
      render: () => html`
        <div class="container" ref="${(el: HTMLDivElement) => container = el}"></div>
        <slot></slot>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}