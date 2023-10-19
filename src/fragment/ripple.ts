import { device } from '../core/utils'

export const rippleStyle = /*css*/`
.ripple-wrapper{
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
.ripple-wrapper::before{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: inherit;
  background: currentColor;
  filter: opacity(0);
  transition: filter .2s;
}
.ripple-wrapper.ripple-hover::before{
  filter: opacity(.08);
}
.ripple-animation {
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

export class RippleEvent {
  private state = { pressed: false, runing: false }
  private animation: HTMLElement
  private release() {
    this.animation.addEventListener('transitionend', () => {
      this.dispatched && this.trigger.dispatchEvent(new Event('blur'))
      this.animation.removeAttribute('style')
      this.state.pressed = false
    }, { once: true })
    this.animation.style.setProperty('filter', 'opacity(0)')
  }
  private onTouch(event: { clientX: number, clientY: number }) {
    if (!this.trigger.isConnected) return
    if (this.state.pressed) return
    this.state.pressed = true
    this.state.runing = true
    const { offsetWidth, offsetHeight } = this.trigger
    const diameter = Math.pow(Math.pow(offsetHeight, 2) + Math.pow(offsetWidth, 2), 0.5)
    const coordinate = { x: 0, y: 0 }
    if (!this.centered) {
      const { left, top } = this.trigger.getBoundingClientRect()
      const float = { x: event.clientX - left, y: event.clientY - top }
      coordinate.x = ((offsetWidth / 2) - float.x) / -1
      coordinate.y = ((offsetHeight / 2) - float.y) / -1
    }
    this.animation.setAttribute('style', `width:${diameter}px;height:${diameter}px;--x:${coordinate.x}px;--y:${coordinate.y}px;animation:diffusion .2s`)
    this.dispatched && this.trigger.dispatchEvent(new Event('focus'))
  }
  private onUntouch() {
    if (!this.state.pressed) return
    if (this.state.runing) {
      this.animation.addEventListener('animationend', () => this.release(), { once: true })
      return
    }
    this.release()
  }
  constructor(private trigger: HTMLElement, wrapper: Element, public centered = false, private dispatched = false) {
    this.animation = wrapper.firstElementChild as HTMLElement
    this.animation.addEventListener('animationend', () => this.state.runing = false)
    this.animation.addEventListener('animationcancel', () => this.state.runing = false)
    this.trigger.addEventListener('mouseover', () => !device.touched && wrapper.classList.add('ripple-hover'))
    this.trigger.addEventListener('mousedown', (event) => !device.touched && event.button === 0 && this.onTouch(event))
    this.trigger.addEventListener('mouseup', () => !device.touched && this.onUntouch())
    this.trigger.addEventListener('mouseleave', () => {
      if (device.touched) return
      wrapper.classList.remove('ripple-hover')
      this.onUntouch()
    })
    this.trigger.addEventListener('touchstart', (event) => this.onTouch(event.changedTouches[0]), { passive: true })
    this.trigger.addEventListener('touchend', () => this.onUntouch(), { passive: true })
    this.trigger.addEventListener('touchcancel', () => this.onUntouch(), { passive: true })
  }
}

export const RippleFragment = (trigger: HTMLElement, centered = false) => {
  const fragment = document.createDocumentFragment()
  const styled = document.createElement('style')
  styled.textContent = rippleStyle
  fragment.appendChild(styled)
  const wrapper = document.createElement('div')
  wrapper.className = 'ripple-wrapper'
  fragment.appendChild(wrapper)
  const animation = document.createElement('div')
  animation.className = 'ripple-animation'
  wrapper.appendChild(animation)
  new RippleEvent(trigger, wrapper, centered, false)
  return fragment
}