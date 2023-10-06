export const device = { touched: false }
{
  const mediaQueryList = matchMedia('(pointer:coarse)')
  device.touched = mediaQueryList.matches
  mediaQueryList.addEventListener('change', ({ matches }) => device.touched = matches)
}