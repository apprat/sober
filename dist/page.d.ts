import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-page";
declare const props: {
    theme: "light" | "dark" | "auto";
};
declare const Component_base: {
    new (): {
        theme: "light" | "dark" | "auto";
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
