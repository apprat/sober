import { Ref } from './main'

export interface VNode {
  type: string | null
  props: Props
}

interface Props {
  [key: string]: number | string | boolean | Function | Ref | VNode | VNode[] | undefined
  children: VNode[] | VNode | string | undefined
}

interface Mark {
  svg?: boolean
}

export const createElement = (vnode: VNode, mark: Mark = {}) => {
  if (vnode.type === 'svg') mark.svg = true
  const element = vnode.type === null ? document.createDocumentFragment() : (
    mark.svg ? document.createElementNS('http://www.w3.org/2000/svg', vnode.type) : document.createElement(vnode.type)
  )
  const children = Array.isArray(vnode.props.children) ? vnode.props.children : [vnode.props.children]
  children.forEach((item) => item && element.append(typeof item === 'string' ? item : createElement(item, mark)))
  if (mark.svg) mark.svg = false
  if (vnode.type === null) return element
  for (const key in vnode.props) {
    if (key === 'children') continue
    const item = vnode.props[key]
    if (key.startsWith('on') && typeof item === 'function') {
      element.addEventListener(key.slice(2), (e) => item(e))
      continue
    }
    if (key === 'ref' && item instanceof Ref) {
      item.value = element as never
      continue
    }
    (element as Element).setAttribute(key, String(item))
  }
  return element
}