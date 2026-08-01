import { useProps, useElement } from '../core/elements.js'
import { Selector } from '../core/utils/selector.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import { scrollElement } from '../core/utils/scroll-element.js'
import { MediaQueryer } from '../core/utils/media-queryer.js'

const props = useProps({
  name: '',
  $value: '',
  $defaultValue: '',
  multiple: false,
  selectable: true,
  mode: ['scrollable', 'fixed'],
  variant: ['primary', 'secondary', 'segmented'],
  orientation: ['horizontal', 'vertical'],
  $itemsOrientation: ['auto', 'horizontal', 'vertical'],
  $media: '(orientation: portrait)'
})
const itemProps = useProps({
  $value: '',
  selected: false,
  disabled: false,
  selectable: true,
})
const itemEvents = {
  beforechange: Event
}

const style = /*css*/`
:host{
  display: flex;
  position: relative;
  background: ${scheme.color.surface};
  color: ${scheme.color.onSurfaceVariant};
  transition-property: none;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.medium4};
  &::after{
    content: '';
    pointer-events: none;
    position: absolute;
    inset: 0;
    border-bottom: solid 1px ${scheme.color.surfaceVariant};
  }
}
.layout{
  flex-grow: 1;
  display: flex;
  justify-content: inherit;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
}
:host([mode=fixed]:not([orientation=vertical])){
  ::slotted(s-tab-item){
    flex-basis: 100%;
    flex-shrink: 1;
  }
}
:host([orientation=vertical]){
  max-height: 300px;
  width: fit-content;
  box-shadow: 1px 0 0 ${scheme.color.surfaceVariant} inset;
  --s_tab-item-indicator-height: 100%;
  --s_tab-item-indicator-width: 3px;
  --s_tab-item-indicator-inset: auto auto auto -16px;
  --s_tab-item-indicator-border-radius: 0px 3px 3px 0;
  .layout{
    flex-direction: column;
    max-height: inherit;
  }
  ::slotted(s-tab-item){
    justify-content: flex-start;
    height: 48px;
  }
}
:host([item-vertical]:not([orientation])){
  --s_tab-item-font-size: 12px;
  --s_tab-item-layout-flex-direction: column;
  --s_tab-item-layout-padding: 12px 0;
  --s_tab-item-layout-gap: 4px;
  --s_tab-item-icon-display: flex;
  --s_tab-item-badge-position: absolute;
  --s_tab-item-badge-transform: translate(50%, -50%);
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
  color: ${scheme.color.onSurfaceVariant};
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
    flex-direction: var(--s_tab-item-layout-flex-direction, row);
    padding: var(--s_tab-item-layout-padding, 0);
    gap: var(--s_tab-item-layout-gap, 6px);
    .icon{
      display: var(--s_tab-item-icon-display, contents);
    }
    ::slotted([slot=text]){
      font-size: calc(var(--s-font-size, 1) * var(--s_tab-item-font-size, 14px));
    }
    ::slotted(s-badge){
      position: var(--s_tab-item-badge-position, static);
      transform: var(--s_tab-item-badge-transform, none);
    }
  }
}
.indicator{
  position: absolute;
  opacity: 0;
  transition-property: none;
  inset: var(--s_tab-item-indicator-inset, auto auto 0 auto);
  width: var(--s_tab-item-indicator-width, 100%);
  height: var(--s_tab-item-indicator-height, 3px);
  border-radius: var(--s_tab-item-indicator-border-radius, 3px 3px 0 0);
  background: ${scheme.color.primary};
}
.icon{
  display: contents;
  position: relative;
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
  <div class="icon" part="icon">
    <slot name="icon"></slot>
    <slot></slot>
  </div>
  <slot name="text"></slot>
</div>
<s-ripple class="ripple" part="ripple"></s-ripple>
`

const orientationOptions = {
  horizontal: { scrollWidth: 'scrollWidth', offsetWidth: 'offsetWidth', offsetLeft: 'offsetLeft', left: 'left', translateX: 'translateX', width: 'width' },
  vertical: { scrollWidth: 'scrollHeight', offsetWidth: 'offsetHeight', offsetLeft: 'offsetTop', left: 'top', translateX: 'translateY', width: 'height' }
} as const
const getOrientation = (orientation: typeof props.values.orientation) => orientationOptions[orientation]

export class Tab extends useElement({
  style, props, template,
  states: ['formable'],
  setup(shadowRoot, info) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const selector = new Selector(this, slot, TabItem)
    const mediaQueryer = new MediaQueryer(this.media)
    const computedStyle = useComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('transition-timing-function')
      const duration = computedStyle.getDuration('transition-duration')
      return { easing, duration }
    }
    mediaQueryer.onChange = (v) => this.itemsOrientation === 'auto' && this.toggleAttribute('item-vertical', v)
    selector.onValueChange = () => info.internals.setFormValue(selector.getFormData())
    selector.onRender = (olds, initial) => {
      const orientation = getOrientation(this.orientation)
      const animateOptions = getAnimateOptions()
      if (info.isConnected && selector.selectedItems.length > 0 && layout[orientation.scrollWidth] !== layout[orientation.offsetWidth]) {
        const selected = selector.selectedItems[0]
        const left = (selected[orientation.offsetLeft] - layout[orientation.offsetLeft]) - (layout[orientation.offsetWidth] / 2 - selected[orientation.offsetWidth] / 2)
        initial ? (layout.scrollTo({ [orientation.left]: left })) : scrollElement({ element: layout, [orientation.left]: left, ...animateOptions })
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
        }, animateOptions)
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
      media: (v) => mediaQueryer.replace(v),
      itemsOrientation: (v) => {
        if (v === 'auto') return mediaQueryer.call()
        this.toggleAttribute('item-vertical', v === 'vertical')
      }
    }
  }
}) { }

export class TabItem extends useElement({
  style: itemStyle,
  props: itemProps,
  template: itemTemplate,
  events: itemEvents,
  states: ['focusable'],
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const iconSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=icon]')!
    const textSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=text]')!
    iconSlot.addEventListener('slotchange', () => layout.classList.toggle('has-icon', iconSlot.assignedElements().length > 0))
    textSlot.addEventListener('slotchange', () => layout.classList.toggle('has-text', textSlot.assignedElements().length > 0))
    this.addEventListener('click', () => this.dispatchEvent(new Event(`${name}:change`, { bubbles: true })))
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