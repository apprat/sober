import { defineElement, html, ref } from './core/element'
import './ripple'

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
}
.wrapper{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
  transform: translateY(100%);
  filter: opacity(0);
  transition: transform .2s,filter .2s;
}
.wrapper.show{
  transform: translateY(0%);
  filter: opacity(1);
}
.container{
  background: var(--s-color-inverse-surface);
  color: var(--s-color-inverse-on-surface);
  min-height: 48px;
  border-radius: 4px;
  box-shadow: var(--s-elevation-level3);
  line-height: 1.6;
  display: inline-flex;
  align-items: center;
  min-width: 280px;
  max-width: 480px;
  font-size: .875rem;
  font-weight: 400;
  margin: 16px;
}
.wrapper.show .container{
  pointer-events: auto;
}
.supporting-text{
  margin: 12px 16px;
  flex-grow: 1;
}
.action{
  font-size: inherit;
  flex-shrink: 0;
  border-radius: 4px;
  color: var(--s-color-inverse-primary);
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
  }
}
`

const name = 's-snackbar'
const props = {
  duration: 3000,
  action: ''
}

const make = (options: {
  view?: Node
  text: string
  duration?: number
  action?: string
  onAction?: () => boolean | undefined
}) => {
  const view = options.view ?? document.body
  const snackbar = document.createElement('s-snackbar')
  snackbar.textContent = options.text
  snackbar.duration = options.duration ?? props.duration
  snackbar.action = options.text
  snackbar.addEventListener('action', (event) => {
    const stoped = options.onAction?.()
    if (stoped === false) event.preventDefault()
  })
  view.appendChild(snackbar)
  window.getComputedStyle(snackbar).top
  snackbar.show()
}

export default class Component extends defineElement({
  name, props,
  statics: { make },
  setup() {
    const wrapper = ref<HTMLElement>()
    const action = ref<HTMLElement>()
    const state = { showed: false, timer: 0 }
    const show = () => {
      if (!this.isConnected || state.showed) return
      state.showed = true
      this.dispatchEvent(new Event('show'))
      wrapper.target.addEventListener('transitionend', () => {
        this.dispatchEvent(new FocusEvent('focus'))
        if (this.duration > 0) state.timer = setTimeout(dimiss, this.duration)
      }, { once: true })
      wrapper.target.classList.add('show')
    }
    const dimiss = () => {
      if (!this.isConnected || !state.showed) return
      clearTimeout(state.timer)
      this.dispatchEvent(new Event('dimiss'))
      wrapper.target.addEventListener('transitionend', () => {
        this.dispatchEvent(new FocusEvent('blur'))
        state.showed = false
      }, { once: true })
      wrapper.target.classList.remove('show')
    }
    const onAction = () => {
      if (!this.dispatchEvent(new Event('action', { cancelable: true }))) return
      dimiss()
    }
    return {
      expose: { show, dimiss },
      watches: {
        action: (value) => action.target.textContent = value
      },
      render: () => html`
        <style>${style}</style>
        <slot name="trigger" @click="${show}"></slot>
        <div class="wrapper" ref="${wrapper}">
          <div class="container" part="container">
            <div class="supporting-text">
              <slot></slot>
            </div>
            <s-ripple class="action" ref="${action}" @click="${onAction}"></s-ripple>
          </div>
        </div>
      `
    }
  }
}) { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface GlobalEventHandlersEventMap {
    action: Event
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}