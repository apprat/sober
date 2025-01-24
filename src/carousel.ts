import { useElement } from './core/element.js'
import { mediaQueryList } from './core/utils/mediaQuery.js'
import { Select } from './core/utils/select.js'
import { Theme } from './core/theme.js'
import './ripple.js'

const name = 's-carousel'
const props = {
  value: '',
  autoplay: false,
  duration: 4000
}

const style = /*css*/`
:host{
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  aspect-ratio: 2;
  -webkit-aspect-ratio: 2;
}
.container{
  display: flex;
  justify-content: flex-start;
  height: 100%;
  min-width: 100%;
  transition: transform .4s ease-out;
  transform: translateX(100%);
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
  flex-shrink: 0;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
}
.track .indicator.checked{
  opacity: 1;
}
`

const template = /*html*/`
<div class="container" part="container">
  <slot></slot>
</div>
<div class="track"></div>
`

class SCarousel extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const track = shadowRoot.querySelector('.track') as HTMLDivElement
    const slot = shadowRoot.querySelector('slot') as HTMLSlotElement
    const select = new Select({ context: this, class: SCarouselItem, slot })
    let timer = -1
    select.onUpdate = () => {
      track.childNodes.forEach((item) => (item as Element).classList.remove('checked'))
      container.style.transform = `translateX(${-select.selectedIndex * 100}%)`
      if (select.selectedIndex === -1) return
      (track.childNodes[select.selectedIndex] as Element).classList.add('checked')
      play()
    }
    const play = () => {
      stopPlay()
      if (!this.autoplay) return
      if (select.list.length === 0) return
      timer = setTimeout(() => {
        let next = select.selectedIndex + 1
        if (next >= select.list.length) next = 0
        select.list[next].selected = true
        this.dispatchEvent(new Event('change'))
      }, this.duration)
    }
    const stopPlay = () => clearInterval(timer)
    select.onSlotChange = () => {
      track.innerHTML = ''
      const fragment = document.createDocumentFragment()
      select.list.forEach((item) => {
        const div = document.createElement('div')
        div.className = 'indicator'
        div.addEventListener('click', () => item.dispatchEvent(new Event(`${name}:select`, { bubbles: true })))
        fragment.appendChild(div)
      })
      track.appendChild(fragment)
    }
    container.addEventListener('pointerdown', (event) => {
      if (select.list.length <= 1) return
      stopPlay()
      const pageX = event.pageX
      const pageY = event.pageY
      const width = container.offsetWidth
      const prev = select.list[select.selectedIndex - 1]
      const next = select.list[select.selectedIndex + 1]
      const state = { now: 0, left: 0, next: undefined as undefined | SCarouselItem }
      const move = (event: PointerEvent | TouchEvent) => {
        let eventInfo: { pageX: number, pageY: number } = event instanceof TouchEvent ? event.touches[0] : event
        const x = eventInfo!.pageX - pageX
        const y = eventInfo!.pageY - pageY
        if (event instanceof TouchEvent && Math.abs(x) < Math.abs(y) && !state.next) return up()
        state.left = x
        if (state.now === 0) state.now = Date.now()
        if (prev) state.left = Math.min(state.left, width)
        if (next) state.left = Math.max(state.left, width * -1)
        if ((!prev && state.left > 0) || (!next && state.left < 0)) {
          state.left = state.left * 0.2
        }
        if ((state.left < 0 && next) || (state.left > 0 && prev)) {
          const scale = (Math.abs(state.left) / width) * 0.05
          select.select!.style.transition = 'none'
          select.select!.style.transform = `scale(${(0.05 - scale) + 0.95})`
          state.next = state.left < 0 ? next : prev
          state.next.style.transition = 'none'
          state.next.style.transform = `scale(${scale + 0.95})`
        }
        container.style.transition = 'none'
        container.style.pointerEvents = 'none'
        container.style.transform = `translateX(calc(${-select.selectedIndex * 100}% + ${state.left}px))`
        event.cancelable && event.preventDefault()
      }
      const up = () => {
        document.removeEventListener(eventName.up, up)
        document.removeEventListener(eventName.move, move)
        container.style.removeProperty('pointer-events')
        container.style.removeProperty('transition')
        select.select!.style.removeProperty('transition')
        select.select!.style.removeProperty('transform')
        state.next?.style.removeProperty('transition')
        state.next?.style.removeProperty('transform')
        const index = select.selectedIndex
        const is = (index === 0 && state.left > 0) || (index === select.list.length - 1 && state.left < 0)
        if (!is) {
          const threshold = (Date.now() - state.now) > 300 ? width / 2 : 20
          if (Math.abs(state.left) > threshold) {
            state.next?.dispatchEvent(new Event(`${name}:select`, { bubbles: true }))
            return
          }
        }
        container.style.transform = `translateX(${-select.selectedIndex * 100}%)`
        play()
      }
      const eventName = {
        move: mediaQueryList.pointerCoarse.matches ? 'touchmove' : 'pointermove',
        up: mediaQueryList.pointerCoarse.matches ? 'touchend' : 'pointerup'
      } as const
      document.addEventListener(eventName.move, move, { passive: false })
      document.addEventListener(eventName.up, up)
    })
    return {
      expose: {
        get value() {
          return select.value
        },
        get options() {
          return select.list
        },
        get selectedIndex() {
          return select.selectedIndex
        },
        togglePrevious: () => {
          const prev = select.list[select.selectedIndex - 1]
          if (!prev) return
          prev.selected = true
        },
        toggleNext: () => {
          const next = select.list[select.selectedIndex + 1]
          if (!next) return
          next.selected = true
        }
      },
      props: {
        value: (value) => select.value = value,
        autoplay: play
      }
    }
  }
}) { }

const itemName = 's-carousel-item'
const itemProps = {
  selected: false,
  value: ''
}

const itemStyle = /*css*/`
:host{
  user-drag: none;
  -webkit-user-drag: none;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: #eee;
  transform: scale(.95);
  transition: transform .4s ease-out;
  background-repeat: round;
}
:host([selected=true]){
  transform: scale(1);
}
`

const itemTemplate = /*html*/`<slot></slot>`

class SCarouselItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: ['selected'],
  setup() {
    return {
      props: {
        selected: () => {
          if (!(this.parentNode instanceof SCarousel)) return
          this.dispatchEvent(new Event(`${name}:update`, { bubbles: true }))
        }
      }
    }
  }
}) { }

SCarousel.define(name)
SCarouselItem.define(itemName)

export { SCarousel as Carousel, SCarouselItem as CarouselItem }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SCarousel
    [itemName]: SCarouselItem
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
        //@ts-ignore
        [itemName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof itemProps>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [itemName]: typeof itemProps
  }
}


//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.ButtonHTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}