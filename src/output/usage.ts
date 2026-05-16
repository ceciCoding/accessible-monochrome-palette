import { contrastRatioHex } from '../math/contrast.js'
import type {
  BackgroundKey,
  CompatiblePair,
  CompatibilityMatrix,
  HexColor,
  Palette,
  PaletteUsage,
  ShadeKey,
  Theme,
} from '../types.js'

const SHADE_KEYS: ShadeKey[] = ['100', '300', '600', '700', '800', '900']

const WHITE = '#ffffff' as HexColor
const BLACK = '#000000' as HexColor

export function buildPaletteUsage(
  palette: Palette,
  compatibility: CompatibilityMatrix,
  theme: Theme
): PaletteUsage {
  const backgroundHex = theme === 'white' ? WHITE : BLACK
  const usage = {} as PaletteUsage

  for (const fg of SHADE_KEYS) {
    const normalText: CompatiblePair[] = []
    const largeText: CompatiblePair[] = []

    for (const bg of SHADE_KEYS) {
      if (fg === bg) continue
      const entry = compatibility[fg][bg]!
      const pair: CompatiblePair = { key: bg as BackgroundKey, hex: palette[bg].hex, ratio: entry.ratio }
      if (entry.ratio >= 4.5) normalText.push(pair)
      else if (entry.ratio >= 3.0) largeText.push(pair)
    }

    const bgRatio = contrastRatioHex(palette[fg].hex, backgroundHex)
    const bgPair: CompatiblePair = { key: 'background', hex: backgroundHex, ratio: bgRatio }
    if (bgRatio >= 4.5) normalText.push(bgPair)
    else if (bgRatio >= 3.0) largeText.push(bgPair)

    usage[fg] = { hex: palette[fg].hex, normalText, largeText }
  }

  return usage
}
