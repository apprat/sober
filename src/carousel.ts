import { useElement, JSXAttributes } from './core/element.js'
import { device } from './core/utils/device.js'
import './ripple.js'
import { Theme } from './page.js'

const name = 's-carousel'
const props = {
  value: -1,
  duration: 4000
}

const style = /*css*/`
:host{
  display: flex;
  height: 240px;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  max-width: 480px;
  cursor: pointer;
}
.container{
  display: flex;
  justify-content: flex-start;
  height: 100%;
  transition: transform .3s ease-out;
}
.track{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  padding: 12px 0;
}
.track .indicator{
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: white;
  opacity: .3;
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
  flex-shrink: 0;
  cursor: pointer;
  pointer-events: auto;
}
.track .indicator.checked{
  opacity: 1;
}
::slotted(*){
  display: block;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-drag: none;
  -webkit-user-drag: none;
}
`

const template = /*html*/`
<div class="container" part="container">
  <slot></slot>
</div>
<div class="track"></div>
`

export class Carousel extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const track = shadowRoot.querySelector('.track') as HTMLDivElement
    const slot = shadowRoot.querySelector('slot') as HTMLSlotElement
    const state = { selectIndex: 0, count: 0, timer: -1 }
    const update = () => {
      container.style.transform = `translateX(-${state.selectIndex * 100}%)`
      track.querySelector('.checked')?.classList.remove('checked')
      track.children[state.selectIndex]?.classList.add('checked')
    }
    const runTask = () => {
      clearTimeout(state.timer)
      if (state.count === 0) return
      state.timer = setTimeout(() => {
        const next = state.selectIndex + 1
        state.selectIndex = next === state.count ? 0 : next
        update()
        runTask()
      }, this.duration)
    }
    const stopTask = () => clearTimeout(state.timer)
    slot.addEventListener('slotchange', () => {
      track.innerHTML = ''
      const elements = slot.assignedElements()
      const fragment = document.createDocumentFragment()
      elements.forEach((_, index) => {
        const div = document.createElement('div')
        div.classList.add('indicator')
        div.setAttribute('part', 'indicator')
        div.addEventListener('click', () => this.value = index)
        fragment.appendChild(div)
      })
      track.appendChild(fragment)
      state.count = elements.length
      state.selectIndex = 0
      update()
      runTask()
    })
    container.addEventListener('pointerdown', (event: PointerEvent) => {
      if (state.count <= 1 || event.button !== 0) return
      const { pageX, pageY } = event
      const width = container.offsetWidth
      const min = state.selectIndex === 0 ? 0 : width
      const max = state.selectIndex === state.count - 1 ? 0 : width * -1
      let left: number
      stopTask()
      const move = (event: MouseEvent | TouchEvent) => {
        const point = event instanceof MouseEvent ? event : event.changedTouches[0]
        const x = point.pageX - pageX
        const y = point.pageY - pageY
        if (Math.abs(y) > Math.abs(x)) return up()
        left = Math.max(Math.min(x, min), max)
        container.style.transition = 'none'
        container.style.pointerEvents = 'none'
        container.style.transform = `translateX(calc(-${state.selectIndex * 100}% + ${left}px))`
      }
      const up = () => {
        document.removeEventListener(events[0], move, { capture: true })
        let old = state.selectIndex
        if (Math.abs(left) > width / 3) state.selectIndex = left < 0 ? state.selectIndex + 1 : state.selectIndex - 1
        if (old !== state.selectIndex) update()
        container.style.removeProperty('transition')
        container.style.removeProperty('pointer-events')
        container.style.transform = `translateX(-${state.selectIndex * 100}%)`
        runTask()
      }
      const events = device.touched ? ['touchmove', 'touchend'] as const : ['mousemove', 'mouseup'] as const
      document.addEventListener(events[0], move, { passive: true, capture: true })
      document.addEventListener(events[1], up, { once: true })
    })
    return {
      expose: {
        get value() {
          return state.selectIndex
        }
      },
      props: {
        duration: runTask,
        autoPlay: runTask,
        value: (value) => {
          if (value < 0 || value > state.count - 1) return
          state.selectIndex = value
          runTask()
          update()
        }
      },
    }
  }
}) { }

Carousel.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Carousel
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}