import { useElement, JSXAttributes } from './core/element.js'
import './ripple.js'

const name = 's-tab'
const props = {
  mode: 'scrollable' as 'scrollable' | 'fixed',
}

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  position: relative;
  background: var(--s-color-surface, #fffbff);
  color: var(--s-color-on-surface-variant, #46464f);
}
:host::before{
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background: var(--s-color-surface-variant, #e4e1ec);
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

const template = /*html*/`
<div class="container" part="container">
  <slot></slot>
</div>
`

export class Tab extends useElement({
  style, template, props, syncProps: ['mode'],
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector('slot') as HTMLSlotElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    let options: TabItem[] = []
    let selectedIndex = -1
    let changed = false

    const update = (target: TabItem) => {
      if (options.length === 0 || !target.selected) return (selectedIndex = -1)
      let old: TabItem | null = null
      for (const item of options) {
        if (item === target) continue
        if (item.selected) {
          old = item
          item.removeAttribute('selected')
        }
      }
      selectedIndex = options.indexOf(target)
      if (changed) {
        this.dispatchEvent(new Event('change'))
        changed = false
      }
      if (this.isConnected) {
        if (container.scrollWidth !== container.offsetWidth) {
          const left = target.offsetLeft - container.offsetWidth + container.offsetWidth / 2 + target.offsetWidth / 2
          container.scrollTo({ left, behavior: 'smooth' })
        }
        if (old) {

          old.indicator.addEventListener('transitionend', () => {
            old?.indicator.removeAttribute('style')
            target.indicator.removeAttribute('style')
          }, { once: true })
          const oldLeft = old.indicator.getBoundingClientRect().left
          const rect = target.indicator.getBoundingClientRect()
          target.indicator.setAttribute('style', 'transition:none;filter:opacity(0)')
          old.indicator.setAttribute('style', `transition: transform .12s, width .12s;filter:opacity(1);transform:translateX(${rect.left - oldLeft}px);width: ${rect.width}px`)
        }
      }
    }
    slot.addEventListener('slotchange', () => {
      let target: null | TabItem = null
      selectedIndex = -1
      options = slot.assignedElements().filter((item) => {
        if (item instanceof TabItem) {
          if (item.selected) target = item
          return true
        }
      }) as TabItem[]
      if (target) update(target)
    })
    this.addEventListener('tab-item:update', (event: Event) => {
      event.stopPropagation()
      update(event.target as TabItem)
    })
    this.addEventListener('tab-item:change', (event: Event) => {
      event.stopPropagation()
      changed = true
    })
    return {
      expose: {
        get options() {
          return options
        },
        get selectedIndex() {
          return selectedIndex
        },
      }
    }
  }
}) { }

const itemName = 's-tab-item'
const itemProps = {
  selected: false
}

const itemStyle = /*css*/`
:host{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  position: relative;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 500;
  text-transform: capitalize;
  padding: 0 16px;
}
:host([selected=true]){
  color: var(--s-color-primary, #5256a9);
}
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  min-height: inherit;
}
.indicator{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background: var(--s-color-primary, #5256a9);
  border-radius: 1.5px 1.5px 0 0;
  filter: opacity(0);
}
:host([selected=true]) .indicator{
  filter: opacity(1);
}
.text{
  display: flex;
  align-items: center;
}
.icon .badge{
  position: absolute;
  top: 8px;
  left: 50%;
}
::slotted([slot=icon]){
  height: 42px;
  color: inherit;
}
::slotted([slot=text]){
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
}
.icon ::slotted([slot=text]){
  height: 26px;
  margin-top: -4px;
}
::slotted([slot=badge]){
  margin-left: 4px;
}
`

const itemTemplate = /*html*/`
<div class="container" part="container">
  <slot name="icon"></slot>
  <div class="text" part="text">
    <slot name="text"></slot>
    <div class="badge" part="badge">
      <slot name="badge"></slot>
    </div>
  </div>
  <div class="indicator" part="indicator"></div>
</div>
<s-ripple attached="true" part="ripple"></s-ripple>
`

export class TabItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: true,
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const indicator = shadowRoot.querySelector('.indicator') as HTMLDivElement
    const iconSlot = shadowRoot.querySelector('[name=icon]') as HTMLSlotElement
    const iconSlotChange = () => {
      const length = iconSlot.assignedElements().length
      container.classList[length > 0 ? 'add' : 'remove']('icon')
    }
    iconSlot.addEventListener('slotchange', iconSlotChange)
    this.addEventListener('click', () => {
      if (this.selected) return
      if (this.parentNode instanceof Tab) {
        this.dispatchEvent(new Event('tab-item:change', { bubbles: true }))
      }
      this.selected = true
    })
    return {
      expose: {
        get indicator() {
          return indicator
        }
      },
      watches: {
        selected: () => {
          if (!(this.parentNode instanceof Tab)) return
          this.dispatchEvent(new Event('tab-item:update', { bubbles: true }))
        },
      }
    }
  }
}) { }

Tab.define(name)
TabItem.define(itemName)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
      [itemName]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Tab
    [itemName]: TabItem
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [itemName]: typeof itemProps
  }
}