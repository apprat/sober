import { defineElement, IntrinsicElement, css } from './base/core'
import { Fragment } from './pointer'

const style = css`
:host{
  -webkit-user-select: none;
  user-select: none;
  display: flex;
  min-height: 48px;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0 8px;
}
.text{
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}
::slotted([slot]){
  pointer-events: none;
}
`

const name = 's-label'
const props = {
  disabled: false
}

type ItemElement = { checked: boolean } & HTMLElement

export default defineElement({
  name, props,
  setup() {
    this.host.addEventListener('click', () => {
      const start = this.refs.start as HTMLSlotElement
      const starNodes = start.assignedNodes() as ItemElement[]
      starNodes.forEach((value) => {
        switch (value.nodeName) {
          case 'S-CHECKBOX':
            value.checked = !value.checked
            break
          case 'S-RADIO-BUTTON':
            value.click()
            break
        }
      })
    })
    return {
      render: () => <>
        <style>{style}</style>
        <slot name="start" ref="start"></slot>
        <div class="text">
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </div>
        <Fragment centered={false} />
      </>
    }
  }
})

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}