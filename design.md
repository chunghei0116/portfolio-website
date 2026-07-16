# Design — Press Quaternary Portfolio

A locked design system for this app, extracted from the studied DNA of `press-01`. Every page redesign reads this file before emitting code. Do not regenerate per page — extend or amend this file when the system needs to grow.

## Genre
editorial

## Macrostructure family
Specimen (Plate-led Specimen layout with left-margin navigation and colossal text specimens).

- Marketing/Portfolio page: Specimen (with N3 side-rail, F3 tabular ledgers, and interactive slider specimens).
- Content/Proof pages: Specimen (inverted warm bone paper styling).

## System
- Display: "Bricolage Grotesque", weight 200–800
- Body: "Fraunces", weight 300–600, normal & italic
- Mono: "JetBrains Mono", weight 400–500

## Provenance
- Source mode: url
- URL: https://www.usehallmark.com/examples/press-01/
- Date: 2026-07-16
- Confidence: Tokens are exact (extracted from source CSS). Fonts are exact (extracted from source font declarations). Rhythm is unknown — HTML alone can't judge density.

## Tokens

### tokens.css
```css
:root {
  --color-paper:      oklch(13%  0.014 25);   /* ink-black warm ground */
  --color-paper-2:    oklch(17%  0.018 25);
  --color-paper-3:    oklch(22%  0.022 24);
  --color-rule:       oklch(32%  0.020 24);
  --color-rule-2:     oklch(44%  0.024 22);
  --color-muted:      oklch(64%  0.020 26);
  --color-neutral:    oklch(74%  0.016 28);
  --color-ink-2:      oklch(86%  0.012 30);
  --color-ink:        oklch(95%  0.010 32);   /* warm bone text */
  --color-accent:     oklch(60%  0.21  25);   /* signal red */
  --color-accent-ink: oklch(97%  0.012 30);
  --color-focus:      oklch(72%  0.19  25);

  --proof-paper:      oklch(93%  0.020 70);   /* warm bone proof stock */
  --proof-paper-2:    oklch(89%  0.024 68);
  --proof-rule:       oklch(74%  0.024 60);
  --proof-rule-2:     oklch(48%  0.020 45);
  --proof-muted:      oklch(46%  0.018 40);
  --proof-ink-2:      oklch(28%  0.020 35);
  --proof-ink:        oklch(17%  0.024 32);   /* near-black ink */
  --proof-accent:     oklch(52%  0.20  25);

  --font-display: "Bricolage Grotesque", sans-serif;
  --font-body:    "Fraunces", serif;
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
- Reveal pattern: CSS-based fade-up stagger
- Reduced-motion fallback: opacity-only, ≤ 150 ms.

## Microinteractions stance
- Snappy hover scaling and translation responses.
- Mechanical press feedback: active states translate 1px down.

## CTA voice
- Primary CTA: mechanical press buttons (`.btn-specimen`), monospace uppercase labels.
- Secondary CTA: typographic links with animated arrow glyph.

## Per-page allowances
- Portfolio page MAY use concrete poetry layout grids.
- Inverted proof sheet sections MUST keep square borders and tabular layouts.

## What pages MUST share
- The side-rail N3 layout framework.
- The dual dark-press-ground / bone-proof-stock contrast sections.
- Bricolage Grotesque and Fraunces type scales.

## Notes
- Do NOT use card-in-card patterns or pill-rounded borders; edge-based styling and hairlines only.
- Suppress generic icon grids; use semantic typographic labels.
