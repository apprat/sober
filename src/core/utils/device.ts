const mediaQueryList = matchMedia('(pointer:coarse)')
mediaQueryList.addEventListener('change', ({ matches }) => device.touched = matches)

export const device = {
  touched: mediaQueryList.matches,
  addEventListener: (callback: (touched: boolean) => unknown) => mediaQueryList.addEventListener('change', () => callback(device.touched))
}