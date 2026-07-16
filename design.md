# Design — DevOps & Mobile Engineering Portfolio (Austere Terminal)

A locked design system for this app, inspired by technical spec sheets, command-line interfaces, and clinical engineering layouts. Every page redesign reads this file before emitting code. Do not regenerate per page — extend or amend this file when the system needs to grow.

## Genre
modern-minimal

## Theme
custom

- vibe: "devops precision, mobile architecture, tactile terminal"
- main page: split dashboard layout, tabular telemetry headers, structural card grids, and high-contrast minimal contact form.

## System (Fonts)
- Display: "Space Grotesk", weight 300–700 (structured, geometric geometric-sans)
- Body: "Geist", weight 300–800 (clean, readable sans-serif)
- Mono: "JetBrains Mono", weight 400–700 (tactile monospaced code)

## Provenance
- Source mode: custom-concept (Austere Tech layout)
- Date: 2026-07-16
- Spacing: 4-point spacing scale
- Axes: light / geometric-sans / cool

## Tokens

### tokens
```css
:root {
  --color-paper:      oklch(98.5% 0.003 240);   /* clinical, cool near-white */
  --color-paper-2:    oklch(96%   0.005 240);   /* elevation step 1 / cards */
  --color-paper-3:    oklch(93%   0.006 240);   /* elevation step 2 / headers */
  --color-rule:       oklch(82%   0.008 240);   /* clean hairline rule */
  --color-rule-2:     oklch(89%   0.006 240);   /* secondary faint rule */
  --color-muted:      oklch(54%   0.006 240);   /* muted labels / secondary text */
  --color-neutral:    oklch(44%   0.006 240);   /* gray metadata */
  --color-ink-2:      oklch(34%   0.006 240);   /* body copy ink */
  --color-ink:        oklch(16%   0.008 240);   /* display headers ink */
  
  --color-accent:     oklch(58%   0.16  245);   /* electric cobalt blue */
  --color-accent-ink: oklch(98%   0.003 240);   /* light text over cobalt background */
  --color-focus:      oklch(54%   0.20  245);   /* focus ring color */

  --font-display: "Space Grotesk", sans-serif;
  --font-body:    "Geist", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;

  --space-3xs: 0.125rem;
  --space-2xs: 0.25rem;
  --space-xs:  0.5rem;
  --space-sm:  0.75rem;
  --space-md:  1rem;
  --space-lg:  1.5rem;
  --space-xl:  2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 6.5rem;
}
```

## Spacing
4-point named scale. Pages must use named tokens (`var(--space-md)`), never raw values.

## Motion
- Easings: cubic-bezier(0.16, 1, 0.3, 1) named `--ease-out`
- Reveal pattern: minimal opacity fades, immediate transitions (≤ 150 ms) to align with austere utility.
- Reduced-motion fallback: opacity-only, ≤ 100 ms.

## Microinteractions stance
- Zero-bounce, high-fidelity responsive click states.
- Active click state moves elements 1px down vertically.
- Focus visible indicator is a clear 2px cobalt ring with offset.

## CTA voice
- Primary CTA: Solid cobalt block with white monospace labels.
- Secondary CTA: Minimal text with terminal-style arrow glyph (`->` or `↳`).
