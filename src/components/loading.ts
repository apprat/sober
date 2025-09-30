import { useProps, useElement } from '../core/element.js'
import * as scheme from '../core/scheme.js'

const props = useProps({
  variant: ['default', 'contained']
})

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  width: 48px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  color: var(--s-color-primary, ${scheme.color.primary});
}
:host([variant=contained]){
  background: var(--s-color-secondary-container, ${scheme.color.secondaryContainer});
}
@keyframes loading{ 
  0%{ 
    transform: rotate(0deg);
  }
  20%{
    transform: rotate(180deg);
    clip-path: polygon(15% 50%, 11% 37%, 21% 29%, 25% 17%, 38% 17%, 50% 10%, 85% 50%, 89% 37%, 79% 29%, 75% 17%, 62% 17%, 50% 10%, 85% 50%, 89% 63%, 79% 71%, 75% 83%, 62% 83%, 50% 90%, 15% 50%, 11% 63%, 21% 71%, 25% 83%, 38% 83%, 50% 90%);
  }
  40%{
    transform: rotate(270deg);
    clip-path: polygon(32% 50%, 28% 50%, 15% 30%, 24% 17%, 35% 4%, 50% 9%, 68% 50%, 72% 50%, 85% 30%, 76% 17%, 65% 4%, 50% 9%, 68% 50%, 72% 50%, 85% 70%, 76% 83%, 65% 96%, 50% 91%, 32% 50%, 28% 50%, 15% 70%, 24% 83%, 35% 96%, 50% 91%);
  }
  60%{
    transform: rotate(360deg);
    clip-path: polygon(2% 50%, 5% 37%, 24% 27%, 31% 13%, 33% 8%, 50% 3%, 98% 50%, 95% 37%, 76% 27%, 69% 13%, 67% 8%, 50% 3%, 98% 50%, 95% 63%, 76% 73%, 69% 87%, 67% 92%, 50% 97%, 2% 50%, 5% 63%, 24% 73%, 31% 87%, 33% 92%, 50% 97%);
  }
  80%{
    transform: rotate(540deg);
    clip-path: polygon(5% 50%, 19% 34%, 25% 28%, 34% 18%, 38% 15%, 50% 5%, 95% 50%, 81% 34%, 75% 28%, 66% 18%, 62% 15%, 50% 5%, 95% 50%, 81% 66%, 75% 72%, 66% 82%, 62% 85%, 50% 95%, 5% 50%, 19% 66%, 25% 72%, 34% 82%, 38% 85%, 50% 95%);
  }
  100%{
    transform: rotate(720deg);
  }
  0%, 100%{
    clip-path: polygon(15% 50%, 2% 36%, 21% 30%, 19% 11%, 38% 17%, 50% 1%, 85% 50%, 98% 36%, 79% 30%, 81% 11%, 62% 17%, 50% 1%, 85% 50%, 98% 64%, 79% 70%, 81% 89%, 62% 83%, 50% 99%, 15% 50%, 2% 64%, 21% 70%, 19% 89%, 38% 83%, 50% 99%);
  }
}
.layout{
  background: currentColor;
  width: 32px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  animation: loading 5s infinite cubic-bezier(0.4, 0, 0.2, 1), steps(8), linear;
}
`

const template = /*html*/`
<div class="layout" part="layout"></div>
`

export class Loading extends useElement({
  style, template
}) { }

const name = Loading.define('s-loading')

declare global {
  interface HTMLElementTagNameMap {
    [name]: Loading
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
    } & Loading
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