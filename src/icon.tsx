import { Base, define } from './core'

export interface Property {
}

class Component extends Base {
  property: Property = {}
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display: flex;
          width: 20px;
          height: 20px;
          justify-content: center;
          align-items: center;
          fill: currentColor;
          box-sizing: border-box;
          color: #666;
        }
      `}</style>
      <slot></slot>
    </>
  }
}

export default define('s-icon', Component)