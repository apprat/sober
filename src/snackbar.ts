import { useElement, JSXAttributes } from './core/element.js'
import { getStackingContext } from './core/utils.js'

const name = 's-snackbar'
const props = {
  type: 'basic' as 'basic' | 'error',
  duration: 4000
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
  pointer-events: none;
  z-index: var(--z-index, 2);
  overflow: hidden;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  --offset-direction: -1;
  transform: translateY(calc(var(--offset) * var(--offset-direction)));
  transition: transform .2s;
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
  transform: translateY(calc(100% - 16px));
  filter: opacity(0);
  transition: transform .2s, filter .2s;
}
.container::before{
  content:'';
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  mask-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIj4KICA8cGF0aCBkPSJNNDgwLTI4MHExNyAwIDI4LjUtMTEuNVQ1MjAtMzIwcTAtMTctMTEuNS0yOC41VDQ4MC0zNjBxLTE3IDAtMjguNSAxMS41VDQ0MC0zMjBxMCAxNyAxMS41IDI4LjVUNDgwLTI4MFptLTQwLTE2MGg4MHYtMjQwaC04MHYyNDBabTQwIDM2MHEtODMgMC0xNTYtMzEuNVQxOTctMTk3cS01NC01NC04NS41LTEyN1Q4MC00ODBxMC04MyAzMS41LTE1NlQxOTctNzYzcTU0LTU0IDEyNy04NS41VDQ4MC04ODBxODMgMCAxNTYgMzEuNVQ3NjMtNzYzcTU0IDU0IDg1LjUgMTI3VDg4MC00ODBxMCA4My0zMS41IDE1NlQ3NjMtMTk3cS01NCA1NC0xMjcgODUuNVQ0ODAtODBabTAtODBxMTM0IDAgMjI3LTkzdDkzLTIyN3EwLTEzNC05My0yMjd0LTIyNy05M3EtMTM0IDAtMjI3IDkzdC05MyAyMjdxMCAxMzQgOTMgMjI3dDIyNyA5M1ptMC0zMjBaIj48L3BhdGg+Cjwvc3ZnPg==);
  background-color: currentColor;
  margin-left: 16px;
  margin-right: -4px;
}
:host([type=error]) .container{
  background: var(--s-color-error, #ba1a1a);
  color: var(--s-color-on-error, #ffffff);
}
:host([type=error]) .container::before{
  mask-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIj4KICA8cGF0aCBkPSJtMzM2LTI4MCAxNDQtMTQ0IDE0NCAxNDQgNTYtNTYtMTQ0LTE0NCAxNDQtMTQ0LTU2LTU2LTE0NCAxNDQtMTQ0LTE0NC01NiA1NiAxNDQgMTQ0LTE0NCAxNDQgNTYgNTZaTTQ4MC04MHEtODMgMC0xNTYtMzEuNVQxOTctMTk3cS01NC01NC04NS41LTEyN1Q4MC00ODBxMC04MyAzMS41LTE1NlQxOTctNzYzcTU0LTU0IDEyNy04NS41VDQ4MC04ODBxODMgMCAxNTYgMzEuNVQ3NjMtNzYzcTU0IDU0IDg1LjUgMTI3VDg4MC00ODBxMCA4My0zMS41IDE1NlQ3NjMtMTk3cS01NCA1NC0xMjcgODUuNVQ0ODAtODBabTAtODBxMTM0IDAgMjI3LTkzdDkzLTIyN3EwLTEzNC05My0yMjd0LTIyNy05M3EtMTM0IDAtMjI3IDkzdC05MyAyMjdxMCAxMzQgOTMgMjI3dDIyNyA5M1ptMC0zMjBaIj48L3BhdGg+Cjwvc3ZnPg==);
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
::slotted([slot=action]){
  font-size: inherit;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 4px;
  color: var(--s-color-inverse-primary, #c0c1ff);
  margin-right: 8px;
  margin-left: -8px;
  cursor: pointer;
  height: 36px;
  font-size: .875rem;
}
:host([type=error]) ::slotted([slot=action]){
  color: var(--s-color-on-error, #ffffff);
}
@media (max-width: 320px){
  .wrapper{
    padding: 8px;
  }
  .container{
    min-width: 100%;
  }
}
@media (pointer: coarse){
  .wrapper{
    align-items: flex-start;
    --offset-direction: 1;
  }
  .container{
    transform: translateY(calc(-100% - 16px));
    min-width: 280px;
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
  type?: typeof props['type']
  duration?: number
  action?: string | {
    text: string
    click: (event: MouseEvent) => unknown
  }
}) => {
  let root: Element = document.body
  const snackbar = new Snackbar()
  snackbar.style.display = 'block'
  const page = document.body.firstElementChild
  if (page && page.tagName === 'S-PAGE') {
    root = page
  }
  if (typeof options === 'string') {
    snackbar.textContent = options
  } else {
    if (options.root) root = options.root
    snackbar.textContent = options.text
    snackbar.type = options.type ?? 'basic'
    if (options.action) {
      const action = document.createElement('s-button')
      action.type = 'text'
      action.slot = 'action'
      if (typeof options.action === 'string') {
        action.textContent = options.action
      } else {
        action.textContent = options.action.text
        action.addEventListener('click', options.action.click)
      }
      snackbar.appendChild(action)
    }
    if (typeof options.duration === 'number') snackbar.duration = options.duration
  }
  root.appendChild(snackbar)
  snackbar.addEventListener('dismissed', () => root.removeChild(snackbar))
  requestAnimationFrame(snackbar.show)
}

const task: { height: number, wrapper: HTMLElement }[] = []

class Snackbar extends useElement({
  style, template, props, syncProps: ['type'],
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLSlotElement
    const wrapper = shadowRoot.querySelector('.wrapper') as HTMLDivElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const action = shadowRoot.querySelector('slot[name=action]') as HTMLElement
    const state = { timer: 0, task: null as null | typeof task[number] }
    const show = () => {
      if (wrapper.classList.contains('show')) return
      const stackingContext = getStackingContext(shadowRoot)
      if (stackingContext.top !== 0 || stackingContext.left !== 0) {
        wrapper.style.width = `${innerWidth}px`
        wrapper.style.height = `${innerHeight}px`
        wrapper.style.top = `${0 - stackingContext.top}px`
        wrapper.style.left = `${0 - stackingContext.left}px`
      }
      let offset = container.offsetHeight + 8
      if (task.length > 0) {
        for (const item of task) {
          item.wrapper.style.setProperty('--offset', `${offset}px`)
          offset += item.height + 8
        }
      }
      task.unshift(state.task = { height: container.offsetHeight, wrapper })
      wrapper.classList.add('show')
      this.dispatchEvent(new Event('show'))
      if (this.duration > 0) state.timer = setTimeout(dismiss, this.duration)
    }
    const dismiss = () => {
      if (!wrapper.classList.contains('show')) return
      clearTimeout(state.timer)
      wrapper.classList.remove('show')
      this.dispatchEvent(new Event('dismiss'))
      const indexOf = task.indexOf(state.task!)
      for (let i = indexOf + 1; i < task.length; i++) {
        const item = task[i]
        const offset = Number(item.wrapper.style.getPropertyValue('--offset').slice(0, -2))
        item.wrapper.style.setProperty('--offset', `${offset - 8 - container.offsetHeight}px`)
      }
      task.splice(indexOf, 1)
    }
    const transitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return
      const showed = wrapper.classList.contains('show')
      this.dispatchEvent(new Event(showed ? 'showed' : 'dismissed'))
      !showed && wrapper.removeAttribute('style')
    }
    trigger.addEventListener('click', show)
    container.addEventListener('transitionend', transitionEnd)
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