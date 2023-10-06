import { defineComponent } from './core/runtime'
import './layer'

const style = /*css*/`
:host{
  user-select: none;
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
  min-width: 360px;
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
    border-radius: 0;
    min-width: 100%;
    max-width: 100%;
    margin: 0;
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
  const snackbar = document.createElement('s-snackbar') as Self
  snackbar.textContent = options.text
  snackbar.duration = options.duration
  snackbar.action = options.text
  snackbar.addEventListener('action', (event) => {
    const stoped = options.onAction?.()
    if (stoped === false) event.preventDefault()
  })
  view.appendChild(snackbar)
  window.getComputedStyle(snackbar).top
  snackbar.show()
}

const Component = defineComponent({
  name, props,
  statics: { make },
  setup() {
    const state = { showed: false, timer: 0 }
    const show = () => {
      if (!this.host.isConnected || state.showed) return
      state.showed = true
      this.host.dispatchEvent(new Event('show'))
      this.refs.wrapper.addEventListener('transitionend', () => {
        this.host.dispatchEvent(new FocusEvent('focus'))
        if (this.props.duration > 0) state.timer = setTimeout(dimiss, this.props.duration)
      }, { once: true })
      this.refs.wrapper.classList.add('show')
    }
    const dimiss = () => {
      if (!this.host.isConnected || !state.showed) return
      clearTimeout(state.timer)
      this.host.dispatchEvent(new Event('dimiss'))
      this.refs.wrapper.addEventListener('transitionend', () => {
        this.host.dispatchEvent(new FocusEvent('blur'))
        state.showed = false
      }, { once: true })
      this.refs.wrapper.classList.remove('show')
    }
    const onAction = () => {
      if (!this.host.dispatchEvent(new Event('action', { cancelable: true }))) return
      dimiss()
    }
    return {
      expose: { show, dimiss },
      watches: {
        action: () => this.refs.action.textContent = this.props.action
      },
      render: () => <>
        <style>{style}</style>
        <slot name="trigger" onClick={show}></slot>
        <div class="wrapper" ref="wrapper">
          <div class="container" part="container">
            <div class="supporting-text">
              <slot></slot>
            </div>
            <s-layer class="action" ref="action" onClick={onAction}></s-layer>
          </div>
        </div>
      </>
    }
  }
})

export default class Self extends Component { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface GlobalEventHandlersEventMap {
    action: Event
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}