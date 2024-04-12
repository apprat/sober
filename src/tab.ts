import { builder, html } from './core/element.js'
import Item from './tab-item.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  position: relative;
  background: var(--s-color-surface, #fcfcff);
  color: var(--s-color-on-surface-variant, #41474d);
}
:host::before{
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background: var(--s-color-surface-variant, #dee3ea);
  bottom: 0;
  left: 0;
}
.container{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  scrollbar-width: none;
  overflow-x: auto;
}
.container::-webkit-scrollbar{
  display: none;
}
:host([mode=fixed]) .container{
  overflow: hidden;
  width: 100%;
}
::slotted(s-tab-item){
  flex-shrink: 0;
  flex-basis: auto;
}
:host([mode=fixed]) ::slotted(s-tab-item){
  flex-basis: 100%;
  flex-shrink: 1;
}
`

const name = 's-tab'
const props = {
  mode: 'scrollable' as 'scrollable' | 'fixed',
}

export default class Component extends builder({
  name, style, props, propSyncs: ['mode'],
  setup() {
    let slot: HTMLSlotElement
    let container: HTMLDivElement
    let options: Item[] = []
    let selectIndex = -1
    let changing = false
    const slotChange = () => {
      options = slot.assignedElements().filter((item) => item instanceof Item) as Item[]
      selectIndex = options.findIndex((item) => item.checked)
    }
    this.addEventListener('tab-item:change', (event: Event) => {
      event.stopPropagation()
      if (changing) return
      changing = true
      if (!event.target) return
      const target = event.target as Item
      const old = options[selectIndex]
      selectIndex = -1
      options.forEach((item, index) => {
        if (item === target && target.checked) return selectIndex = index
        item.checked && (item.checked = false)
      })
      changing = false
      const select = options[selectIndex]
      if (this.isConnected && old && select) {
        select.indicator.setAttribute('style', 'transition:none;filter:opacity(0)')
        old.indicator.addEventListener('transitionend', () => {
          select.indicator.addEventListener('transitionend', () => old.indicator.setAttribute('style', 'visibility:hidden'), { once: true })
          select.indicator.removeAttribute('style')
        }, { once: true })
        const oldLeft = old.indicator.getBoundingClientRect().left
        const rect = select.indicator.getBoundingClientRect()
        old.indicator.setAttribute('style', `filter:opacity(1);transform:translateX(${rect.left - oldLeft}px);width: ${rect.width}px`)
        if (container.scrollWidth !== container.offsetWidth) {
          const left = select.offsetLeft - container.offsetWidth + container.offsetWidth / 2 + select.offsetWidth / 2
          container.scrollTo({ left, behavior: 'smooth' })
        }
      }
      this.dispatchEvent(new Event('change'))
    })
    return {
      expose: {
        get options() {
          return options
        },
        get selectIndex() {
          return selectIndex
        },
      },
      render: () => html`
        <div class="container" ref="${(el: HTMLDivElement) => container = el}">
          <slot ref="${(el: HTMLSlotElement) => slot = el}" @slotchange="${slotChange}"></slot>
        </div>
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