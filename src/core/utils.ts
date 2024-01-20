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
  const DOMRect = div.getBoundingClientRect()
  el.removeChild(div)
  return {
    left: DOMRect.left,
    top: DOMRect.top,
    width: DOMRect.width,
    height: DOMRect.height
  }
}

export const animate = (callback: (progress: number) => void, duration: number) => {
  let startTime: number
  const run = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const elapsedTime = timestamp - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    callback(progress)
    if (progress < 1) requestAnimationFrame(run)
  }
  requestAnimationFrame(run)
}