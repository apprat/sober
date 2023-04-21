import { Base, define } from './core'

export interface Property {
}

class Component extends Base {
  property: Property = {
  }
  state = {
    id: 5611
  }
  onCreated() {
    console.log('crated card')
  }
  render() {
    return <>
      <style jsx>{`
        :host{
          user-select: none;
          -webkit-user-select: none;
          display: flex;
        }
      `}</style>
      <div>
        {this.state.id}
      </div>
      <button onClick={() => this.setState({ id: this.state.id + 1 })}>添加</button>
      <slot></slot>
    </>
  }
}

export default define('m-card', Component)