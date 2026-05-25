import { useElement, useProps } from '../core/elements.js'
import { device } from '../core/device.js'
import { getStackingContext } from '../core/utils/getStackingContext.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import { oneEvent } from '../core/utils/oneEvent.js'
import { popup } from '../core/utils/popup.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  gravity: ['bottom', 'top', 'left', 'right'],
  disabled: false,
  $ancestorLevel: -1,
})
const events = {
  opened: Event,
  closed: Event
}

const style = /*css*/`
:host{
  display: contents;
  font-size: calc(var(--s-font-size, 1) * 13px);
  line-height: calc(100% + 4px);
  font-weight: 400;
  border-radius: 4px;
  border: none;
  padding: 6px 8px;
  outline-offset: 4px;
  filter: opacity(.95);
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  background: ${scheme.color.inverseSurface};
  color: ${scheme.color.inverseOnSurface};
}
.popover{
  pointer-events: none;
  position: fixed;
  display: none;
  inset: 0;
  margin: 0;
  width: max-content;
  height: max-content;
  border: inherit;
  overflow: hidden;
  outline: none;
  max-width: 100%;
  max-height: 100%;
  padding: inherit;
  filter: inherit;
  border-radius: inherit;
  background: inherit;
  color: inherit;
  transition-property: none;
  z-index: 3;
}
`

const template = /*html*/`
<slot class="popover" popover="manual" part="popup"></slot>
`

export class Tooltip extends useElement({
  style, template, props, events,
  setup(shadowRoot, info) {
    const popover = shadowRoot.querySelector<HTMLSlotElement>('.popover')!
    const computedStyle = useComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('transition-timing-function')
      const duration = computedStyle.getDuration('transition-duration')
      return { easing, duration }
    }
    const state: { opened: boolean, timer?: number } = { opened: false }
    const open = async () => {
      if (!this.isConnected || !info.parentNode || state.opened) return
      state.opened = true
      popover.style.display = 'block'
      popover.style.removeProperty('top')
      popover.style.removeProperty('left')
      if (!popover.showPopover) {
        const rect = getStackingContext(shadowRoot)
        popover.style.marginLeft = `${-rect.left}px`
        popover.style.marginTop = `${-rect.top}px`
      }
      popover.showPopover?.()
      const cssGravity = computedStyle.getValue('--s-tooltip-gravity') as typeof this.gravity
      const gravity = props.metadata.gravity.types?.includes(cssGravity) ? cssGravity : this.gravity
      const gap = Number(computedStyle.getValue('outline-offset').slice(0, -2))
      const position = popup({ anchor: info.parentNode, popover, gravity, gap })
      popover.style.top = `${position.top}px`
      popover.style.left = `${position.left}px`
      popover.style.transformOrigin = position.origin.join(' ')
      await popover.animate({ opacity: [0, 1], transform: ['scale(.8)', 'scale(1)'] }, getAnimateOptions()).finished
      this.dispatchEvent(new Event('opened'))
    }
    const close = async () => {
      if (!this.isConnected || !state.opened) return
      state.opened = false
      await popover.animate({ opacity: [1, 0], transform: ['scale(1)', 'scale(.8)'] }, getAnimateOptions()).finished
      if (state.opened) return
      popover.hidePopover?.()
      popover.style.removeProperty('display')
      this.dispatchEvent(new Event('closed'))
    }
    const show = () => {
      if (this.disabled) return
      open()
      this.dispatchEvent(new Event('open'))
    }
    const hide = () => {
      if (this.disabled) return
      close()
      this.dispatchEvent(new Event('close'))
    }
    const hover = () => {
      if (!device.mouseEnabled) return
      show()
      oneEvent([
        { element: info.parentNode!, events: ['pointerleave'] },
        { element: document, events: ['wheel'] },
        { element: window, events: ['resize'] }
      ], hide)
    }
    const press = () => {
      state.timer = setTimeout(show, 200)
      oneEvent([
        { element: document, events: ['touchend', 'touchmove', 'touchcancel'] },
        { element: window, events: ['resize'] }
      ], () => {
        clearTimeout(state.timer)
        state.opened && hide()
      })
    }
    const addEvent = () => {
      if (!info.parentNode) return
      let parent = info.parentNode
      if (this.ancestorLevel > -1 && this.parentNode) {
        let ancestor: HTMLElement = this
        for (let i = -1; i < this.ancestorLevel; i++) {
          if (ancestor.assignedSlot) {
            ancestor = ancestor.assignedSlot
            continue
          }
          if (!ancestor.parentNode) return
          if (ancestor.parentNode instanceof ShadowRoot) {
            const host = ancestor.parentNode.host
            if (!(host instanceof HTMLElement)) return
            ancestor = host
            continue
          }
          if (!(ancestor.parentNode instanceof HTMLElement)) return
          ancestor = ancestor.parentNode
        }
        parent = ancestor
      }
      parent.addEventListener('mouseover', hover)
      parent.addEventListener('touchstart', press)
      info.parentNode = parent
    }
    const removeEvent = () => {
      info.parentNode?.removeEventListener('mouseover', hover)
      info.parentNode?.removeEventListener('touchstart', press)
    }
    return {
      expose: { open, close },
      onMounted: addEvent,
      onUnmounted: removeEvent,
      setAncestorLevel: () => {
        removeEvent()
        addEvent()
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