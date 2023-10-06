import { defineComponent } from './core/runtime'
import { device } from './core/utils'

const style = /*css*/`
:host{
  user-select: none;
  display: block;
  color: var(--s-color-primary);
  height: 40px;
  cursor: pointer;
  position: relative;
  color: var(--s-color-primary);
}
:host([disabled=true]){
  pointer-events: none;
}
.wrapper{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  pointer-events: none;
}
.track{
  width: calc(100% - 20px);
  height: 4px;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
  background: var(--s-color-surface-container-highest);
}
:host([disabled=true]) .track{
  background: color-mix(in srgb ,var(--s-color-on-surface) 12%, transparent);
}
.track>.active-track{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: currentColor;
  transform: translateX(-50%);
}
:host([disabled=true]) .track>.active-track{
  background: color-mix(in srgb ,var(--s-color-on-surface) 38%, transparent);
}
.container{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  transform: translateX(calc(-50% + 20px));
}
.container::before{
  content:'';
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: currentColor;
  filter: opacity(0);
  transition: filter .2s;
}
.active.container::before{
  filter: opacity(.12);
}
.handle{
  width: 20px;
  height: 20px;
  background: currentColor;
  border-radius: 50%;
  box-shadow: var(--s-elevation-level1);
  margin: 10px;
}
:host([disabled=true]) .handle{
  background: color-mix(in srgb ,var(--s-color-on-surface) 38%, var(--s-color-surface-container-lowest));
  box-shadow: none;
}
.label{
  position: absolute;
  right: 6px;
  bottom: 20px;
  width: 28px;
  height: 28px;
  filter: opacity(0);
  transition: filter .2s,transform .2s;
  transform: scale(.5) translateY(100%);
  display: none;
}
.labeled>.label{
  display: block;
}
.active>.label{
  filter: opacity(1);
  transform: scale(1) translateY(0%);
}
.label::before{
  content: '';
  position: absolute;
  background: currentColor;
  bottom: 22px;
  left: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.label::after{
  content: '';
  width: 0;
  display: block;
  border-color: currentColor;
  border-top: 14px solid currentColor;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  margin-left: 3px;
}
.label>span{
  position: absolute;
  color: var(--s-color-on-primary);
  font-size: .625rem;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -22px;
}
.native{
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.native>input{
  margin: 0;
  height: 100%;
  width: 100%;
  cursor: inherit;
}
`

const name = 's-slider'
const props = {
  disabled: false,
  labeled: true,
  max: 100,
  min: 0,
  step: 1,
  value: 50,
}

const Component = defineComponent({
  name, props, propSyncs: ['disabled', 'labeled'],
  setup() {
    const render = () => {
      if (!this.host.isConnected) return
      const input = this.refs.slider as HTMLInputElement
      const value = Number(input.value)
      const percentage = ((value - this.props.min) * 100) / this.props.max - this.props.min
      const remain = 100 - percentage
      this.refs.activeTrack.style.transform = `translateX(-${remain}%)`
      this.refs.container.style.transform = `translateX(calc(-${remain}% + ${remain * 0.4}px))`
      this.props.value = Number(input.value)
      this.refs.label.textContent = input.value
    }
    return {
      created: () => {
        this.refs.slider.addEventListener('change', () => this.host.dispatchEvent(new Event('change')))
        this.refs.slider.addEventListener('input', render)
        this.refs.slider.addEventListener('mousedown', (event) => event.button === 0 && !device.touched && this.refs.container.classList.add('active'))
        this.refs.slider.addEventListener('mouseup', () => !device.touched && this.refs.container.classList.remove('active'))
        this.refs.slider.addEventListener('touchstart', () => device.touched && this.refs.container.classList.add('active'), { passive: true })
        this.refs.slider.addEventListener('touchend', () => device.touched && this.refs.container.classList.remove('active'), { passive: true })
        this.refs.slider.addEventListener('touchcancel', () => device.touched && this.refs.container.classList.remove('active'), { passive: true })
      },
      watches: {
        labeled: () => this.refs.container.classList[this.props.labeled ? 'add' : 'remove']('labeled'),
        max: () => {
          const input = this.refs.slider as HTMLInputElement
          const value = String(this.props.max)
          if (input.max === value) return
          input.max = value
          render()
        },
        min: () => {
          const input = this.refs.slider as HTMLInputElement
          const value = String(this.props.min)
          if (input.min === value) return
          input.min = value
          render()
        },
        step: () => {
          const input = this.refs.slider as HTMLInputElement
          const value = String(this.props.step)
          if (input.step === value) return
          input.step = value
          render()
        },
        value: () => {
          const input = this.refs.slider as HTMLInputElement
          const value = String(this.props.value)
          if (input.value === value) return
          input.value = value
          render()
        }
      },
      render: () => <>
        <style>{style}</style>
        <div class="wrapper">
          <div class="track">
            <div class="active-track" ref="activeTrack"></div>
          </div>
          <div class="container labeled" ref="container">
            <div class="handle"></div>
            <div class="label">
              <span ref="label">{this.props.value}</span>
            </div>
          </div>
        </div>
        <div class="native">
          <input ref="slider" type="range" max={this.props.max} min={this.props.min} step={this.props.step} value={this.props.value} />
        </div>
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