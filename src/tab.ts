import { builder, html, ref } from './core/element.js'
import type Item from './tab-item.js'

const style = /*css*/`
:host{
  display: flex;
  color: var(--s-color-on-surface-variant,#40484c);
  background: var(--s-color-surface,#fbfcfe);
  justify-content: center;
  position: relative;
}
:host::before{
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background: var(--s-color-surface-variant,#dce4e9);
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
  background: var(--s-color-primary,#006783);
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
  mode: 'fixed' as 'fixed' | 'scrollable'
}

export default class Component extends builder({
  name, props, propSyncs: ['type', 'mode'],
  setup() {
    const indicator = ref<HTMLElement>()
    const container = ref<HTMLElement>()
    let options: Item[] = []
    let selectIndex = -1
    let changing = false
    const setIndicatorWidth = (value = '') => indicator.target.style.width = value
    const setIndicatorLeft = (value = '') => indicator.target.style.transform = value
    const update = (animated?: boolean) => {
      if (selectIndex === -1) return setIndicatorWidth()
      indicator.target.classList[animated ? 'add' : 'remove']('animation')
      if (this.mode === 'fixed') {
        setIndicatorWidth(`calc(100% / ${options.length})`)
        setIndicatorLeft(`translateX(${selectIndex * 100}%)`)
      }
      if (this.mode === 'scrollable') {
        const select = options[selectIndex]
        setIndicatorWidth(`${select.clientWidth}px`)
        setIndicatorLeft(`translateX(${select.offsetLeft - container.target.offsetLeft}px)`)
        select.scrollIntoView({ behavior: animated ? 'smooth' : 'auto', inline: 'center' })
      }
    }
    const slotChange = () => {
      options = Array.from(this.children) as Item[]
      selectIndex = options.findIndex((item) => item.checked)
      if (selectIndex !== -1) update()
    }
    this.addEventListener('item:change', (event: Event) => {
      event.stopPropagation()
      if (changing) return
      changing = true
      if (!event.target) return
      const target = event.target as Item
      selectIndex = -1
      options.forEach((item, index) => {
        if (item === target && target.checked) return selectIndex = index
        item.checked && (item.checked = false)
      })
      changing = false
      update(true)
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
        <div class="container" part="container" ref="${container}">
          <slot @slotchange="${slotChange}"></slot>
          <div part="indicator" ref="${indicator}" class="indicator">
            <div class="thumb"></div>
          </div>
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