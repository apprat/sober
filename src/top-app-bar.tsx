import { defineComponent, IntrinsicElement } from './core/runtime'

const style = /*css*/`
:host{
  user-select: none;
  display: flex;
  height: 64px;
  background: var(--s-color-surface);
}
`

const name = 's-top-app-bar'
const props = {
  type: 'center-aligned' as 'center-aligned' | 'small' | 'medium' | 'large',
  headline: ''
}

const Component = defineComponent({
  name, props, propSyncs: ['type'],
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