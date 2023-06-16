import { defineElement, IntrinsicElement, css } from './base/core'

const publicStyle = css`
.pointer-wrapper{
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
  border-radius: inherit;
}
.pointer-wrapper::before{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: inherit;
  background: currentColor;
  filter: opacity(0);
  transition: filter .2s;
}
.pointer-wrapper.pointer-hover::before{
  filter: opacity(.1);
}
.pointer-ripple {
  background: currentColor;
  border-radius: 50%;
  flex-shrink: 0;
  transition: filter .2s;
  filter: opacity(var(--opacity,.2));
  width: var(--width, 0);
  height: var(--height, 0);
  animation: var(--animation, none);
}
@keyframes diffusion {
  0%{ transform: translate(var(--x), var(--y)) scale(0); }
  100% { transform: translate(0, 0) scale(1); }
}
`

const style = css`
:host{
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  cursor: pointer;
}
`

const name = 's-pointer'
const props = { centered: false }

const pointer = { touched: false }
{
  const mediaQueryList = matchMedia('(pointer:coarse)')
  pointer.touched = mediaQueryList.matches
  mediaQueryList.addEventListener('change', ({ matches }) => pointer.touched = matches)
}

class PointEvent {
  private state = { pressed: false }
  private onTouch(event: { pageX: number, pageY: number }) {
    if (this.state.pressed) return
    const { offsetWidth, offsetHeight } = this.element
    const diameter = Math.pow(Math.pow(offsetHeight, 2) + Math.pow(offsetWidth, 2), 0.5)
    const coordinate = { x: 0, y: 0 }
    if (!this.options.centered) {
      const { left, top } = this.element.getBoundingClientRect()
      const float = { x: event.pageX - left, y: event.pageY - top }
      coordinate.x = ((offsetWidth / 2) - float.x) / -1
      coordinate.y = ((offsetHeight / 2) - float.y) / -1
    }
    this.state.pressed = true
    this.wrapper.setAttribute('style', `--width:${diameter}px;--height:${diameter}px;--x:${coordinate.x}px;--y:${coordinate.y}px;--animation:diffusion .2s`)
    this.element.dispatchEvent(new Event('focus'))
  }
  private onUntouch() {
    if (!this.state.pressed) return
    this.wrapper.style.setProperty('--opacity', '0')
    setTimeout(() => {
      this.state.pressed = false
      this.element.dispatchEvent(new Event('blur'))
      this.wrapper.removeAttribute('style')
    }, 200)
  }
  constructor(private element: HTMLElement, private wrapper: HTMLElement, private options: typeof props) {
    this.element.addEventListener('mouseover', () => !pointer.touched && this.wrapper.classList.add('pointer-hover'))
    this.element.addEventListener('mousedown', (event) => !pointer.touched && event.button === 0 && this.onTouch(event))
    this.element.addEventListener('mouseup', () => !pointer.touched && this.onUntouch())
    this.element.addEventListener('mouseleave', () => {
      this.wrapper.classList.remove('pointer-hover')
      !pointer.touched && this.onUntouch()
    })
    this.element.addEventListener('touchstart', (event) => this.onTouch(event.changedTouches[0]))
    this.element.addEventListener('touchend', () => this.onUntouch())
    this.element.addEventListener('touchcancel', () => this.onUntouch())
  }
}

export const Fragment = function (this: { parentNode: HTMLElement }, options: typeof props) {
  const fragment = document.createDocumentFragment()
  const styled = document.createElement('style')
  styled.textContent = publicStyle
  fragment.appendChild(styled)
  const wrapper = document.createElement('div')
  wrapper.className = 'pointer-wrapper'
  fragment.appendChild(wrapper)
  const ripple = document.createElement('div')
  ripple.className = 'pointer-ripple'
  wrapper.appendChild(ripple)
  new PointEvent(this.parentNode, wrapper, options)
  return fragment
}

export default defineElement({
  name, props,
  setup() {
    return {
      created: () => new PointEvent(this.host, this.refs.wrapper, this.props),
      render: () => <>
        <style>{publicStyle}{style}</style>
        <div class="pointer-wrapper" ref="wrapper">
          <div class="pointer-ripple"></div>
        </div>
        <slot></slot>
      </>
    }
  }
})

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}