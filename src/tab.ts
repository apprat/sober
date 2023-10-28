import { defineElement, html, ref } from './core/element'
import type Item from './tab-item'

const style = /*css*/`
:host{
  display: flex;
  color: var(--s-color-on-surface-variant);
  background: var(--s-color-surface);
  justify-content: center;
  position: relative;
}
:host::before{
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background: var(--s-color-surface-variant);
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
.indicator{
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.indicator.animation{
  transition: transform .2s,width .2s;
}
.thumb{
  width: calc(100% - 24px);
  height: 100%;
  max-width: 40px;
  height: 3px;
  background: var(--s-color-primary);
  border-radius: 3px 3px 0 0;
}
:host([mode=scrollable]) .thumb{
  max-width: none;
}
:host([type=secondary]) .thumb{
  width: 100%;
  max-width: 100%;
  border-radius: 0;
  height: 2px;
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
  type: 'primary' as 'primary' | 'secondary',
  mode: 'fixed' as 'fixed' | 'scrollable',
  select: 0
}

export default class Component extends defineElement({
  name, props, propSyncs: ['type', 'mode'],
  setup() {
    const indicator = ref<HTMLElement>()
    const container = ref<HTMLElement>()
    const slot = ref<HTMLSlotElement>()
    const state: { select: number, items: Item[], selectItem?: Item } = { select: this.select, items: [] }
    const setIndicatorWidth = (value = '') => indicator.target.style.width = value
    const setIndicatorLeft = (value = '') => indicator.target.style.transform = value
    const render = (animated?: boolean) => {
      const old = state.selectItem
      state.selectItem = state.items[state.select]
      if (!state.selectItem) {
        if (old) {
          setIndicatorWidth()
          old.checked = false
        }
        return
      }
      if (!state.selectItem.checked) state.selectItem.checked = true
      state.items.forEach((value) => {
        if (value === state.selectItem || !value.checked) return
        value.checked = false
      })
      indicator.target.classList[animated ? 'add' : 'remove']('animation')
      if (this.mode === 'fixed') {
        setIndicatorWidth(`calc(100% / ${state.items.length})`)
        setIndicatorLeft(`translateX(${state.select * 100}%)`)
      }
      if (this.mode === 'scrollable') {
        setIndicatorWidth(`${state.selectItem.clientWidth}px`)
        setIndicatorLeft(`translateX(${state.selectItem.offsetLeft - container.target.offsetLeft}px)`)
        state.selectItem!.scrollIntoView({ behavior: animated ? 'smooth' : 'auto', inline: 'center' })
      }
    }
    const onTabChange = (event: Event) => {
      const target = event.target as unknown as Item
      const index = state.items.indexOf(target)
      if (index !== state.select) {
        state.select = index
        render(true)
        this.select = index
        this.dispatchEvent(new Event('change'))
      }
    }
    const onSlotChange = () => {
      state.items = slot.target.assignedElements() as Item[]
      if (this.mode === 'fixed') render()
    }
    const obs = new ResizeObserver(() => render())
    return {
      watches: {
        select: () => {
          if (this.select === state.select) return
          state.select = this.select
          render(true)
        },
        mode: () => {
          if (this.mode === 'fixed') {
            obs.unobserve(container.target)
            render()
          } else {
            obs.observe(container.target)
          }
        }
      },
      render: () => html`
        <style>${style}</style>
        <div class="container" part="container" ref="${container}">
          <slot ref="${slot}" @slotchange="${onSlotChange}" @click="${onTabChange}"></slot>
          <div part="indicator" ref="${indicator}" class="indicator">
            <div class="thumb"></div>
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