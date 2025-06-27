import { useProps, useEvents, useElement } from '../core/element.js'
import { Theme } from '../core/theme.js'

const name = 's-grid-list'
const props = useProps({
  mode: ['standard', 'masonry']
})

const style = /*css*/`
:host{
  display: flex;
  flex-wrap: wrap;
  background: #eee;
  position: relative;
  --grid-list-column-count: 4;
  --grid-list-column-gap: 8px;
}
::slotted(s-grid-list-item){
  width: calc(100% / var(--grid-list-column-count));
  position: absolute;
}
`

const template = /*html*/`<slot></slot>`

export class GridList extends useElement({
  style, props, template,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    slot.addEventListener('slotchange', () => {
      const items = slot.assignedElements() as (GridListItem | HTMLElement)[]
      console.log('slotchange', items)
    })
  }
}) { }


const itemName = 's-grid-list-item'
const itemProps = useProps({

})
const itemStyle = /*css*/`
:host{
  display: flex;
}
`
const itemTemplate = /*html*/`
<slot>
  Grid List Item
</slot>
`

export class GridListItem extends useElement({
  style: itemStyle, props: itemProps, template: itemTemplate,
  setup(shadowRoot) {
    this.style.height = `${Math.floor(Math.random() * (300 - 80 + 1)) + 80}px`
    this.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }
}) { }

GridList.define(name)
GridListItem.define(itemName)

declare global {
  interface HTMLElementTagNameMap {
    [name]: GridList
    [itemName]: GridListItem
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
    } & GridList
    [itemName]: new () => {
      $props: HTMLAttributes & Partial<typeof itemProps>
    } & GridListItem
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