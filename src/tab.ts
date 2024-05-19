import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'
import './ripple.js'

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

const name = 's-tab'
const props = {
  mode: 'scrollable' as 'scrollable' | 'fixed',
}

export class Tab extends builder({
  name, style, props, propSyncs: ['mode'],
  setup() {
    let container: HTMLDivElement
    let options: TabItem[] = []
    let selectedIndex = -1
    let timer = -1
    let changed = false
    const slotChange = (_: Event, el: HTMLSlotElement) => {
      options = el.assignedElements().filter((item) => item instanceof TabItem) as TabItem[]
      selectedIndex = -1
      let target: null | TabItem = null
      for (const item of options) {
        if (item.selected) target = item
      }
      if (target) update(target)
    }
    const update = (target: TabItem) => {
      if (!target.selected) return (selectedIndex = -1)
      selectedIndex = options.indexOf(target)
      clearTimeout(timer)
      timer = setTimeout(() => {
        let old: TabItem | null = null
        for (const item of options) {
          if (item === target) continue
          if (item.selected) {
            old = item
            item.removeAttribute('selected')
          }
        }
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
            old.indicator.setAttribute('style', `transition: transform .2s, width .2s;filter:opacity(1);transform:translateX(${rect.left - oldLeft}px);width: ${rect.width}px`)
          }
        }
      }, 0)
    }
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
      },
      render: () => html`
        <div class="container" ref="${(el: HTMLDivElement) => container = el}">
          <slot @slotchange="${slotChange}"></slot>
        </div>
      `
    }
  }
}) { }


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

const itemName = 's-tab-item'
const itemProps = {
  selected: false
}

export class TabItem extends builder({
  name: itemName,
  style: itemStyle,
  props: itemProps,
  propSyncs: true,
  setup() {
    let container: HTMLDivElement
    let indicator: HTMLDivElement
    const iconSlotChange = (_: Event, icon: HTMLSlotElement) => {
      const length = icon.assignedElements().length
      container.classList[length > 0 ? 'add' : 'remove']('icon')
    }
    this.addEventListener('click', () => {
      this.selected = true
      this.dispatchEvent(new Event('tab-item:change', { bubbles: true }))
    })
    return {
      expose: {
        get indicator() {
          return indicator
        }
      },
      watches: {
        selected: () => {
          this.dispatchEvent(new Event('tab-item:update', { bubbles: true }))
        },
      },
      render: () => html`
        <div class="container" ref="${(el: HTMLDivElement) => container = el}">
          <slot name="icon" @slotchange="${iconSlotChange}"></slot>
          <div class="text">
            <slot name="text"></slot>
            <div class="badge">
              <slot name="badge"></slot>
            </div>
          </div>
          <div class="indicator" ref="${(el: HTMLDivElement) => indicator = el}"></div>
        </div>
        <s-ripple attached="true"></s-ripple>
      `
    }
  }
}) { }

Tab.define()
TabItem.define()

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