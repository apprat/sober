import { builder, html } from './core/element.js';
const style = /*css*/ `
:host{
  display: table-row-group;
  color: var(--s-color-on-surface, #1a1c1e);
  position: relative;
}
::slotted(s-tr){
  border-top: solid 1px var(--s-color-outline-variant, #c1c7ce);
}
`;
const name = 's-tbody';
const props = {};
export default class Component extends builder({
    name, style, props,
    setup() {
        return {
            render: () => html `
        <slot></slot>
      `
        };
    }
}) {
}
Component.define();
