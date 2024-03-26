import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-menu";
declare const props: {
    group: "" | "start" | "end";
};
declare const Component_base: {
    new (): {
        group: "" | "start" | "end";
    } & {
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
