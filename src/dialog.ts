import { builder, html, ref } from './core/element'
import './ripple'

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
}
`

const name = 's-dialog'
const props = {
  size: 'basic' as 'basic' | 'full-screen',
  positive: '',
  negative: ''
}

export const enum EventCode {
  SCRIM,
  POSITIVE_BUTTON,
  NEGATIVE_BUTTON
}

export default class Component extends builder({
  name, props, propSyncs: ['size'],
  setup() {

    return {
      render: () => html`
        <style>${style}</style>
        <slot name="trigger"></slot>
      `
    }
  }
}) {
}

Component.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface GlobalEventHandlersEventMap {
    dimiss: CustomEvent<{ code: EventCode }>
    show: Event
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
