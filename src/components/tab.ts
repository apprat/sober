import { useProps, useElement, useThrottle } from '../core/element.js'
import { Select } from '../core/utils/select.js'
import * as scheme from '../core/scheme.js'
import { useComputedStyle } from '../core/utils/CSS.js'

const props = useProps({
  $value: '',
  multiple: false,
  mode: ['scrollable', 'fixed'],
  variant: ['standard', 'segmented'],
  orientation: ['horizontal', 'vertical'],
})
const itemProps = useProps({
  $value: '',
  selected: false,
  disabled: false
})

const style = /*css*/`
:host{
  display: block;
  vertical-align: middle;
  font-size: calc(var(--s-font-size, 1) * 14px);
  box-shadow: 0 -1px 0 ${scheme.color.surfaceVariant} inset;
  background: ${scheme.color.surface};
  color: ${scheme.color.onSurfaceVariant};
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
:host([variant=segmented]){
  display: inline-block;
  max-width: -moz-available;
  max-width: -webkit-fill-available;
  font-size: calc(var(--s-font-size, 1) * 13px);
  border-radius: 20px;
  box-shadow: 0 0 0 1px ${scheme.color.surfaceVariant} inset;
  background: ${scheme.color.surfaceContainer};
  --s_indicator-width: 100%;
  --s_indicator-height: 100%;
  --s_indicator-inset: 0;
  --s_indicator-border-radius: 17px;
  --s_layout-padding: 4px 16px;
  --s_layout-position: static;
  --s_icon-width: 20px;
  --s_icon-height: 20px;
  .layout{
    padding: 3px;
    border-radius: inherit;
  }
  ::slotted(s-tab-item){
    padding: 0;
    min-height: 34px;
    border-radius: 17px;
  }
  ::slotted(s-tab-item[selected]){
    color: ${scheme.color.onPrimary};
    --s_indicator-background: ${scheme.color.primary};
  }
  &:host([mode=fixed]){
    display: block;
  }
}
:host([orientation=vertical]){
  display: inline-block;
  height: auto;
  --s_indicator-width: 3px;
  --s_indicator-height: 2em;
  --s_indicator-inset: auto auto auto 0;
  --s_layout-position: static;
  --s_indicator-border-radius: 0 3px 3px 0;
  box-shadow: 1px 0 0 ${scheme.color.surfaceVariant} inset;
  .layout{ 
    flex-direction: column;
    gap: 3px;
  }
  &:host([variant=segmented]){
    border-radius: 8px;
    box-shadow: 0 0 0 1px ${scheme.color.surfaceVariant} inset;
    --s_indicator-width: 100%;
    --s_indicator-height: 100%;
    --s_indicator-inset: 0;
    --s_indicator-border-radius: 4px;
    ::slotted(s-tab-item){
      border-radius: 4px;
    }
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
  transition-property: color;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
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
.layout{
  position: var(--s_layout-position, relative);
  display: flex;
  gap: 3px;
  flex-direction: var(--s_layout-direction, column);
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: var(--s_layout-padding, 12px 0);
}
.indicator{
  position: absolute;
  opacity: 0;
  inset: var(--s_indicator-inset, auto auto 0 auto);
  width: var(--s_indicator-width, 100%);
  height: var(--s_indicator-height, 3px);
  border-radius: var(--s_indicator-border-radius, 3px 3px 0 0);
  background: var(--s_indicator-background, ${scheme.color.primary});
}
.text{
  display: flex;
  align-items: center;
  gap: inherit;
  position: relative;
}
::slotted(:is(svg, s-icon)){
  width: var(--s_icon-width, 24px);
  height: var(--s_icon-height, 24px);
  color: inherit;
  position: relative;
}
::slotted(s-badge){
  position: static;
}
::slotted(s-badge[slot=badge]){
  position: absolute;
  right: 0;
  top: 12px;
}
::slotted(s-badge:not([slot]):not(:empty)){
  width: auto;
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
  <slot name="icon"></slot>
  <slot class="text" part="text"></slot>
  <slot name="badge"></slot>
</div>
<s-ripple></s-ripple>
`

