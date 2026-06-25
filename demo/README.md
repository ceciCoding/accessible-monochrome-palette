# Demo gallery

The HTML files in this folder are real outputs from different AI coding agents using the
`accessible-color-palette` MCP server, kept as-is (not hand-edited afterward) to see what each
agent actually does with the tool, warts included.

## Gallery

<table>
<tr>
<td align="center" width="33%"><a href="abyss.html"><img src="screenshots/abyss.png" width="260"><br>Abyss</a></td>
<td align="center" width="33%"><a href="abyssal-light.html"><img src="screenshots/abyssal-light.png" width="260"><br>Abyssal Light</a></td>
<td align="center" width="33%"><a href="astronomy-club.html"><img src="screenshots/astronomy-club.png" width="260"><br>Astronomy Club</a></td>
</tr>
<tr>
<td align="center" width="33%"><a href="dashboard.html"><img src="screenshots/dashboard.png" width="260"><br>Dashboard</a></td>
<td align="center" width="33%"><a href="deep-sea.html"><img src="screenshots/deep-sea.png" width="260"><br>Deep Sea</a></td>
<td align="center" width="33%"><a href="ecommerce-homepage.html"><img src="screenshots/ecommerce-homepage.png" width="260"><br>Ecommerce Homepage</a></td>
</tr>
<tr>
<td align="center" width="33%"><a href="history-of-the-web.html"><img src="screenshots/history-of-the-web.png" width="260"><br>History Of The Web</a></td>
<td align="center" width="33%"><a href="index-card-article.html"><img src="screenshots/index-card-article.png" width="260"><br>Index Card Article</a></td>
<td align="center" width="33%"><a href="kids-band-homepage.html"><img src="screenshots/kids-band-homepage.png" width="260"><br>Kids Band Homepage</a></td>
</tr>
<tr>
<td align="center" width="33%"><a href="magazine-cards.html"><img src="screenshots/magazine-cards.png" width="260"><br>Magazine Cards</a></td>
<td align="center" width="33%"><a href="medusas.html"><img src="screenshots/medusas.png" width="260"><br>Medusas</a></td>
<td align="center" width="33%"><a href="midnight-cafe.html"><img src="screenshots/midnight-cafe.png" width="260"><br>Midnight Cafe</a></td>
</tr>
<tr>
<td align="center" width="33%"><a href="monkeys.html"><img src="screenshots/monkeys.png" width="260"><br>Monkeys</a></td>
<td align="center" width="33%"><a href="mycelium.html"><img src="screenshots/mycelium.png" width="260"><br>Mycelium</a></td>
<td align="center" width="33%"><a href="observatorio-volcanico.html"><img src="screenshots/observatorio-volcanico.png" width="260"><br>Observatorio Volcanico</a></td>
</tr>
<tr>
<td align="center" width="33%"><a href="octopuses.html"><img src="screenshots/octopuses.png" width="260"><br>Octopuses</a></td>
<td align="center" width="33%"><a href="plant-shop-homepage.html"><img src="screenshots/plant-shop-homepage.png" width="260"><br>Plant Shop Homepage</a></td>
<td align="center" width="33%"><a href="real-estate.html"><img src="screenshots/real-estate.png" width="260"><br>Real Estate</a></td>
</tr>
<tr>
<td align="center" width="33%"><a href="scouts-homepage.html"><img src="screenshots/scouts-homepage.png" width="260"><br>Scouts Homepage</a></td>
<td align="center" width="33%"><a href="signal-room.html"><img src="screenshots/signal-room.png" width="260"><br>Signal Room</a></td>
<td align="center" width="33%"><a href="sole-atelier-homepage.html"><img src="screenshots/sole-atelier-homepage.png" width="260"><br>Sole Atelier Homepage</a></td>
</tr>
<tr>
<td align="center" width="33%"><a href="space-homepage.html"><img src="screenshots/space-homepage.png" width="260"><br>Space Homepage</a></td>
<td align="center" width="33%"><a href="sports-team-homepage.html"><img src="screenshots/sports-team-homepage.png" width="260"><br>Sports Team Homepage</a></td>
<td align="center" width="33%"><a href="stormfc.html"><img src="screenshots/stormfc.png" width="260"><br>Stormfc</a></td>
</tr>
<tr>
<td align="center" width="33%"><a href="tide-forecast-bureau.html"><img src="screenshots/tide-forecast-bureau.png" width="260"><br>Tide Forecast Bureau</a></td>
<td align="center" width="33%"><a href="travel-agency.html"><img src="screenshots/travel-agency.png" width="260"><br>Travel Agency</a></td>
<td align="center" width="33%"><a href="university.html"><img src="screenshots/university.png" width="260"><br>University</a></td>
</tr>
<tr>
<td align="center" width="33%"><a href="verdant.html"><img src="screenshots/verdant.png" width="260"><br>Verdant</a></td>
<td align="center" width="33%"><a href="vinyl-ecommerce-homepage.html"><img src="screenshots/vinyl-ecommerce-homepage.png" width="260"><br>Vinyl Ecommerce Homepage</a></td>
<td align="center" width="33%"><a href="wildlife.html"><img src="screenshots/wildlife.png" width="260"><br>Wildlife</a></td>
</tr>
</table>

