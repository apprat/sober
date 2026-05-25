import { useProps, useElement } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import './ripple.js'

const props = useProps({

})

const style = /*css*/`
:host{
  display: contents;
  border-radius: inherit;
}
.trigger{
  position: absolute;
  inset: 0;
  border-radius: inherit;
}
dialog{
  border: none;
  background: #fff;
  width: 256px;
  height: 256px;
  cursor: auto;
  box-shadow: ${scheme.elevation.level5};
  &::backdrop{
    opacity: 0;
  }
}
`

const template = /*html*/`
<div class="trigger"></div>
<dialog></dialog>
`

export class PopupOrDialog extends useElement({
  style, props, template,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector<HTMLDivElement>('.trigger')!
    const dialog = shadowRoot.querySelector<HTMLDialogElement>('dialog')!
    //dialog.onclick = dialog.onpointerdown = (e: Event) => e.stopPropagation()
    trigger.onclick = () => dialog.showModal()
  }
}) { }

const name = PopupOrDialog.define('s-popup-or-dialog')

declare global {
  interface HTMLElementTagNameMap {
    [name]: PopupOrDialog
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
    } & PopupOrDialog
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