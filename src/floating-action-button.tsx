import { defineComponent, IntrinsicElement, css } from './base/core'
import { Fragment } from './pointer'

const style = css`
:host{
  -webkit-user-select: none;
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  min-width: 56px;
  height: 56px;
  margin: 16px;
  border-radius: 16px;
  text-transform: capitalize;
  position: relative;
  font-weight: 500;
  line-height: 1;
  font-size: .875rem;
  white-space: nowrap;
  color: var(--s-color-on-primary);
  background:  var(--s-color-primary);
  -webkit-box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, .2), 0px 2px 2px 0px rgb(0, 0, 0, .14), 0px 1px 5px 0px rgb(0, 0, 0, .12);
  box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, .2), 0px 2px 2px 0px rgb(0, 0, 0, .14), 0px 1px 5px 0px rgb(0, 0, 0, .12);
  transition: box-shadow .2s;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
}
:host([type=extended]){
  padding: 0 16px;
}
:host([type=extended])>slot{
  display: contents;
}
:host([disabled=true]){
  pointer-events: none !important;
  filter: grayscale(.8) opacity(.6) !important;
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

const name = 's-fab'
const props = {
  disabled: false,
  type: 'normal' as 'normal' | 'extended',
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
        <style>{style}</style>
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
        <Fragment centered={false} />
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