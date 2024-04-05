import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: block;
  height: 280px;
  background: var(--s-color-surface-container-low, #f3f3f6);
  border-radius: var(--s-shape-corner-small, 8px);
  position: relative;
  color: var(--s-color-primary, #006495);
  overflow: hidden;
}
.container{
  display: flex;
  justify-content: flex-start;
  height: 100%;
  transition: transform .2s;
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
  background: var(--s-color-surface, #fcfcff);
  opacity: .38;
  flex-shrink: 0;
  margin: 16px 4px;
  cursor: pointer;
  pointer-events: auto;
  transition: box-shadow .2s;
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
  cursor: pointer;
}
@media (pointer: fine){
  .dot>.item:hover{
    box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
  }
}
`

const name = 's-carousel'
const props = {
  duration: 4000
}

export default class Component extends builder({
  name, style, props,
  setup() {
    let container: HTMLDivElement
    let dot: HTMLDivElement
    let slot: HTMLSlotElement
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
    const slotchange = () => {
      dot.innerHTML = ''
      const elements = slot.assignedElements()
      const fragment = document.createDocumentFragment()
      for (const key in elements) {
        const div = document.createElement('div')
        const index = Number(key)
        div.className = index === 0 ? 'item checked' : 'item'
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
    }
    return {
      mounted: runTask,
      unmounted: () => clearInterval(timer),
      watches: {
        duration: runTask
      },
      render: () => html`
        <div class="container" ref="${(el: HTMLDivElement) => container = el}">
          <slot ref="${(el: HTMLSlotElement) => slot = el}" @slotchange="${slotchange}"></slot>
        </div>
        <div class="dot" ref="${(el: HTMLDivElement) => dot = el}"></div>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof Component
  }
}