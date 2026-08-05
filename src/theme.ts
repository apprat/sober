import { argbFromHex, themeFromSourceColor, themeFromImage, hexFromArgb, Theme, CustomColor } from '@material/material-color-utilities'
export * as colorUtilities from '@material/material-color-utilities'

const customs = [
  { value: argbFromHex('#008000'), name: 'success', blend: true },
  { value: argbFromHex('#ffebcd'), name: 'warning', blend: true }
]

class Scheme {
  colors: { [name: string]: string } = {}
  customColors: { [name: string]: string } = {}
  constructor(public theme: Theme) {
    const { palettes } = theme
    this.colors = {
      '--s-color-light-scrim': hexFromArgb(palettes.neutral.tone(0)),
      '--s-color-light-primary': hexFromArgb(palettes.primary.tone(40)),
      '--s-color-light-on-primary': hexFromArgb(palettes.primary.tone(100)),
      '--s-color-light-primary-container': hexFromArgb(palettes.primary.tone(90)),
      '--s-color-light-on-primary-container': hexFromArgb(palettes.primary.tone(30)),
      '--s-color-light-secondary': hexFromArgb(palettes.secondary.tone(40)),
      '--s-color-light-on-secondary': hexFromArgb(palettes.secondary.tone(100)),
      '--s-color-light-secondary-container': hexFromArgb(palettes.secondary.tone(90)),
      '--s-color-light-on-secondary-container': hexFromArgb(palettes.secondary.tone(30)),
      '--s-color-light-tertiary': hexFromArgb(palettes.tertiary.tone(40)),
      '--s-color-light-on-tertiary': hexFromArgb(palettes.tertiary.tone(100)),
      '--s-color-light-tertiary-container': hexFromArgb(palettes.tertiary.tone(90)),
      '--s-color-light-on-tertiary-container': hexFromArgb(palettes.tertiary.tone(30)),
      '--s-color-light-error': hexFromArgb(palettes.error.tone(40)),
      '--s-color-light-on-error': hexFromArgb(palettes.error.tone(100)),
      '--s-color-light-error-container': hexFromArgb(palettes.error.tone(90)),
      '--s-color-light-on-error-container': hexFromArgb(palettes.error.tone(30)),
      '--s-color-light-surface': hexFromArgb(palettes.neutral.tone(98)),
      '--s-color-light-on-surface': hexFromArgb(palettes.neutral.tone(10)),
      '--s-color-light-surface-variant': hexFromArgb(palettes.neutralVariant.tone(90)),
      '--s-color-light-on-surface-variant': hexFromArgb(palettes.neutralVariant.tone(30)),
      '--s-color-light-surface-container-highest': hexFromArgb(palettes.neutral.tone(90)),
      '--s-color-light-surface-container-high': hexFromArgb(palettes.neutral.tone(92)),
      '--s-color-light-surface-container': hexFromArgb(palettes.neutral.tone(94)),
      '--s-color-light-surface-container-low': hexFromArgb(palettes.neutral.tone(96)),
      '--s-color-light-surface-container-lowest': hexFromArgb(palettes.neutral.tone(100)),
      '--s-color-light-inverse-surface': hexFromArgb(palettes.neutral.tone(20)),
      '--s-color-light-inverse-on-surface': hexFromArgb(palettes.neutral.tone(95)),
      '--s-color-light-inverse-primary': hexFromArgb(palettes.primary.tone(80)),
      '--s-color-light-background': hexFromArgb(palettes.neutral.tone(98)),
      '--s-color-light-on-background': hexFromArgb(palettes.neutral.tone(10)),
      '--s-color-light-outline': hexFromArgb(palettes.neutralVariant.tone(50)),
      '--s-color-light-outline-variant': hexFromArgb(palettes.neutralVariant.tone(80)),
      //dark
      '--s-color-dark-scrim': hexFromArgb(palettes.neutral.tone(0)),
      '--s-color-dark-primary': hexFromArgb(palettes.primary.tone(80)),
      '--s-color-dark-on-primary': hexFromArgb(palettes.primary.tone(20)),
      '--s-color-dark-primary-container': hexFromArgb(palettes.primary.tone(30)),
      '--s-color-dark-on-primary-container': hexFromArgb(palettes.primary.tone(90)),
      '--s-color-dark-secondary': hexFromArgb(palettes.secondary.tone(80)),
      '--s-color-dark-on-secondary': hexFromArgb(palettes.secondary.tone(20)),
      '--s-color-dark-secondary-container': hexFromArgb(palettes.secondary.tone(30)),
      '--s-color-dark-on-secondary-container': hexFromArgb(palettes.secondary.tone(90)),
      '--s-color-dark-tertiary': hexFromArgb(palettes.tertiary.tone(80)),
      '--s-color-dark-on-tertiary': hexFromArgb(palettes.tertiary.tone(20)),
      '--s-color-dark-tertiary-container': hexFromArgb(palettes.tertiary.tone(30)),
      '--s-color-dark-on-tertiary-container': hexFromArgb(palettes.tertiary.tone(90)),
      '--s-color-dark-error': hexFromArgb(palettes.error.tone(80)),
      '--s-color-dark-on-error': hexFromArgb(palettes.error.tone(20)),
      '--s-color-dark-error-container': hexFromArgb(palettes.error.tone(30)),
      '--s-color-dark-on-error-container': hexFromArgb(palettes.error.tone(90)),
      '--s-color-dark-surface': hexFromArgb(palettes.neutral.tone(6)),
      '--s-color-dark-on-surface': hexFromArgb(palettes.neutral.tone(90)),
      '--s-color-dark-surface-variant': hexFromArgb(palettes.neutralVariant.tone(30)),
      '--s-color-dark-on-surface-variant': hexFromArgb(palettes.neutralVariant.tone(80)),
      '--s-color-dark-surface-container-highest': hexFromArgb(palettes.neutral.tone(22)),
      '--s-color-dark-surface-container-high': hexFromArgb(palettes.neutral.tone(17)),
      '--s-color-dark-surface-container': hexFromArgb(palettes.neutral.tone(12)),
      '--s-color-dark-surface-container-low': hexFromArgb(palettes.neutral.tone(10)),
      '--s-color-dark-surface-container-lowest': hexFromArgb(palettes.neutral.tone(4)),
      '--s-color-dark-inverse-surface': hexFromArgb(palettes.neutral.tone(90)),
      '--s-color-dark-inverse-on-surface': hexFromArgb(palettes.neutral.tone(20)),
      '--s-color-dark-inverse-primary': hexFromArgb(palettes.primary.tone(40)),
      '--s-color-dark-background': hexFromArgb(palettes.neutral.tone(6)),
      '--s-color-dark-on-background': hexFromArgb(palettes.neutral.tone(90)),
      '--s-color-dark-outline': hexFromArgb(palettes.neutralVariant.tone(60)),
      '--s-color-dark-outline-variant': hexFromArgb(palettes.neutralVariant.tone(30)),
    }
    const inside = theme.customColors.slice(0, customs.length)
    const outside = theme.customColors.slice(customs.length)
    for (const item of inside) {
      this.colors[`--s-color-light-${item.color.name}`] = hexFromArgb(item.light.color)
      this.colors[`--s-color-light-on-${item.color.name}`] = hexFromArgb(item.light.onColor)
      this.colors[`--s-color-light-${item.color.name}-container`] = hexFromArgb(item.light.colorContainer)
      this.colors[`--s-color-light-on-${item.color.name}-container`] = hexFromArgb(item.light.onColorContainer)
      this.colors[`--s-color-dark-${item.color.name}`] = hexFromArgb(item.dark.color)
      this.colors[`--s-color-dark-on-${item.color.name}`] = hexFromArgb(item.dark.onColor)
      this.colors[`--s-color-dark-${item.color.name}-container`] = hexFromArgb(item.dark.colorContainer)
      this.colors[`--s-color-dark-on-${item.color.name}-container`] = hexFromArgb(item.dark.onColorContainer)
    }
    for (const item of outside) {
      this.customColors[`light-${item.color.name}`] = hexFromArgb(item.light.color)
      this.customColors[`light-on-${item.color.name}`] = hexFromArgb(item.light.onColor)
      this.customColors[`light-${item.color.name}-container`] = hexFromArgb(item.light.colorContainer)
      this.customColors[`light-on-${item.color.name}-container`] = hexFromArgb(item.light.onColorContainer)
      this.customColors[`dark-${item.color.name}`] = hexFromArgb(item.dark.color)
      this.customColors[`dark-on-${item.color.name}`] = hexFromArgb(item.dark.onColor)
      this.customColors[`dark-${item.color.name}-container`] = hexFromArgb(item.dark.colorContainer)
      this.customColors[`dark-on-${item.color.name}-container`] = hexFromArgb(item.dark.onColorContainer)
    }
  }
  toString() {
    let str = ''
    for (const key in this.colors) str += `${key}: ${this.colors[key]};\n`
    return str.trimEnd()
  }
  /**Please note: customColors will not be set to the element**/
  apply(page: HTMLElement) {
    for (const key in this.colors) {
      page.style.setProperty(key, this.colors[key])
    }
  }
}

export const createScheme = async (source: string | number | File | HTMLImageElement, customColors?: CustomColor[]) => {
  const customColor = [...customColors ?? [], ...customs]
  if (typeof source === 'string' || typeof source === 'number') {
    const theme = themeFromSourceColor(typeof source === 'string' ? argbFromHex(source) : source, customColor)
    return new Scheme(theme)
  }
  if (source instanceof HTMLImageElement) {
    const theme = await themeFromImage(source, customColor)
    return new Scheme(theme)
  }
  return await new Promise<Scheme>((resolve) => {
    const img = new Image()
    img.onload = async () => {
      const theme = await themeFromImage(img, customColor)
      resolve(new Scheme(theme))
    }
    img.src = URL.createObjectURL(source)
  })
}