import type Item from './tab-item.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-tab";
declare const props: {
    mode: "fixed" | "scrollable";
};
declare const Component_base: {
    new (): {
        mode: "fixed" | "scrollable";
    } & {
        readonly options: Item[];
        readonly selectIndex: number;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export default class Component extends Component_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Component;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof Component;
    }
}
export {};
