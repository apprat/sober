type Prop = string | number | boolean;
interface TemplateHTML {
    template: HTMLTemplateElement;
    mark: string;
}
export declare const html: (template: TemplateStringsArray, ...values: (Function | Prop)[]) => {
    values: (Function | Prop)[];
    getTemplateHTML: () => TemplateHTML;
};
export declare const builder: <P extends {
    [x: string]: Prop;
} = {}, E extends {} = {}>(options: {
    name: string;
    style?: string | undefined;
    props?: P | undefined;
    propSyncs?: true | (keyof P)[] | undefined;
    setup: (this: P & HTMLElement, shadowRoot: ShadowRoot) => {
        render: () => ReturnType<typeof html>;
        created?: (() => void) | undefined;
        mounted?: (() => void) | undefined;
        unmounted?: (() => void) | undefined;
        adopted?: (() => unknown) | undefined;
        watches?: { [K in keyof P]?: ((value: P[K]) => void) | undefined; } | undefined;
        expose?: E | undefined;
    };
}) => {
    new (): P & E & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export {};
