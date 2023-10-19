import { defineElement, html, ref } from './core/element'
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

export default class Component extends defineElement({
  name, props,
  setup() {
    const container = ref<HTMLElement>()
    const show = () => {
      container.target.removeAttribute('style')
      const rect = container.target.getBoundingClientRect()
      const position = { top: '', left: '' }
      const gap = 4
      position.left = `${rect.left}px`
      position.top = `${rect.top + this.offsetHeight + gap}px`
      if (this.offsetWidth > rect.width) {
        position.left = `${rect.left + ((this.offsetWidth - rect.width) / 2)}px`
      } else {
        const overflow = (rect.width - this.offsetWidth) / 2
        if (rect.left > overflow) {
          position.left = `${rect.left - overflow}px`
        }
        if ((rect.left - overflow) + rect.width > window.innerWidth) {
          position.left = `${(this.offsetWidth + rect.left) - rect.width}px`
        }
      }
      if (rect.top + this.offsetHeight + rect.height > window.innerHeight) {
        position.top = `${rect.top - rect.height - gap}px`
      }
      container.target.setAttribute('style', `position: fixed;top:${position.top};left:${position.left}`)
      container.target.classList.add('show')
    }
    const dimiss = () => container.target.classList.remove('show')
    this.addEventListener('mouseover', () => !device.touched && show())
    this.addEventListener('mouseleave', () => !device.touched && dimiss())
    let timer = 0
    const clear = () => {
      clearTimeout(timer)
      dimiss()
    }
    this.addEventListener('touchstart', () => timer = setTimeout(show, this.delay))
    this.addEventListener('touchend', clear)
    this.addEventListener('touchcancel', clear)
    return {
      expose: { show, dimiss },
      render: () => html`
        <style>${style}</style>
        <slot name="trigger"></slot>
        <div class="wrapper">
          <div class="container" part="container" ref="${container}">
            <slot></slot>
          </div>
        </div>
      `
    }
  }
}) { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}