const orientationOptions = {
  horizontal: { scrollWidth: 'scrollWidth', offsetWidth: 'offsetWidth', offsetLeft: 'offsetLeft', left: 'left', translateX: 'translateX', width: 'width' },
  vertical: { scrollWidth: 'scrollHeight', offsetWidth: 'offsetHeight', offsetLeft: 'offsetTop', left: 'top', translateX: 'translateY', width: 'height' }
} as const
const getOrientation = (orientation: typeof props.orientation) => orientationOptions[orientation]

export class Tab extends useElement({
  style, props, template,
  setup(shadowRoot, info) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const select = new Select(this, slot, TabItem)
    const computedStyle = useComputedStyle(layout)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('transition-timing-function')
      const duration = computedStyle.getDuration('transition-duration')
      return { easing, duration }
    }
    const center = (behavior: 'auto' | 'smooth' = 'auto') => {
      if (this.mode === 'fixed' || !info.isConnected) return
      const orientation = getOrientation(this.orientation)
      const index = this.multiple ? select.selectedList.length - 1 : 0
      const item = select.selectedList[index]
      if (layout[orientation.scrollWidth] === layout[orientation.offsetWidth]) return
      const left = (item[orientation.offsetLeft] - layout[orientation.offsetLeft]) - (layout[orientation.offsetWidth] / 2 - item[orientation.offsetWidth] / 2)
      layout.scrollTo({ [orientation.left]: left, behavior })
    }
    select.onSlotChange = () => useThrottle(center)
    select.onRender = (olds) => {
      if (select.selectedList.length === 0) return
      useThrottle(center, info.isConnected && olds.length > 0 ? 'smooth' : 'auto')
      if (this.multiple || !info.isConnected) return
      const item = select.selectedList[0]
      const old = olds[0]
      if (!item || !old) return
      const orientation = getOrientation(this.orientation)
      const oldRect = old.shadowRoot!.querySelector('.indicator')!.getBoundingClientRect()
      const indicator = item.shadowRoot?.querySelector<HTMLDivElement>('.indicator')!
      const rect = indicator.getBoundingClientRect()
      const offset = oldRect[orientation.left] - rect[orientation.left]
      const widths = [`${oldRect[orientation.width]}px`, `${rect[orientation.width] * 2}px`, `${rect[orientation.width]}px`]
      if (this.variant === 'segmented') widths.splice(1, 1)
      indicator.animate({
        transform: [`${orientation.translateX}(${offset}px)`, `${orientation.translateX}(0)`],
        [orientation.width]: widths
      }, getAnimateOptions())
    }
    return {
      expose: {
        get options() {
          return select.list
        },
        get selectedOptions() {
          return select.selectedList
        },
        get selectedIndex() {
          return select.selectedIndex()
        },
        get selectedIndexAll() {
          return select.selectedIndexAll()
        }
      },
      onMounted: () => useThrottle(center),
      getValue: () => select.getValue(),
      setValue: (v) => {
        select.setValue(v)
      },
      setMultiple: () => select.setMultiple(),
    }
  }
}) { }

export class TabItem extends useElement({
  style: itemStyle,
  props: itemProps,
  focused: true,
  template: itemTemplate,
  setup() {
    this.addEventListener('click', () => this.dispatchEvent(new Event(`${name}:select`, { bubbles: true })))
    return {
      setSelected: () => this.dispatchEvent(new Event(`${name}:render`, { bubbles: true }))
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
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
        //@ts-ignore
        [itemName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof itemProps>
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
      $props: HTMLAttributes & Partial<typeof props>
    } & Tab
    [itemName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof itemProps>
    } & TabItem
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props>
      //@ts-ignore
      [itemName]: IntrinsicElements['div'] & Partial<typeof itemProps>
    }
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

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [itemName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof itemProps>
    }
  }
}