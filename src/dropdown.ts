import { builder, html } from './core/element.js'
import { getStackingContext } from './core/utils.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

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
  z-index: 2;
  overflow: hidden;
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
}
.show .container{
  pointer-events: auto;
  opacity: 1;
}
::slotted(*:not([slot])){
  background: var(--s-color-surface-container-low, #f3f3f6);
  border-radius: 4px;
  box-shadow: var(--s-elevation-level2, 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
  min-width: var(--dropdown-min-width, auto);
  max-height: 100vh;
}
`

const name = 's-dropdown'
const props = {
  align: 'center' as 'center' | 'left' | 'right'
}

type ShowOption = HTMLElement | { x: number, y: number, origin?: string }

export class Dropdown extends builder({
  name, style, props,
  setup(shadowRoot) {
    let trigger: HTMLDivElement
    let wrapper: HTMLElement
    let container: HTMLDivElement
    const show = (elementOrOptions?: ShowOption) => {
      if (!this.isConnected || wrapper.classList.contains('show')) return
      const stackingContext = getStackingContext(shadowRoot)
      if (stackingContext.top !== 0 || stackingContext.left !== 0) {
        wrapper.setAttribute('style', `width: ${innerWidth}px;height: ${innerHeight}px;top: ${0 - stackingContext.top}px;left: ${0 - stackingContext.left}px`)
      }
      const position = { top: 0, left: 0, origin: [] as string[] }
      if (!elementOrOptions || elementOrOptions instanceof HTMLElement) {
        const el = !elementOrOptions ? trigger : elementOrOptions
        wrapper.style.setProperty('--dropdown-min-width', `${el.offsetWidth}px`)
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
        if (this.align === 'left') {
          position.origin[0] = 'right'
          position.left = rect.x - cWidth
          position.top = rect.y
          offsets = {
            left: { value: rect.x + rect.width, origin: 'left' },
            right: { value: position.left, origin: position.origin[0] },
            top: { value: rect.y + rect.height - cHeight, origin: 'bottom' }
          }
        }
        if (this.align === 'right') {
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
      } else {
        position.top = elementOrOptions.y
        position.left = elementOrOptions.x
        position.origin = elementOrOptions.origin ? elementOrOptions.origin.split(' ') : ['left', 'top']
        if (elementOrOptions.x + container.offsetWidth > innerWidth) {
          position.left = elementOrOptions.x - container.offsetWidth
          position.origin[0] = 'right'
        }
        if (elementOrOptions.y + container.offsetHeight > innerHeight) {
          position.top = elementOrOptions.y - container.offsetHeight
          position.origin[1] = 'bottom'
        }
      }
      container.style.transformOrigin = position.origin.join(' ')
      container.style.top = `${position.top}px`
      container.style.left = `${position.left}px`
      wrapper.classList.add('show')
      container.animate([{ transform: 'scale(.9)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 100 })
    }
    const dismiss = () => {
      if (!this.isConnected || !wrapper.classList.contains('show')) return
      wrapper.classList.remove('show')
      container.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.9)', opacity: 0 }], { duration: 100 })
    }
    const toggle = (elementOrOptions?: ShowOption) => {
      if (!this.isConnected) return
      wrapper.classList.contains('show') ? dismiss() : show(elementOrOptions)
    }
    return {
      expose: { show, dismiss, toggle },
      mounted: () => addEventListener('resize', dismiss),
      unmounted: () => removeEventListener('resize', dismiss),
      render: () => html`
        <div ref="${(el: HTMLDivElement) => trigger = el}" @click="${() => show()}">
          <slot name="trigger"></slot>
        </div>
        <div class="wrapper" ref="${(el: HTMLDivElement) => wrapper = el}">
          <div class="scrim" @pointerdown="${dismiss}"></div>
          <div class="container" ref="${(el: HTMLDivElement) => container = el}">
            <slot></slot>
          </div>
        </div>
      `
    }
  }
}) { }

Dropdown.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Dropdown
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}