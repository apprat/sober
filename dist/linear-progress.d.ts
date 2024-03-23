import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-linear-progress";
declare const props: {
    indeterminate: boolean;
    max: number;
    value: number;
};
declare const Component_base: {
    new (): {
        indeterminate: boolean;
        max: number;
        value: number;
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
