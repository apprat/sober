import { useProps, useElement } from '../core/elements.js'
import { Selector } from '../core/utils/selector.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import { ResizeWatcher } from '../core/utils/resize-watcher.js'
import { popup } from '../core/utils/popup.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  name: '',
  $value: '',
  $defaultValue: '',
  multiple: false,
  selectable: true
})
const itemProps = useProps({
  $value: '',
  selectable: true,
  selected: false
})
const itemEvents = {
  beforechange: Event
}

const style = /*css*/`
:host{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  min-width: 40px;
  outline-offset: 4px;
  transition-property: none;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.wrap{
  display: inline-flex;
  align-items: inherit;
  gap: inherit;
}
.layout{
  display: contents;
  position: fixed;
  border: none;
  background: none;
  padding: 0;
  gap: inherit;
  flex-shrink: 0;
  min-width: 0;
  height: auto;
  inset: auto;
  margin: 0;
}
.container{
  display: contents;
}
.toggle{
  display: none;
}
:host([icon-only]){
  .wrap{
    --s_nav-adaptive-item-text-display: none;
    --s_nav-adaptive-item-layout-padding: 0;
    --s_nav-adaptive-item-indicator-transform: scale(0, 0);
  }
}
:host([collapsed]){
  .wrap{
    --s_nav-adaptive-item-icon-display: contents;
    --s_nav-adaptive-item-badge-position: relative;
    --s_nav-adaptive-item-badge-transform: none;
    --s_nav-adaptive-item-layout-padding: 0 16px;
    --s_nav-adaptive-item-layout-pressed-border-radius: 0px;
  }
  .layout{
    display: none;
    pointer-events: none;
    inset: 0;
    .container{
      position: absolute;
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      gap: inherit;
      padding: 8px 0;
      contain: layout;
      background: ${scheme.color.surfaceContainer};
      box-shadow: ${scheme.elevation.level3};
    }
    &.open{
      position: fixed;
      display: flex;
      pointer-events: auto;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      ::slotted(s-nav-adaptive-item){
        border-radius: 0;
        justify-content: flex-start;
      }
    }
    &::backdrop{
      background: none;
    }
  }
  .toggle{
    display: block;
  }
}
`

const itemStyle = /*css*/`
:host{
  display: flex;
  cursor: pointer;
  height: 40px;
  flex-shrink: 0;
  min-width: 0;
  gap: 8px;
  min-width: 40px;
  border-radius: 20px;
  position: relative;
  white-space: nowrap;
  font-weight: 500;
  font-size: calc(var(--s-font-size, 1) * 14px);
  transition-property: none;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
  color: ${scheme.color.onSurfaceVariant};
}
.layout{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  gap: inherit;
  padding: 0 16px;
  outline: none;
  min-width: inherit;
  transition-property: border-radius;
  &[pressed]{
    border-radius: var(--s_nav-adaptive-item-layout-pressed-border-radius, 8px);
  }
  &::before,
  &::after{
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
  }
  &::after{
    background: currentColor;
    filter: opacity(.1);
  }
  &::before{
    transform: scale(.5, 1);
    transition-property: transform, opacity;
    transition-duration: inherit;
    background: ${scheme.color.secondaryContainer};
  }
  &.has-icon{
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
  &.has-icon:not(.has-text){
    width: 40px;
    padding: var(--s_nav-adaptive-item-layout-padding, 0);
    &::before{
      transform: scale(0, 0);
    }
  }
  &.has-icon.has-text{
    padding: var(--s_nav-adaptive-item-layout-padding, 0 16px);
    &::before{
      transform: var(--s_nav-adaptive-item-indicator-transform, scale(.5, 1));
    }
    .icon{
      display: var(--s_nav-adaptive-item-icon-display, flex);
    }
    ::slotted([slot=text]){
      display: var(--s_nav-adaptive-item-text-display, block);
    }
    ::slotted(s-badge){
      position: var(--s_nav-adaptive-item-badge-position, absolute);
      transform: var(--s_nav-adaptive-item-badge-transform, translate(50%, -50%));
    }
  }
}
.icon{
  display: contents;
  position: relative;
}
::slotted(:is(s-icon, svg)[slot=icon]){
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
  .layout::after{
    opacity: 1;
  }
}
:host([selected]){
  color: ${scheme.color.primary};
  .layout::before{
    opacity: 1;
    transform: scale(1, 1);
  }
}
`

const template = /*html*/`
<div class="wrap" part="wrap">
  <dialog class="layout" part="layout" role="navigation" tabindex="-1">
    <div class="container" part="container">
      <slot></slot>
    </div>
  </dialog>
  <slot name="action"></slot>
  <div class="toggle" part="toggle">
    <slot name="toggle"></slot>
  </div>
</div>
`

