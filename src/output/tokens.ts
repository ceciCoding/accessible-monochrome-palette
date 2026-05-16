import type { CSSTokens, PaletteResult, ShadeKey } from '../types.js'

const SHADE_KEYS: ShadeKey[] = ['100', '300', '600', '700', '800', '900']

export function toCSSTokens(result: PaletteResult, prefix: string = 'color'): CSSTokens {
  return SHADE_KEYS.map(
    (key) => `--${prefix}-${key}: ${result.palette[key].hex.toLowerCase()};`
  ).join('\n')
}
