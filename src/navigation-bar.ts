import { defineElement, html, ref } from './core/element'
import type NavigationBarItem from './navigation-bar-item'

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  overflow: hidden;
  background: var(--s-color-surface-container);
}
`

const name = 's-navigation-bar'
const props = {
  select: 0
}

export default class Component extends defineElement({
  name, props, propSyncs: true,
  setup() {
    const slot = ref<HTMLSlotElement>()
    const state: { items: NavigationBarItem[], selectItem?: NavigationBarItem } = { items: [] }
    const render = () => {
      const old = state.selectItem
      state.selectItem = state.items[this.select]
      if (!state.selectItem) {
        if (old) old.checked = false
        return
      }
      if (!state.selectItem.checked) state.selectItem.checked = true
      state.items.forEach((value) => {
        if (value === state.selectItem || !value.checked) return
        value.checked = false
      })
    }
    const onChange = (event: Event) => {
      const target = event.target as unknown as NavigationBarItem
      const index = state.items.indexOf(target)
      if (index !== this.select) {
        this.select = index
        this.dispatchEvent(new Event('change'))
      }
    }
    const onSlotChange = () => {
      state.items = slot.target.assignedElements() as NavigationBarItem[]
      render()
    }
    return {
      watches: {
        select: render
      },
      render: () => html`
        <style>${style}</style>
        <slot ref="${slot}" @click="${onChange}" @slotchange="${onSlotChange}"></slot>
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