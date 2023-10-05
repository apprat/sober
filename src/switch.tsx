import { defineComponent, IntrinsicElement } from './core/runtime'
import { LayerFragment } from './fragment/layer'

const style = /*css*/`
:host{
  -webkit-user-select: none;
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  cursor: pointer;
  position: relative;
  color: var(--s-color-on-surface-variant);
}
:host([disabled=true]){
  pointer-events: none;
}
:host([checked=true]){
  color: var(--s-color-primary);
}
.track{
  display: flex;
  align-items: center;
  width: 52px;
  height: 32px;
  border-radius: 20px;
  background: var(--s-color-surface-container-highest);
  box-shadow: 0 0 0 2px inset var(--s-color-outline);
  position: relative;
}
:host([checked=true]) .track{
  background: var(--s-color-primary);
  box-shadow: none;
}
:host([disabled=true]) .track{
  background: color-mix(in srgb ,var(--s-color-surface-container-highest) 12%, transparent);
  box-shadow: 0 0 0 2px inset color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent);
}
:host([checked=true][disabled=true]) .track{
  background: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent);
  box-shadow: none;
}
.thumb{
  background: var(--s-color-outline);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  transform: scale(1) translateX(8px);
  transition: transform .2s,box-shadow .2s;
  transform-origin: left;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
:host([checked=true]) .thumb{
  background: var(--s-color-on-primary);
  transform: scale(1.5) translateX(16px);
  box-shadow: var(--s-elevation-level1);
}
:host([disabled=true]) .thumb{
  background: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent);
  box-shadow: none;
}
:host([checked=true][disabled=true]) .thumb{
  background: var(--s-color-surface);
}
.icon{
  width: 12px;
  height: 12px;
  fill: var(--s-color-primary);
  filter: opacity(0);
  transition: filter .2s;
}
:host([checked=true]) .icon{
  filter: opacity(1);
}
:host([checked=true][disabled=true]) .icon{
  fill: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent);
}
.layer-wrapper{
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  top: auto !important;
  transition: transform .2s;
  transform: translateX(-4px);
}
:host([checked=true]) .layer-wrapper{
  transform: translateX(16px);
}
`

const name = 's-switch'
const props = {
  disabled: false,
  checked: false
}

const Component = defineComponent({
  name, props, propSyncs: true,
  setup() {
    this.host.addEventListener('click', () => {
      this.props.checked = !this.props.checked
      this.host.dispatchEvent(new Event('change'))
    })
    return {
      render: () => <>
        <style>{style}</style>
        <div class="track">
          <div class="thumb">
            <svg class="icon" viewBox="0 -960 960 960">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z">
              </path>
            </svg>
          </div>
        </div>
        <LayerFragment trigger={this.host} centered={true} />
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