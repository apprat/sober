import { Component, define, Ref } from './core/main'

export interface Property {
  disabled: boolean
  labeled: boolean
  type: 'continuous' | 'discrete'
  orientation: 'horizontal' | 'vertical',
  max: number
  min: number
  step: number
  value: number
}

class Slider extends Component<Property> {
  property: Property = {
    type: 'continuous',
    disabled: false,
    labeled: false,
    orientation: 'horizontal',
    max: 1000,
    min: 0,
    step: 100,
    value: 0
  }
  state = { pressed: false, moved: false }
  refs = { wrapper: new Ref(), input: new Ref<HTMLInputElement>(), track: new Ref(), thumb: new Ref() }
  onThumbPress(event: MouseEvent) {
    const state = {
      pageX: event.pageX,
      stepWidth: this.element.offsetWidth / (this.property.max / this.property.step),
      offset: 0,
      rect: this.element.getBoundingClientRect()
    }
    const getValueOffset = (value: number) => {
      const num = this.property.max / this.property.step
      const now = num / (this.property.max / value)
      return now * state.stepWidth
    }
    const onMove = (event: MouseEvent) => {
      const difference = (event.pageX - state.offset) - state.pageX
      this.refs.thumb.value!.style.left = `${difference}px`
      //初始坐标 25 当前坐标 125 移动距离 100 步长 100
      //初始坐标 25 当前坐标 225 移动距离 200 步长 100
      //初始坐标 25 当前坐标 325 移动距离 300 步长 100
      if ([100, 200, 300].includes(difference)) {
        console.log('初始坐标', state.pageX, '当前坐标', event.pageX, '移动距离', difference, '步长', state.stepWidth)
      }
      if (difference > 0 && (state.stepWidth / 2) < difference) {
        const nextOffset = getValueOffset(this.property.value + this.property.step)
        console.log(nextOffset)
      }
    }
    const onRelease = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onRelease)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onRelease)
  }
  setValue() {
  }
  onPropertyChanged(name: keyof Property) {
    switch (name) {
      case 'value':
        const percentage = ((this.property.value - this.property.min) * 100) / (this.property.max - this.property.min)
        this.refs.track.value!.style.width = `${percentage}%`
        this.refs.thumb.value!.style.left = `calc(${percentage}% - ${percentage * 0.2}px)`
        break
    }
  }
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display: block;
          color: var(--s-color-primary);
          height: 20px;
          cursor: pointer;
          width: 960px;
        }
        :host([disabled=true]){
          pointer-events: none !important;
          filter: grayscale(.8) opacity(.6) !important;
        }
        .wrapper{
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .track{
          width: 100%;
          height: 4px;
          background: var(--s-color-on-surface-variant);
          border-radius: 2px;
          opacity: .38;
        }
        .track-active{
          position: absolute;
          left: 0;
          background: currentColor;
          height: 4px;
          border-radius: 2px;
        }
        .thumb{
          position: absolute;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .thumb>div{
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: currentColor;
        }
        .thumb>.state{
          filter: opacity(0);
          pointer-events: none;
          transition: filter .2s;
        }
        .active .thumb>.state{
          filter: opacity(.24);
        }
        .thumb>.active{
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div class="wrapper" ref={this.refs.wrapper}>
        <div class="track"></div>
        <div class="track-active" ref={this.refs.track}></div>
        <div class="thumb" onmousedown={(ev: MouseEvent) => this.onThumbPress(ev)} ref={this.refs.thumb}>
          <div class="state"></div>
          <div class="active"></div>
        </div>
        <div class="label"></div>
      </div>
    </>
  }
}

export default define('slider', Slider)