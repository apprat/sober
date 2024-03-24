const getMark = (value) => `<!--${value}-->`;
export const html = (template, ...values) => {
    return {
        values,
        getTemplateHTML: () => {
            const mark = getMark(String(Math.random()).slice(2));
            const t = document.createElement('template');
            t.innerHTML = template.join(mark);
            return { mark, template: t };
        }
    };
};
const walkNode = (list, mark, templateValue) => {
    list.forEach((item) => {
        if (item.nodeType === Node.TEXT_NODE && item.textContent?.includes(mark))
            item.textContent = item.textContent.replaceAll(mark, () => String(templateValue.value));
        if (item.nodeType === Node.COMMENT_NODE && item.textContent && mark === getMark(item.textContent)) {
            item.parentNode.replaceChild(document.createTextNode(String(templateValue.value)), item);
        }
        if (item.nodeType === Node.ELEMENT_NODE) {
            const el = item;
            const attrs = el.getAttributeNames();
            attrs.forEach((name) => {
                const old = el.getAttribute(name);
                if (name === 'ref' && old === mark) {
                    el.removeAttribute(name);
                    return templateValue.value(el);
                }
                if (name.startsWith('@')) {
                    const [eventName, behavior] = name.slice(1).split('.'); //click.stop
                    const fn = old === mark && templateValue.value;
                    el.addEventListener(eventName, (event) => {
                        fn && fn(event);
                        if (behavior === 'stop')
                            event.stopPropagation();
                        if (behavior === 'prevent')
                            event.preventDefault();
                    }, { passive: behavior === 'passive' });
                    return el.removeAttribute(name);
                }
                old?.includes(mark) && el.setAttribute(name, old.replaceAll(mark, () => String(templateValue.value)));
            });
            walkNode(item.childNodes, mark, templateValue);
        }
    });
};
const templateHTMLCaches = {};
const documentFromHTML = (name, htmls) => {
    if (!templateHTMLCaches[name])
        templateHTMLCaches[name] = htmls.getTemplateHTML();
    const { mark, template: OldTemplate } = templateHTMLCaches[name];
    const template = OldTemplate.cloneNode(true);
    const templateValue = {
        index: 0,
        get value() {
            const value = htmls.values[this.index];
            this.index++;
            return value;
        }
    };
    walkNode(template.content.childNodes, mark, templateValue);
    return template.content;
};
const parsePropType = (value, old) => {
    if (value === undefined)
        return old;
    if (typeof old === 'string')
        return String(value);
    if (typeof old === 'number')
        return Number(value);
    if (typeof old === 'boolean') {
        if (typeof value === 'boolean')
            return value;
        return value === 'true' ? true : false;
    }
    throw new TypeError();
};
const baseStyle = new CSSStyleSheet();
baseStyle.replaceSync(/*css*/ `:host{ user-select: none;-webkit-user-select: none }`);
export const builder = (options) => {
    const map = new Map();
    const attributes = [];
    for (const key in options.props)
        attributes.push(key);
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(options.style ?? '');
    class CustomElement extends HTMLElement {
        static observedAttributes = attributes;
        constructor() {
            super();
            const shadowRoot = this.attachShadow({ mode: 'closed' });
            const realProps = { ...options.props };
            const elementState = { props: { ...options.props } };
            for (const key in realProps) {
                const set = (v) => {
                    let value = parsePropType(v, elementState.props[key]);
                    if (value === realProps[key])
                        return;
                    if (options.propSyncs === true || options.propSyncs?.includes(key)) {
                        const old = this.getAttribute(key);
                        const attrVal = String(value);
                        if (old !== null && value === elementState.props[key]) {
                            this.removeAttribute(key);
                            return;
                        }
                        if (attrVal !== old && value !== elementState.props[key]) {
                            this.setAttribute(key, attrVal);
                            return;
                        }
                    }
                    realProps[key] = value;
                    elementState.watches?.[key]?.(value);
                };
                Object.defineProperty(this, key, { enumerable: true, get: () => realProps[key], set });
            }
            const setup = options.setup?.apply(this, [shadowRoot]);
            shadowRoot.adoptedStyleSheets = [baseStyle, sheet];
            shadowRoot.appendChild(documentFromHTML(options.name, setup.render()));
            elementState.events = {
                adopted: setup.adopted,
                mounted: setup.mounted,
                unmounted: setup.unmounted
            };
            elementState.watches = setup.watches;
            setup.created?.();
            for (const key in setup.expose) {
                Object.defineProperty(this, key, { get: () => setup.expose?.[key] });
            }
            map.set(this, elementState);
        }
        connectedCallback() {
            map.get(this)?.events?.mounted?.();
        }
        disconnectedCallback() {
            map.get(this)?.events?.unmounted?.();
        }
        adoptedCallback() {
            map.get(this)?.events?.adopted?.();
        }
        attributeChangedCallback(name, _, newValue) {
            this[name] = newValue ?? undefined;
        }
    }
    CustomElement['define'] = function () {
        !customElements.get(options.name) && customElements.define(options.name, this);
    };
    return CustomElement;
};