const itemTemplate = /*html*/`
<div class="layout" part="layout">
  <div class="icon">
    <slot name="icon"></slot>
    <slot></slot>
  </div>
  <slot name="text"></slot>
  <s-ripple class="ripple" part="ripple"></s-ripple>
</div>
`

export class NavAdaptive extends useElement({
  style, props, template,
  states: ['formable'],
  setup(shadowRoot, info) {
    const wrap = shadowRoot.querySelector<HTMLDialogElement>('.wrap')!
    const layout = shadowRoot.querySelector<HTMLDialogElement>('.layout')!
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot:not([name])')!
    const toggle = shadowRoot.querySelector<HTMLDivElement>('.toggle')!
    const computedStyle = useComputedStyle(this)
    const selector = new Selector(this, slot, NavAdaptiveItem)
    const resizer = new ResizeWatcher(this, wrap)
    const getAnimateOptions = () => {
      const easing = computedStyle.getValue('transition-timing-function')
      const duration = computedStyle.getDuration('transition-duration')
      return { easing, duration }
    }
    selector.onValueChange = () => info.internals.setFormValue(selector.getFormData())
    selector.onSlotChange = () => {
      if (selector.items.length > 0) {
        resizer.run(true)
        return
      }
      resizer.stop()
      this.removeAttribute('collapsed')
      this.removeAttribute('icon-only')
    }
    resizer.onChange = () => {
      resizer.stop()
      this.removeAttribute('collapsed')
      this.setAttribute('icon-only', '')
      const onlyIconWidth = wrap.offsetWidth
      this.removeAttribute('icon-only')
      const width = wrap.offsetWidth
      if (this.offsetWidth < width) {
        if (this.offsetWidth < width && onlyIconWidth <= this.offsetWidth) {
          this.setAttribute('icon-only', '')
          this.removeAttribute('collapsed')
        }
        if (this.offsetWidth < width && onlyIconWidth > this.offsetWidth) {
          this.setAttribute('collapsed', '')
          this.removeAttribute('icon-only')
        }
      }
      resizer.run()
    }
    toggle.onclick = async (e) => {
      if (e.target === toggle || !this.hasAttribute('collapsed') || layout.open) return
      const rootNode = this.getRootNode()
      const focus = rootNode instanceof Document ? rootNode.querySelector(':focus-visible') : null
      const focusElement = focus instanceof HTMLElement ? focus : null
      layout.classList.add('open')
      layout.showModal()
      resizer.stop()
      const obs = new ResizeWatcher(container)
      obs.onChange = () => {
        const gap = computedStyle.getNumber('outline-offset')
        const position = popup({ anchor: toggle, popover: container, gap, gravity: 'bottom' })
        container.style.top = `${position.top}px`
        container.style.left = `${position.left}px`
        container.style.transformOrigin = position.origin.join(' ')
      }
      obs.onChange()
      const dialogClose = (e: KeyboardEvent) => {
        if (e.key !== 'Escape') return
        e.preventDefault()
        close()
      }
      layout.addEventListener('keydown', dialogClose)
      layout.onpointerdown = () => close()
      container.onpointerdown = (e) => e.stopPropagation()
      container.onclick = (e) => e.target !== container && close()
      const close = async () => {
        layout.onpointerdown = null
        container.onpointerdown = null
        container.onclick = null
        layout.removeEventListener('keydown', dialogClose)
        window.removeEventListener('resize', close)
        obs.stop()
        await container.animate({ opacity: [1, 0], transform: ['scale(1)', 'scale(.8)'] }, getAnimateOptions()).finished
        layout.classList.remove('open')
        layout.close()
        if (focusElement) {
          focusElement.focus()
        } else if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
        resizer.run(true)
      }
      window.addEventListener('resize', close)
      await container.animate({ opacity: [0, 1], transform: ['scale(.8)', 'scale(1)'] }, getAnimateOptions()).finished
      obs.run()
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
      onFormReset: () => this.value = this.defaultValue,
      value: (v) => selector.value = v
    }
  }
}) { }

export class NavAdaptiveItem extends useElement({
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

const name = NavAdaptive.define('s-nav-adaptive')
const itemName = NavAdaptiveItem.define('s-nav-adaptive-item')

declare global {
  interface HTMLElementTagNameMap {
    [name]: NavAdaptive
    [itemName]: NavAdaptive
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
    } & NavAdaptive
    [itemName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof itemProps.values>
    } & NavAdaptiveItem
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