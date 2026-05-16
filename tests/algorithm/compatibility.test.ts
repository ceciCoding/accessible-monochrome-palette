import { describe, expect, it } from 'vitest'
import { buildCompatibilityMatrix } from '../../src/algorithm/compatibility.js'
import { buildPalette } from '../../src/algorithm/palette.js'
import { parseHex } from '../../src/math/color.js'
import type { ShadeKey } from '../../src/types.js'

const SHADE_KEYS: ShadeKey[] = ['100', '300', '600', '700', '800', '900']

const palette = buildPalette(parseHex('#1f7a54'), 'white')
const matrix = buildCompatibilityMatrix(palette)

describe('buildCompatibilityMatrix — #1f7a54 white', () => {
  it('100 vs 700 is aa-normal (4.5:1 by construction)', () => {
    expect(matrix['100']['700']?.level).toBe('aa-normal')
  })

  it('100 vs 700 ratio >= 4.5', () => {
    expect(matrix['100']['700']?.ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('300 vs 700 is aa-large (3.1:1 by construction)', () => {
    expect(matrix['300']['700']?.level).toBe('aa-large')
  })

  it('100 vs 300 is fail (both light, low mutual contrast)', () => {
    expect(matrix['100']['300']?.level).toBe('fail')
  })

  it('700 vs 700 is undefined (same shade never compared)', () => {
    expect(matrix['700']['700']).toBeUndefined()
  })

  it('has exactly 30 non-undefined entries', () => {
    let count = 0
    for (const from of SHADE_KEYS) {
      for (const to of SHADE_KEYS) {
        if (matrix[from][to] !== undefined) count++
      }
    }
    expect(count).toBe(30)
  })

  it('matrix is not triangular — both directions present for all pairs', () => {
    for (const from of SHADE_KEYS) {
      for (const to of SHADE_KEYS) {
        if (from === to) continue
        expect(matrix[from][to]).toBeDefined()
        expect(matrix[to][from]).toBeDefined()
      }
    }
  })

  it('ratio is symmetric for all pairs', () => {
    for (const from of SHADE_KEYS) {
      for (const to of SHADE_KEYS) {
        if (from === to) continue
        expect(matrix[from][to]?.ratio).toBe(matrix[to][from]?.ratio)
      }
    }
  })
})
