import { defineComponent, IntrinsicElement } from './core/runtime'
import { rootStyle } from './fragment/root-style'
import * as Pointer from './pointer'

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 48px;
  position: relative;
  cursor: pointer;
  font-size: .875rem;
  text-transform: capitalize;
  padding: 0 12px;
  overflow: hidden;
}
:host([disabled=true]){
  pointer-events: none !important;
  filter: grayscale(.8) opacity(.6) !important;
}
:host([checked=true]){
  color: var(--s-color-primary);
}
::slotted(*){
  pointer-events: none;
  height: 32px;
}
::slotted([slot=icon]){
  display: flex;
  align-items: flex-end;
}
::slotted([slot=icon]:only-child){
  align-items: center;
}
::slotted([slot=text]){
  padding-top: 3px;
  box-sizing: border-box;
}
::slotted([slot=text]:only-child){
  padding: 0;
  height: auto;
}
`

const name = 's-tab-item'
const props = {
  disabled: false,
  checked: false,
}

/**
 * @slot icon text
 */
const Component = defineComponent({
  name, props,
  setup() {
    return {
      render: () => <>
        <style>{rootStyle}</style>
        <style>{style}</style>
        <slot name="icon"></slot>
        <slot name="text"></slot>
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