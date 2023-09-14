import { defineComponent, IntrinsicElement } from './core/runtime'
import { rootStyle } from './fragment/root-style'
import type Button from './button'

const style = /*css*/`
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
  background: var(--s-color-inverse-surface,#313033);
  color: var(--s-color-inverse-on-surface,#F4EFF4);
  min-height: 48px;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, .2), 0px 8px 10px 1px rgb(0, 0, 0, .14), 0px 3px 14px 2px rgb(0, 0, 0, .12);
  line-height: 1.6;
  display: inline-flex;
  align-items: center;
  min-width: 360px;
  max-width: 480px;
  font-size: .875rem;
  margin: 16px;
}
.wrapper.show .container{
  pointer-events: auto;
}
.text{
  margin: 12px 16px;
  flex-grow: 1;
}
::slotted([slot=action]){
  font-size: inherit;
  flex-shrink: 0;
  border-radius: 4px;
  color: var(--s-color-inverse-primary,#D0BCFF);
  margin-right: 8px;
  margin-left: -8px;
  min-height: 36px;
  background: none;
  padding: 0 16px;
}
::slotted([slot=action]:empty){
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
  duration: 3000
}

class Make {
  #view: Node = document.body
  #snackbar: Component
  #action: Button
  #duration = props.duration
  #onAction?: () => void
  constructor(text: string, duration?: number)
  constructor(view: Node, text: string, duration?: number)
  constructor(viewOrText: string | Node, textOrDuration?: number | string, duration?: number) {
    let text = ''
    if (typeof viewOrText === 'string') {
      text = viewOrText
      if (typeof textOrDuration === 'number') this.#duration = textOrDuration
    } else {
      this.#view = viewOrText
      if (typeof textOrDuration === 'string') text = textOrDuration
      if (duration) this.#duration = duration
    }
    this.#snackbar = document.createElement('s-snackbar')
    this.#action = document.createElement('s-button')
    this.#action.slot = 'action'
    this.#action.addEventListener('click', () => this.#onAction?.())
    this.#snackbar.addEventListener('blur', () => this.#view.removeChild(this.#snackbar))
    this.#snackbar.appendChild(this.#action)
    this.#snackbar.append(text)
    this.#snackbar.duration = this.#duration
  }
  setAction(text: string, listener?: () => void) {
    this.#action.textContent = text
    this.#onAction = listener
    return this
  }
  show() {
    this.#view.appendChild(this.#snackbar)
    window.getComputedStyle(this.#snackbar).top
    this.#snackbar.show()
    return this
  }
  dimiss() {
    this.#snackbar.dimiss()
    return this
  }
}

/**
 * @slot trigger anonymous action
 */
const Component = defineComponent({
  name, props,
  prototypes: { Make },
  setup() {
    const state = { showed: false }
    const show = () => {
      if (!this.host.isConnected || state.showed) return
      state.showed = true
      this.host.dispatchEvent(new Event('show'))
      this.refs.wrapper.addEventListener('transitionend', () => {
        this.host.dispatchEvent(new FocusEvent('focus'))
        if (this.props.duration) setTimeout(dimiss, this.props.duration)
      }, { once: true })
      this.refs.wrapper.classList.add('show')
    }
    const dimiss = () => {
      if (!this.host.isConnected || !state.showed) return
      this.host.dispatchEvent(new Event('dimiss'))
      this.refs.wrapper.addEventListener('transitionend', () => {
        this.host.dispatchEvent(new FocusEvent('blur'))
        state.showed = false
      }, { once: true })
      this.refs.wrapper.classList.remove('show')
    }
    return {
      expose: {
        show, dimiss,
        get showed() {
          return state.showed
        }
      },
      render: () => <>
        <style>{rootStyle}</style>
        <style>{style}</style>
        <slot name="trigger" onClick={show}></slot>
        <div class="wrapper" part="wrapper" ref="wrapper">
          <div class="container" part="container">
            <div class="text" part="text">
              <slot></slot>
            </div>
            <slot name="action"></slot>
          </div>
        </div>
      </>
    }
  }
})

export default Component

type Component = InstanceType<typeof Component>

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
  interface Document {
    createElement(tagName: typeof name, options?: ElementCreationOptions): Component
    getElementsByTagName(qualifiedName: typeof name): HTMLCollectionOf<Component>
  }
}