import { useProps, useElement } from '../core/elements.js'
import { Selector } from '../core/utils/selector.js'
import { useComputedStyle } from '../core/utils/CSS.js'
import { popup } from '../core/utils/popup.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({
  $name: '',
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
  min-width: 40px;
  outline-offset: 4px;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.layout{
  display: flex;
  position: static;
  border: none;
  background: none;
  padding: 0;
  flex-shrink: 0;
  gap: 8px;
  min-width: 0;
  height: auto;
  inset: auto;
  margin: 0;
  overflow: hidden;
}
.container{
  display: contents;
}
.toggle{
  display: none;
}
:host([icon-only]){
  .layout{
    gap: 4px;
    --s_navigation-responsive-item-text-display: none;
    ::slotted(s-navigation-responsive-item){
      padding: 14px;
    }
  }
}
:host([collapsed]){
  .layout{
    position: fixed;
    display: none;
    opacity: 0;
    pointer-events: none;
    --s_navigation-responsive-item-icon-display: contents;
    --s_navigation-responsive-item-badge-position: relative;
    --s_navigation-responsive-item-badge-transform: none;
    &.open{
      display: flex;
      pointer-events: auto;
      opacity: 1;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      ::slotted(s-navigation-responsive-item){
        border-radius: 0;
        justify-content: flex-start;
      }
    }
    &::backdrop{
      background: none;
    }
    .container{
      position: absolute;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      gap: 4px;
      padding: 8px 0;
      contain: layout;
      background: ${scheme.color.surfaceContainer};
      box-shadow: ${scheme.elevation.level3};
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
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 40px;
  padding: 0 16px;
  flex-shrink: 0;
  gap: 8px;
  min-width: 0;
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
  display: contents;
  border-radius: inherit;
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
    transform: scaleX(.5);
    transition-property: transform, opacity;
    transition-duration: inherit;
    background: ${scheme.color.secondaryContainer};
  }
  &.has-icon{
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
  &.has-icon.has-text{
    .icon{
      display: var(--s_navigation-responsive-item-icon-display, flex);
    }
    ::slotted([slot=text]){
      display: var(--s_navigation-responsive-item-text-display, block);
    }
    ::slotted(s-badge){
      position: var(--s_navigation-responsive-item-badge-position, absolute);
      transform: var(--s_navigation-responsive-item-badge-transform, translate(50%, -50%));
    }
  }
}
.icon{
  display: contents;
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
    transform: scaleX(1);
  }
}
`

const template = /*html*/`
<slot name="toggle" class="toggle" part="toggle"></slot>
<dialog class="layout" part="layout" role="navigation">
  <div class="container" part="container">
    <slot></slot>
  </div>
</dialog>
`

const itemTemplate = /*html*/`
<div class="layout" part="layout">
  <div class="icon">
    <slot name="icon"></slot>
    <slot></slot>
  </div>
  <slot name="text"></slot>
</div>
<s-ripple class="ripple" part="ripple"></s-ripple>
`

class Resizer {
  private firsts: Element[] = []
  private obs: ResizeObserver
  on?: () => void
  constructor(private root: Element, private layout: Element) {
    this.obs = new ResizeObserver((entries) => {
      let through = false
      entries.forEach((entry) => {
        if (!this.firsts.includes(entry.target)) return this.firsts.push(entry.target)
        through = true
      })
      if (!through) return
      this.on?.()
    })
  }
  stop() {
    this.firsts = []
    this.obs.disconnect()
  }
  run(soon = false) {
    if (soon) this.firsts = [this.root, this.layout]
    this.obs.observe(this.root)
    this.obs.observe(this.layout)
  }
}

export class NavigationResponsive extends useElement({
  style, props, template,
  states: ['formable'],
  setup(shadowRoot, info) {
    const layout = shadowRoot.querySelector<HTMLDialogElement>('.layout')!
    const container = shadowRoot.querySelector<HTMLDivElement>('.container')!
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot:not([name])')!
    const toggleSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=toggle]')!
    const computedStyle = useComputedStyle(this)
    const selector = new Selector(this, slot, NavigationResponsiveItem)
    const resizer = new Resizer(this, layout)
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
    const render = () => {
      resizer.stop()
      this.removeAttribute('collapsed')
      this.setAttribute('icon-only', '')
      const a = window.getComputedStyle(layout).gap
      const onlyIconWidth = layout.offsetWidth
      this.removeAttribute('icon-only')
      const width = layout.offsetWidth
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
    resizer.on = render
    toggleSlot.onclick = async (e) => {
      if (e.target === toggleSlot || !this.hasAttribute('collapsed') || layout.open) return
      layout.classList.add('open')
      layout.showModal()
      resizer.stop()
      const gap = computedStyle.getNumber('outline-offset')
      const position = popup({ anchor: toggleSlot, popover: container, gap, gravity: 'bottom' })
      container.style.top = `${position.top}px`
      container.style.left = `${position.left}px`
      container.style.transformOrigin = position.origin.join(' ')
      layout.onkeydown = (e) => {
        if (e.key !== 'Escape') return
        e.preventDefault()
        close()
      }
      selector.onChange = () => close()
      layout.onclick = () => close()
      container.onclick = (e) => e.stopPropagation()
      const close = async () => {
        layout.onclick = null
        container.onclick = null
        delete selector.onChange
        window.removeEventListener('resize', close)
        await container.animate({ opacity: [1, 0], transform: ['scale(1)', 'scale(.8)'] }, getAnimateOptions()).finished
        layout.close()
        layout.classList.remove('open')
        resizer.run(true)
      }
      window.addEventListener('resize', close)
      await container.animate({ opacity: [0, 1], transform: ['scale(.8)', 'scale(1)'] }, getAnimateOptions()).finished
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

export class NavigationResponsiveItem extends useElement({
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

const name = NavigationResponsive.define('s-navigation-responsive')
const itemName = NavigationResponsiveItem.define('s-navigation-responsive-item')

declare global {
  interface HTMLElementTagNameMap {
    [name]: NavigationResponsive
    [itemName]: NavigationResponsiveItem
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
    } & NavigationResponsive
    [itemName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof itemProps.values>
    } & NavigationResponsiveItem
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