import { defineElement, IntrinsicElement } from './base/core'

const pointer = { touched: false }
{
  const mediaQueryList = matchMedia('(pointer:fine)')
  pointer.touched = mediaQueryList.matches
  mediaQueryList.addEventListener('change', ({ matches }) => pointer.touched = matches)
}

const render = () => <>
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
      filter: opacity(.24);
      transition: filter .2s;
    }
    @keyframes diffusion {
      from { transform: translate(var(--x), var(--y)) scale(0); }
      to { transform: translate(0, 0) scale(1); }
    }
    @media (pointer: fine){
      :host(:hover)::before{
        filter: opacity(.12);
      }
    }
  `}</style>
  <div class="wrapper">
    <div class="ripple" ref="ripple"></div>
  </div>
  <slot></slot>
</>

const name = 's-ripple'
const props = {
  x: NaN,
  y: NaN
}

export default defineElement({
  name, props, render,
  created() {
    const state = { pressed: false }
    const onTouch = (event: { pageX: number, pageY: number }) => {
      if (state.pressed) return
      const { offsetWidth, offsetHeight } = this.element
      const diameter = Math.pow(Math.pow(offsetHeight, 2) + Math.pow(offsetWidth, 2), 0.5)
      const coordinate = { x: this.props.x, y: this.props.y }
      if (isNaN(coordinate.x) || isNaN(coordinate.y)) {
        const { left, top } = this.element.getBoundingClientRect()
        const float = { x: event.pageX - left, y: event.pageY - top }
        coordinate.x = ((offsetWidth / 2) - float.x) / -1
        coordinate.y = ((offsetHeight / 2) - float.y) / -1
      }
      state.pressed = true
      this.refs.ripple.setAttribute('style', `width:${diameter}px;height:${diameter}px;--x:${coordinate.x}px;--y:${coordinate.y}px;animation:diffusion .2s`)
      this.element.dispatchEvent(new Event('focus'))
    }
    const onUntouch = () => {
      if (!state.pressed) return
      this.refs.ripple.style.filter = 'opacity(0)'
      setTimeout(() => {
        state.pressed = false
        this.element.dispatchEvent(new Event('blur'))
        this.refs.ripple.removeAttribute('style')
      }, 200)
    }
    this.element.addEventListener('mousedown', (event) => pointer.touched && event.button !== 2 && onTouch(event))
    this.element.addEventListener('mouseup', () => pointer.touched && onUntouch())
    this.element.addEventListener('mouseleave', () => pointer.touched && onUntouch())
    this.element.addEventListener('touchstart', (event) => onTouch(event.changedTouches[0]))
    this.element.addEventListener('touchend', () => onUntouch())
    this.element.addEventListener('touchcancel', () => onUntouch())
  }
})

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}