import { defineElement, IntrinsicElement } from './base/core'

const render = () => <>
  <style jsx>{`
  :host{
    -webkit-user-select: none;
    user-select: none;
    display: inline-flex;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    fill: currentColor;
    box-sizing: border-box;
  }
  :host([size=small]){
    width: 20px;
    height: 20px
  }
  :host([size=large]){
    width: 40px;
    height: 40px;
  }
`}</style>
  <slot></slot>
</>

const name = 's-icon'
const props = {
  size: 'medium' as 'medium' | 'small' | 'large'
}

export default defineElement({ name, props, render })

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}