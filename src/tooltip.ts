import { useElement } from './core/element.js'
import { mediaQueryList } from './core/utils/mediaQuery.js'
import { getStackingContext } from './core/utils/getStackingContext.js'
import { Theme } from './page.js'

const name = 's-tooltip'
const props = {
  align: 'auto' as 'auto' | 'bottom' | 'top'
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
}
.popup{
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  background: none;
  border: none;
  outline: none;
  max-width: none;
  max-height: none;
  display: none;
  filter: opacity(.95);
  background: var(--s-color-inverse-surface, ${Theme.colorInverseSurface});
  color: var(--s-color-inverse-on-surface, ${Theme.colorInverseOnSurface});
  font-size: .875rem;
  font-weight: 400;
  padding: 6px 8px;
  border-radius: 4px;
  white-space: nowrap;
}
::slotted(img){
  display: block;
  border-radius: 4px;
  margin: 2px 0;
  max-width: 280px;
}
`

const template = /*html*/`
<slot name="trigger" part="trigger"></slot>
<div class="popup" popover="manual" part="popup">
  <slot></slot>
</div>
`

export class Tooltip extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLSlotElement
    const popup = shadowRoot.querySelector('.popup') as HTMLDivElement
    const animateOptions = { duration: 200, fill: 'forwards' } as const
    const show = () => {
      if (!this.isConnected) return
      popup.style.display = 'block'
      if (popup.showPopover) {
        popup.showPopover()
      } else {
        const rect = getStackingContext(shadowRoot)
        popup.style.marginLeft = `${-rect.left}px`
        popup.style.marginTop = `${-rect.top}px`
        popup.style.zIndex = '2'
      }
      const rect = this.getBoundingClientRect()
      const gap = 4
      const cWidth = popup.offsetWidth
      const cHeight = popup.offsetHeight
      const position = {
        top: {
          top: rect.top - gap - cHeight,
          bottom: rect.top + this.offsetHeight + gap
        }[this.align === 'auto' ? (mediaQueryList.pointerCoarse.matches ? 'top' : 'bottom') : this.align],
        left: rect.left - ((cWidth - rect.width) / 2),
      }
      if (position.left < 0) position.left = rect.left //left
      if (position.left + cWidth > innerWidth) position.left = rect.left + rect.width - cWidth //right
      if (position.top + cHeight > innerHeight) position.top = rect.top - gap - cHeight //top
      if (position.top < 0) position.top = rect.top + this.offsetHeight + gap //bottom
      popup.style.top = `${position.top}px`
      popup.style.left = `${position.left}px`
      popup.animate([{ opacity: 0 }, { opacity: 1 }], animateOptions)
    }
    const close = () => {
      const animation = popup.animate([{ opacity: 1 }, { opacity: 0 }], animateOptions)
      animation.finished.then(() => {
        popup.hidePopover && popup.hidePopover()
        popup.style.removeProperty('display')
      })
    }
    const state = { timer: 0 }
    trigger.addEventListener('touchstart', () => {
      if (!mediaQueryList.pointerCoarse.matches) return
      clearTimeout(state.timer)
      state.timer = setTimeout(() => show(), 600)
    }, { passive: true })
    trigger.addEventListener('touchend', () => {
      clearTimeout(state.timer)
      close()
    }, { passive: true })
    trigger.addEventListener('mouseenter', () => !mediaQueryList.pointerCoarse.matches && show())
    trigger.addEventListener('mouseleave', () => !mediaQueryList.pointerCoarse.matches && close())
  }
}) { }

Tooltip.define(name)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Tooltip
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