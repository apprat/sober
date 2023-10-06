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
  color: var(--s-color-on-surface-variant);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent) !important;
}
:host([checked=true]){
  color: var(--s-color-primary);
}
.icon{
  width: 24px;
  height: 24px;
  fill: currentColor;
}
`

const name = 's-radio-button'
const props = {
  disabled: false,
  checked: false,
  name: ''
}

const svgData = {
  uncheck: 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
  checked: 'M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
}

const Component = defineComponent({
  name, props, propSyncs: true,
  setup() {
    return {
      created: () => {
        this.host.addEventListener('click', () => {
          this.props.checked = true
          if (this.props.name) {
            document.querySelectorAll<typeof this.host>(`${this.host.tagName}[name='${this.props.name}']`).forEach((item) => {
              if (item === this.host) return
              item.checked = false
            })
          }
          this.host.dispatchEvent(new Event('change'))
        })
      },
      watches: {
        checked: () => this.refs.iconPath.setAttribute('d', this.props.checked ? svgData.checked : svgData.uncheck)
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