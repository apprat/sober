import { defineComponent, IntrinsicElement, css } from './base/core'

const style = css`
:host{
  -webkit-user-select: none;
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  fill: currentColor;
  box-sizing: border-box;
}
:host([size=small]){
  width: 20px;
  height: 20px
}
:host([size=large]){
  width: 40px;
  height: 40px;
}
.placeholder{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: currentColor;
}
`

const name = 's-icon'
const props = {
  size: 'medium' as 'medium' | 'small' | 'large'
}

/**
 * @slot anonymous
 */
const Component = defineComponent({
  name, props,
  setup() {
    return {
      render: () => <>
        <style>{style}</style>
        <slot>
          <div class="placeholder"></div>
        </slot>
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