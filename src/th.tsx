import { defineComponent, IntrinsicElement } from './core/runtime'

const style = /*css*/`
:host{
  display: table-cell;
  padding: 20px 12px;
  text-align: right;
  white-space: nowrap;
}
::slotted(s-checkbox){
  margin: -20px 8px -20px 0;
}
`

const name = 's-th'
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