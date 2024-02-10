import { builder, html } from './core/element.js'
import type Item from './tab-item.js'

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  position: relative;
  background: var(--s-color-surface,#fef7ff);
  color: var(--s-color-on-surface-variant,#49454f);
}
:host::before{
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background: var(--s-color-surface-variant,#49454f);
  bottom: 0;
  left: 0;
}
.container{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  scrollbar-width: none;
}
:host([mode=scrollable]) .container{
  overflow-x: scroll;
  width: auto;
  scrollbar-width: none;
}
.container::-webkit-scrollbar{
  display: none;
}
::slotted(*){
  flex-basis: 100%;
}
:host([mode=scrollable]) ::slotted(*){
  flex-shrink: 0;
  flex-basis: auto;
}
`

const name = 's-tab'
const props = {
  mode: 'fixed' as 'fixed' | 'scrollable',
}

export default class Component extends builder({
  name, style, props, propSyncs: ['mode'],
  setup() {
    let options: Item[] = []
    let selectIndex = -1
    let changing = false
    const slotChange = () => {
      options = Array.from(this.children) as Item[]
      selectIndex = options.findIndex((item) => item.checked)
    }
    this.addEventListener('item:change', (event: Event) => {
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
        select.scrollIntoView({ behavior: 'smooth', inline: 'center' })
      }
      this.isConnected && this.dispatchEvent(new Event('change'))
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
        <div class="container">
          <slot @slotchange="${slotChange}"></slot>
        </div>
      `
    }
  }
}) { }

Component.define()

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