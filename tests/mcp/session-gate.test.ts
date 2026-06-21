import { describe, expect, it } from 'vitest'
import { SessionGate } from '../../src/mcp/session-gate.js'

describe('SessionGate', () => {
  it('is not validated by default', () => {
    const gate = new SessionGate()
    expect(gate.isValidated('1f7a54', 'white')).toBe(false)
  })

  it('becomes validated after markValidated for the same hex+theme', () => {
    const gate = new SessionGate()
    gate.markValidated('1f7a54', 'white')
    expect(gate.isValidated('1f7a54', 'white')).toBe(true)
  })

  it('is case-insensitive on hex', () => {
    const gate = new SessionGate()
    gate.markValidated('1F7A54', 'white')
    expect(gate.isValidated('1f7a54', 'white')).toBe(true)
  })

  it('does not leak validation across themes', () => {
    const gate = new SessionGate()
    gate.markValidated('1f7a54', 'white')
    expect(gate.isValidated('1f7a54', 'black')).toBe(false)
  })

  it('does not leak validation across different hex colors', () => {
    const gate = new SessionGate()
    gate.markValidated('1f7a54', 'white')
    expect(gate.isValidated('2a8b65', 'white')).toBe(false)
  })
})
