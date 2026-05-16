import { describe, expect, it } from 'vitest'
import { generatePalette, toCSSTokens } from '../../src/index.js'

const result = generatePalette('#1f7a54', 'white')

describe('toCSSTokens', () => {
  it('contains all 6 shade declarations', () => {
    const tokens = toCSSTokens(result)
    for (const key of ['100', '300', '600', '700', '800', '900']) {
      expect(tokens).toContain(`--color-${key}:`)
    }
  })

  it('hex values in output match palette entries', () => {
    const tokens = toCSSTokens(result)
    for (const key of ['100', '300', '600', '700', '800', '900'] as const) {
      expect(tokens).toContain(result.palette[key].hex.toLowerCase())
    }
  })

  it('uses custom prefix when provided', () => {
    const tokens = toCSSTokens(result, 'brand')
    expect(tokens).toContain('--brand-100:')
    expect(tokens).not.toContain('--color-100:')
  })

  it('has no trailing newline', () => {
    const tokens = toCSSTokens(result)
    expect(tokens.endsWith('\n')).toBe(false)
  })

  it('lines are separated by \\n', () => {
    const tokens = toCSSTokens(result)
    const lines = tokens.split('\n')
    expect(lines).toHaveLength(6)
  })

  it('each line matches --prefix-key: #hex; format', () => {
    const tokens = toCSSTokens(result)
    for (const line of tokens.split('\n')) {
      expect(line).toMatch(/^--color-\d+: #[0-9a-f]{6};$/)
    }
  })
})
