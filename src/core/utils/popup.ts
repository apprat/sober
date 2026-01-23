const orders = {
  top: ['bottom', 'left', 'right'],
  bottom: ['top', 'left', 'right'],
  left: ['right', 'top', 'bottom'],
  right: ['left', 'top', 'bottom']
}

type Options = {
  anchor: HTMLElement
  popover: HTMLElement
  gravity: keyof typeof orders
  gap: number
  shadowRoot: ShadowRoot
}

export const popup = ({ anchor, shadowRoot, popover, gravity, gap }: Options) => {
  const position = { top: 0, left: 0, origin: [] as string[] }
  popover.style.maxHeight = `${innerHeight}px`
  popover.style.maxWidth = `${innerWidth}px`
  const { offsetHeight, offsetWidth } = popover
  const rect = anchor.getBoundingClientRect()
  const vertical = { name: 'top', originIndex: 1, relative: { name: 'left', size: offsetWidth, windowSize: innerWidth, anchorSize: anchor.offsetWidth, originIndex: 0 } } as const
  const horizontal = { name: 'left', originIndex: 0, relative: { name: 'top', size: offsetHeight, windowSize: innerHeight, anchorSize: anchor.offsetHeight, originIndex: 1 } } as const
  const values = {
    top: rect.top - gap - offsetHeight,
    bottom: rect.top + gap + rect.height,
    left: rect.left - gap - offsetWidth,
    right: rect.left + gap + rect.width
  }
  const data = {
    top: { value: values.top, origin: '100%', overflowed: values.top < 0, ...vertical },
    bottom: { value: values.bottom, origin: '0%', overflowed: values.bottom + offsetHeight > innerHeight, ...vertical },
    left: { value: values.left, origin: '100%', overflowed: values.left < 0, ...horizontal },
    right: { value: values.right, origin: '0%', overflowed: values.right + offsetWidth > innerWidth, ...horizontal }
  }
  if (data.top.overflowed && data.bottom.overflowed && data.left.overflowed && data.right.overflowed) {
    position.top = (innerHeight - offsetHeight) / 2
    position.left = (innerWidth - offsetWidth) / 2
    position.origin = ['50%', '50%']
    return position
  }
  for (const k of [gravity, ...orders[gravity]]) {
    const key = k as keyof typeof orders
    const info = data[key]
    if (!info.overflowed) {
      position[info.name] = info.value
      position.origin[info.originIndex] = info.origin
      //set relative
      const { name, size, anchorSize, windowSize, originIndex } = info.relative
      position.origin[originIndex] = '50%'
      position[name] = rect[name] - (size - anchorSize) / 2
      if (position[name] < 0) {
        const is = rect[name] + size < windowSize
        position[name] = is ? rect[name] : 0
        position.origin[originIndex] = is ? `${anchorSize / 2}px` : `${rect[name] + anchorSize / 2}px`
      } else if (position[name] + size > windowSize) {
        const is = rect[name] - size > 0
        position[name] = is ? rect[name] + anchorSize - size : 0
        position.origin[originIndex] = is ? `calc(100% - ${anchorSize / 2}px)` : `calc(100% - ${windowSize - (rect[name] + anchorSize / 2)}px)`
      }
      break
    }
  }
  return position
}