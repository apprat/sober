import { useElement } from './core/element.js'
import { Select } from './core/utils/select.js'
import { Theme } from './core/theme.js'
import './ripple.js'

const name = 's-navigation'
const props = {
  mode: 'bottom' as 'bottom' | 'rail',
  value: ''
}

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: var(--s-color-surface, ${Theme.colorSurface});
  box-shadow: var(--s-elevation-level2, ${Theme.elevationLevel2});
  position: relative;
  flex-shrink: 0;
  padding-bottom: env(safe-area-inset-bottom);
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

class SNavigation extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector('#slot') as HTMLSlotElement
    const select = new Select({ context: this, class: SNavigationItem, slot })
    return {
      expose: {
        get value() {
          return select.value
        },
        get options() {
          return select.list
        },
        get selectedIndex() {
          return select.selectedIndex
        }
      },
      value: (value) => select.value = value
    }
  }
}) { }

const itemName = 's-navigation-item'
const itemProps = {
  selected: false,
  value: ''
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
  transition: color .1s ease-out;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
:host([selected=true]){
  color: var(--s-color-primary, ${Theme.colorPrimary});
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
  transition: transform .1s ease-out;
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
}
:host([selected=true]) .icon::before{
  transform: scale(1);
}
.badge{
  position: absolute;
  top: 0;
  left: 50%;
  width: 24px;
  display: flex;
  justify-content: center;
  transform: translateY(-20%);
}
::slotted(svg[slot=icon]){
  width: 24px;
  height: 24px;
  fill: currentColor;
}
::slotted([slot=icon]){
  position: relative;
}
:host([selected=true]) ::slotted([slot=icon]){
  color: currentColor;
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
  <div class="badge" part="badge">
    <slot name="badge"></slot>
  </div>
</div>
<slot name="text"></slot>
<s-ripple attached="true" class="ripple" part="ripple"></s-ripple>
`

class SNavigationItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: ['selected'],
  setup() {
    this.addEventListener('click', () => {
      if (this.selected) return
      if (!(this.parentNode instanceof SNavigation)) return
      this.dispatchEvent(new Event(`${name}:select`, { bubbles: true }))
    })
    return {
      selected: () => {
        if (!(this.parentNode instanceof SNavigation)) return
        this.dispatchEvent(new Event(`${name}:update`, { bubbles: true }))
      }
    }
  }
}) { }

SNavigation.define(name)
SNavigationItem.define(itemName)

export { SNavigation as Navigation, SNavigationItem as NavigationItem }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SNavigation
    [itemName]: SNavigationItem
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
        //@ts-ignore
        [itemName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof itemProps>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [itemName]: typeof itemProps
  }
}


//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [itemName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof itemProps>
    }
  }
}