import type { HexColor, HSL, RGB } from '../types.js'

export function parseHex(input: string): HexColor {
  const stripped = input.startsWith('#') ? input.slice(1) : input

  const expanded =
    stripped.length === 3
      ? stripped
          .split('')
          .map((c) => c + c)
          .join('')
      : stripped

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    throw new Error(`Invalid hex color: ${input}`)
  }

  return `#${expanded.toLowerCase()}` as HexColor
}

export function hexToRGB(hex: HexColor): RGB {
  const stripped = hex.startsWith('#') ? hex.slice(1) : hex
  const r = parseInt(stripped.slice(0, 2), 16) / 255
  const g = parseInt(stripped.slice(2, 4), 16) / 255
  const b = parseInt(stripped.slice(4, 6), 16) / 255
  return { r, g, b }
}

export function rgbToHex(rgb: RGB): HexColor {
  const toChannel = (n: number): string =>
    Math.round(Math.min(1, Math.max(0, n)) * 255)
      .toString(16)
      .padStart(2, '0')

  return `#${toChannel(rgb.r)}${toChannel(rgb.g)}${toChannel(rgb.b)}` as HexColor
}

export function rgbToHSL(rgb: RGB): HSL {
  const { r, g, b } = rgb
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  const l = (max + min) / 2

  let s = 0
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1))
  }

  let h = 0
  if (delta !== 0) {
    if (max === r) {
      h = 60 * (((g - b) / delta) % 6)
    } else if (max === g) {
      h = 60 * ((b - r) / delta + 2)
    } else {
      h = 60 * ((r - g) / delta + 4)
    }
  }

  if (h < 0) h += 360

  return {
    h: Math.min(360, Math.max(0, h)),
    s: Math.min(1, Math.max(0, s)),
    l: Math.min(1, Math.max(0, l)),
  }
}

export function hslToRGB(hsl: HSL): RGB {
  const { h, s, l } = hsl
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (h < 60) {
    r = c; g = x; b = 0
  } else if (h < 120) {
    r = x; g = c; b = 0
  } else if (h < 180) {
    r = 0; g = c; b = x
  } else if (h < 240) {
    r = 0; g = x; b = c
  } else if (h < 300) {
    r = x; g = 0; b = c
  } else {
    r = c; g = 0; b = x
  }

  return {
    r: Math.min(1, Math.max(0, r + m)),
    g: Math.min(1, Math.max(0, g + m)),
    b: Math.min(1, Math.max(0, b + m)),
  }
}

export function hexToHSL(hex: HexColor): HSL {
  return rgbToHSL(hexToRGB(hex))
}

export function hslToHex(hsl: HSL): HexColor {
  return rgbToHex(hslToRGB(hsl))
}
