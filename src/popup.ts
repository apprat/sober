import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import { convertCSSDuration } from './core/utils/CSSUtils.js'

type Props = {
  align: 'top' | 'bottom' | 'left' | 'right'
}

const name = 's-popup'
const props: Props = {
  align: 'bottom'
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  text-align: left;
}
dialog{
  inset: 0;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  padding: 0;
  max-width: none;
  max-height: none;
  outline: none;
  position: relative;
  overflow: hidden;
  color: inherit;
}
dialog::backdrop{
  background: none;
}
.scrim{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.container{
  position: relative;
  width: fit-content;
  max-width: 100%;
  max-height: 100%;
}
::slotted(:not([slot])){
  border-radius: 4px;
  max-width: 100%;
  max-height: 100%;
  white-space: nowrap;
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<dialog class="popup" part="popup">
  <div class="scrim" part="scrim"></div>
  <div class="container" part="container">
    <slot></slot>
  </div>
</dialog>
`

type ShowOptions = { x: number, y: number, origin?: string }

class Popup extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const dialog = shadowRoot.querySelector<HTMLDialogElement>('dialog')!
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const computedStyle = getComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getPropertyValue('--s-motion-easing-standard') || Theme.motionEasingStandard
      const duration = computedStyle.getPropertyValue('--s-motion-duration-medium4') || Theme.motionDurationMedium4
      return { easing: easing, duration: convertCSSDuration(duration) }
    }
    const show = (option?: HTMLElement | ShowOptions) => {
      if (!this.isConnected || dialog.open) return
      const position = { top: 0, left: 0, origin: [] as string[] }
      dialog.showModal()
      if (!this.dispatchEvent(new Event('show', { cancelable: true }))) return dialog.close()
      const cWidth = container.offsetWidth
      const cHeight = container.offsetHeight
      if (!option || option instanceof HTMLElement) {
        const el = option ?? this
        if (!el) return
        const rect = el.getBoundingClientRect()
        const calls = {
          middle(align: 'top' | 'bottom') {
            position.origin[0] = 'center'
            position.left = rect.left - ((cWidth - rect.width) / 2)
            const bottom = () => {
              position.top = rect.top + rect.height
              position.origin[1] = 'top'
              return position.top + cHeight > innerHeight
            }
            const top = () => {
              position.top = rect.top - cHeight
              position.origin[1] = 'bottom'
              return position.top < 0
            }
            if (position.left < 0) {
              position.left = rect.left
              position.origin[0] = 'left'
            }
            if (position.left + cWidth > innerWidth) {
              position.left = rect.left + rect.width - cWidth
              position.origin[0] = 'right'
            }
            if (align === 'top') top() && bottom()
            if (align === 'bottom') bottom() && top()
          },
          left() {
            position.origin = ['right', 'top']
            position.left = rect.left - cWidth
            position.top = rect.top
            return position.left < 0
          },
          right() {
            position.origin = ['left', 'top']
            position.left = rect.left + rect.width
            position.top = rect.top
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
      } else {
        position.top = option.y
        position.left = option.x
        position.origin = option.origin?.split(' ') ?? ['left', 'top']
        if (option.x + cWidth > innerWidth) {
          position.left = option.x - cWidth
          position.origin[0] = 'right'
        }
        if (option.y + cHeight > innerHeight) {
          position.top = option.y - cHeight
          position.origin[1] = 'bottom'
        }
      }
      console.log('显示', position)
      container.style.transformOrigin = position.origin.join(' ')
      container.style.top = `${Math.max(position.top, 0)}px`
      container.style.left = `${Math.max(position.left, 0)}px`
      const animation = container.animate({ transform: ['scale(.9)', 'scale(1)'], opacity: [0, 1] }, getAnimateOptions())
      this.setAttribute('showed', '')
      animation.finished.then(() => this.dispatchEvent(new Event('showed')))
    }
    const close = () => {
      if (!this.isConnected || !dialog.open || container.getAnimations().length > 0) return
      if (!this.dispatchEvent(new Event('close', { cancelable: true }))) return
      const animation = container.animate({ transform: ['scale(1)', 'scale(.9)'], opacity: [1, 0] }, getAnimateOptions())
      this.removeAttribute('showed')
      animation.finished.then(() => {
        dialog.close()
        this.dispatchEvent(new Event('closed'))
      })
    }
    const toggle = (option?: HTMLElement | ShowOptions) => dialog.open ? close() : show(option)
    shadowRoot.querySelector('slot[name=trigger]')!.addEventListener('click', () => show())
    shadowRoot.querySelector('.scrim')!.addEventListener('pointerdown', close)
    return {
      expose: { show, toggle, close },
      onMounted: () => addEventListener('resize', close),
      onUnmounted: () => removeEventListener('resize', close)
    }
  }
}) { }

Popup.define(name)

export { Popup }

interface Events {
  Show: Event
  Showed: Event
  Closed: Event
}

type EventMaps = Events & HTMLElementEventMap

interface Popup {
  addEventListener<K extends keyof EventMaps>(type: Lowercase<K>, listener: (this: Popup, ev: EventMaps[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof EventMaps>(type: Lowercase<K>, listener: (this: Popup, ev: EventMaps[K]) => any, options?: boolean | EventListenerOptions): void
}

type JSXEvents<L extends boolean = false> = {
  [K in keyof EventMaps as `on${L extends false ? K : Lowercase<K>}`]?: (ev: EventMaps[K]) => void
}

declare global {
  interface HTMLElementTagNameMap {
    [name]: Popup
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props> & Events<true>
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
      $props: HTMLAttributes & Partial<Props> & JSXEvents
    } & Popup
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props> & JSXEvents
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props> & Events<true>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props> & Events<true>
    }
  }
}