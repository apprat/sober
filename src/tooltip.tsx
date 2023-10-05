import { defineComponent, IntrinsicElement } from './core/runtime'
import { device } from './core/utils'

const style = /*css*/`
:host{
  user-select: none;
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}
.wrapper{
  position: absolute;
  overflow: hidden;
}
.container{
  position: absolute;
  z-index: 1;
  background: var(--s-color-inverse-surface);
  color: var(--s-color-inverse-on-surface);
  font-size: .875rem;
  font-weight: 400;
  padding: 6px 8px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: .95;
  filter: opacity(0);
  transition: filter .2s;
  pointer-events: none;
}
.container.show{
  filter: opacity(1);
}
::slotted(img){
  display: block;
  border-radius: 4px;
  margin:2px 0;
}
`

const name = 's-tooltip'
const props = {
  delay: 1000
}

const Component = defineComponent({
  name, props,
  setup() {
    const show = () => {
      const { container } = this.refs
      container.removeAttribute('style')
      const rect = container.getBoundingClientRect()
      const position = { top: '', left: '' }
      const gap = 4
      position.left = `${rect.left}px`
      position.top = `${rect.top + this.host.offsetHeight + gap}px`
      if (this.host.offsetWidth > rect.width) {
        position.left = `${rect.left + ((this.host.offsetWidth - rect.width) / 2)}px`
      } else {
        const overflow = (rect.width - this.host.offsetWidth) / 2
        if (rect.left > overflow) {
          position.left = `${rect.left - overflow}px`
        }
        if ((rect.left - overflow) + rect.width > window.innerWidth) {
          position.left = `${(this.host.offsetWidth + rect.left) - rect.width}px`
        }
      }
      if (rect.top + this.host.offsetHeight + rect.height > window.innerHeight) {
        position.top = `${rect.top - rect.height - gap}px`
      }
      container.setAttribute('style', `position: fixed;top:${position.top};left:${position.left}`)
      container.classList.add('show')
    }
    const dimiss = () => {
      const { container } = this.refs
      container.classList.remove('show')
    }
    this.host.addEventListener('mouseover', () => !device.touched && show())
    this.host.addEventListener('mouseleave', () => !device.touched && dimiss())
    let timer = 0
    const clear = () => {
      clearTimeout(timer)
      dimiss()
    }
    this.host.addEventListener('touchstart', () => timer = setTimeout(show, this.props.delay))
    this.host.addEventListener('touchend', clear)
    this.host.addEventListener('touchcancel', clear)
    return {
      expose: { show, dimiss },
      render: () => <>
        <style>{style}</style>
        <slot name="trigger" ref="trigger"></slot>
        <div class="wrapper" part="wrapper" ref="wrapper">
          <div class="container" part="container" ref="container">
            <slot></slot>
          </div>
        </div>
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