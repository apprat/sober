import { useElement, JSXAttributes } from './core/element.js'
import { getStackingContext } from './core/utils.js'

const name = 's-snackbar'
const props = {
  duration: 5000
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
}
.wrapper{
  --offsetY: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  justify-content: center;
  transition: transform .24s;
  transform: translateY(var(--offsetY));
}
.container{
  background: var(--s-color-inverse-surface, #313034);
  color: var(--s-color-inverse-on-surface, #f3eff4);
  min-height: 48px;
  border-radius: 4px;
  box-shadow: var(--s-elevation-level3, 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12));
  line-height: 1.6;
  display: inline-flex;
  align-items: center;
  min-width: 320px;
  max-width: 480px;
  font-size: .875rem;
  font-weight: 400;
  height: fit-content;
  pointer-events: auto;
  transform: translateY(calc(-100% - 16px));
  filter: opacity(0);
  transition: transform .24s, filter .24s;
}
.wrapper.show .container{
  transform: translateY(0%);
  filter: opacity(1);
}
.text{
  margin: 12px 16px;
  flex-grow: 1;
  user-select: text;
  -webkit-user-select: text;
}
::slotted(s-button[slot=action]){
  font-size: inherit;
  flex-shrink: 0;
  border-radius: 4px;
  color: var(--s-color-inverse-primary, #c0c1ff);
  margin-right: 8px;
  margin-left: -8px;
  height: 36px;
}
@media (max-width: 320px){
  .wrapper{
    padding: 8px;
  }
  .container{
    min-width: 100%;
  }
}
`

const template = /*html*/`
<slot name="trigger"></slot>
<div class="wrapper" part="wrapper">
  <div class="container" part="container">
    <div class="text" part="text">
      <slot></slot>
    </div>
    <slot name="action"></slot>
  </div>
</div>
`

const show = (options: string | {
  root?: Element
  text: string
  duration?: number
  action?: {
    text: string
    click: (event: MouseEvent) => unknown
  }
}) => {
  let root: Element = document.body
  const snackbar = new Snackbar()
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') {
    root = page
  }
  if (typeof options === 'string') {
    snackbar.textContent = options
  } else {
    if (options.root) root = options.root
    snackbar.textContent = options.text
    if (options.action) {
      const action = document.createElement('s-button')
      action.type = 'text'
      action.slot = 'action'
      action.textContent = options.action.text
      if (options.action.click) action.addEventListener('click', options.action.click)
      snackbar.appendChild(action)
    }
    if (options.duration) snackbar.duration = options.duration
  }
  root.appendChild(snackbar)
  snackbar.addEventListener('dismissed', () => root.removeChild(snackbar))
  snackbar.show()
}

const task: HTMLDivElement[] = []

class Snackbar extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLSlotElement
    const wrapper = shadowRoot.querySelector('.wrapper') as HTMLDivElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const action = shadowRoot.querySelector('slot[name=action]') as HTMLElement
    const state = { timer: 0 }
    const show = () => {
      if (wrapper.classList.contains('show')) return
      const stackingContext = getStackingContext(shadowRoot)
      if (stackingContext.top !== 0 || stackingContext.left !== 0) {
        wrapper.setAttribute('style', `width: ${innerWidth}px;height: ${innerHeight}px;top: ${0 - stackingContext.top}px;left: ${0 - stackingContext.left}px`)
      }
      clearTimeout(state.timer)
      getComputedStyle(wrapper).top
      wrapper.classList.add('show')
      let h = container.offsetHeight + 8
      for (const item of task) {
        item.style.setProperty('--offsetY', `${h}px`)
        h = h + container.offsetHeight + 8
      }
      task.unshift(wrapper)
      this.dispatchEvent(new Event('show'))
      if (this.duration > 0) state.timer = setTimeout(dismiss, this.duration)
    }
    const dismiss = () => {
      clearTimeout(state.timer)
      wrapper.classList.remove('show')
      for (let i = task.indexOf(wrapper) + 1; i < task.length; i++) {
        const item = task[i]
        if (!item.classList.contains('show')) continue
        const old = Number(item.style.getPropertyValue('--offsetY').slice(0, -2))
        item.style.setProperty('--offsetY', `${old - container.offsetHeight - 8}px`)
      }
      task.splice(task.indexOf(wrapper), 1)
      this.dispatchEvent(new Event('dismiss'))
    }
    const transitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return
      const showed = wrapper.classList.contains('show')
      this.dispatchEvent(new Event(showed ? 'showed' : 'dismissed'))
      if (!showed) {
        wrapper.removeAttribute('style')
      }
    }
    trigger.addEventListener('click', show)
    wrapper.addEventListener('transitionend', transitionEnd)
    action.addEventListener('click', dismiss)
    return {
      expose: { show, dismiss }
    }
  }
}) {
  static readonly show = show
}

Snackbar.define(name)

interface EventMap extends HTMLElementEventMap {
  show: Event
  showed: Event
  dismiss: Event
  dismissed: Event
}

interface Snackbar {
  addEventListener<K extends keyof EventMap>(type: K, listener: (this: Snackbar, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof EventMap>(type: K, listener: (this: Snackbar, ev: EventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

export { Snackbar }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Snackbar
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}