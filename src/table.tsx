import { defineComponent } from './core/runtime'

const style = /*css*/`
:host{
  display: block;
  overflow: hidden;
  font-size: .875rem;
}
.container{
  display: table;
  width: 100%;
  border-collapse: collapse;
}
`

const name = 's-table'
const props = {
}

const Component = defineComponent({
  name, props,
  setup() {
    return {
      render: () => <>
        <style>{style}</style>
        <div class="container" part="container">
          <slot></slot>
        </div>
      </>
    }
  }
})

export default class extends Component { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}