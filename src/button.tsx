import { defineComponent, IntrinsicElement } from './core/runtime'
import { rootStyle } from './fragment/root-style'
import { defaultStyle } from './fragment/button-style'
import * as Pointer from './pointer'

const style = /*css*/`
:host{
  border-radius: 20px;
  padding: 0 24px;
  min-height: 40px;
  background: var(--s-color-primary);
  color: var(--s-color-on-primary);
}
:host([theme=elevated]){
  -webkit-box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, .2), 0px 2px 2px 0px rgb(0, 0, 0, .14), 0px 1px 5px 0px rgb(0, 0, 0, .12);
  box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, .2), 0px 2px 2px 0px rgb(0, 0, 0, .14), 0px 1px 5px 0px rgb(0, 0, 0, .12);
  color: var(--s-color-primary);
  background: none;
  transition: box-shadow .2s;
}
:host([theme=filled-tonal]){
  background: var(--s-color-secondary-container);
  color: var(--s-color-primary);
}
:host([theme=outlined]){
  -webkit-box-shadow: 0 0 0 1px inset var(--s-color-outline-variant);
  box-shadow: 0 0 0 1px inset var(--s-color-outline-variant);
  background: none;
  color: var(--s-color-primary);
}
:host([theme=text]){
  background: none;
  color: var(--s-color-primary);
  padding: 0 16px;
}
:host([size=small]){
  min-height: 36px;
  font-size: 0.93rem;
}
:host([size=small]:not([theme=text])){
  padding: 0 20px;
}
:host([size=large]){
  min-height: 44px;
  font-size: 1.06rem;
}
:host([size=large][theme=text]){
  padding: 0 16px;
}
::slotted(*){
  color: inherit;
}
::slotted([slot=start]){
  margin: 0 8px 0 -8px;
}
::slotted([slot=end]){
  margin: 0 -8px 0 8px;
}
:host([theme=text]) ::slotted([slot=start]){
  margin: 0 4px 0 -4px;
}
:host([theme=text]) ::slotted([slot=end]){
  margin: 0 -4px 0 4px;
}
@media (pointer: fine){
  :host([theme=elevated]:hover){
    -webkit-box-shadow: 0px 2px 4px -1px rgb(0, 0, 0, .2), 0px 4px 5px 0px rgb(0, 0, 0, .14), 0px 1px 10px 0px rgb(0, 0, 0, .12);
    box-shadow: 0px 2px 4px -1px rgb(0, 0, 0, .2), 0px 4px 5px 0px rgb(0, 0, 0, .14), 0px 1px 10px 0px rgb(0, 0, 0, .12);
  }
}
`

const name = 's-button'
const props = {
  disabled: false,
  theme: 'filled' as 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text',
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