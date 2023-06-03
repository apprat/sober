import { defineElement, IntrinsicElement } from './base/core'
import Ripple from './ripple'

Ripple.register()

const render = () => <>
  <style jsx>{`
    :host{
      -webkit-user-select: none;
      user-select: none;
      display: inline-block;
      vertical-align: middle;
      min-width: 56px;
      height: 56px;
      margin: 16px;
      border-radius: 16px;
      text-transform: capitalize;
      position: relative;
      font-weight: 500;
      line-height: 1;
      font-size: .875rem;
      font-weight: 400;
      white-space: nowrap;
      color: var(--s-color-on-primary);
      background:  var(--s-color-primary);
      -webkit-box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, .2), 0px 2px 2px 0px rgb(0, 0, 0, .14), 0px 1px 5px 0px rgb(0, 0, 0, .12);
      box-shadow: 0px 3px 1px -2px rgb(0, 0, 0, .2), 0px 2px 2px 0px rgb(0, 0, 0, .14), 0px 1px 5px 0px rgb(0, 0, 0, .12);
      transition: box-shadow .2s;
      --container-padding: 0;
    }
    :host([type=extended]){
      min-width: 80px;
      --container-padding: 0 16px;
    }
    :host([type=extended])>slot{
      display: contents;
    }
    :host([disabled=true]){
      pointer-events: none !important;
      filter: grayscale(.8) opacity(.6) !important;
    }
    :host([size=small]){
      height: 48px;
      min-width: 48px;
    }
    :host([size=large]){
      height: 72px;
      min-width: 72px;
    }
    [part=container]{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      min-width: inherit;
      line-height: inherit;
      border-radius: inherit;
      overflow: hidden;
      padding: var(--container-padding);
      box-sizing: border-box;
    }
    slot[name=start],
    slot[name=end]{
      display: none;
    }
    :host([type=extended]) slot[name=start],
    :host([type=extended]) slot[name=end]{
      display: contents;
    }
    ::slotted([slot=start]){
      margin: 0 8px 0 0;
    }
    @media (pointer: fine){
      :host(:hover){
        -webkit-box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, .2), 0px 8px 10px 1px rgb(0, 0, 0, .14), 0px 3px 14px 2px rgb(0, 0, 0, .12);
        box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, .2), 0px 8px 10px 1px rgb(0, 0, 0, .14), 0px 3px 14px 2px rgb(0, 0, 0, .12);
      }
    }
  `}</style>
  <s-ripple part="container">
    <slot name="start"></slot>
    <slot></slot>
    <slot name="end"></slot>
  </s-ripple>
</>

const name = 's-floating-action-button'
const props = {
  disabled: false,
  type: 'normal' as 'normal' | 'extended',
  size: 'medium' as 'medium' | 'small' | 'large'
}

export default defineElement({ name, props, render })

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}