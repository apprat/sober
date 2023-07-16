import { defineComponent, IntrinsicElement } from './core/runtime'
import { rootStyle } from './fragment/root-style'
import { device } from './core/utils'
import * as Pointer from './pointer'

const style = /*css*/`
:host{
  position: relative;
}
.wrapper{
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  display: flex;
  margin-bottom: 4px;
  justify-content: center;
}
.container{
  background: var(--s-color-inverse-surface);
  color: var(--s-color-inverse-on-surface);
  font-size: .875rem;
  padding: 6px 8px;
  line-height: 1.6;
  border-radius: 4px;
  --pointer-events: none;
  white-space: nowrap;
  opacity: .95;
}
`

const name = 's-tooltip'
const props = {

}

/**
 * @event change
 */
const Component = defineComponent({
  name, props,
  setup() {
    return {
      render: () => <>
        <style>{rootStyle}</style>
        <style>{style}</style>
        <slot></slot>
        <div class="wrapper" part="wrapper">
          <div class="container" part="container" ref="container">
            <slot name="text"></slot>
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