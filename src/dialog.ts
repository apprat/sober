import { useElement, JSXAttributes } from './core/element.js'
import { getStackingContext } from './core/utils.js'
import './scroll-view.js'

const name = 's-dialog'
const props = {
  size: 'basic' as 'basic' | 'full'
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
  align-items: center;
}
.scrim{
  background: var(--s-color-scrim, #000000);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: opacity(0);
  transition: filter .24s, backdrop-filter .24s;
  pointer-events: none;
}
.wrapper.show .scrim{
  filter: opacity(.8);
  backdrop-filter: blur(12px);
  pointer-events: auto;
}
.container{
  max-width: calc(100% - 48px);
  max-height: calc(100% - 48px);
  width: 520px;
  height: calc-size(auto);
  background: var(--s-color-surface-container-highest, #e5e1e6);
  position: relative;
  border-radius: 28px;
  box-shadow: var(--s-elevation-level5, 0 10px 14px -6px rgba(0, 0, 0, .2), 0 22px 35px 3px rgba(0, 0, 0, .14), 0 8px 42px 7px rgba(0, 0, 0, .12));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  visibility: hidden;
  transition: width .24s, height .24s, border-radius .24s;
}
.wrapper.show .container{
  pointer-events: auto;
  visibility: visible;
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
  color: var(--s-color-on-surface, #1c1b1f);
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
::slotted(s-button[slot=action]){
  min-width: 72px;
  margin: 20px 2px;
}
:host([size=full]) ::slotted([slot=text]),
:host([size=full]) ::slotted(:not([slot])){
  max-width: none;
}
::slotted(*){
  --z-index: calc(var(--z-index, 2) + 1);
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<div class="wrapper" part="wrapper">
  <div class="scrim" part="scrim"></div>
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
</div>
`

const show = (options: string | {
  root?: Element
  headline?: string
  text?: string
  view?: HTMLElement | ((dialog: Dialog) => void)
  actions?: { text: string, click?: (event: MouseEvent) => unknown }[],
}) => {
  let root: Element = document.body
  const dialog = new Dialog()
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') {
    root = page
  }
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
  root.appendChild(dialog)
  dialog.addEventListener('dismissed', () => root.removeChild(dialog))
  dialog.show()
}

class Dialog extends useElement({
  style, template, props, syncProps: ['size'],
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLSlotElement
    const wrapper = shadowRoot.querySelector('.wrapper') as HTMLDivElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const scrim = shadowRoot.querySelector('.scrim') as HTMLDivElement
    const action = shadowRoot.querySelector('slot[name=action]') as HTMLSlotElement
    const show = () => {
      const stackingContext = getStackingContext(shadowRoot)
      if (stackingContext.top !== 0 || stackingContext.left !== 0) {
        const style = `width: ${innerWidth}px;height: ${innerHeight}px;top: ${0 - stackingContext.top}px;left: ${0 - stackingContext.left}px`
        scrim.setAttribute('style', style)
        wrapper.setAttribute('style', style)
      }
      wrapper.classList.add('show')
      const animation = container.animate([
        { transform: 'scale(.9)', filter: 'opacity(0)', visibility: 'visible' },
        { transform: 'scale(1)', filter: 'opacity(1)', visibility: 'visible' }
      ], { duration: 240 })
      animation.addEventListener('finish', () => this.dispatchEvent(new Event('showed')))
      this.dispatchEvent(new Event('show'))
    }
    const dismiss = () => {
      wrapper.classList.remove('show')
      const animation = container.animate([
        { transform: 'scale(1)', filter: 'opacity(1)', visibility: 'visible' },
        { transform: 'scale(.9)', filter: 'opacity(0)', visibility: 'visible' }
      ], { duration: 240 })
      animation.addEventListener('finish', () => this.dispatchEvent(new Event('dismissed')))
      this.dispatchEvent(new Event('dismiss'))
    }
    trigger.addEventListener('click', show)
    scrim.addEventListener('click', dismiss)
    action.addEventListener('click', dismiss)
    return {
      expose: { show, dismiss }
    }
  }
}) {
  static readonly show = show
}

Dialog.define(name)

export { Dialog }

interface EventMap extends HTMLElementEventMap {
  show: Event
  showed: Event
  dismiss: Event
  dismissed: Event
}

interface Dialog {
  addEventListener<K extends keyof EventMap>(type: K, listener: (this: Dialog, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof EventMap>(type: K, listener: (this: Dialog, ev: EventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Dialog
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}