import { useElement, JSXAttributes } from './core/element.js'
import { device } from './core/utils/device.js'
import Select from './core/select.js'
import './ripple.js'
import { Theme } from './page.js'

const name = 's-carousel'
const props = {
  value: '',
  autoplay: false,
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
  cursor: pointer;
}
.container{
  display: flex;
  justify-content: flex-start;
  height: 100%;
  min-width: 100%;
  transition: transform .3s ease-out;
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
  box-shadow: var(--s-elevation-level1, ${Theme.elevationLevel1});
  flex-shrink: 0;
  cursor: pointer;
  pointer-events: auto;
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

export class Carousel extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const track = shadowRoot.querySelector('.track') as HTMLDivElement
    const slot = shadowRoot.querySelector('slot') as HTMLSlotElement
    const select = new Select({ context: this, selectClass: CarouselItem, slot })
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
      if (select.selects.length === 0) return
      timer = setTimeout(() => {
        let next = select.selectedIndex + 1
        if (next >= select.selects.length) next = 0
        select.selects[next].selected = true
        this.dispatchEvent(new Event('change'))
      }, this.duration)
    }
    const stopPlay = () => clearInterval(timer)
    select.onSlotChange = () => {
      track.innerHTML = ''
      const fragment = document.createDocumentFragment()
      select.selects.forEach((item) => {
        const div = document.createElement('div')
        div.className = 'indicator'
        div.addEventListener('click', () => item.dispatchEvent(new Event(`${name}:select`, { bubbles: true })))
        fragment.appendChild(div)
      })
      track.appendChild(fragment)
    }
    container.addEventListener('pointerdown', (event) => {
      if (select.selects.length <= 1) return
      stopPlay()
      const x = event.pageX
      const width = container.offsetWidth
      const prev = select.selects[select.selectedIndex - 1]
      const next = select.selects[select.selectedIndex + 1]
      const move = (event: PointerEvent) => {
        container.style.transition = 'none'
        const left = Math.min(Math.max(event.pageX - x, width * -1), width)
        let translateX = left
        //first
        if (!prev && left > 0) translateX = left * 0.2
        if (next && left < 0) {
          console.log('next', translateX)
          next.style.transform = `scale(${Math.abs((Math.abs(left) / width) * 0.05) + 0.95})`
        }
        container.style.transform = `translateX(${translateX}px)`
      }
      document.addEventListener('pointermove', move)
      document.addEventListener('pointerup', () => {
        document.removeEventListener('pointermove', move)
        container.style.removeProperty('transition')
        play()
      }, { once: true })
    })
    return {
      expose: {
        get value() {
          return select.value
        },
        get options() {
          return select.selects
        },
        get selectedIndex() {
          return select.selectedIndex
        },
        togglePrev: () => {
        },
        toggleNext: () => {
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
  transform: scale(0.95);
  transition: transform .3s ease-out;
  background-repeat: round;
}
:host([selected=true]){
  transform: scale(1);
}
`

const itemTemplate = /*html*/`<slot></slot>`

export class CarouselItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: ['selected'],
  setup() {
    return {
      props: {
        selected: () => {
          if (!(this.parentNode instanceof Carousel)) return
          this.dispatchEvent(new Event(`${name}:update`, { bubbles: true }))
        }
      }
    }
  }
}) { }

Carousel.define(name)
CarouselItem.define(itemName)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
      [itemName]: Partial<typeof itemProps> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Carousel
    [itemName]: CarouselItem
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [itemName]: typeof itemProps
  }
}