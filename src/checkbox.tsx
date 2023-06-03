import { defineElement, IntrinsicElement } from './base/core'
import Ripple from './ripple'

Ripple.register()

const render = function (this: { svgData: { uncheck: string } }) {
  return <>
    <style jsx>{`
      :host{
        -webkit-user-select: none;
        user-select: none;
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        line-height: 1;
        font-size: .875rem;
        font-weight: 400;
        cursor: pointer;
        color: var(--s-color-on-surface-variant);
      }
      :host([disabled=true]){
        pointer-events: none !important;
        filter: grayscale(.8) opacity(.6) !important;
      }
      :host([checked=true]),
      :host([indeterminate=true]){
        color: var(--s-color-primary);
      }
      .wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        color: inherit;
        overflow: hidden;
        border-radius: 50%;
      }
      .icon{
        width: 24px;
        height: 24px;
        fill: currentColor;
      }
    `}</style>
    <s-ripple class="wrapper" x={0} y={0}>
      <svg class="icon" viewBox="0 0 1024 1024">
        <path ref="iconPath" d={this.svgData.uncheck}></path>
      </svg>
    </s-ripple>
    <slot></slot>
  </>
}

const name = 's-checkbox'
const props = {
  disabled: false,
  checked: false,
  indeterminate: false
}

export default defineElement({
  name, props, render,
  setup: () => ({
    svgData: {
      indeterminate: 'M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-128 426.666667H341.333333c-23.466667 0-42.666667-19.2-42.666666-42.666667s19.2-42.666667 42.666666-42.666667h341.333334c23.466667 0 42.666667 19.2 42.666666 42.666667s-19.2 42.666667-42.666666 42.666667z',
      uncheck: 'M768 810.666667H256c-23.466667 0-42.666667-19.2-42.666667-42.666667V256c0-23.466667 19.2-42.666667 42.666667-42.666667h512c23.466667 0 42.666667 19.2 42.666667 42.666667v512c0 23.466667-19.2 42.666667-42.666667 42.666667z m42.666667-682.666667H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z',
      checked: 'M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z'
    }
  }),
  created() {
    this.element.addEventListener('click', () => {
      if (this.props.indeterminate) return this.props.indeterminate = false
      this.element.checked = !this.element.checked
      this.element.dispatchEvent(new Event('change'))
    })
  },
  propsChanged(name) {
    switch (name) {
      case 'indeterminate':
        this.refs.iconPath.setAttribute('d', this.props.indeterminate ? this.svgData.indeterminate : (
          this.props.checked ? this.svgData.checked : this.svgData.uncheck
        ))
        break
      case 'checked':
        !this.props.indeterminate && this.refs.iconPath.setAttribute('d', this.props.checked ? this.svgData.checked : this.svgData.uncheck)
        break
    }
  }
})

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}