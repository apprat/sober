import { Base, define } from './core'
import Ripple from './ripple'

Ripple.register()

export interface Property {
  disabled: boolean
  type: 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text'
  size: 'medium' | 'small' | 'large'
}

class Component extends Base {
  property: Property = {
    disabled: false,
    type: 'filled-tonal',
    size: 'medium'
  }
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display:inline-block;
          min-height: 40px;
          min-width: 72px;
          border-radius: 24px;
          text-transform: capitalize;
          cursor: pointer;
          user-select: none;
          position: relative;
          background: rgba(var(--color-accent),.14);
          font-weight: 500;
          --container-padding: 0 24px;
        }
        :host([disabled=true]){
          pointer-events: none !important;
          filter: grayscale(.8) opacity(.6) !important;
        }
        :host([type=elevated]){
          -webkit-box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
          box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
          background: none;
          color: rgba(var(--color-accent));
        }
        :host([type=filled]){
          background: rgba(var(--color-accent));
          color: #fff;
        }
        :host([type=outlined]){
          -webkit-box-shadow: 0 0 0 1px inset rgba(0,0,0,.2);
          box-shadow: 0 0 0 1px inset rgba(0,0,0,.2);
          background: none;
          color: rgba(var(--color-accent));
        }
        :host([type=text]){
          background: none;
          color: rgba(var(--color-accent));
          --container-padding: 0 12px;
        }
        :host([size=small]){
          min-height: 36px;
          font-size: 0.93rem;
        }
        :host([size=small]:not([type=text])){
          --container-padding: 0 20px;
        }
        :host([size=large]){
          min-height: 44px;
          font-size: 1.06rem;
        }
        :host([size=large][type=text]){
          --container-padding: 0 16px;
        }
        .container{
          border-radius: inherit;
          min-height: inherit;
          min-width: inherit;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: var(--container-padding);
        }
        ::slotted([slot=start]){
          margin: 0 8px 0 -8px;
          color: inherit;
        }
        ::slotted([slot=end]){
          margin: 0 -8px 0 8px;
          color: inherit;
        }
      `}</style>
      <s-ripple class="container" part="container">
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </s-ripple>
    </>
  }
}

export default define('s-button', Component)