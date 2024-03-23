import { builder, html } from './core/element.js';
const style = /*css*/ `
:host{
  display: table-cell;
  padding: 20px 12px;
  white-space: nowrap;
}
::slotted(s-checkbox){
  margin: -20px 8px -20px 0;
}
`;
const name = 's-th';
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
