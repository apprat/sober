import { useProps, useElement } from '../core/elements.js'
import { Selector } from '../core/utils/selector.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  $name: '',
  $value: '',
  $defaultValue: '',
  multiple: false,
  media: '',
  itemsOrientation: ['auto', 'horizontal', 'vertical'],
})
const itemProps = useProps({
  $value: '',
  selected: false,
})

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  gap: 6px;
  height: 64px;
  overflow: hidden;
  background: ${scheme.color.surfaceContainer};
  color: ${scheme.color.onSurfaceVariant};
}
:host([itemsOrientation=vertical]){
  --s_item-font-size: 12px;
  --s_item-layout-flex-direction: column;
  --s_item-layout-gap: 2px;
  --s_item-indicator-inset: auto;
  --s_item-indicator-height: 32px;
  --s_item-indicator-width: 56px;
}
@media (orientation: portrait){
  :host(:not([itemsOrientation])){
    --s_item-font-size: 12px;
    --s_item-layout-flex-direction: column;
    --s_item-layout-gap: 2px;
    --s_item-indicator-inset: auto;
    --s_item-indicator-height: 32px;
    --s_item-indicator-width: 56px;
  }
}
`

const itemStyle = /*css*/`
:host{
  display: block;
  cursor: pointer;
  height: 100%;
  min-width: 56px;
  white-space: nowrap;
  
  color: ${scheme.color.onSurfaceVariant};
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.layout{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  gap: 8px;
  padding: 0 16px;
  &.has-icon{
    .ripple{
      .icon{
        display: flex;
        position: relative;
      }
      ::slotted(s-badge){
        position: absolute;
        top: 2px;
        right: 2px;
        transform: translate(50%, -50%);
      }
    }
  }
  &.has-icon.has-text{
    flex-direction: var(--s_item-layout-flex-direction, row);
    gap: var(--s_item-layout-gap, 8px);
    padding: var(--s_item-layout-padding, 0 16px);
    .ripple{
      display: flex;
      height: var(--s_item-indicator-height, 100%);
      &::part(container),
      &::before,
      &::after {
        inset: var(--s_item-indicator-inset, auto 0);
        border-radius: calc(var(--s_item-indicator-height, 40px) / 2);
        width: var(--s_item-indicator-width, 100%);
        height: var(--s_item-indicator-height, 40px);
      }
    }
    ::slotted([slot=text]){
      font-size: calc(var(--s-font-size, 1) * var(--s_item-font-size, 14px));
    }
  }
  .ripple{
    display: contents;
    position: static;
    justify-content: center;
    align-items: center;
    overflow: visible;
    &::part(container),
    &::before,
    &::after{
      content: '';
      position: absolute;
      overflow: hidden;
      inset: auto 0;
      border-radius: 20px;
      width: 100%;
      height: 40px;
    }
    &::after{
      background: currentColor;
      filter: opacity(.1);
      opacity: 0;
    }
    &::before{
      opacity: 0;
      transform: scaleX(.5);
      transition-property: transform, opacity;
      transition-duration: inherit;
      background: ${scheme.color.secondaryContainer};
    }
    .icon{
      display: contents;
    }
  }
}
::slotted([slot=icon]){
  width: 24px;
  height: 24px;
  color: currentColor;
  fill: currentColor;
  position: relative;
}
::slotted([slot=text]){
  position: relative;
  line-height: 1;
  font-weight: 500;
  font-size: calc(var(--s-font-size, 1) * 14px);
}
::slotted(s-badge){
  position: relative;
  order: 1;
}
:host(:focus-visible){
  outline: none;
  .ripple::after{
    opacity: 1;
  }
}
:host([selected]){
  .ripple::before{
    opacity: 1;
    transform: scaleX(1);
  }
}
`

const template = /*html*/`
<slot></slot>
`

const itemTemplate = /*html*/`
<div class="layout" part="layout">
  <s-ripple class="ripple" part="ripple" ancestorLevel="1">
    <div class="icon">
      <slot name="icon"></slot>
      <slot></slot>
    </div>
  </s-ripple>
  <slot name="text"></slot>
</div>
`

const x = {
  media: matchMedia('(prefers-color-scheme: dark)'),
  style: ''
}

export class NavigationBar extends useElement({
  style, props, template,
  states: ['formAssociated'],
  setup(shadowRoot, info) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const selector = new Selector(this, slot, NavigationBarItem)
    selector.onValueChange = () => info.internals.setFormValue(selector.getFormData())
    return {
      expose: {
        get items() {
          return selector.items
        },
        get selectedItems() {
          return selector.selectedItems
        },
        get selectedIndex() {
          return selector.selectedIndex
        },
        get selectedIndexes() {
          return selector.selectedIndexes
        },
        get value() {
          return selector.value
        }
      },
      onFormReset: () => this.value = this.defaultValue,
      value: (v) => selector.value = v
    }
  }
}) { }

export class NavigationBarItem extends useElement({
  style: itemStyle,
  props: itemProps,
  template: itemTemplate,
  states: ['keydown-focused'],
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const iconSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=icon]')!
    const textSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=text]')!
    iconSlot.addEventListener('slotchange', () => layout.classList.toggle('has-icon', iconSlot.assignedElements().length > 0))
    textSlot.addEventListener('slotchange', () => layout.classList.toggle('has-text', textSlot.assignedElements().length > 0))
    this.addEventListener('click', () => this.dispatchEvent(new Event(`${name}:toggle`, { bubbles: true })))
    return {
      selected: () => this.dispatchEvent(new Event(`${name}:selected`, { bubbles: true })),
      value: (_, old) => this.dispatchEvent(new CustomEvent(`${name}:valued`, { bubbles: true, detail: { old } })),
      disabled: () => this.dispatchEvent(new Event(`${name}:disabled`, { bubbles: true }))
    }
  }
}) { }

const name = NavigationBar.define('s-navigation-bar')
const itemName = NavigationBarItem.define('s-navigation-bar-item')

declare global {
  interface HTMLElementTagNameMap {
    [name]: NavigationBar
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
        //@ts-ignore
        [itemName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof itemProps.values>
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
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props.values>
    } & NavigationBar
    [itemName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof itemProps.values>
    } & NavigationBarItem
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
      //@ts-ignore
      [itemName]: IntrinsicElements['div'] & Partial<typeof itemProps.values>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
      //@ts-ignore
      [itemName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof itemProps.values>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
      //@ts-ignore
      [itemName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof itemProps.values>
    }
  }
}