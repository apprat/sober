import { builder, html } from './core/element'
import Item from './navigation-bar-item'

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  overflow: hidden;
  background: var(--s-color-surface-container,#eff1f3);
}
`

const name = 's-navigation-bar'
const props = {
  select: 0
}

export default class Component extends builder({
  name, props, propSyncs: true,
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
      if (!event.target || !(event.target instanceof Item)) return
      const target = event.target
      selectIndex = -1
      options.forEach((item, index) => {
        if (item === target && target.checked) return selectIndex = index
        item.checked && (item.checked = false)
      })
      changing = false
      this.dispatchEvent(new Event('change'))
    })
    return {
      expose: {
        get options() {
          return options
        },
        get selectIndex() {
          return selectIndex
        }
      },
      render: () => html`
        <style>${style}</style>
        <slot @slotchange="${slotChange}"></slot>
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