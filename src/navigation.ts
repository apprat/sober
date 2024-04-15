import { builder, html } from './core/element.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: var(--s-color-surface, #fcfcff);
  box-shadow: var(--s-elevation-level2, 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
  position: relative;
}
:host([mode=rail]){
  flex-direction: column;
  justify-content: flex-start;
  width: 80px;
  box-shadow: none;
  height: 100%;
  background: none;
}
::slotted(s-navigation-item){
  height: 64px;
}
:host([mode=rail]) ::slotted(s-navigation-item){
  height: 72px;
}
:host([mode=rail]) ::slotted(s-icon-button[slot=start]){
  width: 56px;
  height: 56px;
  margin: 16px 0 8px 0;
  border-radius: 12px;
}
:host([mode=rail]) ::slotted([slot=end]){
  flex-grow: 1;
}
`

const name = 's-navigation'
const props = {
  mode: 'bottom' as 'bottom' | 'rail'
}

export default class Navigation extends builder({
  name, style, props, propSyncs: true,
  setup() {
    let slot: HTMLSlotElement
    let options: NavigationItem[] = []
    let selectIndex = -1
    let changing = false
    const slotChange = () => {
      options = slot.assignedElements().filter((item) => item instanceof NavigationItem) as NavigationItem[]
      selectIndex = options.findIndex((item) => item.checked)
    }
    this.addEventListener('navigation-item:change', (event: Event) => {
      event.stopPropagation()
      if (changing) return
      changing = true
      if (!event.target) return
      const target = event.target as NavigationItem
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
        <slot name="start"></slot>
        <slot ref="${(el: HTMLSlotElement) => slot = el}" @slotchange="${slotChange}"></slot>
        <slot name="end"></slot>
      `
    }
  }
}) { }

const itemStyle = /*css*/`
:host{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  font-size: .75rem;
  font-weight: 500;
  box-sizing: border-box;
  width: 100%;
  max-width: 80px;
  text-transform: capitalize;
  color: var(--s-color-on-surface-variant, #41474d);
  transition: color .2s;
}
:host([checked=true]){
  color: var(--s-color-primary, #006495);
}
.icon{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  width: 48px;
  border-radius: 14px;
}
.icon::before{
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  left: 0;
  top: 0;
  transform: scale(0);
  transition: transform .2s;
  background: var(--s-color-secondary-container, #d4e4f6);
}
:host([checked=true]) .icon::before{
  transform: scale(1);
}
.badge{
  position: absolute;
  top: 8px;
  left: 50%;
  margin-left: 4px;
}
::slotted([slot=icon]){
  position: relative;
  pointer-events: none;
}
::slotted([slot=text]){
  position: relative;
  pointer-events: none;
  margin-top: 4px;
}
`

const itemName = 's-navigation-item'
const itemProps = {
  checked: false,
}

export class NavigationItem extends builder({
  name: itemName,
  style: itemStyle,
  props: itemProps,
  propSyncs: true,
  setup() {
    this.addEventListener('click', () => this.checked = true)
    return {
      watches: {
        checked: () => {
          if (!this.parentNode) return
          this.dispatchEvent(new Event('navigation-item:change', { bubbles: true }))
        },
      },
      render: () => html`
        <div class="icon">
          <slot name="icon"></slot>
        </div>
        <slot name="text"></slot>
        <div class="badge">
          <slot name="badge"></slot>
        </div>
        <s-ripple attached="true" class="ripple"></s-ripple>
      `
    }
  }
}) { }

Navigation.define()
NavigationItem.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
      [itemName]: Partial<typeof itemProps> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Navigation
    [itemName]: NavigationItem
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [itemName]: typeof itemProps
  }
}
