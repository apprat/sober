export const mediaQueries = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
} as const

export const mediaQueryList = {
  mobileS: matchMedia(`(max-width: ${mediaQueries.mobileS}px)`),
  mobileM: matchMedia(`(max-width: ${mediaQueries.mobileM}px)`),
  mobileL: matchMedia(`(max-width: ${mediaQueries.mobileL}px)`),
  tablet: matchMedia(`(max-width: ${mediaQueries.tablet}px)`),
  laptop: matchMedia(`(max-width: ${mediaQueries.laptop}px)`),
  laptopL: matchMedia(`(max-width: ${mediaQueries.laptopL}px)`),
  pointerCoarse: matchMedia('(pointer: coarse)')
}