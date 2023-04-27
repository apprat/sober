import { Base, define } from './core'

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

class Component extends Base {
  property: Property = { x: NaN, y: NaN }
  state = { styles: '', pressed: false }
  onCreated() {
    this.node.addEventListener('mousedown', (event) => pointer.touched && event.button !== 2 && this.onTouch(event))
    this.node.addEventListener('mouseup', () => pointer.touched && this.onUntouch())
    this.node.addEventListener('mouseleave', () => pointer.touched && this.onUntouch())
    this.node.addEventListener('touchstart', (event) => this.onTouch(event.changedTouches[0]))
    this.node.addEventListener('touchend', () => this.onUntouch())
    this.node.addEventListener('touchcancel', () => this.onUntouch())
  }
  onTouch(event: { pageX: number, pageY: number }) {
    if (this.state.pressed) return
    const { offsetWidth, offsetHeight } = this.node
    const diameter = Math.pow(Math.pow(offsetHeight, 2) + Math.pow(offsetWidth, 2), 0.5)
    const coordinate = { x: this.property.x, y: this.property.y }
    if (isNaN(coordinate.x) || isNaN(coordinate.y)) {
      const { left, top } = this.node.getBoundingClientRect()
      const float = { x: event.pageX - left, y: event.pageY - top }
      coordinate.x = ((offsetWidth / 2) - float.x) / -1
      coordinate.y = ((offsetHeight / 2) - float.y) / -1
    }
    this.setState({ pressed: true, styles: `width:${diameter}px;height:${diameter}px;--x:${coordinate.x}px;--y:${coordinate.y}px;animation:diffusion .3s;` })
    this.node.dispatchEvent(new Event('focus'))
  }
  onUntouch() {
    if (!this.state.pressed) return
    this.setState({ styles: `${this.state.styles};filter: opacity(0);` })
    setTimeout(() => {
      this.node.dispatchEvent(new Event('blur'))
      this.setState({ styles: '', pressed: false })
    }, 300)
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
          transition: filter .3s;
        }
        :host::before,
        .container{
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
          filter: opacity(var(--opacity-ripple));
          transition: filter .3s;
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
      <div class="container">
        <div class="ripple" style={this.state.styles}></div>
      </div>
      <slot></slot>
    </>
  }
}

export default define('s-ripple', Component)