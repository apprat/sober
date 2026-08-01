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
  <svg viewBox="0 -960 960 960">
    <path d="M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-160q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448ZM480-480Z"></path>
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