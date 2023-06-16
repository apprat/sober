import { defineElement, IntrinsicElement, css } from './base/core'
import type TabItem from './tab-item'

type TabItem = InstanceType<typeof TabItem.Element>

const style = css`
:host{
  display: flex;
  color: var(--s-color-on-surface-variant);
  background: var(--s-color-surface);
  justify-content: center;
}
.container{
  display: flex;
  justify-content: flex-start;
  position: relative;
  width: 100%;
}
.container::-webkit-scrollbar{
  display: none;
}
.indicator{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
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
  background: var(--s-color-primary);
  border-radius: 3px 3px 0 0;
}
::slotted(*){
  flex-basis: 100%;
}
:host([mode=scrollable]) .container{
  overflow-x: scroll;
  width: auto;
  scrollbar-width: none;
}
:host([mode=scrollable]) .thumb{
  max-width: none;
}
:host([mode=scrollable]) ::slotted(*){
  flex-shrink: 0;
  flex-basis: auto;
}
`

const name = 's-tab'
const props = {
  mode: 'fixed' as 'fixed' | 'scrollable',
  select: 0
}

export default defineElement({
  name, props,
  setup() {
    const state: { items: TabItem[], item?: TabItem, disableAnimation: boolean } = { items: [], disableAnimation: true }
    const setIndicatorWidth = (value: string) => this.refs.indicator.style.width = value
    const setIndicatorLeft = (value: string) => this.refs.indicator.style.transform = value
    const update = () => {
      if (!this.host.isConnected) return
      state.item = state.items[this.props.select]
      if (!state.item) return
      if (state.item) state.item.checked = true
      state.items.forEach((value) => {
        if (value === state.item || !value.checked) return
        value.checked = false
      })
      this.refs.indicator.classList[state.disableAnimation ? 'remove' : 'add']('animation')
      if (this.props.mode === 'fixed') {
        setIndicatorWidth(`calc(100% / ${state.items.length})`)
        setIndicatorLeft(`translateX(${this.props.select * 100}%)`)
      }
      if (this.props.mode === 'scrollable') {
        setIndicatorWidth(`${state.item.clientWidth}px`)
        setIndicatorLeft(`translateX(${state.item.offsetLeft - this.refs.container.offsetLeft}px)`)
        state.item.scrollIntoView({ behavior: state.disableAnimation ? 'auto' : 'smooth', inline: 'center' })
      }
      if (state.disableAnimation) this.refs.indicator.classList.add('animation')
    }
    const onTabChange = (event: Event) => {
      const target = event.target as unknown as TabItem
      this.props.select = state.items.indexOf(target)
    }
    const onSlotChange = () => {
      const slot = this.refs.slot as HTMLSlotElement
      state.items = slot.assignedElements() as TabItem[]
      state.disableAnimation = true
      update()
      state.disableAnimation = false
    }
    return {
      changed: update,
      render: () => <>
        <style>{style}</style>
        <div class="container" part="container" ref="container">
          <slot ref="slot" onSlotChange={onSlotChange} onClick={onTabChange}></slot>
          <div part="indicator" ref="indicator" class="indicator animation">
            <div class="thumb"></div>
          </div>
        </div>
      </>
    }
  }
})

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}