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

const bezier = (p1: number, p2: number, p3: number, p4: number) => {
  const epsilon = 1e-6
  const maxIterations = 10
  const bezierX = (t: number): number => {
    const mt = 1 - t
    return mt * mt * mt * 0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * 1
  }
  const bezierY = (t: number): number => {
    const mt = 1 - t
    return mt * mt * mt * 0 + 3 * mt * mt * t * p3 + 3 * mt * t * t * p4 + t * t * t * 1
  }
  return (x: number): number => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < maxIterations; i++) {
      const currentX = bezierX(t)
      const diff = currentX - x
      if (Math.abs(diff) < epsilon) break
      const derivative = 3 * (1 - t) * (1 - t) * p1 + 6 * (1 - t) * t * (p2 - p1) + 3 * t * t * (1 - p2)
      if (Math.abs(derivative) < epsilon) break
      t = t - diff / derivative
      t = Math.max(0, Math.min(1, t))
    }
    return bezierY(t)
  }
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