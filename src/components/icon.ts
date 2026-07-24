import { useElement, useProps } from '../core/elements.js'

const props = useProps({
  $src: ''
})

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  width: 24px;
  font-size: 24px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  color: inherit;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  transition-timing-function: inherit;
  transition-duration: inherit;
}
svg,
object,
::slotted(*){
  width: 100%;
  height: 100%;
  fill: currentColor;
}
`

const template = /*html*/`
<slot>
  <svg viewBox="0 0 24 24">
    <circle class="outline" cx="12" cy="12" r="9" />
  </svg>
</slot>`

export class Icon extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const slot = shadowRoot.querySelector<HTMLSlotElement>('slot')!
    const svgHTML = shadowRoot.querySelector<SVGElement>('svg')!.innerHTML
    const object = document.createElement('object')
    return {
      src: async (v) => {
        if (v === '') return slot.innerHTML = svgHTML
        slot.appendChild(object)
        object.data = v
        object.onload = () => {
          const content = object.contentDocument
          if (content && content.contentType === 'image/svg+xml') {
            slot.innerHTML = (content.childNodes[0] as SVGElement).outerHTML
            object.remove()
          }
        }
      }
    }
  }
}) { }

const name = Icon.define('s-icon')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Icon
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
    } & Icon
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}