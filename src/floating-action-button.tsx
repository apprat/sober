import { defineComponent, IntrinsicElement } from './core/runtime'
import { LayerFragment } from './fragment/layer'

const style = /*css*/`
:host{
  user-select: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  height: 56px;
  width: 56px;
  margin: 16px;
  border-radius: 16px;
  color: var(--s-color-on-primary-container);
  background: var(--s-color-primary-container);
  transition: box-shadow .2s;
  font-size: .875rem;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
  text-transform: capitalize;
  box-shadow: var(--s-elevation-level1);
}
:host([size=small]){
  height: 48px;
  width: 48px;
}
:host([type=extended]){
  padding: 0 16px;
  width: auto;
  height: 56px;
}
:host(:not([type=extended])[size=large]){
  height: 96px;
  width: 96px;
}
:host(:not([type=extended])[size=large]) ::slotted(*){
  width: 36px;
  height: 36px;
  font-size: 36px;
}
::slotted([slot=start]){
  margin: 0 4px 0 0;
}
@media (pointer: coarse){
  :host(:active){
    box-shadow: var(--s-elevation-level2);
  }
}
@media (pointer: fine){
  :host(:hover){
    box-shadow: var(--s-elevation-level2);
  }
}
`

const name = 's-floating-action-button'
const props = {
  type: 'normal' as 'normal' | 'extended',
  size: 'medium' as 'medium' | 'small' | 'large',
}

const Component = defineComponent({
  name, props, propSyncs: true,
  setup() {
    return {
      render: () => <>
        <style>{style}</style>
        <slot name="start"></slot>
        <slot></slot>
        <LayerFragment trigger={this.host} centered={false} />
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