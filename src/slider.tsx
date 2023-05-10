import { Component, define } from './core/main'

export interface Property {
  disabled: boolean
  checked: boolean
}

class Switch extends Component<Property> {
  property: Property = {
    disabled: false,
    checked: false
  }
  onCreated() {
    this.element.addEventListener('click', () => this.element.checked = !this.element.checked)
  }
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
          line-height: 1;
          cursor: pointer;
          color: var(--s-color-on-surface-variant);
        }
        :host([disabled=true]){
          pointer-events: none !important;
          filter: grayscale(.8) opacity(.4) !important;
        }
        :host([checked=true]){
          color: var(--s-color-primary);
        }
        :host([checked=true]) .track{
          background: var(--s-color-primary);
          -webkit-box-shadow:none;
          box-shadow: none;
        }
        :host([checked=true]) .state{
          transform: translateX(16px);
          background: var(--s-color-primary);
        }
        :host([checked=true]) .thumb{
          background: var(--s-color-on-primary);
          transform: scale(1.5) translateX(16px);
        }
        :host(:active) .state{
          filter: opacity(.2);
        }
        .track{
          display: flex;
          align-items: center;
          width: 52px;
          height: 32px;
          border-radius: 20px;
          background: var(--s-color-surface-variant);
          -webkit-box-shadow: 0 0 0 2px inset var(--s-color-outline);
          box-shadow: 0 0 0 2px inset var(--s-color-outline);
          position: relative;
        }
        .state{
          position: absolute;
          left: 0;
          width: 40px;
          height: 40px;
          background: var(--s-color-outline);
          filter: opacity(0);
          border-radius: 50%;
          transform: translateX(-4px);
          transform-origin: left;
          transition: transform .2s,filter .2s;
        }
        .thumb{
          background: var(--s-color-outline);
          border-radius: 50%;
          width: 16px;
          height: 16px;
          transform: scale(1) translateX(8px);
          transition: transform .2s;
          transform-origin: left;
          position: relative;
        }
        @media (pointer: fine){
          :host(:hover) .state{
            filter: opacity(.2);
          }
        }
      `}</style>
      <div class="track">
        <div class="state"></div>
        <div class="thumb"></div>
      </div>
    </>
  }
}

export default define('slider', Switch)