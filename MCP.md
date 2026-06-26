# Using accessible-color-palette as an MCP server

Add it to your MCP client config (Claude Desktop, Cursor, etc.) — no installation required:

```json
{
  "mcpServers": {
    "accessible-color-palette": {
      "command": "npx",
      "args": ["-y", "accessible-color-palette"]
    }
  }
}
```

Or install globally and point to the binary:

```bash
npm install -g accessible-color-palette
```

```json
{
  "mcpServers": {
    "accessible-color-palette": {
      "command": "accessible-color-palette-mcp"
    }
  }
}
```

There are two ways to use the MCP server. For most setups — an agent generating a UI from a
natural-language request, with nobody typing MCP-specific syntax — Option A is what actually runs,
whether you mention it or not. Option B exists and works, but it's a deliberate, manual step a
human has to take; it is not what fires when you just ask an agent to "build a landing page."

---

## Option A — Direct tool use (what actually runs by default)

Call the tools yourself, or let the model use them freely. This is what happens automatically when
you ask an agent to build something and mention this MCP server — no special syntax required. The
tool descriptions push the model toward the right sequence on their own, and `generate_css_tokens`
enforces the critical part of that sequence server-side regardless of what the model decides to do.

| Tool | Description |
|------|-------------|
| `generate_palette` | Returns the full palette + usage map as JSON |
| `validate_pairings` | Validates a list of foreground/background shade pairs — returns `proceed: false` if any pair fails |
| `generate_css_tokens` | Returns a CSS `:root {}` block with inline WCAG comments per shade. **Requires `validate_pairings` to have passed for the same hex+theme earlier in the session** — it throws otherwise (server-side gate, not just a convention) |
| `check_contrast` | Standalone contrast check between any two hex colors, independent of any generated palette. Use it for accent colors (a status/brand hex that is NOT one of the foundation shades) — `validate_pairings` only knows shade keys and white/black, so it can't check an arbitrary hex |

> [!NOTE]
> The 100–900 scale this server generates is the **foundation layer** of a palette, not necessarily the whole thing. Most real interfaces also need 1–2 semantic accent colors (error/success/warning/sale) that the monochrome scale can't express — that's what `check_contrast` is for. Don't read "monochromatic" in this project's name as "never use any other color in the UI."

> [!WARNING]
> `generate_css_tokens` returns the `:root {}` block with the WCAG comments soldered to each variable, plus an explicit instruction to copy it **verbatim**. That instruction is in the response text precisely because some models otherwise reformat the output and drop the comments while keeping the hex values — which silently throws away the only record of which pairings are safe. If you're calling this tool directly rather than letting an agent drive, keep the comments when you paste the block into your CSS.

There's also a resource template you can read directly:

```
palette://{hex}/{theme}
```

Returns the full WCAG compatibility matrix as JSON — useful as a reference before making color decisions.

---

## Option B — Guided prompt (optional, advanced — requires a human to type it)

`plan-palette-usage` is a real MCP prompt with a strict 4-step workflow:

1. Read the compatibility matrix (even if read earlier in the conversation)
2. Document every planned color pairing inside a `<thinking>` block and check each one
3. Call `validate_pairings` — the model is **blocked** until all pairs pass
4. Only then call `generate_css_tokens`

Be clear about what this buys you over Option A before reaching for it: the accessibility
guarantee — no tokens without validation — already holds without this prompt, because it's
enforced server-side in `generate_css_tokens` itself. What the prompt adds on top is a higher
floor of *reasoning quality*: it forces a fresh re-read of the matrix and an explicit per-pairing
cross-check in `<thinking>` before validation, instead of trusting the model to do that
unprompted. That's a real difference for a hand-crafted, high-stakes single component. It is not
the thing that ran when this project's demo gallery was generated — those used plain
natural-language requests, never this prompt, and still came out the way they did.

**Example instruction to your agent:**

> "Use the `plan-palette-usage` prompt with hex=`1f7a54` and theme=`white`, then design a user profile card."

> [!NOTE]
> **MCP prompts are user-controlled by spec, not model-controlled like tools.** A model can never invoke `plan-palette-usage` on its own just because you asked it to in natural language ("use the prompt X") — only a human typing the actual slash command triggers it, in every MCP client, by design. In Claude Code that's `/mcp__accessible-palette__plan-palette-usage <hex> <theme>`; it shows up in the autocomplete and runs like any other prompt. Cline exposes the same capability through its own UI. If nobody types that, this entire section never runs — which is exactly why the accessibility guarantee was moved into Option A's server-side gate instead of depending on this.
