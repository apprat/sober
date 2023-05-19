import { Component, define, IntrinsicElement } from './base/core'

export interface Property {
  size: 'medium' | 'small' | 'large'
}

class Constructor extends Component {
  property: Property = {
    size: 'medium'
  }
  render() {
    return <>
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
  }
}

const name = 's-icon'
export default define(name, Constructor)

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, Property> { }
  }
}