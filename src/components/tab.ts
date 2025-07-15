import { useProps, useEvents, useElement } from '../core/element.js'
import { Select } from '../core/utils/select.js'
import { Theme } from '../core/theme.js'

const props = useProps({
  value: '',
  multiple: false
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
  name: 's-tab',
  style, props, template,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const select = new Select(this, slot, TabItem)
  }
}) { }

export class TabItem extends useElement({
  name: 's-tab-item',
  style: itemStyle,
  props: itemProps,
  template: itemTemplate,
  setup(shadowRoot) {
  }
}) { }

declare global {
  interface HTMLElementTagNameMap {
    [Tab.tagName]: Tab
    [TabItem.tagName]: TabItem
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [Tab.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
        //@ts-ignore
        [TabItem.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof itemProps>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [Tab.tagName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & Tab
    [TabItem.tagName]: new () => {
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
      [Tab.tagName]: IntrinsicElements['div'] & Partial<typeof props>
      //@ts-ignore
      [TabItem.tagName]: IntrinsicElements['div'] & Partial<typeof itemProps>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Tab.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [TabItem.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof itemProps>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [Tab.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [TabItem.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof itemProps>
    }
  }
}