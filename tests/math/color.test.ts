import { describe, expect, it } from 'vitest'
import {
  hexToHSL,
  hexToRGB,
  hslToHex,
  parseHex,
  rgbToHex,
} from '../../src/math/color.js'

describe('hexToRGB', () => {
  it('converts white', () => {
    expect(hexToRGB(parseHex('#ffffff'))).toEqual({ r: 1, g: 1, b: 1 })
  })

  it('converts black', () => {
    expect(hexToRGB(parseHex('#000000'))).toEqual({ r: 0, g: 0, b: 0 })
  })

  it('converts #1f7a54 within tolerance', () => {
    const { r, g, b } = hexToRGB(parseHex('#1f7a54'))
    expect(r).toBeCloseTo(0.122, 2)
    expect(g).toBeCloseTo(0.478, 2)
    expect(b).toBeCloseTo(0.329, 2)
  })
})

describe('rgbToHex', () => {
  it('converts white RGB to hex', () => {
    expect(rgbToHex({ r: 1, g: 1, b: 1 })).toBe('#ffffff')
  })

  it('converts black RGB to hex', () => {
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000')
  })
})

describe('hslToHex / hexToHSL roundtrip', () => {
  const cases = ['#1f7a54', '#6e58d0', '#c62490', '#007499', '#ffffff', '#000000']

  for (const hex of cases) {
    it(`roundtrips ${hex}`, () => {
      const parsed = parseHex(hex)
      expect(hslToHex(hexToHSL(parsed))).toBe(parsed)
    })
  }
})

describe('parseHex', () => {
  it('accepts 6-char hex with #', () => {
    expect(parseHex('#1f7a54')).toBe('#1f7a54')
  })

  it('accepts 6-char hex without #', () => {
    expect(parseHex('1f7a54')).toBe('#1f7a54')
  })

  it('accepts 3-char shorthand with #', () => {
    expect(parseHex('#abc')).toBe('#aabbcc')
  })

  it('accepts 3-char shorthand without #', () => {
    expect(parseHex('abc')).toBe('#aabbcc')
  })

  it('normalizes to lowercase', () => {
    expect(parseHex('#1F7A54')).toBe('#1f7a54')
  })

  it('throws for empty string', () => {
    expect(() => parseHex('')).toThrow('Invalid hex color')
  })

  it('throws for invalid chars', () => {
    expect(() => parseHex('gg0000')).toThrow('Invalid hex color')
  })

  it('throws for wrong length', () => {
    expect(() => parseHex('#12345')).toThrow('Invalid hex color')
  })

  it('throws for non-hex string', () => {
    expect(() => parseHex('notacolor')).toThrow('Invalid hex color')
  })

  it('error message includes the invalid input', () => {
    expect(() => parseHex('notacolor')).toThrow('notacolor')
  })
})
