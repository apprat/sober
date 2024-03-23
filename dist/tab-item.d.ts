import './ripple.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-tab-item";
declare const props: {
    checked: boolean;
};
declare const Component_base: {
    new (): {
        checked: boolean;
    } & {
        readonly indicator: HTMLDivElement;
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
