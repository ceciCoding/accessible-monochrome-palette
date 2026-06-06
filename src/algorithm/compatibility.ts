import { contrastRatioHex } from '../math/contrast.js'
import { AA_LARGE, AA_NORMAL } from './thresholds.js'
import type {
  CompatibilityEntry,
  CompatibilityMatrix,
  ContrastLevel,
  HexColor,
  MatrixKey,
  Palette,
  Theme,
} from '../types.js'

const SHADE_KEYS: MatrixKey[] = ['100', '300', '600', '700', '800', '900']
const ALL_KEYS: MatrixKey[] = ['theme', ...SHADE_KEYS]

const WHITE = '#ffffff' as HexColor
const BLACK = '#000000' as HexColor

export function buildCompatibilityMatrix(palette: Palette, theme: Theme): CompatibilityMatrix {
  const themeHex = theme === 'white' ? WHITE : BLACK

  const hexFor = (key: MatrixKey): HexColor =>
    key === 'theme' ? themeHex : palette[key].hex

  const matrix = Object.fromEntries(
    ALL_KEYS.map((key) => [key, {}])
  ) as CompatibilityMatrix

  for (const from of ALL_KEYS) {
    for (const to of ALL_KEYS) {
      if (from === to) continue

      const ratio = contrastRatioHex(hexFor(from), hexFor(to))

      const level: ContrastLevel =
        ratio >= AA_NORMAL ? 'aa-normal' : ratio >= AA_LARGE ? 'aa-large (≥24px only)' : 'fail'

      const entry: CompatibilityEntry = { ratio, level }
      matrix[from][to] = entry
    }
  }

  return matrix
}
