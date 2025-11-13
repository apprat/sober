import { useElement, useProps } from '../core/element.js'
import { device } from '../core/device.js'
import { getStackingContext } from '../core/utils/getStackingContext.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  gravity: ['bottom', 'top', 'left', 'right'],
  disabled: false
})
const events = {
  opened: Event,
  closed: Event
}

const style = /*css*/`
:host{
  display: contents;
  font-size: .875rem;
  font-weight: 400;
  position: absolute;
  border-radius: 4px;
  padding: 6px 8px;
  animation-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  animation-duration: var(--s-motion-duration-medium4, ${scheme.motion.duration.medium4});
  background: var(--s-color-inverse-surface, ${scheme.color.inverseSurface});
  color: var(--s-color-inverse-on-surface, ${scheme.color.inverseOnSurface});
}
.popover{
  pointer-events: none;
  position: fixed;
  display: none;
  inset: 0;
  margin: 0;
  width: fit-content;
  height: fit-content;
  border: none;
  overflow: hidden;
  outline: none;
  max-width: 100%;
  max-height: 100%;
  padding: inherit;
  border-radius: inherit;
  filter: opacity(.8);
  background: inherit;
  color: inherit;
}
.opened{
  display: block;
}
`

const template = /*html*/`
<slot class="popover" popover="manual" part="popup"></slot>
`

export class Tooltip extends useElement({
  style, template, props, events,
  setup(shadowRoot) {
    const popover = shadowRoot.querySelector<HTMLSlotElement>('.popover')!
    const computedStyle = useComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('animation-timing-function')
      const duration = computedStyle.getDuration('animation-duration')
      return { easing, duration }
    }
    const display = ['block', 'block']
    const gravitys = {
      top: ['bottom', 'left', 'right'],
      bottom: ['top', 'left', 'right'],
      left: ['right', 'top', 'bottom'],
      right: ['left', 'top', 'bottom']
    }
    const open = (parent: HTMLElement) => {
      if (!this.isConnected || popover.classList.contains('opened')) return
      if (!this.dispatchEvent(new Event('open', { cancelable: true }))) return
      popover.style.display = 'block'
      const gap = 4
      popover.style.removeProperty('top')
      popover.style.removeProperty('left')
      const { offsetHeight, offsetWidth } = popover
      if (!popover.showPopover) {
        const rect = getStackingContext(shadowRoot)
        popover.style.marginLeft = `${-rect.left}px`
        popover.style.marginTop = `${-rect.top}px`
        popover.style.zIndex = '3'
      }
      popover.style.removeProperty('display')
      popover?.showPopover()
      const rect = parent.getBoundingClientRect()
      const offsets = {
        top: rect.top - gap - offsetHeight,
        bottom: rect.top + gap + rect.height,
        left: rect.left - gap - offsetWidth,
        right: rect.left + gap + rect.width
      }
      const vertical = { name: 'top', side: { name: 'left', size: offsetWidth, innerSize: innerWidth, targetSize: rect.width } } as const
      const horizontal = { name: 'left', side: { name: 'top', size: offsetHeight, innerSize: innerHeight, targetSize: rect.height } } as const
      const options = {
        top: { value: offsets.top, overflowed: offsets.top < 0, ...vertical },
        bottom: { value: offsets.bottom, overflowed: offsets.bottom + offsetHeight > innerHeight, ...vertical },
        left: { value: offsets.left, overflowed: offsets.left < 0, not: 'right', ...horizontal },
        right: { value: offsets.right, overflowed: offsets.right + offsetWidth > innerWidth, ...horizontal }
      } as const
      const position = { top: 0, left: 0 }
      if (options.top.overflowed && options.bottom.overflowed && options.left.overflowed && options.right.overflowed) {
        position.top = (innerHeight - offsetHeight) / 2
        position.left = (innerWidth - offsetWidth) / 2
      } else {
        const cssGravity = computedStyle.getValue('--s-tooltip-gravity')
        const gravity = cssGravity in gravitys ? cssGravity as keyof typeof gravitys : this.gravity
        for (const key of [gravity, ...gravitys[gravity]]) {
          const name = key as keyof typeof options
          const option = options[name]
          if (!option.overflowed) {
            position[option.name] = option.value
            const side = option.side
            position[side.name] = rect[side.name] - (side.size - side.targetSize) / 2
            if (position[side.name] < 0 && rect[side.name] + side.size < side.innerSize) {
              position[side.name] = rect[side.name]
              break
            }
            if (position[side.name] + side.size > side.innerSize && rect[side.name] - side.size > 0) {
              position[side.name] = rect[side.name] + side.targetSize - side.size
              break
            }
            if (position[side.name] < 0 || position[side.name] + side.size > side.innerSize) position[side.name] = 0
            break
          }
        }
      }
      popover.style.top = `${position.top}px`
      popover.style.left = `${position.left}px`
      popover.classList.add('opened')
      parent.setAttribute('tooltip-opened', '')
      popover.animate({ opacity: [0, 1], display }, getAnimateOptions()).finished.then(() => this.dispatchEvent(new Event('opened')))
      this.dispatchEvent(new Event('s-top-layer-open', { bubbles: true }))
    }
    const close = (parent: HTMLElement) => {
      if (!this.isConnected || !popover.classList.contains('opened')) return
      if (!this.dispatchEvent(new Event('close', { cancelable: true }))) return
      popover.classList.remove('opened')
      parent.removeAttribute('tooltip-opened')
      const animation = popover.animate({ opacity: [1, 0], display }, getAnimateOptions())
      animation.finished.then(() => {
        if (popover.classList.contains('opened')) return
        popover?.hidePopover()
        this.dispatchEvent(new Event('closed'))
      })
    }
    return {
      expose: { open },
      onMounted: (parent) => {
        const parentElement = parent instanceof ShadowRoot ? parent.host : parent
        if (!(parentElement instanceof HTMLElement)) return
        const show = () => {
          const cssDisabled = computedStyle.getValue('--s-tooltip-disabled')
          const disabled = ['', 'none'].includes(cssDisabled) ? this.disabled : Boolean(cssDisabled)
          !disabled && open(parentElement)
        }
        const close2 = () => close(parentElement)
        const hover = () => !device.touchEnabled && show()
        const unHover = () => !device.touchEnabled && close2()
        let timer: number
        const touchstart = () => timer = setTimeout(show, 500)
        const touchend = () => {
          clearTimeout(timer)
          close2()
        }
        parentElement.addEventListener('mouseover', hover)
        parentElement.addEventListener('mouseleave', unHover)
        parentElement.addEventListener('wheel', unHover)
        parentElement.addEventListener('touchstart', touchstart, { passive: true })
        parentElement.addEventListener('touchmove', touchend)
        parentElement.addEventListener('touchend', touchend)
        window.addEventListener('resize', close2)
        return () => {
          parentElement.removeEventListener('mouseover', hover)
          parentElement.removeEventListener('mouseleave', unHover)
          parentElement.removeEventListener('wheel', unHover)
          window.removeEventListener('resize', close2)
          parentElement.removeEventListener('touchstart', touchstart)
          parentElement.removeEventListener('touchmove', touchend)
          parentElement.removeEventListener('touchend', touchend)
        }
      }
    }
  }
}) { }

const name = Tooltip.define('s-tooltip')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Tooltip
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
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
      /**
      * @deprecated
      **/
      $props: HTMLAttributes
    } & Tooltip
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div']
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement>
    }
  }
}