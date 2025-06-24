import { useProps, useEvents, useElement } from './core/element.js'
import { Select } from './core/utils/select.js'
import { Theme } from './core/theme.js'

const name = 's-tab'
const itemName = 's-tab-item'
const props = useProps({
  value: ''
})
const itemProps = useProps({
  value: '',
  selected: false
})

const style = /*css*/`
:host{
  display: block;
}
`

const itemStyle = /*css*/` 
`

const template = /*html*/`
<div class="layout">
  <slot></slot>
</div>
`

const itemTemplate = /*html*/`
<div class="item">
  <slot></slot>
</div>
`

export class Tab extends useElement({
  style, props, template,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const select = new Select(this, slot, TabItem)
  }
}) { }

export class TabItem extends useElement({
  style: itemStyle, props: itemProps, template: itemTemplate,
  setup(shadowRoot) {
  }
}) { }

Tab.define(name)
TabItem.define(itemName)

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