import { builder, html } from './core/element.js'
import { getStackingContext } from './core/utils.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
}
.wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}
.container{
  background: var(--s-color-inverse-surface, #2f3133);
  color: var(--s-color-inverse-on-surface, #f0f0f3);
  min-height: 48px;
  border-radius: var(--s-shape-corner-extra-small, 4px);
  box-shadow: var(--s-elevation-level3, 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12));
  line-height: 1.6;
  display: inline-flex;
  align-items: center;
  min-width: 320px;
  max-width: 480px;
  font-size: .875rem;
  font-weight: 400;
  margin: 16px;
  pointer-events: auto;
  transform: translateY(100%);
  filter: opacity(0);
  transition: transform .1s, filter .1s;
}
.wrapper.show .container{
  transform: translateY(0%);
  filter: opacity(1);
}
.supporting-text{
  margin: 12px 16px;
  flex-grow: 1;
  user-select: text;
  -webkit-user-select: text;
}
.action{
  font-size: inherit;
  flex-shrink: 0;
  border-radius: var(--s-shape-corner-extra-small, 4px);
  color: var(--s-color-inverse-primary, #8fcdff);
  margin-right: 8px;
  margin-left: -8px;
  min-height: 36px;
  padding: 0 16px;
  display: flex;
  align-items: center;
}
.action:empty{
  display: none;
}
@media (max-width: 480px){
  .container{
    margin: 8px;
    min-width: auto;
  }
}
`

const name = 's-snackbar'
const props = {
  duration: 5000,
  action: ''
}

const show = (options: string | {
  view?: Element
  text: string
  duration?: number
  action?: string
  onAction?: (event: Event) => boolean | undefined
}) => {
  let view: Element = document.body
  const snackbar = document.createElement('s-snackbar')
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') {
    view = page
  }
  if (typeof options === 'string') {
    snackbar.textContent = options
  } else {
    if (options.view) view = options.view
    if (options.action) snackbar.action = options.action
    if (options.duration) snackbar.duration = options.duration
    if (options.action) snackbar.addEventListener('action', (event) => options.onAction?.(event))
    snackbar.textContent = options.text
  }
  view.appendChild(snackbar)
  snackbar.addEventListener('dismissed', () => view.removeChild(snackbar))
  snackbar.show()
}

class Component extends builder({
  name, style, props,
  setup(shadowRoot) {
    let wrapper: HTMLDivElement
    let action: HTMLDivElement
    const state = { timer: 0 }
    const show = () => {
      const stackingContext = getStackingContext(shadowRoot)
      wrapper.style.top = `${0 - stackingContext.top}px`
      wrapper.style.left = `${0 - stackingContext.left}px`
      clearTimeout(state.timer)
      getComputedStyle(wrapper).top
      wrapper.classList.add('show')
      this.dispatchEvent(new Event('show'))
      if (this.duration > 0) state.timer = setTimeout(dismiss, this.duration)
    }
    const dismiss = () => {
      clearTimeout(state.timer)
      wrapper.classList.remove('show')
      this.dispatchEvent(new Event('dismiss'))
    }
    const onAction = () => {
      if (!this.dispatchEvent(new Event('action', { cancelable: true }))) return
      dismiss()
    }
    const transitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return
      const showed = wrapper.classList.contains('show')
      this.dispatchEvent(new Event(showed ? 'showed' : 'dismissed'))
    }
    return {
      expose: { show, dismiss },
      watches: {
        action: (value) => action.textContent = value
      },
      render: () => html`
        <slot name="trigger" @click="${show}"></slot>
        <div class="wrapper" ref="${(el: HTMLDivElement) => wrapper = el}" @transitionend="${transitionEnd}">
          <div class="container" part="container">
            <div class="supporting-text">
              <slot></slot>
            </div>
            <s-ripple class="action" ref="${(el: HTMLDivElement) => action = el}" @click="${onAction}"></s-ripple>
          </div>
        </div>
      `
    }
  }
}) {
  static readonly show = show
}

Component.define()

interface EventMap extends HTMLElementEventMap {
  show: Event
  showed: Event
  dismiss: Event
  dismissed: Event
  action: Event
}

interface Component {
  addEventListener<K extends keyof EventMap>(type: K, listener: (this: Component, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof EventMap>(type: K, listener: (this: Component, ev: EventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

export default Component

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}