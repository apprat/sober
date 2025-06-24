import { useProps, useEvents, useElement, useThrottle, useThrottleDelay } from './core/element.js'
import { Theme } from './core/theme.js'

const name = 's-list'
const props = useProps({
  mode: ['standard', 'masonry']
})

const style = /*css*/`
:host{
  display: block;
  background: #eee;
}
`

const template = /*html*/`
<div class="before"></div>
<slot></slot>
<div class="after"></div>
`

export class List extends useElement({
  style, props, template,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const items = new Map<HTMLElement, IntersectionObserver>()
    const visibleItems: HTMLElement[] = []
    const render = () => {
      console.log('render', visibleItems)
    }
    // slot.addEventListener('slotchange', () => {
    //   const items = slot.assignedElements() as (ListItem | HTMLElement)[]
    //   items.forEach((item) => {
    //     const obs = new IntersectionObserver(([entry]) => {
    //       const isVisible = entry.intersectionRatio > 0
    //       if (isVisible && !visibleItems.includes(item)) visibleItems.push(item)
    //       if (!isVisible && visibleItems.includes(item)) visibleItems.splice(visibleItems.indexOf(item), 1)
    //       useThrottleDelay(render)
    //     })
    //     obs.observe(item)
    //   })
    // })
  }
}) { }


const itemName = 's-list-item'
const itemProps = useProps({

})
const itemStyle = /*css*/`
:host{
  display: flex;
  background: #336699;
  border-top: solid 1px #999;
  color: #fff;
  padding: 8px 16px;
}
`
const itemTemplate = /*html*/`
<slot>
  Grid List Item
</slot>
`

export class ListItem extends useElement({
  style: itemStyle, props: itemProps, template: itemTemplate,
  setup(shadowRoot) {
    //this.style.height = `${Math.floor(Math.random() * (300 - 80 + 1)) + 80}px`
    //this.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }
}) { }

List.define(name)
ListItem.define(itemName)

declare global {
  interface HTMLElementTagNameMap {
    [name]: List
    [itemName]: ListItem
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
    } & List
    [itemName]: new () => {
      $props: HTMLAttributes & Partial<typeof itemProps>
    } & ListItem
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