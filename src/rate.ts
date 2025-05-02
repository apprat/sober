import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

type Props = {
  readOnly: boolean
  max: number
  min: number
  value: number
  step: number
}

const name = 's-rate'
const props: Props = {
  readOnly: false,
  max: 10,
  min: 0,
  value: 5,
  step: 1
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
  overflow: hidden;
  position: relative;
  font-size: 24px;
  width: calc(1em * 5);
  height: 1em;
}
.track{
  width: 100%;
  display: flex;
}
.track svg,
::slotted([slot=track]){
  fill: var(--s-color-secondary-container, ${Theme.colorSecondaryContainer});
  filter: drop-shadow(1em 0 0 var(--s-color-secondary-container, ${Theme.colorSecondaryContainer})) drop-shadow(2em 0 0 var(--s-color-secondary-container, ${Theme.colorSecondaryContainer})) drop-shadow(3em 0 0 var(--s-color-secondary-container, ${Theme.colorSecondaryContainer}));
}
.indicator{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 50%;
  overflow: hidden;
  display: flex;
}
.indicator svg,
::slotted([slot=indicator]){
  fill: var(--s-color-primary, ${Theme.colorPrimary});
  filter: drop-shadow(1em 0 0 var(--s-color-primary, ${Theme.colorPrimary})) drop-shadow(2em 0 0 var(--s-color-primary, ${Theme.colorPrimary})) drop-shadow(3em 0 0 var(--s-color-primary, ${Theme.colorPrimary})) drop-shadow(4em 0 0 var(--s-color-primary, ${Theme.colorPrimary}));
}
svg,
::slotted(*){
  height: 100%;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  flex-shrink: 0;
}
input{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0;
  margin: 0;
}
:host([readonly=true]) input{
  display: none;
}
`

const template = /*html*/`
<slot name="track" class="track" part="track">
  <svg viewBox="0 -960 960 960">
    <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
  </svg>
</slot>
<slot name="indicator" class="indicator" part="indicator">
  <svg viewBox="0 -960 960 960">
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
  </svg>
</slot>
<input
  type="range"
  max="${props.max}"
  min="${props.min}"
  step="${props.step}"
  value="${props.value}"
/>
`

class Rate extends useElement({
  style, template, props, syncProps: ['readOnly'],
  setup(shadowRoot) {
    const indicator = shadowRoot.querySelector<HTMLDivElement>('.indicator')!
    const input = shadowRoot.querySelector<HTMLInputElement>('input')!
    const update = () => {
      const value = Number(input.value)
      const percentage = ((value - this.min) * 100) / this.max - this.min
      indicator.style.width = `${percentage}%`
    }
    input.onchange = () => this.dispatchEvent(new Event('change'))
    input.oninput = () => {
      this.value = Number(input.value)
      this.dispatchEvent(new Event('input'))
    }
    return {
      max: (value) => {
        input.max = String(value)
        update()
      },
      min: (value) => {
        input.min = String(value)
        update()
      },
      step: (value) => {
        input.step = String(value)
        update()
      },
      value: (value) => {
        input.value = String(value)
        update()
      }
    }
  }
}) { }

Rate.define(name)

export { Rate }

declare global {
  interface HTMLElementTagNameMap {
    [name]: Rate
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
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
      $props: HTMLAttributes & Partial<Props>
    } & Rate
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}