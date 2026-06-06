import type { CSSTokens, PaletteResult, ShadeKey, Theme } from '../types.js'

const SHADE_KEYS: ShadeKey[] = ['100', '300', '600', '700', '800', '900']

function bgLabel(key: string, theme: Theme): string {
  return key === 'theme' ? (theme === 'black' ? 'black' : 'white') : key
}

// ─── Compatibility JSON ───────────────────────────────────────────────────────

export type ShadeCompat = {
  hex: string
  bodyText: string[]
  largeText: string[]
  bgOnly: boolean
}

export function buildCompatMatrix(result: PaletteResult): Record<ShadeKey, ShadeCompat> {
  const { palette, usage, theme } = result
  const matrix = {} as Record<ShadeKey, ShadeCompat>

  for (const shade of SHADE_KEYS) {
    const { normalText, largeText } = usage[shade]
    matrix[shade] = {
      hex: palette[shade].hex.toLowerCase(),
      bodyText: [...normalText].sort((a, b) => b.ratio - a.ratio).map(p => bgLabel(p.key, theme)),
      largeText: largeText.map(p => bgLabel(p.key, theme)),
      bgOnly: normalText.length === 0 && largeText.length === 0,
    }
  }

  return matrix
}

// ─── Public API ───────────────────────────────────────────────────────────────

// ─── v1: inline comment per variable ─────────────────────────────────────────

export function toCSSTokens(result: PaletteResult, prefix: string = 'color'): CSSTokens {
  const { sourceColor, theme } = result
  const matrix = buildCompatMatrix(result)
  const bg = theme === 'white' ? 'white' : 'black'

  const bgHex = bg === 'white' ? '#ffffff' : '#000000'
  const bgNormal = SHADE_KEYS.filter(s => matrix[s].bodyText.includes(bg))
  const bgLarge  = SHADE_KEYS.filter(s => matrix[s].largeText.includes(bg))
  const bgT  = bgNormal.length ? `text→${bgNormal.join('·')}` : ''
  const bgLg = bgLarge.length  ? `lg→${bgLarge.join('·')}` : ''
  const bgVar = `  --${prefix}-${bg}: ${bgHex}; /* ${[bgT, bgLg].filter(Boolean).join('  ')} */`

  const cssVars = SHADE_KEYS.map((key) => {
    const { hex, bodyText, largeText, bgOnly } = matrix[key]
    if (bgOnly) return `  --${prefix}-${key}: ${hex}; /* bg-only */`
    const t = bodyText.length ? `text→${bodyText.join('·')}` : ''
    const lg = largeText.length ? `lg→${largeText.join('·')}` : ''
    return `  --${prefix}-${key}: ${hex}; /* ${[t, lg].filter(Boolean).join('  ')} */`
  })

  return [
    ':root {',
    `  /* palette · source: ${sourceColor} · theme: ${bg} */`,
    bgVar,
    ...cssVars,
    '}',
  ].join('\n')
}

// ─── v3: inverted matrix inline — bg-centric (kept for reference) ────────────
// export function toCSSTokens(result: PaletteResult, prefix: string = 'color'): CSSTokens {
//   const { sourceColor, theme } = result
//   const matrix = buildCompatMatrix(result)
//   const bg = theme === 'white' ? 'white' : 'black'
//
//   const cssVars = SHADE_KEYS.map((key) => {
//     const { hex } = matrix[key]
//     const normalText: string[] = []
//     const largeText: string[] = []
//     if (matrix[key].bodyText.includes(bg)) normalText.push(bg)
//     if (matrix[key].largeText.includes(bg)) largeText.push(bg)
//     for (const shade of SHADE_KEYS) {
//       if (shade === key) continue
//       if (matrix[shade].bodyText.includes(key)) normalText.push(shade)
//       if (matrix[shade].largeText.includes(key)) largeText.push(shade)
//     }
//     if (normalText.length === 0 && largeText.length === 0) {
//       return `  --${prefix}-${key}: ${hex}; /* as bg → none */`
//     }
//     const t = normalText.length ? `text: ${normalText.join(' ')}` : ''
//     const lg = largeText.length ? `large: ${largeText.join(' ')}` : ''
//     return `  --${prefix}-${key}: ${hex}; /* as bg → ${[t, lg].filter(Boolean).join('  ')} */`
//   })
//   return [':root {', `  /* palette: ${sourceColor} · ${bg} theme */`, ...cssVars, '}'].join('\n')
// }
