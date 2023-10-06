import { defineComponent } from './core/runtime'
import { layerStyle, LayerEvent } from './fragment/layer'

const style = /*css*/`
:host{
  user-select: none;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
}
`

const name = 's-layer'
const props = {
  centered: false
}

const Component = defineComponent({
  name, props,
  setup() {
    return {
      created: () => new LayerEvent(this.host, this.refs.wrapper, this.props, true),
      render: () => <>
        <style>{layerStyle}</style>
        <style>{style}</style>
        <div class="layer-wrapper" ref="wrapper">
          <div class="layer-ripple"></div>
        </div>
        <slot></slot>
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