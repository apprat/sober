import { Component, define } from './core/main'
import Ripple from './ripple'

Ripple.register()

export interface Property {
  disabled: boolean
  theme: 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text'
  size: 'medium' | 'small' | 'large'
}

class Button extends Component {
  property: Property = {
    disabled: false,
    theme: 'filled',
    size: 'medium'
  }
  onAdopted() {
  }
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display:inline-block;
          vertical-align: middle;
          min-height: 40px;
          border-radius: 20px;
          text-transform: capitalize;
          position: relative;
          font-size: .875rem;
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
          background: var(--s-color-primary);
          color: var(--s-color-on-primary);
          transition: box-shadow .2s;
          --container-padding: 0 24px;
        }
        :host([disabled=true]){
          pointer-events: none !important;
          filter: grayscale(.8) opacity(.6) !important;
        }
        :host([theme=elevated]){
          -webkit-box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, .2), 0px 2px 2px 0px rgb(0, 0, 0, .14), 0px 1px 5px 0px rgb(0, 0, 0, .12);
          box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, .2), 0px 2px 2px 0px rgb(0, 0, 0, .14), 0px 1px 5px 0px rgb(0, 0, 0, .12);
          color: var(--s-color-primary);
          background:  none;
        }
        :host([theme=filled-tonal]){
          background: var(--s-color-secondary-container);
          color: var(--s-color-on-secondary-container);
        }
        :host([theme=outlined]){
          -webkit-box-shadow: 0 0 0 1px inset var(--s-color-outline);
          box-shadow: 0 0 0 1px inset var(--s-color-outline);
          background: none;
          color: var(--s-color-primary);
        }
        :host([theme=text]){
          background: none;
          color: var(--s-color-primary);
          --container-padding: 0 16px;
        }
        :host([size=small]){
          min-height: 36px;
          font-size: 0.93rem;
        }
        :host([size=small]:not([theme=text])){
          --container-padding: 0 20px;
        }
        :host([size=large]){
          min-height: 44px;
          font-size: 1.06rem;
        }
        :host([size=large][theme=text]){
          --container-padding: 0 16px;
        }
        [part=container]{
          border-radius: inherit;
          min-height: inherit;
          min-width: inherit;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: var(--container-padding);
          white-space: inherit;
          line-height: inherit;
        }
        ::slotted(*){
          color: inherit;
        }
        ::slotted([slot=start]){
          margin: 0 8px 0 -8px;
        }
        ::slotted([slot=end]){
          margin: 0 -8px 0 8px;
        }
        :host([theme=text]) ::slotted([slot=start]){
          margin: 0 4px 0 -4px;
        }
        :host([theme=text]) ::slotted([slot=end]){
          margin: 0 -4px 0 4px;
        }
        @media (pointer: fine){
          :host([theme=elevated]:hover){
            -webkit-box-shadow: 0px 2px 4px -1px rgb(0, 0, 0, .2), 0px 4px 5px 0px rgb(0, 0, 0, .14), 0px 1px 10px 0px rgb(0, 0, 0, .12);
            box-shadow: 0px 2px 4px -1px rgb(0, 0, 0, .2), 0px 4px 5px 0px rgb(0, 0, 0, .14), 0px 1px 10px 0px rgb(0, 0, 0, .12);
          }
        }
      `}</style>
      <s-ripple part="container">
        <slot name="start">
        </slot>
        <slot></slot>
        <slot name="end">
        </slot>
      </s-ripple>
    </>
  }
}

export default define('button', Button)