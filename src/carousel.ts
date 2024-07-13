import { useElement, JSXAttributes } from './core/element.js'

const name = 's-carousel'
const props = {
  duration: 4000
}

const style = /*css*/`
:host{
  display: block;
  height: 280px;
  background: var(--s-color-surface-container-low, #f6f2f7);
  border-radius: 8px;
  position: relative;
  color: var(--s-color-primary, #5256a9);
  overflow: hidden;
  max-width: 480px;
}
.container{
  display: flex;
  justify-content: flex-start;
  height: 100%;
  transition: transform .24s;
}
.dot{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.dot>.item{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--s-color-secondary-container, #e2e0f9);
  flex-shrink: 0;
  margin: 16px 4px;
  cursor: pointer;
  pointer-events: auto;
}
.dot>.checked{
  background: currentColor;
  opacity: 1;
}
::slotted(*){
  display: block;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`

const template = /*html*/`
<div class="container" part="container">
  <slot></slot>
</div>
<div class="dot" part="dot-container"></div>
`

export class Carousel extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const dot = shadowRoot.querySelector('.dot') as HTMLDivElement
    const slot = shadowRoot.querySelector('slot') as HTMLSlotElement
    let selectIndex = 0
    let selectLength = 0
    let timer = 0
    const setDot = () => {
      container.style.transform = `translateX(-${selectIndex * 100}%)`
      dot.querySelector('.checked')?.classList.remove('checked')
      dot.children[selectIndex]?.classList.add('checked')
    }
    const runTask = () => {
      clearInterval(timer)
      setDot()
      if (selectLength === 0) return
      timer = setInterval(() => {
        const next = selectIndex + 1
        selectIndex = next === selectLength ? 0 : next
        setDot()
      }, this.duration)
    }
    slot.addEventListener('slotchange', () => {
      dot.innerHTML = ''
      const elements = slot.assignedElements()
      const fragment = document.createDocumentFragment()
      for (const key in elements) {
        const div = document.createElement('div')
        const index = Number(key)
        div.className = index === 0 ? 'item checked' : 'item'
        div.setAttribute('part', 'dot')
        div.addEventListener('click', () => {
          selectIndex = index
          runTask()
        })
        fragment.appendChild(div)
      }
      selectLength = elements.length
      dot.appendChild(fragment)
      selectIndex = 0
      runTask()
    })
    return {
      mounted: runTask,
      unmounted: () => clearInterval(timer),
      watches: {
        duration: runTask
      }
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