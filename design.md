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
- Date: 2026-07-21
- Spacing: 4-point spacing scale
- Axes: light / geometric-sans / warm-red

## Tokens

### tokens
```css
:root {
  --color-paper:      oklch(98% 0.008 85);    /* warm off-white light paper */
  --color-paper-2:    oklch(95% 0.010 85);    /* card backgrounds / elevated wells */
  --color-paper-3:    oklch(91% 0.012 85);
  --color-paper-4:    oklch(87% 0.014 85);

  --color-ink:        oklch(15% 0.015 60);    /* deep charcoal ink text */
  --color-ink-2:      oklch(35% 0.018 60);    /* secondary copy */
  --color-ink-mute:   oklch(55% 0.018 60);    /* muted text / captions */
  --color-rule:       oklch(80% 0.014 85);    /* rules / dividers */
  --color-hairline:   oklch(88% 0.012 85);

  --color-accent:     oklch(56% 0.220 25);    /* crimson red accent */
  --color-accent-2:   oklch(48% 0.200 25);
  --color-accent-mute:oklch(78% 0.090 28);
  --color-focus:      oklch(56% 0.220 25);

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
