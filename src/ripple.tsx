import { Component, define, Ref } from './core/main'

const pointer = { touched: false }
{
  const mediaQueryList = matchMedia('(pointer:fine)')
  pointer.touched = mediaQueryList.matches
  mediaQueryList.addEventListener('change', ({ matches }) => pointer.touched = matches)
}

export interface Property {
  x: number
  y: number
}

class Ripple extends Component {
  property: Property = { x: NaN, y: NaN }
  state = { pressed: false }
  refs = {
    ripple: new Ref()
  }
  onCreated() {
    this.element.addEventListener('mousedown', (event) => pointer.touched && event.button !== 2 && this.onTouch(event))
    this.element.addEventListener('mouseup', () => pointer.touched && this.onUntouch())
    this.element.addEventListener('mouseleave', () => pointer.touched && this.onUntouch())
    this.element.addEventListener('touchstart', (event) => this.onTouch(event.changedTouches[0]))
    this.element.addEventListener('touchend', () => this.onUntouch())
    this.element.addEventListener('touchcancel', () => this.onUntouch())
  }
  onTouch(event: { pageX: number, pageY: number }) {
    if (this.state.pressed) return
    const { offsetWidth, offsetHeight } = this.element
    const diameter = Math.pow(Math.pow(offsetHeight, 2) + Math.pow(offsetWidth, 2), 0.5)
    const coordinate = { x: this.property.x, y: this.property.y }
    if (isNaN(coordinate.x) || isNaN(coordinate.y)) {
      const { left, top } = this.element.getBoundingClientRect()
      const float = { x: event.pageX - left, y: event.pageY - top }
      coordinate.x = ((offsetWidth / 2) - float.x) / -1
      coordinate.y = ((offsetHeight / 2) - float.y) / -1
    }
    this.state.pressed = true
    this.refs.ripple.value?.setAttribute('style', `width:${diameter}px;height:${diameter}px;--x:${coordinate.x}px;--y:${coordinate.y}px;animation:diffusion .2s`)
    this.element.dispatchEvent(new Event('focus'))
  }
  onUntouch() {
    if (!this.state.pressed) return
    this.refs.ripple.value!.style.filter = 'opacity(0)'
    setTimeout(() => {
      this.state.pressed = false
      this.element.dispatchEvent(new Event('blur'))
      this.refs.ripple.value?.removeAttribute('style')
    }, 200)
  }
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display: inline-block;
          position: relative;
          cursor: pointer;
        }
        :host::before{
          content: '';
          background: currentColor;
          filter: opacity(0);
          transition: filter .2s;
        }
        :host::before,
        .wrapper{
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          pointer-events: none;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .ripple {
          background: currentColor;
          border-radius: 50%;
          flex-shrink: 0;
          filter: opacity(.2);
          transition: filter .2s;
        }
        @keyframes diffusion {
          from { transform: translate(var(--x), var(--y)) scale(0); }
          to { transform: translate(0, 0) scale(1); }
        }
        @media (pointer: fine){
          :host(:hover)::before{
            filter: opacity(.06);
          }
        }
      `}</style>
      <div class="wrapper">
        <div class="ripple" ref={this.refs.ripple}></div>
      </div>
      <slot></slot>
    </>
  }
}

export default define('ripple', Ripple)