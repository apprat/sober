import { useProps, useElement, useThrottle } from '../core/elements.js'
import { Selector } from '../core/utils/selector.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'

const props = useProps({
  name: '',
  $value: '',
  $defaultValue: '',
  multiple: false,
  mode: ['scrollable', 'fixed'],
  variant: ['primary', 'secondary', 'segmented'],
  orientation: ['horizontal', 'vertical'],
  itemsOrientation: ['auto', 'horizontal', 'vertical'],
})
const itemProps = useProps({
  $value: '',
  selected: false,
  disabled: false,
})

const style = /*css*/`
:host{
  display: block;
  box-shadow: 0 -1px 0 ${scheme.color.surfaceVariant} inset;
  background: ${scheme.color.surface};
  color: ${scheme.color.onSurfaceVariant};
  transition-property: none;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.medium4};
}
.layout{
  display: flex;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
}
:host([mode=fixed]){
  ::slotted(s-tab-item){
    flex-basis: 100%;
    flex-shrink: 1;
  }
}
:host([itemsOrientation=vertical]){
  --s_item-font-size: 12px;
  --s_item-layout-flex-direction: column;
  --s_item-layout-padding: 12px 0;
  --s_item-layout-gap: 4px;
  --s_item-icon-display: flex;
  --s_item-badge-position: absolute;
  --s_item-badge-transform: translate(50%, -50%);
}
@media (orientation: portrait){
  :host(:not([itemsOrientation])){
    --s_item-font-size: 12px;
    --s_item-layout-flex-direction: column;
    --s_item-layout-padding: 12px 0;
    --s_item-layout-gap: 4px;
    --s_item-icon-display: flex;
    --s_item-badge-position: absolute;
    --s_item-badge-transform: translate(50%, -50%);
  }
}
`

const itemStyle = /*css*/`
:host{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  position: relative;
  cursor: pointer;
  padding: 0 16px;
  line-height: 1;
  flex-shrink: 0;
  outline-offset: -3px;
  border-radius: 12px;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.layout{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 6px;
  &.has-icon:not(.has-text){
    .icon{
      display: flex;
    }
    ::slotted(s-badge){
      position: absolute;
      top: 2px;
      right: 2px;
      transform: translate(50%, -50%);
    }
  }
  &.has-icon.has-text{
    flex-direction: var(--s_item-layout-flex-direction, row);
    padding: var(--s_item-layout-padding, 0);
    gap: var(--s_item-layout-gap, 6px);
    .icon{
      display: var(--s_item-icon-display, contents);
    }
    ::slotted([slot=text]){
      font-size: calc(var(--s-font-size, 1) * var(--s_item-font-size, 14px));
    }
    ::slotted(s-badge){
      position: var(--s_item-badge-position, static);
      transform: var(--s_item-badge-transform, none);
    }
  }
  .indicator{
    position: absolute;
    opacity: 0;
    inset: auto auto 0 auto;
    width: 100%;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background: ${scheme.color.primary};
  }
  .icon{
    display: contents;
    position: relative;
  }
}
.ripple{
  border-radius: 0;
}
::slotted([slot=icon]){
  width: 24px;
  height: 24px;
  color: inherit;
  fill: currentColor;
}
::slotted([slot=text]){
  line-height: 1;
  font-weight: 500;
  font-size: calc(var(--s-font-size, 1) * 14px);
}
::slotted(s-badge){
  order: 1;
  top: 2px;
  right: 2px;
}
:host([selected]){
  color: ${scheme.color.primary};
  .indicator{
    opacity: 1;
  }
}
:host([disabled]){
  pointer-events: none;
  color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
  .indicator{
    background: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent);
  }
  ::slotted(s-badge){
    background: color-mix(in srgb, ${scheme.color.onSurface} 12%, transparent) !important;
    color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
  }
}

@supports not (color: color-mix(in srgb, black, white)){
  :host([disabled]){
    color: ${scheme.color.outline} !important;
    .indicator{
      background: ${scheme.color.outline} !important;
    }
    ::slotted(s-badge){
      background: ${scheme.color.surfaceContainerHigh} !important;
      color: ${scheme.color.outline} !important;
    }
    color: ${scheme.color.outline} !important;
  }
}
`

const template = /*html*/`
<div class="layout" part="layout">
  <slot></slot>
</div>
`

const itemTemplate = /*html*/`
<div class="layout" part="layout">
  <div class="indicator"></div>
  <div class="icon">
    <slot name="icon"></slot>
    <slot></slot>
  </div>
  <slot name="text"></slot>
</div>
<s-ripple class="ripple"></s-ripple>
`

const orientationOptions = {
  horizontal: { scrollWidth: 'scrollWidth', offsetWidth: 'offsetWidth', offsetLeft: 'offsetLeft', left: 'left', translateX: 'translateX', width: 'width' },
  vertical: { scrollWidth: 'scrollHeight', offsetWidth: 'offsetHeight', offsetLeft: 'offsetTop', left: 'top', translateX: 'translateY', width: 'height' }
} as const
const getOrientation = (orientation: typeof props.values.orientation) => orientationOptions[orientation]

export class Tab extends useElement({
  style, props, template,
  states: ['formAssociated'],
  setup(shadowRoot, info) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const selector = new Selector(this, slot, TabItem)
    const computedStyle = useComputedStyle(layout)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('transition-timing-function')
      const duration = computedStyle.getDuration('transition-duration')
      return { easing, duration }
    }
    selector.onValueChange = () => info.internals.setFormValue(selector.getFormData())
    selector.onRender = (olds) => {
      const orientation = getOrientation(this.orientation)
      if (info.isConnected && selector.selectedItems.length > 0 && layout[orientation.scrollWidth] !== layout[orientation.offsetWidth]) {
        const selected = selector.selectedItems[0]
        const left = (selected[orientation.offsetLeft] - layout[orientation.offsetLeft]) - (layout[orientation.offsetWidth] / 2 - selected[orientation.offsetWidth] / 2)
        layout.scrollTo({ left, behavior: olds.length === 0 ? 'instant' : 'smooth' })
      }
      if (olds.length === 0) return
      if (!this.multiple) {
        const old = olds[0]
        const item = selector.selectedItems[0]
        if (!item || !old) return
        const oldRect = old.shadowRoot!.querySelector('.indicator')!.getBoundingClientRect()
        const indicator = item.shadowRoot!.querySelector<HTMLDivElement>('.indicator')!
        const rect = indicator.getBoundingClientRect()
        const offset = oldRect[orientation.left] - rect[orientation.left]
        indicator.animate({
          transform: [`${orientation.translateX}(${offset}px)`, `${orientation.translateX}(0)`],
          [orientation.width]: [`${oldRect[orientation.width]}px`, `${rect[orientation.width]}px`]
        }, getAnimateOptions())
      }
    }
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
      value: (v) => selector.value = v,
      onFormReset: () => this.value = this.defaultValue,
    }
  }
}) { }

export class TabItem extends useElement({
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

const name = Tab.define('s-tab')
const itemName = TabItem.define('s-tab-item')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Tab
    [itemName]: TabItem
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
    } & Tab
    [itemName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof itemProps.values>
    } & TabItem
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