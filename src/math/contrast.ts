import { hexToRGB } from './color.js'
import type { HexColor, RGB } from '../types.js'

export function toLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

export function relativeLuminance(rgb: RGB): number {
  return (
    0.2126 * toLinear(rgb.r) +
    0.7152 * toLinear(rgb.g) +
    0.0722 * toLinear(rgb.b)
  )
}

export function contrastRatio(a: RGB, b: RGB): number {
  const l1 = Math.max(relativeLuminance(a), relativeLuminance(b))
  const l2 = Math.min(relativeLuminance(a), relativeLuminance(b))
  const ratio = (l1 + 0.05) / (l2 + 0.05)
  return Math.round(ratio * 100) / 100
}

export function contrastRatioHex(a: HexColor, b: HexColor): number {
  return contrastRatio(hexToRGB(a), hexToRGB(b))
}
