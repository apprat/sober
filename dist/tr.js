import { builder, html } from './core/element.js';
const style = /*css*/ `
:host{
  display: table-row;
}
`;
const name = 's-tr';
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
