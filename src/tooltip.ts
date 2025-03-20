import { useElement } from './core/element.js'
import { mediaQueryList } from './core/utils/mediaQuery.js'
import { getStackingContext } from './core/utils/getStackingContext.js'
import { Theme } from './core/theme.js'

type Props = {
  align: 'top' | 'bottom' | 'left' | 'right'
  disabled: boolean
}

const name = 's-tooltip'
const props: Props = {
  align: 'top',
  disabled: false,
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  text-align: left;
}
.popup{
  position: fixed;
  inset: 0;
  margin: 0;
  background: none;
  border: none;
  outline: none;
  max-width: none;
  max-height: none;
  display: none;
  font-size: .875rem;
  font-weight: 400;
  padding: 6px 8px;
  border-radius: 4px;
  white-space: nowrap;
  background: color-mix(in srgb, var(--s-color-inverse-surface, ${Theme.colorInverseSurface}) 88%, transparent);
  color: var(--s-color-inverse-on-surface, ${Theme.colorInverseOnSurface});
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

class Tooltip extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLSlotElement
    const popup = shadowRoot.querySelector('.popup') as HTMLDivElement
    const animateOptions = { duration: 200, fill: 'forwards' } as const
    const show = () => {
      if (!this.isConnected || this.disabled) return
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
      const position = { top: 0, left: 0 }
      const calls = {
        middle(align: 'top' | 'bottom') {
          position.left = rect.left - ((cWidth - rect.width) / 2)
          const bottom = () => {
            position.top = rect.top + rect.height + gap
            return position.top + cHeight > innerHeight
          }
          const top = () => {
            position.top = rect.top - cHeight - gap
            return position.top < 0
          }
          if (position.left < 0) position.left = rect.left
          if (position.left + cWidth > innerWidth) position.left = rect.left + rect.width - cWidth
          if (align === 'top') top() && bottom()
          if (align === 'bottom') bottom() && top()
        },
        left() {
          position.left = rect.left - cWidth - gap
          position.top = rect.top - ((cHeight - rect.height) / 2)
          return position.left < 0
        },
        right() {
          position.left = rect.left + rect.width + gap
          position.top = rect.top - ((cHeight - rect.height) / 2)
          return position.left + cWidth > innerWidth
        }
      }
      switch (this.align) {
        case 'bottom':
        case 'top':
          calls.middle(this.align)
          break
        case 'left':
          calls.left() && calls.right()
          break
        case 'right':
          calls.right() && calls.left()
          break
      }
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
    let timer = 0
    trigger.addEventListener('touchstart', () => {
      if (!mediaQueryList.anyPointerCoarse.matches) return
      clearTimeout(timer)
      timer = setTimeout(() => show(), 600)
    }, { passive: false })
    trigger.addEventListener('touchend', () => {
      clearTimeout(timer)
      close()
    })
    trigger.addEventListener('mouseenter', () => !mediaQueryList.anyPointerCoarse.matches && show())
    trigger.addEventListener('mouseleave', () => !mediaQueryList.anyPointerCoarse.matches && close())
  }
}) { }

Tooltip.define(name)

export { Tooltip }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Tooltip
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
  export interface GlobalComponents {
    [name]: Props
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