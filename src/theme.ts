import { argbFromHex, themeFromSourceColor, themeFromImage, hexFromArgb, Theme, CustomColor } from '@material/material-color-utilities'
export * as colorUtilities from '@material/material-color-utilities'

const customs = [
  { value: argbFromHex('#008000'), name: 'success', blend: true },
  { value: argbFromHex('#ffebcd'), name: 'warning', blend: true }
]

export const createScheme = (source: string | number | File | HTMLImageElement, options?: { page?: HTMLElement, customColor?: CustomColor[] }) => {
}