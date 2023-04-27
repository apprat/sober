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
        }
      `}</style>
      <div class="container ">
        <slot></slot>
      </div>
    </>
  }
}

export default define('s-floating-action-button', Component)