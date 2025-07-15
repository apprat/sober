import { useProps, useEvents, useElement } from '../core/element.js'
import { Theme } from '../core/theme.js'

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
  name: 's-grid-list',
  style, props, template,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    slot.addEventListener('slotchange', () => {
      const items = slot.assignedElements() as (GridListItem | HTMLElement)[]
      console.log('slotchange', items)
    })
  }
}) { }

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
  name: 's-grid-list-item',
  style: itemStyle,
  props: itemProps,
  template: itemTemplate,
  setup(shadowRoot) {
    this.style.height = `${Math.floor(Math.random() * (300 - 80 + 1)) + 80}px`
    this.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }
}) { }

declare global {
  interface HTMLElementTagNameMap {
    [GridList.tagName]: GridList
    [GridListItem.tagName]: GridListItem
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [GridList.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
        //@ts-ignore
        [GridListItem.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof itemProps>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [GridList.tagName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<typeof props>
    } & GridList
    [GridListItem.tagName]: new () => {
      $props: HTMLAttributes & Partial<typeof itemProps>
    } & GridListItem
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [GridList.tagName]: IntrinsicElements['div'] & Partial<typeof props>
      //@ts-ignore
      [GridListItem.tagName]: IntrinsicElements['div'] & Partial<typeof itemProps>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [GridList.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [GridListItem.tagName]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof itemProps>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [GridList.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
      //@ts-ignore
      [GridListItem.tagName]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof itemProps>
    }
  }
}