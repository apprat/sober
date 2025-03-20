export const enum mediaQueries {
  mobileS = 320,
  mobileM = 375,
  mobileL = 425,
  tablet = 768,
  laptop = 1024,
  laptopL = 1440,
}

export const mediaQueryList = {
  mobileS: matchMedia(`(max-width: ${mediaQueries.mobileS}px)`),
  mobileM: matchMedia(`(max-width: ${mediaQueries.mobileM}px)`),
  mobileL: matchMedia(`(max-width: ${mediaQueries.mobileL}px)`),
  tablet: matchMedia(`(max-width: ${mediaQueries.tablet}px)`),
  laptop: matchMedia(`(max-width: ${mediaQueries.laptop}px)`),
  laptopL: matchMedia(`(max-width: ${mediaQueries.laptopL}px)`),
  anyPointerCoarse: matchMedia('(any-pointer: coarse)'),
  anyPointerFine: matchMedia('(any-pointer: fine)')
}