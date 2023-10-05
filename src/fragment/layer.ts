import { device } from '../core/utils'

export const layerStyle = /*css*/`
.layer-wrapper{
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
.layer-wrapper::before{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: inherit;
  background: currentColor;
  filter: opacity(0);
  transition: filter .2s;
}
.layer-wrapper.layer-hover::before{
  filter: opacity(.08);
}
.layer-ripple {
  background: currentColor;
  border-radius: 50%;
  flex-shrink: 0;
  transition: filter .2s;
  filter: opacity(var(--opacity,.12));
}
@keyframes diffusion {
  0%{ transform: translate(var(--x), var(--y)) scale(0); }
  100% { transform: translate(0, 0) scale(1); }
}
`

type Props = { trigger: HTMLElement, centered: boolean }

export class LayerEvent {
  private state = { pressed: false, runing: false }
  private ripple: HTMLElement
  private release() {
    this.ripple.addEventListener('transitionend', () => {
      this.dispatched && this.element.dispatchEvent(new Event('blur'))
      this.ripple.removeAttribute('style')
      this.state.pressed = false
    }, { once: true })
    this.ripple.style.setProperty('filter', 'opacity(0)')
  }
  private onTouch(event: { clientX: number, clientY: number }) {
    if (!this.element.isConnected) return
    if (this.state.pressed) return
    this.state.pressed = true
    this.state.runing = true
    const { offsetWidth, offsetHeight } = this.element
    const diameter = Math.pow(Math.pow(offsetHeight, 2) + Math.pow(offsetWidth, 2), 0.5)
    const coordinate = { x: 0, y: 0 }
    if (!this.options.centered) {
      const { left, top } = this.element.getBoundingClientRect()
      const float = { x: event.clientX - left, y: event.clientY - top }
      coordinate.x = ((offsetWidth / 2) - float.x) / -1
      coordinate.y = ((offsetHeight / 2) - float.y) / -1
    }
    this.ripple.setAttribute('style', `width:${diameter}px;height:${diameter}px;--x:${coordinate.x}px;--y:${coordinate.y}px;animation:diffusion .2s`)
    this.dispatched && this.element.dispatchEvent(new Event('focus'))
  }
  private onUntouch() {
    if (!this.state.pressed) return
    if (this.state.runing) {
      this.ripple.addEventListener('animationend', () => this.release(), { once: true })
      return
    }
    this.release()
  }
  constructor(private element: HTMLElement, wrapper: Element, private options: Omit<Props, 'trigger'>, private dispatched: boolean) {
    this.ripple = wrapper.firstChild as HTMLElement
    this.ripple.addEventListener('animationend', () => this.state.runing = false)
    this.ripple.addEventListener('animationcancel', () => this.state.runing = false)
    this.element.addEventListener('mouseover', () => !device.touched && wrapper.classList.add('layer-hover'))
    this.element.addEventListener('mousedown', (event) => !device.touched && event.button === 0 && this.onTouch(event))
    this.element.addEventListener('mouseup', () => !device.touched && this.onUntouch())
    this.element.addEventListener('mouseleave', () => {
      if (device.touched) return
      wrapper.classList.remove('layer-hover')
      this.onUntouch()
    })
    this.element.addEventListener('touchstart', (event) => this.onTouch(event.changedTouches[0]), { passive: true })
    this.element.addEventListener('touchend', () => this.onUntouch(), { passive: true })
    this.element.addEventListener('touchcancel', () => this.onUntouch(), { passive: true })
  }
}

export const LayerFragment = (options: Props) => {
  const fragment = document.createDocumentFragment()
  const styled = document.createElement('style')
  styled.textContent = layerStyle
  fragment.appendChild(styled)
  const wrapper = document.createElement('div')
  wrapper.className = 'layer-wrapper'
  fragment.appendChild(wrapper)
  const ripple = document.createElement('div')
  ripple.className = 'layer-ripple'
  wrapper.appendChild(ripple)
  new LayerEvent(options.trigger, wrapper, options, false)
  return fragment
}