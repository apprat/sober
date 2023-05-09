import { Component, define } from './core/main'

export interface Property {
}

class RadioButton extends Component {
  property: Property = {
  }
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
        }
      `}</style>
      <div>
        <slot></slot>
        <button onClick={() => { }} type="submmit">添加</button>
      </div>
    </>
  }
}

export default define('radio-button', RadioButton)