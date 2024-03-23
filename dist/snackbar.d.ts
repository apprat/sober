import './ripple.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-snackbar";
declare const props: {
    duration: number;
    action: string;
};
declare const Component_base: {
    new (): {
        duration: number;
        action: string;
    } & {
        show: () => void;
        dismiss: () => void;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
declare class Component extends Component_base {
    static readonly show: (options: string | {
        view?: Element | undefined;
        text: string;
        duration?: number | undefined;
        action?: string | undefined;
        onAction?: ((event: Event) => boolean | undefined) | undefined;
    }) => void;
}
interface EventMap extends HTMLElementEventMap {
    show: Event;
    showed: Event;
    dismiss: Event;
    dismissed: Event;
    action: Event;
}
interface Component {
    addEventListener<K extends keyof EventMap>(type: K, listener: (this: Component, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof EventMap>(type: K, listener: (this: Component, ev: EventMap[K]) => any, options?: boolean | EventListenerOptions): void;
}
export default Component;
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
