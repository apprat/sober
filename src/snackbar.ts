import { builder, html, ref } from './core/element'
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
  filter: opacity(1);
}
.container{
  background: var(--s-color-inverse-surface,#2e3132);
  color: var(--s-color-inverse-on-surface,#eff1f3);
  min-height: 48px;
  border-radius: 4px;
  box-shadow: var(--s-elevation-level3,0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12));
  line-height: 1.6;
  display: inline-flex;
  align-items: center;
  min-width: 320px;
  max-width: 480px;
  font-size: .875rem;
  font-weight: 400;
  margin: 16px;
}
.show .container{
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
  color: var(--s-color-inverse-primary,#61d4ff);
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
  duration: 3000,
  action: ''
}

const make = (options: string | {
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
  window.getComputedStyle(snackbar).top
  snackbar.addEventListener('dimiss', () => view.removeChild(snackbar))
  snackbar.show()
}

export default class Component extends builder({
  name, props,
  setup() {
    const wrapper = ref<HTMLElement>()
    const action = ref<HTMLElement>()
    const state = { timer: 0 }
    const animateOptions = { duration: 200, fill: 'forwards', easing: 'linear' } as const
    const show = () => {
      clearTimeout(state.timer)
      const animation = wrapper.target.animate({ transform: ['translateY(100%)', 'translateY(0%)'], filter: ['opacity(0)', 'opacity(1)'] }, animateOptions)
      animation.addEventListener('finish', () => this.dispatchEvent(new Event('show')))
      animation.addEventListener('cancel', dimiss)
      wrapper.target.classList.add('show')
      if (this.duration > 0) state.timer = setTimeout(dimiss, this.duration)
    }
    const dimiss = () => {
      clearTimeout(state.timer)
      const animation = wrapper.target.animate({ transform: ['translateY(0%)', 'translateY(100%)'], filter: ['opacity(1)', 'opacity(0)'] }, animateOptions)
      animation.addEventListener('finish', () => this.dispatchEvent(new Event('dimiss')))
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
}) {
  static readonly show = make
}

Component.define()

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