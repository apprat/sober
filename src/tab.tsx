import { defineElement, IntrinsicElement } from './base/core'

const name = 's-tab'
const props = {}


export default defineElement({
  name, props,
  setup() {
    return {
      render: () => <>
        <style jsx>{`
          :host{
            display: block;
            color: var(--s-color-on-surface-variant);
            background: var(--s-color-surface);
            border: solid 1px rgba(0,0,0,.1);
          }
          [part=container]{
            display: flex;
            justify-content: center;
            position: relative;
          }
          [part=indicator]{
            position: absolute;
            bottom: 0;
            left: 0;
            width: calc(100% / 3);
            height: 3px;
            display: flex;
            justify-content: center;
          }
          .thumb{
            width: 100%;
            height: 100%;
            max-width: 56px;
            background: var(--s-color-primary);
            border-radius: 3px 3px 0 0;
          }
        `}
        </style>
        <div part="container">
          <slot></slot>
          <div part="indicator">
            <div class="thumb"></div>
          </div>
        </div>
      </>
    }
  }
})

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}