import { VNode } from './runtime'

export const Fragment = null
export const jsx = (type: string | typeof Fragment, props: { [name: string]: unknown }) => new VNode(type, props)
export const jsxs = jsx