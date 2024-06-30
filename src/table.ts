import { useElement, JSXAttributes } from './core/element.js'

const name = 's-table'
const props = {
}

const style = /*css*/`
:host{
  display: block;
  font-size: .875rem;
  border: solid 1px var(--s-color-outline-variant, #c7c5d0);
  background: var(--s-color-surface-container-low, #f6f2f7);
  border-radius: 8px;
  white-space: nowrap;
  overflow: hidden;
}
.container{
  display: table;
  width: 100%;
  border-collapse: collapse;
}
`

const template = /*html*/`
<div class="container" part="container">
  <slot></slot>
</div>
`

export class Table extends useElement({ style, template, props, }) { }

const theadName = 's-thead'
const theadProps = {
}

const theadStyle = /*css*/`
:host{
  display: table-header-group;
  font-weight: 600;
  color: var(--s-color-on-surface-variant, #46464f);
}
`

const theadTemplate =/*html*/`<slot></slot>`

export class Thead extends useElement({
  style: theadStyle,
  template: theadTemplate,
  props: theadProps
}) { }

const tbodyName = 's-tbody'
const tbodyProps = {
}

const tbodyStyle = /*css*/`
:host{
  display: table-row-group;
  color: var(--s-color-on-surface, #1c1b1f);
  position: relative;
}
::slotted(s-tr:nth-child(odd)){
  background: var(--s-color-surface-container-lowest, #ffffff);
}
`

const tbodyTemplate =/*html*/`<slot></slot>`

export class Tbody extends useElement({
  style: tbodyStyle,
  template: tbodyTemplate,
  props: tbodyProps
}) { }


const trName = 's-tr'
const trProps = {
}

const trStyle = /*css*/`
:host{
  display: table-row;
}
::slotted(*:first-child){
  width: 0;
}
`

const trTemplate =/*html*/`<slot></slot>`

export class Tr extends useElement({
  style: trStyle,
  template: trTemplate,
  props: trProps
}) { }

const thName = 's-th'
const thProps = {
}

const thStyle = /*css*/`
:host{
  display: table-cell;
  padding: 16px;
}
`

const thTemplate =/*html*/`<slot></slot>`

export class Th extends useElement({
  style: thStyle,
  template: thTemplate,
  props: thProps
}) { }

const tdName = 's-td'
const tdProps = {
}

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
  template: tdTemplate,
  props: tdProps
}) { }

Table.define(name)
Thead.define(theadName)
Tbody.define(tbodyName)
Tr.define(trName)
Th.define(thName)
Td.define(tdName)

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