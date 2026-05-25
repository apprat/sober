const pointerMedia = matchMedia('(any-pointer: coarse)')
const pointerMedia2 = matchMedia('(any-pointer: fine)')
const orientationMedia = matchMedia('(orientation: portrait)')

export const device = {
  get touchEnabled() {
    return pointerMedia.matches
  },
  get mouseEnabled() {
    return pointerMedia2.matches
  },
  orientation: {
    get portrait() {
      return orientationMedia.matches
    }
  }
}