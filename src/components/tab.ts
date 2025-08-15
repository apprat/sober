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
  font-size: .875rem;
  box-shadow: 0 -1px 0 var(--s-color-surface-variant, ${scheme.color.surfaceVariant}) inset;
  background: var(--s-color-surface, ${scheme.color.surface});
  color: var(--s-color-on-surface-variant, ${scheme.color.onSurfaceVariant});
}
.layout{
  display: flex;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
  animation-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  animation-duration: var(--s-motion-duration-medium4, ${scheme.motion.duration.medium4});
}
:host([mode=fixed]){
  ::slotted(s-tab-item){
    flex-basis: 100%;
    flex-shrink: 1;
  }
}
:host([variant=segmented]){
  font-size: .8125rem;
  box-shadow: 0 0 0 1px var(--s-color-surface-variant, ${scheme.color.surfaceVariant}) inset;
  background: var(--s-color-surface-container, ${scheme.color.surfaceContainer});
  --s-private-indicator-width: 100%;
  --s-private-indicator-height: 100%;
  --s-private-indicator-inset: 0;
  --s-private-indicator-border-radius: var(--s-shape-corner-full, ${scheme.shape.corner.full});
  --s-private-layout-padding: 4px 16px;
  --s-private-layout-position: static;
  .layout{
    gap: 3px;
    padding: 3px;
    border-radius: inherit;
  }
  ::slotted(s-tab-item){
    padding: 0;
    min-height: 34px;
    border-radius: var(--s-shape-corner-full, ${scheme.shape.corner.full});
  }
  ::slotted(s-tab-item[selected=true]){
    color: var(--s-color-on-primary, ${scheme.color.onPrimary});
    --s-private-indicator-background: var(--s-color-primary, ${scheme.color.primary});
  }
}
:host([variant=segmented]:not([orientation=vertical])){
  display: inline-block;
  border-radius: var(--s-shape-corner-full, ${scheme.shape.corner.full});
  max-width: -moz-available;
  max-width: -webkit-fill-available;
}
:host([variant=segmented][orientation=vertical]){
  border-radius: var(--s-shape-corner-small, ${scheme.shape.corner.small});
  --s-private-indicator-border-radius: var(--s-shape-corner-small, ${scheme.shape.corner.small});
  ::slotted(s-tab-item){
    border-radius: 8px;
  }
}
:host([variant=segmented][mode=fixed]){
  display: block;
}
:host([orientation=vertical]){
  display: inline-block;
  height: auto;
  .layout{ 
    flex-direction: column;
  }
}
:host([orientation=vertical]:not([variant=segmented])){
  --s-private-indicator-width: 3px;
  --s-private-indicator-height: 2em;
  --s-private-indicator-inset: auto auto auto 0;
  --s-private-layout-position: static;
  box-shadow: 1px 0 0 var(--s-color-surface-variant, ${scheme.color.surfaceVariant}) inset;
  ::slotted(s-tab-item){
    padding: 12px 16px;
    height: 48px;
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
  transition-timing-function: var(--s-motion-easing-standard, ${scheme.motion.easing.standard});
  transition-duration: var(--s-motion-duration-short4, ${scheme.motion.duration.short4});
}
:host([selected=true]){
  color: var(--s-color-primary, ${scheme.color.primary});
  .indicator{
    opacity: 1;
  }
}
.layout{
  position: var(--s-private-layout-position, relative);
  display: flex;
  gap: 3px;
  flex-direction: var(--s-private-layout-direction, column);
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: var(--s-private-layout-padding, 12px 0);
}
.indicator{
  position: absolute;
  opacity: 0;
  inset: var(--s-private-indicator-inset, auto auto 0 auto);
  width: var(--s-private-indicator-width, 100%);
  height: var(--s-private-indicator-height, 3px);
  border-radius: var(--s-private-indicator-border-radius, 3px 3px 0 0);
  background: var(--s-private-indicator-background, var(--s-color-primary, ${scheme.color.primary}));
}
.text{
  display: flex;
  align-items: center;
  gap: inherit;
  position: relative;
}
::slotted(:is(svg, s-icon)){
  width: 24px;
  height: 24px;
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
<s-ripple attached="true"></s-ripple>
`

const orientationOptions = {
  horizontal: { scrollWidth: 'scrollWidth', offsetWidth: 'offsetWidth', offsetLeft: 'offsetLeft', left: 'left', translateX: 'translateX', width: 'width' },
  vertical: { scrollWidth: 'scrollHeight', offsetWidth: 'offsetHeight', offsetLeft: 'offsetTop', left: 'top', translateX: 'translateY', width: 'height' }
} as const
const getOrientation = (orientation: typeof props.orientation) => orientationOptions[orientation]

export class Tab extends useElement({
  style, props, template,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const select = new Select(this, slot, TabItem)
    const computedStyle = useComputedStyle(layout)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('animation-timing-function')
      const duration = computedStyle.getDuration('animation-duration')
      return { easing, duration }
    }
    const center = (item?: TabItem) => {
      if (this.mode === 'fixed' || (this.multiple && !item)) return
      const target = item ?? select.selectedList[0]
      if (!target) return
      const orientation = getOrientation(this.orientation)
      if (layout[orientation.scrollWidth] === layout[orientation.offsetWidth]) return
      const left = (target[orientation.offsetLeft] - layout[orientation.offsetLeft]) - (layout[orientation.offsetWidth] / 2 - target[orientation.offsetWidth] / 2)
      layout.scrollTo({ [orientation.left]: left, behavior: 'smooth' })
    }
    select.onSlotChange = () => useThrottle(center)
    select.onChange = (item, old) => {
      useThrottle(center, item)
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
        get selectedIndex() {
          return select.selectedIndex()
        },
        get selectedIndexAll() {
          return select.selectedIndexAll()
        }
      },
      onMounted: () => useThrottle(center),
      getValue: () => select.getValue(),
      setValue: (v) => select.setValue(v),
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