import { defineComponent, IntrinsicElement } from './core/runtime'

const style = /*css*/`
:host{
  display: table-cell;
  padding: 18px 12px;
  text-align: right;
}
::slotted(s-checkbox){
  margin: -18px 8px -18px 0;
}
`

const name = 's-td'
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