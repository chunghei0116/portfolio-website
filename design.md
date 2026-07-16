# Design — Wayfare Studied DNA (DevOps & Mobile Portfolio)

A locked design system for this app, extracted from the Wayfare design reference. Every page redesign reads this file before emitting code. Do not regenerate per page — extend or amend this file when the system needs to grow.

## Genre
editorial

## Theme
custom

- vibe: "bold airline late-night, automated departures, tactile ticket"
- main page: scrolling top ticker, minimal edge nav, marquee title, live terminal status board, and dense colophon footer.

## System (Fonts)
- Display: "Bricolage Grotesque", weight 400–900 (geometric-sans, display condensed bold/italic)
- Body: "Newsreader", weight 300–500 (serif body, expressive italic)
- Mono: "JetBrains Mono", weight 400–600 (monospace labels & code)

## Provenance
- Source mode: url-study (Wayfare reference)
- Date: 2026-07-16
- Spacing: 4-point spacing scale
- Axes: dark / geometric-sans / warm-red

## Tokens

### tokens
```css
:root {
  --color-paper:      oklch(13% 0.010 60);    /* dark-warm-near-black */
  --color-paper-2:    oklch(18% 0.012 60);    /* card backgrounds / elevated wells */
  --color-paper-3:    oklch(24% 0.014 60);
  --color-paper-4:    oklch(30% 0.016 60);

  --color-ink:        oklch(96% 0.010 80);    /* warm off-white */
  --color-ink-2:      oklch(80% 0.012 80);    /* secondary copy */
  --color-ink-mute:   oklch(62% 0.014 70);    /* muted text / captions */
  --color-rule:       oklch(38% 0.014 60);    /* rules / dividers */
  --color-hairline:   oklch(28% 0.012 60);

  --color-accent:     oklch(66% 0.235 25);    /* bleed red accent */
  --color-accent-2:   oklch(78% 0.180 70);
  --color-accent-mute:oklch(38% 0.110 28);
  --color-focus:      oklch(78% 0.180 70);

  --font-display: "Bricolage Grotesque", sans-serif;
  --font-body:    "Newsreader", Georgia, serif;
  --font-italic:  "Newsreader", Georgia, serif;
  --font-mono:    "JetBrains Mono", monospace;

  --space-2xs:  0.25rem;
  --space-xs:   0.5rem;
  --space-sm:   0.75rem;
  --space-md:   1rem;
  --space-lg:   1.5rem;
  --space-xl:   2.5rem;
  --space-2xl:  4rem;
  --space-3xl:  6.5rem;
  --space-4xl:  10rem;
}
```

## Spacing
4-point named scale. Pages must use named tokens (`var(--space-md)`), never raw values.

## Motion
- Easings: cubic-bezier(0.22, 1, 0.36, 1) named `--ease-out`
- Reveal pattern: none beyond the pure CSS ticker-scroll animation.
- Transitions: snappy hover shifts.

## Microinteractions stance
- Action rows highlight with accent colored text shifts.
- Outline focus visible states are highly contrastive, ticket-like tight borders.

## CTA voice
- Primary CTA: Bold outline block with monospace labels.
- Secondary CTA: Typographic link text with horizontal arrow glyph (`↳`).
