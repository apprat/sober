import { builder, html } from './core/element.js';
const style = /*css*/ `
:host{
  display: flex;
}
`;
const name = 's-segmented-button';
const props = {};
export default class Component extends builder({
    name, style, props,
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
