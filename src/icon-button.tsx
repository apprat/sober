import { defineComponent, IntrinsicElement } from './core/runtime'
import { rootStyle } from './fragment/root-style'
import { defaultStyle } from './fragment/button-style'
import * as Pointer from './pointer'

const style = /*css*/`
:host{
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--s-color-on-surface-variant);
}
:host([theme=filled]){
  color: var(--s-color-on-primary);
  background: var(--s-color-primary);
}
:host([theme=filled-tonal]){
  color: var(--s-color-on-secondary-container);
  background: var(--s-color-secondary-container);
}
:host([theme=outlined]){
  -webkit-box-shadow: 0 0 0 1px inset var(--s-color-outline-variant);
  box-shadow: 0 0 0 1px inset var(--s-color-outline-variant);
}
:host([size=small]){
  width: 36px;
  height: 36px;
}
:host([size=large]){
  width: 48px;
  height: 48px;
}
::slotted(*){
  color: inherit;
}
`

const name = 's-icon-button'
const props = {
  disabled: false,
  theme: 'standard' as 'standard' | 'filled' | 'filled-tonal' | 'outlined',
  size: 'medium' as 'medium' | 'small' | 'large'
}

/**
 * @slot start end anonymous
 */
const Component = defineComponent({
  name, props,
  setup() {
    return {
      render: () => <>
        <style>{rootStyle}</style>
        <style>{defaultStyle}</style>
        <style>{style}</style>
        <slot name="start">
        </slot>
        <slot></slot>
        <slot name="end">
        </slot>
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