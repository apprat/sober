import { useElement, useProps } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  startOpened: true,
  endOpened: true,
  startFloatingOpened: false,
  endFloatingOpened: false,
  $breakpointFloating: 1024
})

const style = /*css*/`
:host{
  display: flex;
  overflow: hidden;
}
:host([floating]){
  .start,
  .end{
    display: none;
  }
}
.view,
.start,
.end{
  display: block;
}
.start{
  order: -1;
}
.view{
  flex-grow: 1;
  min-width: 0;
}
::slotted(:is([slot=start], [slot=end])){
  width: 280px;
  border-width: 1px;
  height: 100%;
  pointer-events: auto;
  position: relative;
  background: var(--s-color-surface-container-low, ${scheme.color.surfaceContainerLow});
  border-color: var(--s-color-surface-variant, #DCE4E8);
}
`
const template = /*html*/`
<slot class="view" part="view"></slot>
<slot class="start" part="start" name="start"></slot>
<slot class="end" part="end" name="end"></slot>
`

export class Drawer extends useElement({
  style, template,
  props,
  setup() {
    new ResizeObserver(() => this.toggleAttribute('floating', this.offsetWidth <= this.breakpointFloating)).observe(this)
  }
}) { }

const name = Drawer.define('s-drawer')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Drawer
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
    } & Drawer
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