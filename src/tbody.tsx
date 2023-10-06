import { defineComponent } from './core/runtime'

const style = /*css*/`
:host{
  display: table-row-group;
  color: var(--s-color-on-surface);
}
::slotted(*){
  border-top: solid 1px color-mix(in srgb ,var(--s-color-on-surface) 16%, transparent);
}
`

const name = 's-tbody'
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