import { useElement } from './core/element.js'
import { Theme } from './core/theme.js'

const name = 's-table'
const props = {
}

const style = /*css*/`
:host{
  display: inline-block;
  font-size: .875rem;
  overflow: auto;
  border: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
  background: var(--s-color-surface-container-high, ${Theme.colorSurfaceContainerHigh});
  border-radius: 4px;
  white-space: nowrap;
}
.container{
  overflow: hidden;
  min-width: fit-content;
}
slot{
  display: table;
  border-collapse: collapse;
  border: solid 1px transparent;
  box-sizing: border-box;
  position: relative;
  left: -1px;
  top: -1px;
  margin-bottom: -2px;
  min-width: calc(100% + 2px);
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
  color: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
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
  color: var(--s-color-on-surface, ${Theme.colorOnSurface});
}
::slotted(s-tr:nth-child(odd)){
  background: var(--s-color-surface-container-highest, ${Theme.colorSurfaceContainerHighest});
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
  text-transform: capitalize;
  border: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
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
  border: solid 1px var(--s-color-outline-variant, ${Theme.colorOutlineVariant});
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
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props>
        //@ts-ignore
        [theadName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof theadProps>
        //@ts-ignore
        [tbodyName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof tbodyProps>
        //@ts-ignore
        [trName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof trProps>
        //@ts-ignore
        [thName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof thProps>
        //@ts-ignore
        [tdName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof tdProps>
      }
    }
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