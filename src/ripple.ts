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
  transition: filter .2s;
  will-change: filter;
}
.container.hover::before{
  filter: opacity(.1);
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
      const up = () => animation.style.opacity = '0'
      const remove = () => {
        document.removeEventListener('pointerup', up)
        document.removeEventListener('touchend', up)
        animation.isConnected && container.removeChild(animation)
      }
      animation.addEventListener('transitionend', remove, { once: true })
      document.addEventListener('pointerup', up, { once: true })
      document.addEventListener('touchend', up, { once: true })
      container.appendChild(animation)
      animation.animate([
        { transform: 'translate(-50%, -50%) scale(0)' },
        { transform: 'translate(-50%, -50%) scale(1)' }
      ], { duration: 800, fill: 'forwards', easing: 'cubic-bezier(.2, .9, .1, .9)' })
    }
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return
      if (device.touched) {
        const clear = () => {
          clearTimeout(timer)
          document.removeEventListener('touchmove', clear)
        }
        document.addEventListener('touchmove', clear, { once: true })
        const timer = setTimeout(() => start(event), 80)
        return
      }
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
      },
      render: () => html`
        <slot></slot>
        <div class="container" ref="${(el: HTMLDivElement) => container = el}"></div>
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