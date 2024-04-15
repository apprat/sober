import { builder, html } from './core/element.js'
import type { JSXAttributes } from './core/types/HTMLAttributes.js'

const style = /*css*/`
:host{
  display: block;
  overflow: hidden;
  font-size: .875rem;
  border: solid 1px var(--s-color-outline-variant, #c1c7ce);
  border-radius: 8px;
  overflow: auto;
  white-space: nowrap;
}
.container{
  display: table;
  width: 100%;
  border-collapse: collapse;
}
@media (pointer: fine){
  :host::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }
  :host::-webkit-scrollbar-thumb{
    background: var(--s-color-outline-variant, #c1c7ce);
    border-radius: 2px;
  }
}
`

const name = 's-table'
const props = {
}

export default class Table extends builder({
  name, style, props,
  setup() {
    return {
      render: () => html`
        <div class="container" part="container">
          <slot></slot>
        </div>
      `
    }
  }
}) { }


const theadStyle = /*css*/`
:host{
  display: table-header-group;
  font-weight: 600;
  color: var(--s-color-on-surface-variant, #41474d);
}
`

const theadName = 's-thead'
const theadProps = {
}

export class Thead extends builder({
  name: theadName,
  style: theadStyle,
  props: theadProps,
  setup() {
    return {
      render: () => html`
        <slot></slot>
      `
    }
  }
}) { }

const tbodyStyle = /*css*/`
:host{
  display: table-row-group;
  color: var(--s-color-on-surface, #1a1c1e);
  position: relative;
}
::slotted(s-tr){
  border-top: solid 1px var(--s-color-outline-variant, #c1c7ce);
}
`

const tbodyName = 's-tbody'
const tbodyProps = {
}

export class Tbody extends builder({
  name: tbodyName,
  style: tbodyStyle,
  props: tbodyProps,
  setup() {
    return {
      render: () => html`
        <slot></slot>
      `
    }
  }
}) { }

const trStyle = /*css*/`
:host{
  display: table-row;
}
`

const trName = 's-tr'
const trProps = {
}

export class Tr extends builder({
  name: trName,
  style: trStyle,
  props: trProps,
  setup() {
    return {
      render: () => html`
        <slot></slot>
      `
    }
  }
}) { }

const thStyle = /*css*/`
:host{
  display: table-cell;
  padding: 16px;
}
:host(:not(:first-child)){
  width: 0;
  text-align: right;
}
`

const thName = 's-th'
const thProps = {
}

export class Th extends builder({
  name: thName,
  style: thStyle,
  props: thProps,
  setup() {
    return {
      render: () => html`
        <slot></slot>
      `
    }
  }
}) { }

const tdStyle = /*css*/`
:host{
  display: contents;
  user-select: text;
  padding: 12px 16px;
}
:host(:not(:first-child)){
  text-align: right;
}
td{
  padding: inherit;
  vertical-align: middle;
}
`

const tdName = 's-td'
const tdProps = {
  colspan: 1,
  rowspan: 1
}

export class Td extends builder({
  name: tdName,
  style: tdStyle,
  props: tdProps,
  setup() {
    let td: HTMLTableCellElement
    return {
      watches: {
        colspan: (value) => td.colSpan = value,
        rowspan: (value) => td.rowSpan = value
      },
      render: () => html`
        <td ref="${(el: HTMLTableCellElement) => td = el}" rowspan="${this.rowspan}" colspan="${this.colspan}">
          <slot></slot>
        </td>
      `
    }
  }
}) { }

Table.define()
Thead.define()
Tbody.define()
Tr.define()
Th.define()
Td.define()

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
      [theadName]: Partial<typeof theadProps> & JSXAttributes
      [tbodyName]: Partial<typeof tbodyProps> & JSXAttributes
      [trName]: Partial<typeof trProps> & JSXAttributes
      [thName]: Partial<typeof thProps> & JSXAttributes
      [tdName]: Partial<typeof tdProps> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Table
    [theadName]: Thead
    [tbodyName]: Tbody
    [trName]: Tr
    [thName]: Th
    [tdName]: Td
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
    [theadName]: typeof theadProps
    [tbodyName]: typeof tbodyProps
    [trName]: typeof trProps
    [thName]: typeof thProps
    [tdName]: typeof tdProps
  }
}