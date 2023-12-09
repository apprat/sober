import { builder, html, ref } from './core/element'
import Ripple from './ripple'

const style = /*css*/`
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  height: 56px;
  width: 56px;
  margin: 24px;
  border-radius: 50%;
  background: var(--s-color-primary-container,#bce9ff);
  color: var(--s-color-on-primary-container,#001f29);
  transition: box-shadow .2s;
  font-size: .875rem;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
  text-transform: capitalize;
  box-shadow: var(--s-elevation-level2,0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
}
:host([size=small]){
  height: 48px;
  width: 48px;
}
:host([extended=true]){
  padding: 0 16px;
  width: auto;
  height: 56px;
  border-radius: 30px;
}
:host(:not([extended=true])[size=large]){
  height: 72px;
  width: 72px;
}
:host(:not([extended=true])[size=large]) ::slotted(*){
  width: 36px;
  height: 36px;
}
::slotted([slot=start]){
  margin: 0 4px 0 0;
}
@media (pointer: coarse){
  :host(:active){
    box-shadow: var(--s-elevation-level4,0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12));
  }
}
@media (pointer: fine){
  :host(:hover){
    box-shadow: var(--s-elevation-level4,0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12));
  }
}
`

const name = 's-floating-action-button'
const props = {
  size: 'medium' as 'medium' | 'small' | 'large',
  extended: false,
}

export default class Component extends builder({
  name, props, propSyncs: true,
  setup() {
    const ripple = ref<Ripple>()
    return {
      watches: {
        extended: (value) => ripple.target.centered = !value
      },
      render: () => html`
        <style>${style}</style>
        <s-ripple attached="true" centered="true" ref="${ripple}"></s-ripple>
        <slot name="start"></slot>
        <slot></slot>
      `
    }
  }
}) { }

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}