## How these were generated

**Coding agents used:** Claude Code, GitHub Copilot, and Open Code — including models run through
Open Code (e.g. MiniMax M2, DeepSeek) that don't have their own MCP-capable client. (MiniMax does
ship its own coding client, but it doesn't support MCP, so nothing generated through it could be
using this server — it's excluded from this set entirely, not just unlabeled.) This is a mixed,
informal set, not a controlled benchmark — there's no fixed model/agent pairing and no per-file
record of which output came from which combination.

**Prompts used** were deliberately minimal — no accessibility instructions baked into the prompt
itself, no mention of the MCP server's specific tools by name, just a request to use it plus a
generic ask for a clean, usable, good-looking interface (the kind of thing you'd say to any
design request, accessibility-related or not):

```
create a landing page for a random topic using the palette mcp.
the interface should be clean, usable, and beautiful

create a landing page for X using the palette mcp and choose accent colors.
the interface should be clean, usable, and beautiful
```

**Plus one more variable held constant across all of them:** every session also had the
[`a11y.instructions.md`](https://github.com/github/awesome-copilot/blob/main/instructions/a11y.instructions.md)
accessibility skill from `github/awesome-copilot` loaded — WCAG 2.2 AA criteria, 38+ documented
anti-patterns, legal enforcement context (EAA, ADA Title II), and framework-specific fixes. That
skill isn't incidental to this project: it's the winning variant from a controlled comparison run
by its author, Michael Fairchild (Microsoft) — the same person who built
[`microsoft/a11y-llm-eval`](https://github.com/microsoft/a11y-llm-eval), the harness that
benchmarks how accessible LLM-generated HTML actually is by rendering it in a real browser and
running it against axe-core plus hand-written assertions. In [his own write-up of that
work](https://dev.to/mfairchild365/embedding-accessibility-into-ai-based-software-development-282k),
he compares three instruction sets against the harness: a one-line "must be accessible" prompt
(+18 percentage points over baseline), a basic semantic-HTML/WCAG-AA prompt (+37 points), and a
full expert-level instruction set (+48 points) — and explicitly states he published that
detailed, best-performing version at the exact `a11y.instructions.md` path used here. So what's
running in these demos is the two things this project argues for, stacked: the empirically
best-performing general accessibility guidance, plus a tool that keeps the contrast arithmetic
out of the model's head entirely (this MCP server).

## What to look for

These are not a benchmark and shouldn't be read as one — there's no scoring, no per-agent
breakdown, no controlled prompt-to-output mapping, and no per-file record of which agent or model
produced which file. What they're useful for is qualitative: open a few, inspect the `:root {}`
block for whether the WCAG manifest comments survived intact, and check whether accent colors
(when the prompt asked for them) actually got run through `check_contrast` or just picked by eye.

Don't take any of this on faith — run [axe-core](https://github.com/dequelabs/axe-core),
Lighthouse, Pa11y, or whatever checker you trust against these files yourself. We did, against
all 30 of them (axe-core, WCAG 2.x/2.2 AA rules, headless Chromium, waiting for fonts to finish
loading before measuring — color-contrast results are flaky otherwise): **25 came back with zero
violations of any kind.** Of the 5 that didn't, 4 have a `color-contrast` violation — proof that
the combination of skill + MCP server reduces contrast failures a lot, not that it makes them
impossible. The MCP server only guarantees the tokens it generates; it has no way to verify
accent colors picked by eye instead of run through `check_contrast`, or component CSS the model
wrote without checking it against the manifest at all.

Informally, across this set, Claude Code came out as the most reliable agent and Open Code the
least — but that's one person's impression from an uncontrolled set, not a finding. Run your own
comparison and tell us what you get.
