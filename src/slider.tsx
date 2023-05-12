import { Component, define } from './core/main'

export interface Property {
  disabled: boolean
  labeled: boolean
  type: 'continuous' | 'discrete'
  orientation: 'horizontal' | 'vertical'
}

class Switch extends Component<Property> {
  property: Property = {
    type: 'continuous',
    disabled: false,
    labeled: false,
    orientation: 'horizontal'
  }
  onCreated() {
  }
  render() {
    return <>
      <style jsx>{`
        :host{
          -webkit-user-select: none;
          user-select: none;
          display: block;
          align-items: center;
          cursor: pointer;
          color: var(--s-color-primary);
          height: 40px;
        }
        :host([disabled=true]){
          pointer-events: none !important;
          filter: grayscale(.8) opacity(.6) !important;
        }
        .wrapper{
          position: relative;
          height: 100%;
        }
        .track{
          width: 100%;
          height: 4px;
          background: var(--s-color-on-surface-variant);
          border-radius: 2px;
          opacity: .38;
        }
        .track-active{
          position: absolute;
          top: 0;
          left: 0;
          background: currentColor;
          width: 50%;
          height: 4px;
        }
        .thumb{
          position: absolute;
          top: -6px;
          left: 50%;
          width: 20px;
          height: 20px;
          background: currentColor;
          border-radius: 50%;
        }
        .thumb-state{
          position: absolute;
          top: -20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: currentColor;
          opacity: .24;
          left: 49%;
        }
      `}</style>
      <div class="wrapper">
        <div class="track"></div>
        <div class="track-active"></div>
        <div class="thumb"></div>
        <div class="thumb-state"></div>
      </div>
    </>
  }
}

export default define('slider', Switch)