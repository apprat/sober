import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-icon";
declare const props: {
    type: "search" | "menu" | "none" | "close" | "arrow_back" | "arrow_drop_up" | "more_vert" | "chevron_up" | "add" | "arrow_forward" | "arrow_drop_down" | "arrow_drop_left" | "arrow_drop_right" | "more_horiz" | "done" | "chevron_down" | "chevron_left" | "chevron_right" | "light_mode" | "dark_mode" | "visibility" | "visibility_off";
};
declare const Component_base: {
    new (): {
        type: "search" | "menu" | "none" | "close" | "arrow_back" | "arrow_drop_up" | "more_vert" | "chevron_up" | "add" | "arrow_forward" | "arrow_drop_down" | "arrow_drop_left" | "arrow_drop_right" | "more_horiz" | "done" | "chevron_down" | "chevron_left" | "chevron_right" | "light_mode" | "dark_mode" | "visibility" | "visibility_off";
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
