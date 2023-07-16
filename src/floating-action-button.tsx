import { defineComponent, IntrinsicElement } from './core/runtime'
import { rootStyle } from './fragment/root-style'
import { defaultStyle } from './fragment/button-style'
import * as Pointer from './pointer'

const style = /*css*/`
:host{
  height: 56px;
  min-width: 56px;
  margin: 16px;
  border-radius: 16px;
  -webkit-box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, .2), 0px 2px 2px 0px rgb(0, 0, 0, .14), 0px 1px 5px 0px rgb(0, 0, 0, .12);
  box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, .2), 0px 2px 2px 0px rgb(0, 0, 0, .14), 0px 1px 5px 0px rgb(0, 0, 0, .12);
  background: var(--s-color-primary-container);
  color: var(--s-color-on-primary-container);
  transition: box-shadow .2s;
}
:host([theme=secondary]){
  background: var(--s-color-secondary-container);
  color: var(--s-color-on-secondary-container);
}
:host([theme=surface]){
  background: var(--s-color-surface-container-high);
  color: var(--s-color-primary);
}
:host([theme=tertiary]){
  background: var(--s-color-tertiary-container);
  color: var(--s-color-on-tertiary-container);
}
:host([type=extended]){
  padding: 0 16px;
}
:host([type=extended])>slot{
  display: contents;
}
:host([size=small]){
  height: 48px;
  min-width: 48px;
}
:host([size=large]){
  height: 64px;
  min-width: 64px;
}
slot[name=start],
slot[name=end]{
  display: none;
}
:host([type=extended]) slot[name=start],
:host([type=extended]) slot[name=end]{
  display: contents;
}
::slotted([slot=start]){
  margin: 0 8px 0 0;
}
@media (pointer: fine){
  :host(:hover){
    -webkit-box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, .2), 0px 8px 10px 1px rgb(0, 0, 0, .14), 0px 3px 14px 2px rgb(0, 0, 0, .12);
    box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, .2), 0px 8px 10px 1px rgb(0, 0, 0, .14), 0px 3px 14px 2px rgb(0, 0, 0, .12);
  }
}
`

const name = 's-floating-action-button'
const props = {
  disabled: false,
  type: 'normal' as 'normal' | 'extended',
  size: 'medium' as 'medium' | 'small' | 'large',
  theme: 'primary' as 'primary' | 'secondary' | 'surface' | 'tertiary'
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
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
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