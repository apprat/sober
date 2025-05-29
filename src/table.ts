import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

const name = 's-table'

const style = /*css*/`
:host{
  display: inline-block;
  font-size: .875rem;
  overflow: auto;
  border: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  border-radius: 4px;
  white-space: nowrap;
}
slot{
  display: table;
  border-collapse: collapse;
  min-width: 100%;
}
@media (pointer: fine){
  :host::-webkit-scrollbar{
    width: 6px;
    height: 6px;
    background: transparent;
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
    border-radius: 3px;
  }
  @supports not selector(::-webkit-scrollbar){
    :host{
      scrollbar-color: var(--s-color-outline-variant, ${Theme.colorOutlineVariant}) transparent;
    }
  }
}
`

const template = /*html*/`
<slot></slot>
`

export class Table extends useElement({ style, template }) { }

const theadName = 's-thead'

const theadStyle = /*css*/`
:host{
  display: table-header-group;
  font-weight: 600;
  position: sticky;
  top: 0;
  border-bottom: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  background: var(--s-color-surface-container, ${Theme.colorSurfaceContainer});
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
`

const theadTemplate =/*html*/`<slot></slot>`

export class Thead extends useElement({
  style: theadStyle,
  template: theadTemplate
}) { }

const tbodyName = 's-tbody'

const tbodyStyle = /*css*/`
:host{
  display: table-row-group;
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
::slotted(s-tr:not(:first-child)){
  border-top: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
}
`

const tbodyTemplate =/*html*/`<slot></slot>`

export class Tbody extends useElement({
  style: tbodyStyle,
  template: tbodyTemplate
}) { }


const trName = 's-tr'

const trStyle = /*css*/`
:host{
  display: table-row;
}
`

const trTemplate =/*html*/`<slot></slot>`

export class Tr extends useElement({
  style: trStyle,
  template: trTemplate,
}) { }

const thName = 's-th'

const thStyle = /*css*/`
:host{
  display: table-cell;
  padding: 12px 16px;
  text-transform: capitalize;
}
`

const thTemplate =/*html*/`<slot></slot>`

export class Th extends useElement({
  style: thStyle,
  template: thTemplate
}) { }

const tdName = 's-td'

const tdStyle = /*css*/`
:host{
  display: table-cell;
  user-select: text;
  padding: 12px 16px;
}
`

const tdTemplate = /*html*/`<slot></slot>`

export class Td extends useElement({
  style: tdStyle,
  template: tdTemplate
}) { }

Table.define(name)
Thead.define(theadName)
Tbody.define(tbodyName)
Tr.define(trName)
Th.define(thName)
Td.define(tdName)

declare global {
  interface HTMLElementTagNameMap {
    [name]: Table
    [theadName]: Thead
    [tbodyName]: Tbody
    [trName]: Tr
    [thName]: Th
    [tdName]: Td
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        //@ts-ignore
        [theadName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        //@ts-ignore
        [tbodyName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        //@ts-ignore
        [trName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        //@ts-ignore
        [thName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        //@ts-ignore
        [tdName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes
    } & Table
    [theadName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes
    } & Thead
    [tbodyName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes
    } & Tbody
    [trName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes
    } & Tr
    [thName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes
    } & Th
    [tdName]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes
    } & Td
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div']
      //@ts-ignore
      [tbodyName]: HTMLAttributes
      //@ts-ignore
      [trName]: HTMLAttributes
      //@ts-ignore
      [thName]: HTMLAttributes
      //@ts-ignore
      [tdName]: HTMLAttributes
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement>
      //@ts-ignore
      [theadName]: JSX.HTMLAttributes
      //@ts-ignore
      [tbodyName]: JSX.HTMLAttributes
      //@ts-ignore
      [trName]: JSX.HTMLAttributes
      //@ts-ignore
      [thName]: JSX.HTMLAttributes
      //@ts-ignore
      [tdName]: JSX.HTMLAttributes
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement>
      //@ts-ignore
      [theadName]: JSXInternal.HTMLAttributes
      //@ts-ignore
      [tbodyName]: JSXInternal.HTMLAttributes
      //@ts-ignore
      [trName]: JSXInternal.HTMLAttributes
      //@ts-ignore
      [thName]: JSXInternal.HTMLAttributes
      //@ts-ignore
      [tdName]: JSXInternal.HTMLAttributes
    }
  }
}