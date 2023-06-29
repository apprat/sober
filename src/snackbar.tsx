import { defineComponent, IntrinsicElement, css } from './base/core'
import Button from './button'


const style = css`
:host{
  -webkit-user-select: none;
  user-select: none;
  background: var(--s-color-inverse-surface);
  color: var(--s-color-inverse-on-surface);
  min-height: 48px;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, .2), 0px 8px 10px 1px rgb(0, 0, 0, .14), 0px 3px 14px 2px rgb(0, 0, 0, .12);
  filter: opacity(.95);
  line-height: 1.6;
  display: inline-flex;
  align-items: center;
  width: 100%;
  max-width: 560px;
  font-size: .875rem;
}
.text{
  margin: 12px 16px;
  flex-grow: 1;
}
::slotted([slot=action]){
  font-size: inherit;
  flex-shrink: 0;
  border-radius: 4px;
  color: var(--s-color-inverse-primary);
  margin-right: 8px;
  margin-left: -8px;
  min-height: 36px;
  background: none;
  padding: 0 16px;
}
::slotted([slot=action]:empty){
  display: none;
}
`

const name = 's-snackbar'
const props = {
}

class Make {
  #view: Node = document.body
  #snackbar: Component
  #action: Button
  #duration = 2000
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
    this.#snackbar.appendChild(this.#action)
    this.#snackbar.textContent = text
  }
  setAction(text: string, listener?: () => void) {
    this.#action.textContent = text
    this.#onAction = listener
  }
  show() {
    console.log(this)
    this.#view.appendChild(this.#snackbar)
  }
  dimiss() {
    //
  }
}

/**
 * @slot trigger anonymous action
 */
const Component = defineComponent({
  name, props,
  prototypes: { Make },
  setup() {
    const show = () => {
    }
    return {
      render: () => <>
        <style>{style}</style>
        <slot name="trigger"></slot>
        <div></div>
        <div class="text" part="text">
          <slot></slot>
        </div>
        <slot name="action"></slot>
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