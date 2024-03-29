import { builder, html } from './core/element.js';
import './ripple.js';
const style = /*css*/ `
:host{
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--s-color-on-surface, #1a1c1e);
  height: 100%;
  min-width: 80px;
  padding: 0 24px;
  text-transform: capitalize;
  font-weight: 500;
  font-size: .875rem;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  border-left: solid 1px var(--s-color-outline, #72787e);
}
:host(:first-child){
  border-left-color: transparent;
  margin-left: -1px;
}
:host([checked=true]){
  background: var(--s-color-secondary-container, #d4e4f6);
  color: var(--s-color-on-secondary-container, #0d1d29);
}
:host([disabled=true]){
  pointer-events: none;
  color: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 38%, transparent);
}
::slotted(s-icon){
  width: 18px;
  height: 18px;
  margin-right: 4px;
  flex-shrink: 0;
  pointer-events: none;
}
`;
const name = 's-segmented-button-item';
const props = {
    checked: false,
    disabled: false
};
export default class Component extends builder({
    name, style, props, propSyncs: true,
    setup() {
        this.addEventListener('click', () => this.checked = true);
        return {
            watches: {
                checked: () => {
                    if (!this.parentNode)
                        return;
                    this.dispatchEvent(new Event('item:change', { bubbles: true }));
                }
            },
            render: () => html `
        <slot name="start"></slot>
        <slot></slot>
        <s-ripple class="ripple" attached="true"></s-ripple>
      `
        };
    }
}) {
}
Component.define();
