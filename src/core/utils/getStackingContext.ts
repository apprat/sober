const div = document.createElement('div')
div.setAttribute('style', 'position: fixed;right: 0;bottom: 0;width: 100%;height: 100%;pointer-events: none')

export const getStackingContext = (el: Node) => {
  el.appendChild(div)
  const DOMRect = div.getBoundingClientRect()
  el.removeChild(div)
  return {
    left: DOMRect.left,
    top: DOMRect.top,
    width: DOMRect.width,
    height: DOMRect.height
  }
}