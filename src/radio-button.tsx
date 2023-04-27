import { Base, define } from './core'

export interface Property {
}

class Component extends Base {
  property: Property = {}
  state = {}
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display: flex;
        }
      `}</style>
      <slot></slot>
    </>
  }
}

export default define('s-radio-button', Component)