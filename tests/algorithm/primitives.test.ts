import { describe, expect, it } from 'vitest'
import { darkenToRatio, lightenToRatio } from '../../src/algorithm/primitives.js'
import { contrastRatioHex } from '../../src/math/contrast.js'
import { parseHex } from '../../src/math/color.js'

const anchor = parseHex('#1f7a54')

describe('lightenToRatio', () => {
  it('result has contrast >= 4.5 against the anchor', () => {
    const result = lightenToRatio(anchor, anchor, 4.5)
    const ratio = contrastRatioHex(result, anchor)
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('result has contrast <= 5.1 against the anchor (did not overshoot far)', () => {
    const result = lightenToRatio(anchor, anchor, 4.5)
    const ratio = contrastRatioHex(result, anchor)
    expect(ratio).toBeLessThanOrEqual(5.1)
  })

  it('throws when target ratio is unreachable', () => {
    expect(() =>
      lightenToRatio(parseHex('#ffffff'), parseHex('#ffffff'), 21)
    ).toThrow('stepTowardRatio')
  })
})

describe('darkenToRatio', () => {
  it('result has contrast >= 3.0 against the anchor', () => {
    const result = darkenToRatio(anchor, anchor, 3.0)
    const ratio = contrastRatioHex(result, anchor)
    expect(ratio).toBeGreaterThanOrEqual(3.0)
  })

  it('result has contrast <= 4.0 against the anchor (did not overshoot far)', () => {
    const result = darkenToRatio(anchor, anchor, 3.0)
    const ratio = contrastRatioHex(result, anchor)
    expect(ratio).toBeLessThanOrEqual(4.0)
  })
})
