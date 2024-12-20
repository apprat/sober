import { useElement } from './core/element.js'
import { Theme } from './page.js'

const name = 's-popup'
const props = {
  align: 'center' as 'center' | 'left' | 'right',
  showed: false
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
}
dialog{
  top: 0;
  left: 0;
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
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
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
    const dialog = shadowRoot.querySelector('dialog') as HTMLDialogElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const animateOptions = { duration: 200, easing: 'ease-out' } as const
    const show = (option?: HTMLElement | ShowOptions) => {
      if (!this.isConnected || dialog.open) return
      if (!this.dispatchEvent(new Event('show', { cancelable: true }))) return
      const position = { top: 0, left: 0, origin: [] as string[] }
      dialog.showModal()
      const cWidth = container.offsetWidth
      const cHeight = container.offsetHeight
      if (!option || option instanceof HTMLElement) {
        const el = option ?? this
        if (!el) return
        const rect = el.getBoundingClientRect()
        position.origin = ['center', 'top']
        position.top = rect.top + rect.height
        position.left = rect.left - ((cWidth - rect.width) / 2)
        if (this.align === 'center') {
          if (position.left < 0) {
            position.left = rect.left, 0
            position.origin[0] = 'left'
          }
          if (position.left + cWidth > innerWidth) {
            position.left = rect.left + rect.width - cWidth, 0
            position.origin[0] = 'right'
          }
          if (position.top + rect.height + cHeight > innerHeight) {
            position.top = rect.top - cHeight
            position.origin[1] = 'bottom'
          }
        }
        const calls = {
          left() {
            position.top = rect.top
            position.left = rect.left - cWidth
            position.origin[0] = 'right'
          },
          right() {
            position.top = rect.top
            position.left = rect.left + rect.width
            position.origin[0] = 'left'
          },
          bottom() {
            position.top = rect.top - cHeight + rect.height
            position.origin[1] = 'bottom'
          }
        }
        if (this.align === 'left') {
          calls.left()
          if (position.top + cHeight > innerHeight) calls.bottom()
        }
        if (this.align === 'right') {
          calls.right()
          if (position.left + cWidth > innerWidth) calls.left()
          if (position.top + cHeight > innerHeight) calls.bottom()
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
      container.style.transformOrigin = position.origin.join(' ')
      container.style.top = `${Math.max(position.top, 0)}px`
      container.style.left = `${Math.max(position.left, 0)}px`
      const animation = container.animate([{ transform: 'scale(.9)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], animateOptions)
      animation.finished.then(() => this.dispatchEvent(new Event('showed')))
    }
    const close = () => {
      if (!this.isConnected || !dialog.open) return
      if (!this.dispatchEvent(new Event('close', { cancelable: true }))) return
      const animation = container.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.9)', opacity: 0 }], animateOptions)
      animation.finished.then(() => {
        dialog.close()
        this.dispatchEvent(new Event('closed'))
      })
    }
    const toggle = (option?: HTMLElement | ShowOptions) => dialog.open ? close() : show(option)
    shadowRoot.querySelector('slot[name=trigger]')!.addEventListener('click', () => show())
    shadowRoot.querySelector('.scrim')!.addEventListener('pointerdown', close)
    return {
      expose: { show },
      mounted: () => addEventListener('resize', close),
      unmounted: () => removeEventListener('resize', close)
    }
  }
}) { }

Popup.define(name)

export { Popup }

interface EventMap {
  show: Event
  showed: Event
  close: Event
  closed: Event
}

type ElementEventMap = EventMap & HTMLElementEventMap

interface Popup {
  addEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: Popup, ev: ElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: Popup, ev: ElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

declare global {
  interface HTMLElementTagNameMap {
    [name]: Popup
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props> & { [K in keyof EventMap as `on${K}`]?: (ev: EventMap[K]) => void }
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