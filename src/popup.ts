import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import { convertCSSDuration } from './core/utils/CSSUtils.js'

type Props = {
  align: 'center' | 'left' | 'right'
}

const name = 's-popup'
const props: Props = {
  align: 'center'
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
  inset: 0;
  width: 100%;
  height: 100%;
}
.container{
  display: block;
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  width: fit-content;
  height: fit-content;
}
::slotted(:not([slot])){
  outline: none;
  border-radius: 4px;
  max-width: inherit;
  max-height: inherit;
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<dialog class="popup" part="popup">
  <div class="scrim" part="scrim"></div>
  <slot class="container" part="container"></slot>
</dialog>
`

const getPosition = (rect: DOMRect, cw: number, ch: number, align: Props['align']) => {
  const position = { top: 0, left: 0, origin: [] as string[] }
  //垂直
  const centered = align === 'center'
  const top = centered ? rect.top + rect.height : rect.top
  const bottom = centered ? rect.top - ch : rect.top - ch + rect.height
  if (top + ch <= innerHeight) {
    position.top = top
    position.origin[1] = 'top'
  } else if (bottom >= 0) {
    position.top = bottom
    position.origin[1] = 'bottom'
  } else {
    const y = (innerHeight - ch) / 2
    position.top = y
    position.origin[1] = `${rect.top + (rect.height / 2) - y}px`
  }
  //水平
  if (centered) {
    position.left = rect.left - (cw - rect.width) / 2
    position.origin[0] = 'center'
    if (position.left < 0) {
      position.left = rect.left
      position.origin[0] = `${rect.width / 2}px`
    } else if (position.left + cw > innerWidth) {
      position.left = rect.left + rect.width - cw
      position.origin[0] = `${(cw - rect.width) + (rect.width / 2)}px`
    }
  } else {
    const left = (call?: Function) => {
      position.left = rect.left - cw
      position.origin[0] = 'right'
      if (position.left < 0 && call) call()
    }
    const right = (call?: Function) => {
      position.left = rect.left + rect.width
      position.origin[0] = 'left'
      if (position.left + cw > innerWidth && call) call()
    }
    const center = () => {
      const x = (innerWidth - cw) / 2
      position.left = x
      position.origin[0] = `${(rect.left + (rect.width / 2)) - x}px`
    }
    align === 'left' ? left(() => right(center)) : right(() => left(center))
  }
  return position
}

type ShowOptions = { x: number, y: number, origin?: string }

class Popup extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const dialog = shadowRoot.querySelector<HTMLDialogElement>('dialog')!
    const container = shadowRoot.querySelector<HTMLSlotElement>('.container')!
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
      container.style.maxHeight = `${innerHeight}px`
      container.style.maxWidth = `${innerWidth}px`
      const cw = container.offsetWidth
      const ch = container.offsetHeight
      if (!option || option instanceof HTMLElement) {
        const el = option ?? this
        const rect = el.getBoundingClientRect()
        const info = getPosition(rect, cw, ch, this.align)
        position.top = info.top
        position.left = info.left
        position.origin = info.origin
      } else {
        position.top = option.y
        position.left = option.x
        position.origin = option.origin?.split(' ') ?? ['left', 'top']
        if (option.x + cw > innerWidth) {
          position.left = option.x - cw
          position.origin[0] = 'right'
        }
        if (option.y + ch > innerHeight) {
          position.top = option.y - ch
          position.origin[1] = 'bottom'
        }
      }
      container.style.transformOrigin = position.origin.join(' ')
      container.style.top = `${position.top}px`
      container.style.left = `${position.left}px`
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