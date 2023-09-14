import { defineComponent, IntrinsicElement } from './core/runtime'

const name = 's-thead'
const Component = defineComponent({
  name,
  setup() {
    return {
      render: () => <slot></slot>
    }
  }
})

export default Component

type Component = InstanceType<typeof Component>

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, {}> { }
  }
  interface Document {
    createElement(tagName: typeof name, options?: ElementCreationOptions): Component
    getElementsByTagName(qualifiedName: typeof name): HTMLCollectionOf<Component>
  }
}