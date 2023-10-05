import { defineComponent, IntrinsicElement } from './core/runtime'

const style = /*css*/`
:host{
  display: table-header-group;
  font-weight: 600;
  color: var(--s-color-on-surface-variant);
}
`

const name = 's-thead'
const props = {
}

const Component = defineComponent({
  name, props,
  setup() {
    return {
      render: () => <>
        <style>{style}</style>
        <slot></slot>
      </>
    }
  }
})

export default class extends Component { }

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}