import { useElement } from './core/element.js'
import { mediaQueries } from './core/utils/mediaQuery.js'
import { Theme } from './page.js'

const name = 's-bottom-sheet'
const props = {
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
  justify-content: center;
  align-items: flex-end;
  color: inherit;
  overflow: hidden;
}
dialog::backdrop{
  background: none;
}
dialog[open]{
  display: flex;
}
.scrim{
  background: color-mix(in srgb, var(--s-color-scrim, ${Theme.colorScrim}) 80%, transparent);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity .2s ease-out;
}
dialog.show .scrim{
  opacity: 1;
}
.container{
  position: relative;
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom);
  max-width: ${mediaQueries.mobileL}px;
  box-shadow: var(--s-elevation-level-3, ${Theme.elevationLevel3});
  background: var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest});
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
::slotted([slot=text]){
  padding: 24px;
  line-height: 1.6;
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<dialog part="popup">
  <div class="scrim" part="scrim"></div>
  <div class="container" part="container">
    <div class="indicator" part="indicator"></div>
    <slot name="text"></slot>
    <slot></slot>
  </div>
</dialog>
`

type View = HTMLElement | ((bottomSheet: BottomSheet) => void)

const builder = (options: string | View | {
  root?: Element
  view: View
}) => {
  let root: Element = document.body
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') root = page
  const bottomSheet = new BottomSheet()
  if (typeof options === 'function' || options instanceof HTMLElement) {
    options instanceof HTMLElement ? bottomSheet.appendChild(options) : options(bottomSheet)
  } else if (typeof options === 'string') {
    const text = document.createElement('div')
    text.slot = 'text'
    text.textContent = options
    bottomSheet.appendChild(text)
  } else {
    if (options.root) root = options.root
    options.view instanceof HTMLElement ? bottomSheet.appendChild(options.view) : options.view(bottomSheet)
  }
  bottomSheet.addEventListener('closed', () => root.removeChild(bottomSheet))
  bottomSheet.showed = true
  root.appendChild(bottomSheet)
  return bottomSheet
}

type EventShowSource = 'TRIGGER'
type EventCloseSource = 'SCRIM'

class BottomSheet extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const dialog = shadowRoot.querySelector('dialog') as HTMLDialogElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    shadowRoot.querySelector('slot[name=trigger]')!.addEventListener('click', () => {
      if (this.showed || !this.dispatchEvent(new CustomEvent('show', { cancelable: true, detail: { source: 'TRIGGER' } }))) return
      this.showed = true
    })
    const onClose = (source: EventCloseSource) => {
      if (!this.showed || !this.dispatchEvent(new CustomEvent('close', { cancelable: true, detail: { source } }))) return
      this.showed = false
    }
    shadowRoot.querySelector('.scrim')!.addEventListener('click', () => onClose('SCRIM'))
    const animateOptions = { duration: 200, easing: 'ease-out' } as const
    const show = () => {
      if (!this.isConnected || dialog.open) return
      dialog.showModal()
      const animation = container.animate([{ transform: 'translateY(100%)', opacity: 0 }, { opacity: 1 }], animateOptions)
      dialog.classList.add('show')
      animation.addEventListener('finish', () => this.dispatchEvent(new Event('showed')))
    }
    const close = () => {
      if (!this.isConnected || !dialog.open) return
      const animation = container.animate([{ opacity: 1 }, { transform: 'translateY(100%)' }], animateOptions)
      dialog.classList.remove('show')
      animation.addEventListener('finish', () => {
        dialog.close()
        this.dispatchEvent(new Event('closed'))
      })
    }
    return {
      mounted: () => this.showed && show(),
      props: {
        showed: (value) => value ? show() : close()
      }
    }
  }
}) {
  static readonly builder = builder
}

BottomSheet.define(name)

export { BottomSheet }

interface EventMap {
  show: CustomEvent<{ source?: EventShowSource }>
  showed: Event
  close: CustomEvent<{ source?: EventCloseSource }>
  closed: Event
}

type ElementEventMap = EventMap & HTMLElementEventMap

interface BottomSheet {
  addEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: BottomSheet, ev: ElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: BottomSheet, ev: ElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

declare global {
  interface HTMLElementTagNameMap {
    [name]: BottomSheet
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