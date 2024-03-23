import { builder, html } from './core/element.js';
const style = /*css*/ `
:host{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 18px;
  height: 18px;
  background: var(--s-color-error, #ba1a1a);
  color: var(--s-color-on-error, #ffffff);
  border-radius: 12px;
  padding: 0 3px;
  font-size: .625rem;
  box-sizing: border-box;
}
:host(:empty){
  min-width: 8px;
  height: 8px;
  margin: 5px;
}
`;
const name = 's-badge';
const props = {};
export default class Component extends builder({
    name, props, style,
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
