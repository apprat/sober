import { useElement, JSXAttributes } from './core/element.js'
import './ripple.js'

const name = 's-navigation'
const props = {
  mode: 'bottom' as 'bottom' | 'rail'
}

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

const template = /*html*/`
<slot name="start"></slot>
<slot id="slot"></slot>
<slot name="end"></slot>
`

export class Navigation extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector('#slot') as HTMLSlotElement
    let options: NavigationItem[] = []
    let selectedIndex = -1
    let changed = false
    const update = (target: NavigationItem) => {
      if (options.length === 0 || !target.selected) return (selectedIndex = -1)
      for (const item of options) {
        if (item === target) continue
        if (item.selected) {
          item.removeAttribute('selected')
        }
      }
      selectedIndex = options.indexOf(target)
      if (changed) {
        this.dispatchEvent(new Event('change'))
        changed = false
      }
    }
    slot.addEventListener('slotchange', () => {
      let target: null | NavigationItem = null
      selectedIndex = -1
      options = slot.assignedElements().filter((item) => {
        if (item instanceof NavigationItem) {
          if (item.selected) target = item
          return true
        }
      }) as NavigationItem[]
      if (target) update(target)
    })
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
      }
    }
  }
}) { }

const itemName = 's-navigation-item'
const itemProps = {
  selected: false,
}

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
  transition: color .12s;
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
  transition: transform .12s;
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

const itemTemplate = /*html*/`
<div class="icon" part="icon">
  <slot name="icon"></slot>
</div>
<slot name="text"></slot>
<div class="badge" part="badge">
  <slot name="badge"></slot>
</div>
<s-ripple attached="true" class="ripple" part="ripple"></s-ripple>
`

export class NavigationItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: true,
  setup() {
    this.addEventListener('click', () => {
      if (this.selected) return
      if (this.parentNode instanceof Navigation) {
        this.dispatchEvent(new Event('navigation-item:change', { bubbles: true }))
      }
      this.selected = true
    })
    return {
      watches: {
        selected: () => {
          if (!(this.parentNode instanceof Navigation)) return
          this.dispatchEvent(new Event('navigation-item:update', { bubbles: true }))
        }
      }
    }
  }
}) { }

Navigation.define(name)
NavigationItem.define(itemName)

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
