import { defineComponent, IntrinsicElement } from './core/runtime'

const style = /*css*/`
:host{
  display: table-row;
}
::slotted(:first-of-type){
  text-align: left;
}
`

const name = 's-tr'
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