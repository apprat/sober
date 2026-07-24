import { bezier } from './bezier.js'

const parseEasing = (easing: string): readonly [number, number, number, number] => {
  const keywords = {
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    'ease-in': [0.42, 0, 1, 1],
    'ease-out': [0, 0, 0.58, 1],
    'ease-in-out': [0.42, 0, 0.58, 1]
  } as const
  if (easing in keywords) return keywords[easing as keyof typeof keywords]
  const match = easing.match(/cubic-bezier\(([^)]+)\)/)
  if (match) return match[1].split(',').map(Number).filter(n => !isNaN(n)) as never
  return keywords.ease
}

export const scrollElement = (options: { element: HTMLElement, left?: number, top?: number, duration: number, easing?: string }) => {
  const element = options.element as { _animationId?: number, _onmove?: () => void } & HTMLElement
  if (element._onmove) element._onmove()
  const startY = element.scrollTop
  const startX = element.scrollLeft
  if (startY === options.top && startX === options.left) return
  const distanceY = (options.top ?? startY) - startY
  const distanceX = (options.left ?? startX) - startX
  const startTime = performance.now()
  const bezierFunction = bezier(...parseEasing(options.easing ?? 'ease'))
  element._onmove = () => {
    element._animationId && cancelAnimationFrame(element._animationId)
    element._onmove && element.removeEventListener('touchmove', element._onmove)
  }
  element.addEventListener('touchmove', element._onmove)
  const animate = () => {
    const time = performance.now() - startTime
    const progress = Math.min(time / options.duration, 1)
    const ease = bezierFunction(progress)
    if (options.top !== undefined) element.scrollTop = startY + distanceY * ease
    if (options.left !== undefined) element.scrollLeft = startX + distanceX * ease
    if (progress < 1) {
      element._animationId = requestAnimationFrame(animate)
      return
    }
    delete element._animationId
  }
  element._animationId = requestAnimationFrame(animate)
}