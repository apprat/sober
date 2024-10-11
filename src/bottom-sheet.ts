import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'

const name = 's-bottom-sheet'
const props = {
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
}
.wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-index, 2);
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.scrim{
  background: color-mix(in srgb, var(--s-color-scrim, ${Theme.colorScrim}) 80%, transparent);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity .2s ease-out;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  pointer-events: none;
}
.wrapper.show .scrim{
  opacity: 1;
  pointer-events: auto;
}
.container{
  position: relative;
  border-radius: 24px 24px 0 0;
  max-width: 520px;
  width: 100%;
  max-height: calc(100% - 56px);
  background: var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest});
  display: flex;
  flex-direction: column;
  top: 100%;
  --z-index: var(--z-index, 2);
}
.show.wrapper .container{
  top: 0;
  pointer-events: auto;
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
.indicator{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
}
.indicator::before{
  content: '';
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  opacity: .4;
}
::slotted([slot=view]){
  flex-grow: 1;
  max-height: 280px;
  overscroll-behavior: none;
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<div class="wrapper" part="wrapper">
  <div class="scrim" part="scrim"></div>
  <div class="container" part="container">
    <div class="indicator" part="indicator"></div>
    <slot></slot>
  </div>
</div>
`

type View = HTMLElement | ((bottomSheet: BottomSheet) => void)

const show = (options: View | {
  root?: Element
  view: View
}) => {
  let root: Element = document.body
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') root = page
  const bottomSheet = new BottomSheet()
  if (typeof options === 'function' || options instanceof HTMLElement) {
    options instanceof HTMLElement ? bottomSheet.appendChild(options) : options(bottomSheet)
  } else {
    if (options.root) root = options.root
    options.view instanceof HTMLElement ? bottomSheet.appendChild(options.view) : options.view(bottomSheet)
  }
  root.appendChild(bottomSheet)
  bottomSheet.addEventListener('dismissed', () => root.removeChild(bottomSheet))
  requestAnimationFrame(bottomSheet.show)
  return bottomSheet
}

class BottomSheet extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLElement
    const wrapper = shadowRoot.querySelector('.wrapper') as HTMLDivElement
    const scrim = shadowRoot.querySelector('.scrim') as HTMLDivElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const animationOptions = { duration: 200, easing: 'ease-out' }
    const show = (source?: EventShowSource) => {
      if (!this.dispatchEvent(new CustomEvent('show', { cancelable: true, detail: { source } }))) return
      wrapper.classList.add('show')
      const animation = container.animate([{ transform: 'translateY(100%)', top: 0 }, { transform: 'translateY(0%)', top: 0 }], animationOptions)
      this.dispatchEvent(new Event('show'))
      animation.addEventListener('finish', () => this.dispatchEvent(new Event('showed')))
    }
    const dismiss = (source?: EventDismissSource) => {
      if (!this.dispatchEvent(new CustomEvent('dismiss', { cancelable: true, detail: { source } }))) return
      wrapper.classList.remove('show')
      const animation = container.animate([{ transform: 'translateY(0%)', top: 0 }, { transform: 'translateY(100%)', top: 0 }], animationOptions)
      this.dispatchEvent(new Event('dismiss'))
      animation.addEventListener('finish', () => this.dispatchEvent(new Event('dismissed')))
    }
    trigger.addEventListener('click', () => show('TRIGGER'))
    scrim.addEventListener('click', () => dismiss('SCRIM'))
    return {
      expose: {
        show: () => show(),
        dismiss: () => dismiss()
      }
    }
  }
}) {
  static readonly show = show
}

BottomSheet.define(name)

export { BottomSheet }

type EventShowSource = 'TRIGGER'
type EventDismissSource = 'SCRIM'

interface EventMap extends HTMLElementEventMap {
  show: CustomEvent<{ source?: EventShowSource }>
  showed: Event
  dismiss: CustomEvent<{ source?: EventDismissSource }>
  dismissed: Event
}

interface BottomSheet {
  addEventListener<K extends keyof EventMap>(type: K, listener: (this: BottomSheet, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof EventMap>(type: K, listener: (this: BottomSheet, ev: EventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: BottomSheet
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}