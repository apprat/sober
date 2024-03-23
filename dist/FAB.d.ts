import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-fab";
declare const props: {
    size: "small" | "medium" | "large";
    extended: boolean;
};
declare const Component_base: {
    new (): {
        size: "small" | "medium" | "large";
        extended: boolean;
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
