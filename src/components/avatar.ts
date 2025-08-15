import { useElement, useProps } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({

})

const style = /*css*/`
:host{
  display: block;
}
.scroll{
  overflow: auto;
  height: 200px;
}
`

const template = /*html*/`
<div class="scroll">
  12
  <h1 style="height: 800px"></h1>
  32
</div>
`

export class Avatar extends useElement({
  style, props, template,
  setup() {
  }
}) { }

const name = Avatar.define('s-avatar')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Avatar
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
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
    } & Avatar
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props>
    }
  }
}