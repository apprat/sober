import { useElement, JSXAttributes, LowercaseKeys } from './core/element.js'
import { getStackingContext } from './core/utils.js'
import { Theme } from './core/enum.js'

const name = 's-popup'
const props = {
  showAlign: 'center' as 'center' | 'left' | 'right'
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  text-align: start;
}
.wrapper{
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-index, 1);
}
.scrim{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.show .scrim{
  pointer-events: auto;
}
.container{
  position: absolute;
  pointer-events: none;
  white-space: nowrap;
  opacity: 0;
  --z-index: var(--z-index, 1);
}
.show .container{
  pointer-events: auto;
  opacity: 1;
}
::slotted(*:not([slot])){
  background: var(--s-color-surface-container-low, ${Theme.colorSurfaceContainerLow});
  border-radius: 4px;
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  max-height: 100vh;
}
`

const template = /*html*/`
<div id="trigger" part="trigger">
  <slot name="trigger"></slot>
</div>
<div class="wrapper" part="wrapper">
  <div class="scrim" part="scrim"></div>
  <div class="container" part="container">
    <slot></slot>
  </div>
</div>
`

type ShowOptions = (xOrEl?: HTMLElement | number, y?: number, origin?: string) => void

export class Popup extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('#trigger') as HTMLDivElement
    const wrapper = shadowRoot.querySelector('.wrapper') as HTMLDivElement
    const scrim = shadowRoot.querySelector('.scrim') as HTMLDivElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const animationOptions = { duration: 100, easing: 'ease-out' } as const
    const show: ShowOptions = (xOrEl, y, origin) => {
      if (!this.isConnected || wrapper.classList.contains('show')) return
      const stackingContext = getStackingContext(shadowRoot)
      if (stackingContext.top !== 0 || stackingContext.left !== 0) {
        wrapper.setAttribute('style', `width: ${innerWidth}px;height: ${innerHeight}px;top: ${0 - stackingContext.top}px;left: ${0 - stackingContext.left}px`)
      }
      const position = { top: 0, left: 0, origin: [] as string[] }
      if (typeof xOrEl === 'number' && y) {
        position.top = y
        position.left = xOrEl
        position.origin = origin ? origin.split(' ') : ['left', 'top']
        if (xOrEl + container.offsetWidth > innerWidth) {
          position.left = xOrEl - container.offsetWidth
          position.origin[0] = 'right'
        }
        if (y + container.offsetHeight > innerHeight) {
          position.top = y - container.offsetHeight
          position.origin[1] = 'bottom'
        }
      }
      if (xOrEl === undefined || xOrEl instanceof HTMLElement) {
        const el = !xOrEl ? trigger : xOrEl
        const rect = el.getBoundingClientRect()
        const cWidth = container.offsetWidth
        const cHeight = container.offsetHeight
        position.origin = ['center', 'top']
        position.top = rect.y + rect.height
        position.left = rect.x - ((cWidth - rect.width) / 2)
        let offsets = {
          left: { value: rect.x, origin: 'left' },
          right: { value: rect.x + rect.width - cWidth, origin: 'right' },
          top: { value: rect.top - cHeight, origin: 'bottom' }
        }
        if (this.showAlign === 'left') {
          position.origin[0] = 'right'
          position.left = rect.x - cWidth
          position.top = rect.y
          offsets = {
            left: { value: rect.x + rect.width, origin: 'left' },
            right: { value: position.left, origin: position.origin[0] },
            top: { value: rect.y + rect.height - cHeight, origin: 'bottom' }
          }
        }
        if (this.showAlign === 'right') {
          position.origin[0] = 'left'
          position.left = rect.x + rect.width
          position.top = rect.y
          offsets = {
            left: { value: position.left, origin: position.origin[0] },
            right: { value: rect.x - cWidth, origin: 'right' },
            top: { value: rect.y + rect.height - cHeight, origin: 'bottom' }
          }
        }
        if (position.left < 0) {
          position.origin[0] = offsets.left.origin
          position.left = offsets.left.value
        }
        if (position.left + cWidth > innerWidth) {
          position.origin[0] = offsets.right.origin
          position.left = Math.max(offsets.right.value, 0)
        }
        if (position.top + cHeight > innerHeight) {
          position.origin[1] = offsets.top.origin
          position.top = Math.max(offsets.top.value, 0)
        }
      }
      container.style.transformOrigin = position.origin.join(' ')
      container.style.top = `${position.top}px`
      container.style.left = `${position.left}px`
      wrapper.classList.add('show')
      container.animate([{ transform: 'scale(.9)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], animationOptions)
      this.dispatchEvent(new Event('show'))
    }
    const dismiss = () => {
      if (!this.isConnected || !wrapper.classList.contains('show')) return
      wrapper.classList.remove('show')
      container.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.9)', opacity: 0 }], animationOptions)
      this.dispatchEvent(new Event('dismiss'))
    }
    const toggle: ShowOptions = (xOrEl, y, origin) => {
      if (!this.isConnected) return
      wrapper.classList.contains('show') ? dismiss() : show(xOrEl, y, origin)
    }
    trigger.addEventListener('click', () => show())
    scrim.addEventListener('pointerdown', dismiss)
    return {
      expose: { show, dismiss, toggle },
      mounted: () => addEventListener('resize', dismiss),
      unmounted: () => removeEventListener('resize', dismiss)
    }
  }
}) { }

Popup.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<LowercaseKeys<typeof props>> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Popup
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: LowercaseKeys<typeof props>
  }
}