import { builder, html } from './core/element.js';
const style = /*css*/ `
:host{
  display: table-header-group;
  font-weight: 600;
  color: var(--s-color-on-surface-variant, #41474d);
}
`;
const name = 's-thead';
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
