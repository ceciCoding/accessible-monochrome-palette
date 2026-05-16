import { describe, expect, it } from 'vitest'
import { contrastRatioHex } from '../../src/math/contrast.js'
import { parseHex } from '../../src/math/color.js'

describe('contrastRatioHex', () => {
  it('white on black = 21', () => {
    expect(contrastRatioHex(parseHex('#ffffff'), parseHex('#000000'))).toBe(21)
  })

  it('white on white = 1', () => {
    expect(contrastRatioHex(parseHex('#ffffff'), parseHex('#ffffff'))).toBe(1)
  })

  it('#1f7a54 vs white is between 4.5 and 6', () => {
    const ratio = contrastRatioHex(parseHex('#1f7a54'), parseHex('#ffffff'))
    expect(ratio).toBeGreaterThanOrEqual(4.5)
    expect(ratio).toBeLessThanOrEqual(6)
  })

  it('is symmetric', () => {
    const a = parseHex('#1f7a54')
    const b = parseHex('#ffffff')
    expect(contrastRatioHex(a, b)).toBe(contrastRatioHex(b, a))
  })

  it('black on black = 1', () => {
    expect(contrastRatioHex(parseHex('#000000'), parseHex('#000000'))).toBe(1)
  })
})
