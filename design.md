# Design — Industrial Brutalist Raw Grey Concrete (DevOps & Mobile Portfolio)

A locked design system for this app, configured for the Industrial Brutalist Raw Grey Concrete theme with safety red accents.

## Genre
industrial-brutalist

## Theme
Raw Grey Concrete / Industrial

- vibe: "tactile grey concrete paper, deep graphite ink, industrial safety red accent, marquee ticker"
- main page: H1 Marquee word hero, horizontal infinite marquee ticker, duotone concrete job cards, tracklist catalog, Ft8 marquee scroll footer.

## System (Fonts)
- Display: "Big Shoulders Display", weight 700–900 (heavy condensed display sans, uppercase tracking)
- Body: "DM Sans", weight 400–700 (clean geometric body sans)
- Mono: "JetBrains Mono", weight 400–700 (monospace metadata & captions)

## Provenance
- Date: 2026-07-21
- Spacing: 4-point spacing scale
- Axes: light / heavy-condensed-sans / raw-concrete-grey & safety-red

## Tokens

### tokens
```css
:root {
  --color-paper:      #e2e2dd;    /* raw grey concrete paper */
  --color-paper-2:    #d6d6d0;    /* cast concrete card surface */
  --color-paper-3:    #cacac4;    /* recessed concrete well */
  --color-paper-4:    #bebeb8;

  --color-ink:        #181817;    /* deep graphite ink */
  --color-ink-2:      #3e3e3b;    /* secondary copy */
  --color-muted:      #6e6e69;    /* captions / metadata */
  --color-rule:       #b8b8b0;    /* concrete seam dividers */

  --color-accent:     #c83228;    /* industrial safety red accent */
  --color-accent-soft:#f4d8d6;
  --color-mustard:    #2b2b29;    /* dark graphite contrast */

  --font-display: "Big Shoulders Display", sans-serif;
  --font-body:    "DM Sans", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;
  --font-typewriter: "JetBrains Mono", monospace;
}
```

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
