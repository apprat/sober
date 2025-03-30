import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'
import { Select } from './core/utils/select.js'
import { convertCSSDuration } from './core/utils/CSSUtils.js'
import './ripple.js'

type Props = {
  value: string
  mode: 'auto' | 'fiexd'
}

const name = 's-segmented-button'
const props: Props = {
  value: '',
  mode: 'auto'
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  border-radius: 20px;
  height: 40px;
  padding: 3px;
  overflow: hidden;
  box-sizing: border-box;
  border: solid 1px var(--s-color-surface-variant, ${Theme.colorOutlineVariant});
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
}
:host([mode=fixed]){
  display: flex;
}
:host([mode=fixed]) ::slotted(s-segmented-button-item){
  flex-basis: 100%;
}
`
const template = /*html*/`<slot></slot>`

class SegmentedButton extends useElement({
  style, template, props, syncProps: ['mode'],
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const select = new Select({ context: this, class: SegmentedButtonItem, slot })
    const computedStyle = getComputedStyle(this)
    const getAnimateOptions = () => {
      const easing = computedStyle.getPropertyValue('--s-motion-easing-standard') || Theme.motionEasingStandard
      const duration = computedStyle.getPropertyValue('--s-motion-duration-medium4') || Theme.motionDurationMedium4
      return { easing: easing, duration: convertCSSDuration(duration) }
    }
    select.onUpdate = (old) => {
      if (!old || !select.select || !this.isConnected) return
      const oldRect = old.shadowRoot!.querySelector('.indicator')!.getBoundingClientRect()
      const indicator = select.select.shadowRoot!.querySelector<HTMLDivElement>('.indicator')!
      const rect = indicator.getBoundingClientRect()
      const offset = oldRect.left - rect.left
      indicator.style.transform = `translateX(${rect.left > oldRect.left ? offset : Math.abs(offset)}px)`
      indicator.style.width = `${oldRect.width}px`
      old.style.zIndex = '1'
      const animation = indicator.animate([{ transform: `translateX(0)`, width: `${rect.width}px` }], getAnimateOptions())
      animation.onfinish = animation.oncancel = animation.onremove = () => {
        indicator.style.removeProperty('transform')
        indicator.style.removeProperty('width')
        old.style.removeProperty('z-index')
      }
    }
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
        },
      },
      value: (value) => select.value = value
    }
  }
}) { }

type ItemProps = {
  selected: boolean
  disabled: boolean
  selectable: boolean
  value: string
}

const itemName = 's-segmented-button-item'
const itemProps: ItemProps = {
  selected: false,
  disabled: false,
  selectable: true,
  value: ''
}

const itemStyle = /*css*/`
:host{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: 64px;
  padding: 0 16px;
  text-transform: capitalize;
  cursor: pointer;
  font-weight: 500;
  font-size: .8125rem;
  position: relative;
  box-sizing: border-box;
  border-radius: 20px;
  transition: color var(--s-motion-duration-medium4, ${Theme.motionDurationMedium4}) var(--s-motion-easing-standard, ${Theme.motionEasingStandard});
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
:host([selected=true]){
  color: var(--s-color-on-primary, ${Theme.colorOnPrimary});
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb, var(--s-color-on-surface, ${Theme.colorOnSurface}) 38%, transparent);
}
.indicator{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: inherit;
  background: var(--s-color-primary, ${Theme.colorPrimary});
}
:host([selected=true]) .indicator{
  opacity: 1;
}
::slotted([slot]){
  width: 18px;
  height: 18px;
  color: inherit;
  fill: currentColor;
  flex-shrink: 0;
  position: relative;
}
::slotted([slot=start]){
  margin-right: 4px;
}
::slotted([slot=end]){
  margin-right: 4px;
}
.text{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  position: relative;
}
`

const itemTemplate =/*html*/`
<div class="indicator" part="indicator"></div>
<slot name="start"></slot>
<div class="text" part="text">
  <slot></slot>
</div>
<slot name="end"></slot>
<s-ripple attached="true" part="ripple"></s-ripple>
`

class SegmentedButtonItem extends useElement({
  style: itemStyle,
  template: itemTemplate,
  props: itemProps,
  syncProps: ['selected', 'disabled'],
  setup() {
    this.addEventListener('click', () => {
      if (!(this.parentNode instanceof SegmentedButton) || this.selected) return
      if (this.selectable) this.dispatchEvent(new Event(`${name}:select`, { bubbles: true }))
    })
    return {
      selected: () => {
        if (!(this.parentNode instanceof SegmentedButton)) return
        this.dispatchEvent(new CustomEvent(`${name}:update`, { bubbles: true, detail: {} }))
      }
    }
  }
}) { }

SegmentedButton.define(name)
SegmentedButtonItem.define(itemName)

export { SegmentedButton, SegmentedButtonItem }

declare global {
  interface HTMLElementTagNameMap {
    [name]: SegmentedButton
    [itemName]: SegmentedButtonItem
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