import { defineComponent, IntrinsicElement } from './core/runtime'
import type TabItem from './tab-item'

const style = /*css*/`
:host{
  display: flex;
  color: var(--s-color-on-surface-variant,#49454E);
  background: var(--s-color-surface,#FEF7FF);
  justify-content: center;
  background: #eee;
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
  background: var(--s-color-primary,#6750A4);
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

/**
 * @slot anonymous
 * @event change
 */
const Component = defineComponent({
  name, props,
  setup() {
    const state: { items: TabItem[], selectItem?: TabItem, animated: boolean } = { items: [], animated: true }
    const setIndicatorWidth = (value: string) => this.refs.indicator.style.width = value
    const setIndicatorLeft = (value: string) => this.refs.indicator.style.transform = value
    const fixed = 'fixed'

    // const renderFixed = () => {
    //   const width = !state.selectItem ? 0 : state.items.length
    //   if (!state.animated) this.refs.indicator.classList.remove('animation')
    //   setIndicatorWidth(`calc(100% / ${width})`)
    //   setIndicatorLeft(`translateX(${this.props.select * 100}%)`)
    //   if (!state.animated) this.refs.indicator.classList.add('animation')
    // }
    // const renderScrollable = () => {
    //   if (!state.selectItem) return
    //   setIndicatorWidth(`${state.selectItem.clientWidth}px`)
    //   setIndicatorLeft(`translateX(${state.selectItem.offsetLeft - this.refs.container.offsetLeft}px)`)
    //   state.selectItem!.scrollIntoView({ behavior: state.animated ? 'auto' : 'smooth', inline: 'center' })
    // }
    // const renderSelect = () => {
    //   state.selectItem = state.items[this.props.select]
    //   if (!state.selectItem) return
    //   if (!state.selectItem.checked) state.selectItem.checked = true
    //   state.items.forEach((value) => {
    //     if (value === state.selectItem || !value.checked) return
    //     value.checked = false
    //   })
    //   console.log('渲染select', this.host)
    // } 
    const render = () => {
      const old = state.selectItem
      state.selectItem = state.items[this.props.select]
      if (!state.selectItem) {
        setIndicatorWidth('0')
        if (old) old.checked = false
        return
      }
      console.log('渲染', state.selectItem)
      if (!state.selectItem.checked) state.selectItem.checked = true
      state.items.forEach((value) => {
        if (value === state.selectItem || !value.checked) return
        value.checked = false
      })
    }
    const onTabChange = (event: Event) => {
      const target = event.target as unknown as TabItem
      const index = state.items.indexOf(target)
      if (index !== this.props.select) {
        this.props.select = index
        this.host.dispatchEvent(new Event('change'))
      }
    }
    const onSlotChange = () => {
      const slot = this.refs.slot as HTMLSlotElement
      state.items = slot.assignedElements() as TabItem[]
      state.animated = false
      render()
      state.animated = true
    }
    const obs = new ResizeObserver(() => console.log('监听', this.host))
    return {
      watches: {
        select: render,
        mode: () => {
          if (this.props.mode === fixed) {
            obs.unobserve(this.refs.container)
          } else {
            obs.observe(this.refs.container)
          }
        }
      },
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

export default Component

type Component = InstanceType<typeof Component>

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
  interface Document {
    createElement(tagName: typeof name, options?: ElementCreationOptions): Component
    getElementsByTagName(qualifiedName: typeof name): HTMLCollectionOf<Component>
  }
}

const x = {
  color: '#009688'
}