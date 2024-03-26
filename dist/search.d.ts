import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-search";
declare const props: {
    size: "small" | "medium" | "large";
};
declare const Component_base: {
    new (): {
        size: "small" | "medium" | "large";
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
