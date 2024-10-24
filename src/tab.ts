import { useElement, JSXAttributes } from './core/element.js'
import { Theme } from './page.js'
import Select from './core/select.js'
import './ripple.js'

const name = 's-tab'
const props = {
  mode: 'scrollable' as 'scrollable' | 'fixed',
  value: ''
}

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  background: var(--s-color-surface, ${Theme.colorSurface});
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
:host::before{
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background: var(--s-color-surface-variant, ${Theme.colorSurfaceVariant});
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
    const select = new Select({ context: this, selectClass: TabItem, slot })
    let old: TabItem | undefined
    select.onUpdate = () => {
      if (!this.isConnected || !select.select) {
        old = undefined
        return
      }
      if (container.scrollWidth !== container.offsetWidth) {
        const left = (select.select.offsetLeft - container.offsetLeft) - (container.offsetWidth / 2) + (select.select.offsetWidth / 2)
        container.scrollTo({ left, behavior: 'smooth' })
      }
      if (old) {
        const oldRect = old.indicator.getBoundingClientRect()
        const rect = select.select.indicator.getBoundingClientRect()
        const options = { duration: 200, easing: 'ease-out' }
        select.select.indicator.animate([{ opacity: 0 }, { opacity: 0 }], options)
        old.indicator.animate([{ filter: 'opacity(1)', transform: `translateX(0)`, }, { filter: 'opacity(1)', transform: `translateX(${rect.left - oldRect.left}px)`, width: `${rect.width}px` }], options)
      }
      if (select.select) old = select.select
    }
    return {
      expose: {
        get value() {
          return select.value
        },
        get options() {
          return select.selects
        },
        get selectedIndex() {
          return select.selectedIndex
        },
      },
      props: {
        value: (value) => select.value = value
      }
    }
  }
}) { }

const itemName = 's-tab-item'
const itemProps = {
  selected: false,
  value: ''
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
  color: var(--s-color-primary, ${Theme.colorPrimary});
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
  background: var(--s-color-primary, ${Theme.colorPrimary});
  border-radius: 1.5px 1.5px 0 0;
  filter: opacity(0);
}
:host([selected=true]) .indicator{
  filter: opacity(1);
}
.text{
  display: flex;
  align-items: center;
  line-height: 1;
}
.badge{
  display: flex;
  align-items: center;
}
.icon .badge{
  position: absolute;
  top: 8px;
  left: 50%;
  width: 50%;
  justify-content: center;
  margin-left: 0;
}
::slotted([slot=icon]){
  width: 24px;
  height: 24px;
  color: currentColor;
  fill: currentColor;
  margin: 10px 0;
}
::slotted([slot=text]){
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
}
.icon ::slotted([slot=text]){
  margin-top: -6px;
  height: 26px;
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
  syncProps: ['selected'],
  setup(shadowRoot) {
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const indicator = shadowRoot.querySelector('.indicator') as HTMLDivElement
    const iconSlot = shadowRoot.querySelector('[name=icon]') as HTMLSlotElement
    iconSlot.addEventListener('slotchange', () => {
      const length = iconSlot.assignedElements().length
      container.classList[length > 0 ? 'add' : 'remove']('icon')
    })
    this.addEventListener('click', () => {
      if (!(this.parentNode instanceof Tab) || this.selected) return
      this.dispatchEvent(new Event(`${name}:select`, { bubbles: true }))
    })
    return {
      expose: { indicator },
      props: {
        selected: () => {
          if (!(this.parentNode instanceof Tab)) return
          this.dispatchEvent(new Event(`${name}:update`, { bubbles: true }))
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