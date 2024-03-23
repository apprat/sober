import { builder, html } from './core/element.js';
const style = /*css*/ `
:host{
  display: flex;
  justify-content: center;
  overflow: hidden;
  background: var(--s-color-surface, #fcfcff);
  box-shadow: var(--s-elevation-level2, 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12));
}
`;
const name = 's-navigation-bar';
const props = {};
export default class Component extends builder({
    name, style, props, propSyncs: true,
    setup() {
        let options = [];
        let selectIndex = -1;
        let changing = false;
        const slotChange = () => {
            options = Array.from(this.children);
            selectIndex = options.findIndex((item) => item.checked);
        };
        this.addEventListener('item:change', (event) => {
            event.stopPropagation();
            if (changing)
                return;
            changing = true;
            if (!event.target)
                return;
            const target = event.target;
            selectIndex = -1;
            options.forEach((item, index) => {
                if (item === target && target.checked)
                    return selectIndex = index;
                item.checked && (item.checked = false);
            });
            changing = false;
            this.dispatchEvent(new Event('change'));
        });
        return {
            expose: {
                get options() {
                    return options;
                },
                get selectIndex() {
                    return selectIndex;
                }
            },
            render: () => html `
        <slot @slotchange="${slotChange}"></slot>
      `
        };
    }
}) {
}
Component.define();
