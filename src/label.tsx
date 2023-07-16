import { defineComponent, IntrinsicElement } from './core/runtime'
import { rootStyle } from './fragment/root-style'
import * as Pointer from './pointer'

const style = /*css*/`
:host{
  display: flex;
  min-height: 48px;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0 8px;
}
:host([disabled=true]){
  pointer-events: none !important;
  filter: grayscale(.8) opacity(.6) !important;
}
.text{
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}
::slotted([slot]){
  pointer-events: none;
  display: flex;
  align-items: center;
  height: 24px;
  flex-shrink: 0;
}
::slotted([slot=title]){
  font-size: 1rem;
  color: var(--s-on-surface);
}
::slotted([slot=subtitle]){
  font-size: .75rem;
  color: var(--s-on-surface-variant);
}
`

const name = 's-label'
const props = {
  disabled: false
}

/**
 * @slot title subtitle start
 */
const Component = defineComponent({
  name, props,
  setup() {
    this.host.addEventListener('click', () => {
      const start = this.refs.start as HTMLSlotElement
      const starNodes = start.assignedNodes() as HTMLElement[]
      starNodes.forEach((value) => {
        switch (value.nodeName) {
          case 'S-CHECKBOX':
            value?.click()
            break
          case 'S-RADIO-BUTTON':
            value?.click()
            break
        }
      })
    })
    return {
      render: () => <>
        <style>{rootStyle}</style>
        <style>{style}</style>
        <slot name="start" ref="start"></slot>
        <div class="text">
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </div>
        <Pointer.Fragment centered={false} />
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