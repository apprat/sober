export const device = { touched: false }
{
  const mediaQueryList = matchMedia('(pointer:coarse)')
  device.touched = mediaQueryList.matches
  mediaQueryList.addEventListener('change', ({ matches }) => device.touched = matches)
}

const div = document.createElement('div')
div.setAttribute('style', 'position: fixed;right: 0;width: 100%;height: 100%;bottom: 0;pointer-events: none;')

export const getStackingContext = (el: Node) => {
  el.appendChild(div)
  const rect = div.getBoundingClientRect()
  el.removeChild(div)
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
}