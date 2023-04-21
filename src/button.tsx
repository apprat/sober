import { Base, define } from './core'

export interface Property {
  disabled: boolean
  raised: boolean
  theme: 'light' | 'dark'
  mode: 'normal' | 'icon' | 'fab'
  size: 'normal' | 'small' | 'large'
}

class Component extends Base {
  property: Property = {
    disabled: false,
    raised: false,
    theme: 'dark',
    mode: 'normal',
    size: 'normal'
  }
  onCreated() {

  }
  render() {
    return <>
      <style jsx>{`
        :host{
          user-select: none;
          -webkit-user-select: none;
          display: inline-flex;
          color: #fff;
          background: rgba(var(--color-accent));
          height: 36px;
          padding: 0 12px;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 2px;
          text-transform: capitalize;
          font-size: .93rem;
        }
        :host([disabled=true]){
          pointer-events: none;
          filter: grayscale(1) opacity(.6);
        }
        :host([raised=true]){
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2);
        }
      `}</style>
      <slot>nihs</slot>
    </>
  }
}

export default define('m-button', Component)