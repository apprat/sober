import { defineElement, IntrinsicElement } from './base/core'

const name = 's-tab-item'
const props = {}

export default defineElement({
  name, props,
  setup() {
    return {
      render: () => <>
        <style jsx>{`
          :host{
            display: block;
            flex-basis: 100%;
            -webkit-user-select: none;
            user-select: none;
          }
          [part=container]{
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 48px;
          }
        `}
        </style>
        <s-ripple part="container">
          <slot></slot>
        </s-ripple>
      </>
    }
  }
})

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}