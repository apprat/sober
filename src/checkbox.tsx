import { defineComponent } from './core/runtime'
import { LayerFragment } from './fragment/layer'

const style = /*css*/`
:host{
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--s-color-on-surface-variant);
}
:host([disabled=true]){
  pointer-events: none !important;
  color: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent) !important;
}
:host([checked=true]),
:host([indeterminate=true]){
  color: var(--s-color-primary);
}
.icon{
  width: 24px;
  height: 24px;
  fill: currentColor;
}
`

const name = 's-checkbox'
const props = {
  disabled: false,
  checked: false,
  indeterminate: false
}

const svgData = {
  indeterminate: 'M280-440h400v-80H280v80Zm-80 320q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z',
  uncheck: 'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z',
  checked: 'm424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z'
}

const Component = defineComponent({
  name, props, propSyncs: true,
  setup() {
    return {
      created: () => {
        this.host.addEventListener('click', () => {
          if (this.props.indeterminate) return this.props.indeterminate = false
          this.props.checked = !this.props.checked
          this.host.dispatchEvent(new Event('change'))
        })
      },
      watches: {
        indeterminate: () => this.refs.iconPath.setAttribute('d', this.props.indeterminate ? svgData.indeterminate : (this.props.checked ? svgData.checked : svgData.uncheck)),
        checked: () => !this.props.indeterminate && this.refs.iconPath.setAttribute('d', this.props.checked ? svgData.checked : svgData.uncheck)
      },
      render: () => <>
        <style>{style}</style>
        <svg class="icon" viewBox="0 -960 960 960">
          <path ref="iconPath" d={svgData.uncheck}></path>
        </svg>
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