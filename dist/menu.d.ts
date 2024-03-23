import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-menu";
declare const props: {};
declare const Component_base: {
    new (): {
        show: (element?: HTMLElement) => void;
        dismiss: () => void;
        toggle: (element?: HTMLElement) => void;
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
