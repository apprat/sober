import { builder, html, ref } from './core/element'
import { device } from './core/utils'

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
  background: currentColor;
  border-radius: 50%;
  transition: opacity .8s;
  opacity: var(--ripple-opacity,.38);
  width: var(--size);
  height: var(--size);
  position: absolute;
  transform: translate(-50%,-50%) scale(0);
  left: var(--x);
  top: var(--y);
}
.container::before{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: inherit;
  background: currentColor;
  filter: opacity(0);
  transition: filter .2s;
}
.container.hover::before{
  filter: opacity(.12);
}
`

const name = 's-ripple'
const props = {
  centered: false,
  attached: false
}

export default class Component extends builder({
  name, props, propSyncs: ['attached'],
  setup() {
    const container = ref<HTMLDivElement>()
    const hover = () => !device.touched && container.target.classList.add('hover')
    const unHover = () => !device.touched && container.target.classList.remove('hover')
    const trigger = {
      target: this as HTMLElement,
      set: () => {
        if (!this.attached || !this.parentNode) return
        if (this.parentNode instanceof ShadowRoot) {
          trigger.target = this.parentNode.host as HTMLElement
          return
        }
        trigger.target = this.parentNode as HTMLElement
      }
    }
    const onPress = (event: { clientX: number, clientY: number }) => {
      const animation = document.createElement('div')
      animation.className = 'animation'
      const root = trigger.target
      const { offsetWidth, offsetHeight } = root
      let size = Math.sqrt(offsetWidth * offsetWidth + offsetHeight * offsetHeight)
      const coordinate = { x: '50%', y: '50%' }
      if (!this.centered) {
        const { left, top } = root.getBoundingClientRect()
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
      animation.style.setProperty('--size', `${size}px`)
      animation.style.setProperty('--x', coordinate.x)
      animation.style.setProperty('--y', coordinate.y)
      animation.animate({
        transform: ['translate(-50%,-50%) scale(0)', 'translate(-50%,-50%) scale(1)']
      }, { duration: 800, fill: 'forwards', easing: 'cubic-bezier(.2, .9, .1, .9)' })
      container.target.appendChild(animation)
      const remove = () => animation.isConnected && container.target.removeChild(animation)
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
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return
      onPress(event)
    }
    const addEvents = (root: HTMLElement) => {
      root.addEventListener('mouseover', hover)
      root.addEventListener('mouseleave', unHover)
      root.addEventListener('pointerdown', down)
    }
    const removeEvents = (root: HTMLElement) => {
      root.removeEventListener('mouseover', hover)
      root.removeEventListener('mouseleave', unHover)
      root.removeEventListener('pointerdown', down)
    }
    return {
      mounted: () => {
        trigger.set()
        addEvents(trigger.target)
      },
      unmounted: () => removeEvents(trigger.target),
      watches: {
        attached: trigger.set
      },
      render: () => html`
        <style>${style}</style>
        <div class="container" ref="${container}"></div>
        <slot></slot>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}