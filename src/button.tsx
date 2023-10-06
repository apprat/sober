import { defineComponent } from './core/runtime'
import { LayerFragment } from './fragment/layer'

const style = /*css*/`
:host{
  user-select: none;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  display: inline-flex;
  vertical-align: middle;
  border-radius: 20px;
  padding: 0 24px;
  height: 40px;
  text-transform: capitalize;
  position: relative;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  color: var(--s-color-primary);
  background: var(--s-color-surface-container-low);
  transition: box-shadow .2s;
  box-shadow: var(--s-elevation-level1);
}
:host([disabled=true]){
  box-shadow: none !important;
  pointer-events: none !important;
  background: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent) !important;
  color: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent) !important;
}
:host([theme=filled]){
  background: var(--s-color-primary);
  color: var(--s-color-on-primary);
  box-shadow: none;
}
:host([theme=filled-tonal]){
  background: var(--s-color-secondary-container);
  color: var(--s-color-on-secondary-container);
  box-shadow: none;
}
:host([theme=outlined]){
  border: solid 1px var(--s-color-outline);
  background: none;
  box-shadow: none;
  color: var(--s-color-primary);
}
:host([theme=outlined][disabled=true]){
  background: none !important;
  border-color: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent);
}
:host([theme=text]){
  box-shadow: none;
  background: none;
  color: var(--s-color-primary);
  padding: 0 12px;
}
:host([theme=text][disabled=true]){
  background: none !important;
}
::slotted(*){
  color: inherit;
}
::slotted(s-icon){
  width: 18px;
  height: 18px;
}
::slotted([slot=start]){
  margin: 0 4px 0 -8px;
}
:host([theme=text]) ::slotted([slot=start]){
  margin: 0 4px 0 -4px;
}
@media (pointer: coarse){
  :host(:active){
    box-shadow: var(--s-elevation-level2);
  }
  :host([theme=filled]:active),
  :host([theme=filled-tonal]:active){
    box-shadow: var(--s-elevation-level1);
  }
  :host([theme=outlined]:active),
  :host([theme=text]:active){
    box-shadow: none;
  }
}
@media (pointer: fine){
  :host(:hover){
    box-shadow: var(--s-elevation-level2);
  }
  :host([theme=filled]:hover),
  :host([theme=filled-tonal]:hover){
    box-shadow: var(--s-elevation-level1);
  }
  :host([theme=outlined]:hover),
  :host([theme=text]:hover){
    box-shadow: none;
  }
}
`

const name = 's-button'
const props = {
  disabled: false,
  theme: 'elevated' as 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text'
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