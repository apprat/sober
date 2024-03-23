import './ripple.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-icon-button";
declare const props: {
    disabled: boolean;
    type: "filled" | "filled-tonal" | "outlined" | "standard";
};
declare const Component_base: {
    new (): {
        disabled: boolean;
        type: "filled" | "filled-tonal" | "outlined" | "standard";
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
