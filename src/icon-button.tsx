import { defineComponent } from './core/runtime'
import { LayerFragment } from './fragment/layer'

const style = /*css*/`
:host{
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--s-color-on-surface-variant);
  position: relative;
  box-sizing: border-box;
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent) !important;
}
:host([theme=filled]){
  color: var(--s-color-on-primary);
  background: var(--s-color-primary);
}
:host([theme=filled][disabled=true]){
  background: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent) !important;
}
:host([theme=filled-tonal]){
  color: var(--s-color-on-secondary-container);
  background: var(--s-color-secondary-container);
}
:host([theme=filled-tonal][disabled=true]){
  background: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent) !important;
}
:host([theme=outlined]){
  border: solid 1px var(--s-color-outline);
}
:host([theme=outlined][disabled=true]){
  background: none !important;
  border-color: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent);
}
`

const name = 's-icon-button'
const props = {
  disabled: false,
  theme: 'standard' as 'standard' | 'filled' | 'filled-tonal' | 'outlined',
}

const Component = defineComponent({
  name, props, propSyncs: true,
  setup() {
    return {
      render: () => <>
        <style>{style}</style>
        <slot name="start">
        </slot>
        <slot></slot>
        <slot name="end">
        </slot>
        <LayerFragment trigger={this.host} centered={true} />
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