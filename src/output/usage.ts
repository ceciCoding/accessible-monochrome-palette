import { AA_LARGE, AA_NORMAL } from '../algorithm/thresholds.js'
import type {
  BackgroundKey,
  CompatiblePair,
  CompatibilityMatrix,
  Palette,
  PaletteUsage,
  ShadeKey,
  Theme,
} from '../types.js'

const SHADE_KEYS: ShadeKey[] = ['100', '300', '600', '700', '800', '900']

const THEME_HEX = { white: '#ffffff', black: '#000000' } as const

export function buildPaletteUsage(
  palette: Palette,
  compatibility: CompatibilityMatrix,
  theme: Theme
): PaletteUsage {
  const usage = {} as PaletteUsage

  for (const fg of SHADE_KEYS) {
    const normalText: CompatiblePair[] = []
    const largeText: CompatiblePair[] = []

    for (const bg of SHADE_KEYS) {
      if (fg === bg) continue
      const entry = compatibility[fg][bg]!
      const pair: CompatiblePair = { key: bg as BackgroundKey, hex: palette[bg].hex, ratio: entry.ratio }
      if (entry.ratio >= AA_NORMAL) normalText.push(pair)
      else if (entry.ratio >= AA_LARGE) largeText.push(pair)
    }

    const themeEntry = compatibility[fg]['theme']!
    const themePair: CompatiblePair = {
      key: 'theme',
      hex: THEME_HEX[theme] as CompatiblePair['hex'],
      ratio: themeEntry.ratio,
    }
    if (themeEntry.ratio >= AA_NORMAL) normalText.push(themePair)
    else if (themeEntry.ratio >= AA_LARGE) largeText.push(themePair)

    usage[fg] = { hex: palette[fg].hex, normalText, largeText }
  }

  return usage
}
