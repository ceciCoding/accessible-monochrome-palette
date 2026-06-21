/**
 * Structural enforcement for the RPG flow (Read → Plan → validate → Generate).
 *
 * generate_css_tokens must not succeed for a given hex+theme until
 * validate_pairings has passed for that same hex+theme in this session.
 * This makes the rule a protocol-level contract instead of a prompt-only
 * suggestion, so it holds regardless of whether the client supports MCP prompts.
 */
export class SessionGate {
  private readonly validated = new Set<string>()

  private key(hex: string, theme: string): string {
    return `${hex.toLowerCase()}:${theme}`
  }

  markValidated(hex: string, theme: string): void {
    this.validated.add(this.key(hex, theme))
  }

  isValidated(hex: string, theme: string): boolean {
    return this.validated.has(this.key(hex, theme))
  }
}
