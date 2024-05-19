import { builder, html } from './core/element.js'
import './ripple.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: var(--s-color-surface, #fffbff);
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

export class Navigation extends builder({
  name, style, props, propSyncs: true,
  setup() {
    let options: NavigationItem[] = []
    let selectedIndex = -1
    let timer = -1
    let changed = false
    const slotChange = (_: Event, el: HTMLSlotElement) => {
      options = el.assignedElements().filter((item) => item instanceof NavigationItem) as NavigationItem[]
      selectedIndex = -1
      let target: null | NavigationItem = null
      for (const item of options) {
        if (item.selected) target = item
      }
      if (target) update(target)
    }
    const update = (target: NavigationItem) => {
      if (!target.selected) return (selectedIndex = -1)
      selectedIndex = options.indexOf(target)
      clearTimeout(timer)
      timer = setTimeout(() => {
        options.forEach((item) => {
          if (item === target) return
          if (item.selected) item.removeAttribute('selected')
        })
        if (changed) {
          this.dispatchEvent(new Event('change'))
          changed = false
        }
      }, 0)
    }
    this.addEventListener('navigation-item:update', (event: Event) => {
      event.stopPropagation()
      update(event.target as NavigationItem)
    })
    this.addEventListener('navigation-item:change', (event: Event) => {
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
        }
      },
      render: () => html`
        <slot name="start"></slot>
        <slot @slotchange="${slotChange}"></slot>
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
  color: var(--s-color-on-surface-variant, #46464f);
  transition: color .2s;
}
:host([selected=true]){
  color: var(--s-color-primary, #5256a9);
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
  background: var(--s-color-secondary-container, #e2e0f9);
}
:host([selected=true]) .icon::before{
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
  color: inherit;
}
::slotted([slot=text]){
  position: relative;
  pointer-events: none;
  margin-top: 4px;
}
`

const itemName = 's-navigation-item'
const itemProps = {
  selected: false,
}

export class NavigationItem extends builder({
  name: itemName,
  style: itemStyle,
  props: itemProps,
  propSyncs: true,
  setup() {
    this.addEventListener('click', () => {
      this.selected = true
      this.dispatchEvent(new Event('navigation-item:change', { bubbles: true }))
    })
    return {
      watches: {
        selected: () => {
          this.dispatchEvent(new Event('navigation-item:update', { bubbles: true }))
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
