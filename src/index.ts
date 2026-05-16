import { parseHex } from './math/color.js'
import { buildCompatibilityMatrix } from './algorithm/compatibility.js'
import { buildPalette } from './algorithm/palette.js'
import { toCSSTokens as _toCSSTokens } from './output/tokens.js'
import { buildPaletteUsage } from './output/usage.js'
import type { PaletteResult, Theme } from './types.js'

export function generatePalette(hex: string, theme: Theme): PaletteResult {
  const parsed = parseHex(hex)
  const palette = buildPalette(parsed, theme)
  const compatibility = buildCompatibilityMatrix(palette)
  const usage = buildPaletteUsage(palette, compatibility, theme)
  return { palette, usage, theme, sourceColor: parsed }
}

export function toCSSTokens(result: PaletteResult, prefix?: string): string {
  return _toCSSTokens(result, prefix)
}

export type {
  PaletteResult,
  Palette,
  ShadeEntry,
  ContrastLevel,
  Theme,
  ShadeKey,
  HexColor,
  CSSTokens,
  BackgroundKey,
  CompatiblePair,
  ShadeUsage,
  PaletteUsage,
} from './types.js'
