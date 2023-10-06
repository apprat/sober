import { defineComponent } from './core/runtime'
import type TabItem from './tab-item'

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
  background: var(--s-color-primary,#6750A4);
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

const Component = defineComponent({
  name, props, propSyncs: ['type', 'mode'],
  setup() {
    const state: { select: number, items: TabItem[], selectItem?: TabItem } = { select: this.props.select, items: [] }
    const setIndicatorWidth = (value = '') => this.refs.indicator.style.width = value
    const setIndicatorLeft = (value = '') => this.refs.indicator.style.transform = value
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
      this.refs.indicator.classList[animated ? 'add' : 'remove']('animation')
      if (this.props.mode === 'fixed') {
        setIndicatorWidth(`calc(100% / ${state.items.length})`)
        setIndicatorLeft(`translateX(${state.select * 100}%)`)
      }
      if (this.props.mode === 'scrollable') {
        setIndicatorWidth(`${state.selectItem.clientWidth}px`)
        setIndicatorLeft(`translateX(${state.selectItem.offsetLeft - this.refs.container.offsetLeft}px)`)
        state.selectItem!.scrollIntoView({ behavior: animated ? 'smooth' : 'auto', inline: 'center' })
      }
    }
    const onTabChange = (event: Event) => {
      const target = event.target as unknown as TabItem
      const index = state.items.indexOf(target)
      if (index !== state.select) {
        state.select = index
        render(true)
        this.props.select = index
        this.host.dispatchEvent(new Event('change'))
      }
    }
    const onSlotChange = () => {
      const slot = this.refs.slot as HTMLSlotElement
      state.items = slot.assignedElements() as TabItem[]
      if (this.props.mode === 'fixed') render()
    }
    const obs = new ResizeObserver(() => render())
    return {
      watches: {
        select: () => {
          if (this.props.select === state.select) return
          state.select = this.props.select
          render(true)
        },
        mode: () => {
          if (this.props.mode === 'fixed') {
            obs.unobserve(this.refs.container)
            render()
          } else {
            obs.observe(this.refs.container)
          }
        }
      },
      render: () => <>
        <style>{style}</style>
        <div class="container" part="container" ref="container">
          <slot ref="slot" onSlotChange={onSlotChange} onClick={onTabChange}></slot>
          <div part="indicator" ref="indicator" class="indicator">
            <div class="thumb"></div>
          </div>
        </div>
      </>
    }
  }
})

export default class extends Component { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}