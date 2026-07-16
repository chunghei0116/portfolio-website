# Design — Classical Homeric Folio Portfolio

A locked design system for this app, inspired by the style of Homeric Epics. Every page redesign reads this file before emitting code. Do not regenerate per page — extend or amend this file when the system needs to grow.

## Genre
editorial

Folio-Manuscript (Book-led classical manuscript layout cross-pollinated with the high-impact large typography and condensed copy structure of the Hyperlane developer summit specimen).

- Portfolio page: Split-screen hero layout (left: colossal Cinzel typography, right: Greek helmet illustration frame), double rules, numeric markers, and short, highly scannable copy columns.

## System
- Display: "Cinzel", weight 400–800 (stately Roman letterforms)
- Body: "Cormorant Garamond", weight 300–700, normal & italic (classic manuscript serif)
- Mono: "JetBrains Mono", weight 400–500

## Provenance
- Source mode: custom-concept (Homeric Epic layout)
- Date: 2026-07-16
- Spacing: 4-point spacing scale

## Tokens

### tokens
```css
:root {
  --color-paper:      oklch(94%  0.015 88);   /* aged Greek papyrus */
  --color-paper-2:    oklch(90%  0.018 84);   /* toned segments */
  --color-paper-3:    oklch(86%  0.022 80);
  --color-rule:       oklch(60%  0.08  85);   /* copper rules */
  --color-rule-2:     oklch(48%  0.10  82);   /* antique bronze rules */
  --color-muted:      oklch(48%  0.012 70);   /* ash grey annotations */
  --color-ink-2:      oklch(32%  0.012 40);   /* charcoal body */
  --color-ink:        oklch(18%  0.008 30);   /* volcanic ash display ink */
  
  --color-accent:     oklch(64%  0.14  85);   /* Greek gold/bronze */
  --color-accent-2:   oklch(38%  0.12  245);  /* Aegean deep blue */
  --color-accent-ink: oklch(96%  0.010 88);
  --color-focus:      oklch(38%  0.12  245);

  --font-display: "Cinzel", serif;
  --font-body:    "Cormorant Garamond", serif;
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
- Stately press feedback: active states translate 1px down.

## CTA voice
- Primary CTA: classical double-bordered button `.btn-specimen`.
- Secondary CTA: typographic links with animated arrow glyph.

## Per-page allowances
- Portfolios MUST use chapter-based "Books".
- Choral strophes may be used to structure code or telemetry logs.
