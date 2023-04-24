import { Base, define } from './core'

export interface Property {
  disabled: boolean
  elevated: boolean
  theme: 'light' | 'dark'
  size: 'normal' | 'small' | 'large'
}

class Component extends Base {
  static dialog() {

  }
  property: Property = {
    disabled: false,
    elevated: false,
    theme: 'dark',
    size: 'normal'
  }
  onCreated() {

  }
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display: inline-flex;
          color: #fff;
          background: rgba(var(--color-accent));
          height: 36px;
          padding: 0 16px;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 32px;
          text-transform: capitalize;
          font-size: .93rem;
        }
        :host([disabled=true]){
          pointer-events: none;
          filter: grayscale(1) opacity(.4);
        }
        :host([elevated=true]){
          -webkit-box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
          box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        }
      `}</style>
      <slot>nihs</slot>
    </>
  }
}

export default define('m-button', Component)