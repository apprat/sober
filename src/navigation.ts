import { useElement } from './core/element.js'
import { Select } from './core/utils/select.js'
import { Theme } from './core/theme.js'
import './ripple.js'

type Props = {
  mode: 'bottom' | 'rail',
  value: string
}

const name = 's-navigation'
const props: Props = {
  mode: 'bottom',
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
  padding-bottom: env(safe-area-inset-bottom);
}
:host([mode=rail]){
  flex-direction: column;
  justify-content: flex-start;
  width: 80px;
  box-shadow: none;
  height: 100%;
  background: none;
  padding-bottom: 0;
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

class Navigation extends useElement({
  style, template, props, syncProps: true,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('#slot')!
    const select = new Select({ context: this, class: NavigationItem, slot })
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

type ItemProps = {
  selected: boolean,
  value: string
}

const itemName = 's-navigation-item'
const itemProps: ItemProps = {
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
  transition: color var(--s-motion-duration-short4, ${Theme.motionDurationMedium4}) var(--s-motion-easing-emphasized, ${Theme.motionEasingEmphasized});
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
  transition: background-color var(--s-motion-duration-short4, ${Theme.motionDurationMedium4}) var(--s-motion-easing-emphasized, ${Theme.motionEasingEmphasized});
}
:host([selected=true]) .icon{
  background: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
}
::slotted(*){
  flex-shrink: 0;
}
::slotted(svg){
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
  fill: currentColor;
  width: 24px;
  height: 24px;
}
:host([selected=true]) ::slotted(:is(svg, s-icon)){
  color: currentColor;
}
::slotted([slot=badge]){
  position: absolute;
  right: 4px;
  top: 0;
}
::slotted([slot=text]){
  margin-top: 4px;
}
`

const itemTemplate = /*html*/`
<s-ripple attached="true" class="icon" part="icon">
  <slot name="icon"></slot>
  <slot name="badge"></slot>
</s-ripple>
<slot name="text"></slot>
`

class NavigationItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: ['selected'],
  setup() {
    this.addEventListener('click', () => {
      if (this.selected) return
      if (!(this.parentNode instanceof Navigation)) return
      this.dispatchEvent(new Event(`${name}:select`, { bubbles: true }))
    })
    return {
      selected: () => {
        if (!(this.parentNode instanceof Navigation)) return
        this.dispatchEvent(new Event(`${name}:update`, { bubbles: true }))
      }
    }
  }
}) { }

Navigation.define(name)
NavigationItem.define(itemName)

export { Navigation, NavigationItem }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Navigation
    [itemName]: NavigationItem
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
        //@ts-ignore
        [itemName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<ItemProps>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      $props: HTMLAttributes & Partial<Props>
    }
    [itemName]: new () => {
      $props: HTMLAttributes & Partial<ItemProps>
    }
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
      //@ts-ignore
      [itemName]: IntrinsicElements['div'] & Partial<ItemProps>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
      //@ts-ignore
      [itemName]: JSX.HTMLAttributes<HTMLElement> & Partial<ItemProps>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
      //@ts-ignore
      [itemName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<ItemProps>
    }
  }
}