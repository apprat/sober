import { useProps, useElement } from '../core/elements.js'
import { Selector } from '../core/utils/selector.js'
import { MediaQueryer } from '../core/utils/media-queryer.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'
import './field-set.js'

const props = useProps({
  $name: '',
  $value: '',
  label: '',
  $defaultValue: '',
  multiple: false,
  searchable: false,
  selectable: true,
  variant: ['outlined', 'text']
})
const itemProps = useProps({
  $value: '',
  selected: false,
  selectable: true
})

const style = /*css*/`
:host{
  display: inline-flex;
  height: 40px;
  line-height: 1;
  cursor: pointer;
  transition-timing-function: ${scheme.motion.easing.standard};
  transition-duration: ${scheme.motion.duration.short4};
}
.field-set{
  line-height: inherit;
  flex-grow: 1;
  --s-field-set-padding-top: 0px;
  --s-field-set-padding-bottom: 0px;
  --s-field-set-padding-left: var(--s_text-field-padding-left);
  --s-field-set-padding-right: var(--s_text-field-padding-right);
  --s-field-set-border-top-left-radius: var(--s_text-field-border-top-left-radius);
  --s-field-set-border-top-right-radius: var(--s_text-field-border-top-right-radius);
  --s-field-set-border-bottom-left-radius: var(--s_text-field-border-bottom-left-radius);
  --s-field-set-border-bottom-right-radius: var(--s_text-field-border-bottom-right-radius);
  --s-field-set-border-color: var(--s_text-field-border-color);
  --s-field-set-border-color-focused: var(--s_text-field-border-color-focused);
  --s-field-set-border-width: var(--s_text-field-border-width);
  --s-field-set-border-width-focused: var(--s_text-field-border-width-focused);
  --s-field-set-legend-gap: var(--s_text-field-label-gap);
}
.items{
  display: none;
}
.layout{
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.text{
  flex-grow: 1;
  height: fit-content;
}
svg{
  width: 24px;
  margin-right: -8px;
  fill: ${scheme.color.onSurfaceVariant};
}
:host([variant=text]){
  .field-set{
    --s-field-set-border-width: 0px;
  }
  .label{
    display: none;
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
`

const template = /*html*/`
<s-field-set class="field-set">
  <div slot="legend" class="label" part="label"></div>
  <div slot="body" class="layout" part="layout">
    <div class="text" part="text">贵阳</div>
    <svg viewBox="0 -960 960 960"><path d="M480-360 280-560h400L480-360Z"></path></svg>
    <s-ripple></s-ripple>
  </div>
</s-field-set>
<div class="items">
  <slot></slot>
</div>
`

const itemTemplate = /*html*/`
<div class="layout" part="layout">
  <slot>x</slot>
</div>
`

export class Picker extends useElement({
  style, props, template,
  states: ['formable'],
  setup(shadowRoot, info) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const label = shadowRoot.querySelector<HTMLDivElement>('.label')!
    const selector = new Selector(this, slot, PickerItem)
    selector.onValueChange = () => info.internals.setFormValue(selector.getFormData())
    //mediaQueryer.onChange = (v) => this.itemsOrientation === 'auto' && this.toggleAttribute('item-vertical', v)
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
      label: (v) => label.textContent = v,
    }
  }
}) { }

export class PickerItem extends useElement({
  style: itemStyle,
  props: itemProps,
  template: itemTemplate,
  states: ['focusable'],
  setup(shadowRoot) {
    const layout = shadowRoot.querySelector<HTMLDivElement>('.layout')!
    const iconSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=icon]')!
    const textSlot = shadowRoot.querySelector<HTMLSlotElement>('slot[name=text]')!
    //iconSlot.addEventListener('slotchange', () => layout.classList.toggle('has-icon', iconSlot.assignedElements().length > 0))
    //textSlot.addEventListener('slotchange', () => layout.classList.toggle('has-text', textSlot.assignedElements().length > 0))
    this.addEventListener('click', () => this.dispatchEvent(new Event(`${name}:toggle`, { bubbles: true })))
    return {
      selected: () => this.dispatchEvent(new Event(`${name}:selected`, { bubbles: true })),
      value: (_, old) => this.dispatchEvent(new CustomEvent(`${name}:valued`, { bubbles: true, detail: { old } })),
      disabled: () => this.dispatchEvent(new Event(`${name}:disabled`, { bubbles: true }))
    }
  }
}) { }

const name = Picker.define('s-picker')
const itemName = PickerItem.define('s-picker-item')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Picker
    [itemName]: PickerItem
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
    } & Picker
    [itemName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof itemProps.values>
    } & PickerItem
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