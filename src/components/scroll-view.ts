import { useElement, useProps } from '../core/element.js'
import { scrollbarStyle } from '../core/style/scrollbar.js'

const style = /*css*/`
:host{
  display: block;
}
`

const template = /*html*/`<slot></slot>`

export class ScrollView extends useElement({
  name: 's-scroll-view',
  style: [scrollbarStyle, style],
  template,
  setup() {
    this.addEventListener('touchstart', () => {
      if (this.scrollHeight === this.offsetHeight && this.scrollWidth === this.offsetWidth) return
      this.dispatchEvent(new Event(`${this.tagName.toLocaleLowerCase()}-start`, { bubbles: true }))
    }, { passive: true })
  }
}) { }

declare global {
  interface HTMLElementTagNameMap {
    [ScrollView.tagName]: ScrollView
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [ScrollView.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [ScrollView.tagName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes
    } & ScrollView
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [ScrollView.tagName]: IntrinsicElements['div']
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [ScrollView.tagName]: JSX.HTMLAttributes<HTMLElement>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [ScrollView.tagName]: JSXInternal.HTMLAttributes<HTMLElement>
    }
  }
}