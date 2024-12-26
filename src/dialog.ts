import { useElement } from './core/element.js'
import { mediaQueries } from './core/utils/mediaQuery.js'
import { Theme } from './page.js'
import './scroll-view.js'

const name = 's-dialog'
const props = {
  showed: false,
  size: 'standard' as 'standard' | 'full'
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
  color: inherit;
}
dialog::backdrop{
  background: none;
}
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: none;
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
.container,
::slotted([slot=custom]){
  max-width: calc(100% - 48px);
  max-height: calc(100% - 48px);
  pointer-events: auto;
  position: relative;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition-timing-function: ease-out;
  width: ${mediaQueries.mobileL}px;
  box-shadow: var(--s-elevation-level5, ${Theme.elevationLevel5});
  background: var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest});
}
:host([size=full]) .container{
  width: 100%;
  height: 100%;
  border-radius: 0;
  max-width: none;
  max-height: none;
}
::slotted([slot=headline]){
  padding: 24px 24px 0 24px;
  font-size: 1.5rem;
  line-height: 1.6;
  font-weight: 600;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
  flex-shrink: 0;
}
.text{
  user-select: text;
  -webkit-user-select: text;
  flex-grow: 1;
}
::slotted([slot=text]){
  margin: 16px 24px;
  line-height: 1.6;
}
.action{
  display: flex;
  justify-content: flex-end;
  padding: 0 14px;
  flex-shrink: 0;
}
::slotted([slot=action]){
  min-width: 72px;
  margin: 16px 2px;
  display: inline-flex;
  align-items: center;
  padding: 0 24px;
  color: var(--s-color-primary, ${Theme.colorPrimary});
  box-sizing: border-box;
  height: 40px;
  font-size: .875rem;
  cursor: pointer;
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<dialog part="popup">
  <div class="scrim" part="scrim"></div>
  <slot name="custom" class="wrapper" part="wrapper">
    <div class="container" part="container">
      <slot name="headline"></slot>
      <s-scroll-view class="text" part="view">
        <slot></slot>
        <slot name="text"></slot>
      </s-scroll-view>
      <div class="action" part="action">
        <slot name="action"></slot>
      </div>
    </div>
  </slot>
</dialog>
`

const builder = (options: string | {
  root?: Element
  headline?: string
  text?: string
  view?: HTMLElement | ((dialog: Dialog) => void)
  actions?: { text: string, click?: (event: MouseEvent) => unknown }[],
}) => {
  let root: Element = document.body
  const dialog = new Dialog()
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') root = page
  if (typeof options === 'string') {
    const text = document.createElement('div')
    text.slot = 'text'
    text.textContent = options
    dialog.appendChild(text)
  } else {
    if (options.root) root = options.root
    if (options.headline) {
      const headline = document.createElement('div')
      headline.slot = 'headline'
      headline.textContent = options.headline
      dialog.appendChild(headline)
    }
    if (options.text) {
      const text = document.createElement('div')
      text.slot = 'text'
      text.textContent = options.text
      dialog.appendChild(text)
    }
    if (options.view) {
      typeof options.view === 'function' ? options.view(dialog) : dialog.appendChild(options.view)
    }
    for (const item of options.actions ?? []) {
      const action = document.createElement('s-button')
      action.slot = 'action'
      action.type = 'text'
      action.textContent = item.text
      if (item.click) action.addEventListener('click', item.click)
      dialog.appendChild(action)
    }
  }
  dialog.showed = true
  dialog.addEventListener('closed', () => root.removeChild(dialog))
  root.appendChild(dialog)
  return dialog
}

type EventShowSource = 'TRIGGER'
type EventCloseSource = 'SCRIM' | 'ACTION'

class Dialog extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const dialog = shadowRoot.querySelector('dialog') as HTMLDialogElement
    const wrapper = shadowRoot.querySelector('.wrapper') as HTMLDivElement
    shadowRoot.querySelector('slot[name=trigger]')!.addEventListener('click', () => {
      if (this.showed || !this.dispatchEvent(new CustomEvent('show', { cancelable: true, detail: { source: 'TRIGGER' } }))) return
      this.showed = true
    })
    const onClose = (source: EventCloseSource) => {
      if (!this.showed || !this.dispatchEvent(new CustomEvent('close', { cancelable: true, detail: { source } }))) return
      this.showed = false
    }
    shadowRoot.querySelector('.scrim')!.addEventListener('click', () => onClose('SCRIM'))
    shadowRoot.querySelector('slot[name=action]')!.addEventListener('click', () => onClose('ACTION'))
    const animateOptions = { duration: 200, easing: 'ease-out' } as const
    const show = () => {
      if (!this.isConnected || dialog.open) return
      dialog.showModal()
      const animation = wrapper.animate([{ transform: 'scale(.9)', opacity: 0 }, { opacity: 1 }], animateOptions)
      dialog.classList.add('show')
      animation.addEventListener('finish', () => this.dispatchEvent(new Event('showed')))
    }
    const close = () => {
      if (!this.isConnected || !dialog.open) return
      const animation = wrapper.animate([{ opacity: 1 }, { transform: 'scale(.9)', opacity: 0 }], animateOptions)
      dialog.classList.remove('show')
      animation.addEventListener('finish', () => {
        dialog.close()
        this.dispatchEvent(new Event('closed'))
      })
    }
    return {
      mounted: () => this.showed && !dialog.open && show(),
      props: {
        showed: (value) => value ? show() : close()
      }
    }
  }
}) {
  static readonly builder = builder
}

Dialog.define(name)

export { Dialog }

interface EventMap {
  show: CustomEvent<{ source?: EventShowSource }>
  showed: Event
  close: CustomEvent<{ source?: EventCloseSource }>
  closed: Event
}

type ElementEventMap = EventMap & HTMLElementEventMap

interface Dialog {
  addEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: Dialog, ev: ElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: Dialog, ev: ElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

declare global {
  interface HTMLElementTagNameMap {
    [name]: Dialog
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