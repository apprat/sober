import './ripple.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-dialog";
declare const props: {
    size: "horizontal" | "vertical" | "large" | "basic" | "full";
    negative: string;
    positive: string;
};
declare const Component_base: {
    new (): {
        size: "horizontal" | "vertical" | "large" | "basic" | "full";
        negative: string;
        positive: string;
    } & {
        show: () => void;
        dismiss: () => void;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
declare class Component extends Component_base {
}
interface EventMap extends HTMLElementEventMap {
    show: Event;
    showed: Event;
    dismiss: Event;
    dismissed: Event;
    positive: Event;
    negative: Event;
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
