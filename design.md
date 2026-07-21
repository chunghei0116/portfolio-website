# Design — Carnival Studied DNA (DevOps & Mobile Portfolio)

A locked design system for this app, studied and extracted from https://www.usehallmark.com/examples/carnival-01/.

## Genre
carnival

## Theme
Carnival Showcase / Warm Poster Vintage

- vibe: "vintage poster typography, bold duo-tone oxblood & mustard, marquee ticker, N7 brutal slab nav"
- main page: H1 Marquee word hero, horizontal infinite marquee ticker, duotone artist/job cards, tracklist catalog, Ft8 marquee scroll footer.

## System (Fonts)
- Display: "Big Shoulders Display", weight 700–900 (heavy condensed display sans, uppercase tracking)
- Body: "DM Sans", weight 400–700 (clean geometric body sans)
- Mono: "JetBrains Mono", weight 400–700 (monospace metadata & captions)

## Provenance
- Source mode: url-study (https://www.usehallmark.com/examples/carnival-01/)
- Date: 2026-07-21
- Spacing: 4-point spacing scale
- Axes: light / heavy-condensed-sans / oxblood & mustard

## Tokens

### tokens
```css
:root {
  --color-paper:      #f0d9bc;    /* warm vintage cream paper */
  --color-paper-2:    #e8ceae;    /* duotone elevated surface */
  --color-paper-3:    #dcb88e;

  --color-ink:        #1a1816;    /* primary dark ink */
  --color-ink-2:      #3e3933;    /* secondary copy */
  --color-muted:      #786e62;    /* captions / metadata */
  --color-rule:       #cbb08e;    /* dividers */

  --color-accent:     #8b1e1e;    /* oxblood red accent */
  --color-accent-soft:#e6a6a6;
  --color-mustard:    #d4972e;    /* vintage mustard accent */

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
