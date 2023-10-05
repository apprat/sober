import { defineComponent, IntrinsicElement } from './core/runtime'

const style = /*css*/`
:host{
  display: block;
  overflow: auto;
  overflow: overlay;
  scrollbar-color: var(--s-color-outline-variant) transparent;
}
@media (pointer: fine){
  :host::-webkit-scrollbar{
    width: 4px;
    height: 4px;
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline-variant);
    border-radius: 4px;
  }
  :host::-webkit-scrollbar{
    width: 6px;
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline-variant);
  }
}
`

const name = 's-scrollbar'
const props = {
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