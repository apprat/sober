import { builder, html } from './core/element.js';
import './ripple.js';
const style = /*css*/ `
:host{
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--s-color-on-surface-variant, #41474d);
  position: relative;
  box-sizing: border-box;
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 38%, transparent) !important;
}
:host([type=filled]){
  background: var(--s-color-primary, #006495);
  color: var(--s-color-on-primary, #ffffff);
}
:host([type=filled][disabled=true]){
  background: color-mix(in srgb ,var(--s-color-on-surface, #1a1c1e) 12%, transparent) !important;
}
:host([type=filled-tonal]){
  background: var(--s-color-secondary-container, #d4e4f6);
  color: var(--s-color-on-secondary-container, #0d1d29);
}
:host([type=filled-tonal][disabled=true]){
  background: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 12%, transparent) !important;
}
:host([type=outlined]){
  border: solid 1px var(--s-color-outline, #72787e);
}
:host([type=outlined][disabled=true]){
  background: none !important;
  border-color: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 12%, transparent);
}
`;
const name = 's-icon-button';
const props = {
    disabled: false,
    type: 'standard',
};
export default class Component extends builder({
    name, style, props, propSyncs: true,
    setup() {
        return {
            render: () => html `
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
        <s-ripple attached="true" centered="true"></s-ripple>
      `
        };
    }
}) {
}
Component.define();
