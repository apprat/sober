import { defineComponent } from './core/runtime'
import { LayerFragment } from './fragment/layer'

const style = /*css*/`
:host{
  user-select: none;
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--s-color-on-surface);
  height: 40px;
  text-transform: capitalize;
  font-weight: 500;
  font-size: .875rem;
  border: solid 1px var(--s-color-outline);
  position: relative;
  cursor: pointer;
}
:host(:first-child){
  border-radius: 20px 0 0 20px;
}
:host(:last-child){
  border-radius: 0 20px 20px 0;
}
:host(:not(:last-child)){
  border-right: none;
}
:host([checked=true]){
  background: var(--s-color-secondary-container);
  color: var(--s-color-on-secondary-container);
  pointer-events: none;
}
:host([disabled=true]){
  pointer-events: none;
  border-top-color: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent);
  border-bottom-color: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent);
  color: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent);
}
:host([disabled=true]:not(:last-child)){
  margin-left: -1px;
}
::slotted(s-icon){
  width: 18px;
  height: 18px;
  margin-right: 4px;
  flex-shrink: 0;
  pointer-events: none;
}
`

const name = 's-segmented-button-item'
const props = {
  checked: false,
  disabled: false
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