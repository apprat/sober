import { useProps, useElement } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { MediaQueryer } from '../core/utils/media-queryer.js'
import { Selector } from '../core/utils/selector.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import './ripple.js'

const props = useProps({
  $name: '',
  $value: '',
  $defaultValue: '',
  multiple: false,
  selectable: true,
  $mode: ['auto', 'collapsed', 'expanded'],
  $media: '(orientation: portrait)'
})
const itemProps = useProps({
  value: '',
  selected: false,
  selectable: true,
  open: false
})

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  padding: 8px 0;
  max-height: -moz-available;
  max-height: -webkit-fill-available;
  background: ${scheme.color.surfaceContainerLow};
}
.layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  gap: 8px;
  min-height: 100%;
}
::slotted(:is(label, s-divider, s-nav-rail-item)){
  align-self: stretch;
}
::slotted(label){
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 32px;
  font-size: calc(var(--s-font-size, 1) * 12px);
  color: ${scheme.color.outline};
}
:host([collapsed]){
  --s_nav-rail-item-font-size: 12px;
  --s_nav-rail-item-text-min-width: auto;
  --s_nav-rail-item-badge-margin-left: 0;
  --s_nav-rail-item-badge-inset: 6px 2px auto auto;
  --s_nav-rail-item-badge-position: absolute;
  --s_nav-rail-item-badge-transform: translate(50%, -50%);
  --s_nav-rail-item-indicator-display: flex;
  --s_nav-rail-item-indicator-width: 56px;
  --s_nav-rail-item-indicator-height: 32px;
  --s_nav-rail-item-indicator-inset: auto;
  --s_nav-rail-item-layout-padding: 6px 0;
  --s_nav-rail-item-layout-flex-direction: column;
  --s_nav-rail-item-layout-gap: 2px;
}
`

const itemStyle = /*css*/`
:host{
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  white-space: nowrap;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  color: ${scheme.color.onSurfaceVariant};
}
.wrap{
  display: contents;
  &.has-text{
    ::slotted([slot=text]){
      min-width: var(--s_nav-rail-item-text-min-width, 80px);
    }
  }
  &.has-icon:not(.has-text){
    .layout{
      justify-content: center;
      padding: 0;
    }
    .layout,
    .ripple::part(container),
    .ripple::before,
    .ripple::after{
      height: 40px;
      width: 56px;
      inset: auto;
    }
    .ripple{
      display: flex;
      height: auto;
    }
    ::slotted(s-badge){
      position: absolute;
      inset: 2px 2px auto auto;
      transform: translate(50%, -50%);
    }
  }
  &.has-icon.has-text:not(.has-action):not(.has-sub-rail){
    .layout{
      flex-direction: var(--s_nav-rail-item-layout-flex-direction, row);
      padding: var(--s_nav-rail-item-layout-padding, 0 16px);
      gap: var(--s_nav-rail-item-layout-gap, 8px);
    }
    .ripple{
      display: var(--s_nav-rail-item-indicator-display, contents);
      height: var(--s_nav-rail-item-indicator-height, 100%);
      &::part(container),
      &::before,
      &::after{
        inset: var(--s_nav-rail-item-indicator-inset, auto 0);
        width: var(--s_nav-rail-item-indicator-width, 100%);
        height: var(--s_nav-rail-item-indicator-height, 100%);
      }
    }
    ::slotted([slot=text]){
      font-size: calc(var(--s-font-size, 1) * var(--s_nav-rail-item-font-size, 14px));
    }
    ::slotted(s-badge){
      position: var(--s_nav-rail-item-badge-position, relative);
      inset: var(--s_nav-rail-item-badge-inset, auto);
      transform: var(--s_nav-rail-item-badge-transform, none);
    }
  }
  &.has-sub-rail{
    .toggle-icon{
      display: contents;
    }
  }
}
.layout{
  min-height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  gap: 8px;
  cursor: pointer;
  padding: 0 16px;
  min-width: 64px;
  margin: 0 8px;
}
.ripple{
  display: contents;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: visible;
  width: auto;
  &::part(container),
  &::before,
  &::after{
    content: '';
    position: absolute;
    overflow: hidden;
    inset: auto 0;
    border-radius: 20px;
    width: 100%;
    height: 100%;
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
}
.toggle-icon{
  display: none;
  svg{
    width: 24px;
    height: 24px;
    fill: currentColor;
    position: relative;
    transition-duration: inherit;
    transition-timing-function: inherit;
  }
}
.sub-rail{
  display: none;
  overflow: hidden;
  contain: layout;
}
::slotted(:is(s-icon, svg)){
  width: 24px;
  height: 24px;
  color: currentColor;
  fill: currentColor;
  position: relative;
}
::slotted([slot=text]){
  position: relative;
  line-height: 1;
  flex-grow: 1;
  font-weight: 500;
  font-size: calc(var(--s-font-size, 1) * 14px);
}
::slotted(s-badge){
  position: relative;
  order: 1;
}
::slotted(:is(s-checkbox, s-radio)[slot=action]){
  margin: 0 -8px 0 -4px;
}
::slotted(:is(s-icon, svg)[slot=toggle-icon]){
  transition-duration: inherit;
  transition-timing-function: inherit;
}
::slotted(s-nav-rail){
  width: 100%;
  margin-top: 8px;
  background: ${scheme.color.surfaceContainer};
}
::slotted(s-tooltip){
  outline-offset: 0px;
}
:host(:focus-visible){
  outline: none;
  .ripple::after{
    opacity: 1;
  }
}
:host([selected]){
  color: ${scheme.color.primary};
  .ripple::before{
    opacity: 1;
    transform: scaleX(1);
  }
}
:host([open]){
  .toggle-icon>svg,
  ::slotted(:is(s-icon, svg)[slot=toggle-icon]){
    transform: rotate(-180deg);
  }
  .has-sub-rail .sub-rail{
    display: contents;
  }
}
`

const template = /*html*/`
<div class="layout" part="layout">
  <slot name="start"></slot>
  <slot></slot>
  <slot name="end"></slot>
</div>
`

const itemTemplate = /*html*/`
<div class="wrap" part="wrap">
  <div class="layout" part="layout">
    <s-ripple class="ripple" part="ripple">
      <slot name="icon"></slot>
      <slot></slot>
    </s-ripple>
    <slot name="text"></slot>
    <slot name="action"></slot>
    <slot name="toggle-icon" class="toggle-icon" part="toggle-icon">
      <svg viewBox="0 -960 960 960"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" transform="rotate(180 480 -480)"></path></svg>
    </slot>
  </div>
  <slot class="sub-rail" part="sub-rail" name="sub-rail"></slot>
</div>
`

export class NavRail extends useElement({
  props, style, template,
  states: ['formable'],
  setup(shadowRoot, info) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot:not([name])')!
    const mediaQueryer = new MediaQueryer(this.media)
    const selector = new Selector(this, slot, NavRailItem)
    selector.onValueChange = () => info.internals.setFormValue(selector.getFormData())
    mediaQueryer.onChange = (v) => this.mode === 'auto' && this.toggleAttribute('collapsed', v)
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
      value: (v) => selector.value = v,
      media: (v) => mediaQueryer.replace(v),
      mode: (v) => {
        if (v === 'auto') return mediaQueryer.call()
        this.toggleAttribute('collapsed', v === 'collapsed')
      }
    }
  }
}) { }

export class NavRailItem extends useElement({
  states: ['focusable', 'pressable', 'hoverable'],
  props: itemProps,
  style: itemStyle,
  template: itemTemplate,
  setup(shadowRoot) {
    const wrap = shadowRoot.querySelector<HTMLDivElement>('.wrap')!
    const iconSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=icon]')!
    const textSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=text]')!
    const actionSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=action]')!
    const subRailSlot = shadowRoot.querySelector<HTMLSlotElement>('.sub-rail')!
    const computedStyle = useComputedStyle(this)
    iconSlot.addEventListener('slotchange', () => wrap.classList.toggle('has-icon', iconSlot.assignedElements().length > 0))
    textSlot.addEventListener('slotchange', () => wrap.classList.toggle('has-text', textSlot.assignedElements().length > 0))
    subRailSlot.addEventListener('slotchange', () => wrap.classList.toggle('has-sub-rail', subRailSlot.assignedElements().length > 0))
    actionSlot.addEventListener('slotchange', () => wrap.classList.toggle('has-action', actionSlot.assignedElements().length > 0))
    this.addEventListener('click', () => {
      this.dispatchEvent(new Event(`${name}:change`, { bubbles: true }))
      if (wrap.classList.contains('has-sub-rail')) this.open = !this.open
    })
    subRailSlot.onclick = (e) => e.stopPropagation()
    subRailSlot.onkeydown = (e) => e.stopPropagation()
    return {
      selected: () => this.dispatchEvent(new Event(`${name}:selected`, { bubbles: true })),
      value: (_, old) => this.dispatchEvent(new CustomEvent(`${name}:valued`, { bubbles: true, detail: { old } })),
      disabled: () => this.dispatchEvent(new Event(`${name}:disabled`, { bubbles: true })),
      open: async (v) => {
        if (!wrap.classList.contains('has-sub-rail')) return
        const [old] = subRailSlot.getAnimations()
        if (old) return old.reverse()
        subRailSlot.style.display = 'block'
        const height = subRailSlot.offsetHeight
        const keyframe = { height: ['0px', `${height}px`] }
        if (!v) keyframe.height.reverse()
        await subRailSlot.animate(keyframe, { easing: computedStyle.getValue('transition-timing-function'), duration: computedStyle.getDuration('transition-duration') }).finished
        subRailSlot.style.removeProperty('display')
      }
    }
  }
}) { }

const name = NavRail.define('s-nav-rail')
const itemName = NavRailItem.define('s-nav-rail-item')

declare global {
  interface HTMLElementTagNameMap {
    [name]: NavRail
    [itemName]: NavRailItem
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof itemProps.values>
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
    } & NavRail
    [itemName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof itemProps.values>
    } & NavRailItem
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof itemProps.values>
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
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof itemProps.values>
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
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof itemProps.values>
    }
  }
}