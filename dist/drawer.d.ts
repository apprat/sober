import type { JSXAttributes } from './core/types/HTMLAttributes.js';
type Type = 'start' | 'end';
type Mode = 'static' | 'fixed';
declare const name = "s-drawer";
declare const props: {};
declare const Component_base: {
    new (): {
        show: (type?: Type, mode?: Mode) => void;
        dismiss: (type?: Type, mode?: Mode) => void;
        toggle: (type?: Type, mode?: Mode) => void;
        readonly mode: "static" | "fixed";
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
