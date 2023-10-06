import { defineComponent } from './core/runtime'
import { LayerFragment } from './fragment/layer'

const style = /*css*/`
:host{
  user-select: none;
  display: flex;
  min-height: 48px;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0 8px;
}
:host([disabled=true]){
  pointer-events: none;
}
.text{
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}
::slotted(*){
  pointer-events: none;
  flex-shrink: 0;
}
:host([disabled=true]) ::slotted([slot=start]){
  color: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent) !important;
}
::slotted([slot=title]){
  font-size: 1rem;
  height: 24px;
  color: var(--s-color-on-surface);
  display: flex;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
:host([disabled=true]) ::slotted([slot=title]){
  color: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent) !important;
}
::slotted([slot=subtitle]){
  color: var(--s-color-on-surface-variant);
  height: 24px;
  font-size: .75rem;
}
:host([disabled=true]) ::slotted([slot=subtitle]){
  color: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent) !important;
}
`

const name = 's-label'
const props = {
  disabled: false
}

const Component = defineComponent({
  name, props, propSyncs: true,
  setup() {
    this.host.addEventListener('click', () => {
      const start = this.refs.start as HTMLSlotElement
      const starNodes = start.assignedNodes() as HTMLElement[]
      starNodes.forEach((value) => {
        switch (value.nodeName) {
          case 'S-CHECKBOX':
            value?.click()
            break
          case 'S-RADIO-BUTTON':
            value?.click()
            break
        }
      })
    })
    return {
      render: () => <>
        <style>{style}</style>
        <slot name="start" ref="start"></slot>
        <div class="text">
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </div>
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