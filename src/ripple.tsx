import { Base, define } from './core'

const pointer = { touched: false }
{
  const mediaQueryList = matchMedia('(pointer:fine)')
  pointer.touched = mediaQueryList.matches
  mediaQueryList.addEventListener('change', ({ matches }) => pointer.touched = matches)
}

export interface Property { }

class Component extends Base {
  property: Property = {}
  state = {
    playStyles: ``
  }
  onCreated() {
    this.node.addEventListener('mousedown', (event) => this.onTouch(event))
  }
  onTouch(event: MouseEvent) {
    if (event.button === 2) return
    const { pageX, pageY } = event
    const { left, top } = this.node.getBoundingClientRect()
    const { offsetWidth, offsetHeight } = this.node
    const float = { x: pageX - left, y: pageY - top }
    const diameter = Math.pow(Math.pow(offsetHeight, 2) + Math.pow(offsetWidth, 2), 0.5)
    const x = ((offsetWidth / 2) - float.x) / -1
    const y = ((offsetHeight / 2) - float.y) / -1
    this.setState({ playStyles: `width:${diameter}px;height:${diameter}px;--x:${x}px;--y:${y}px;animation:anime .2s` })
    this.node.dispatchEvent(new Event('focus'))
  }
  onUntouch() {
    this.node.dispatchEvent(new Event('blur'))
  }
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display: inline-block;
          overflow: hidden;
          position: relative;
        }
        .wrapper{
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          pointer-events: none;
          background: rgba(0,0,0,.08);
        }
      `}</style>
      <div class="wrapper" style={this.state.playStyles}></div>
      <slot></slot>
    </>
  }
}

export default define('m-ripple', Component)