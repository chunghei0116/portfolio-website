# Design — Sunlit Marble Homeric Epic (3D WebGL Portfolio)

A locked light design system for this app, configured for the Sunlit Marble & Ancient Greek Odyssey theme.

## Genre
editorial-mythic

## Theme
Sunlit Marble & Olympian Gold / Light Odyssey

- vibe: "sunlit Aegean alabaster marble, warm ivory paper, deep navy slate typography, glowing Olympian gold accents, 3D WebGL wireframe column"
- main page: Giant typography hero with light 3D particle canvas background, Hyperlane layout structure, 3-cell spec-sheet metadata row, format schedule, codex pitch block, labors program grid, and delphic FAQ.

## System (Fonts)
- Display: "Syne", "Big Shoulders Display", "Space Grotesk", sans-serif (heavy condensed display sans, tracking-tight)
- Body: "DM Sans", "Inter", sans-serif (clean soft geometric body sans)
- Mono: "JetBrains Mono", monospace (monospace metadata & coordinates)

## Provenance
- Date: 2026-07-22
- Spacing: 4-point spacing scale
- Axes: light-mode / sunlit-marble / olympian-gold & aegean-sea-blue-accents

## Tokens

```css
:root {
  --bg-surface:        #FAF8F5;    /* sunlit alabaster ivory base */
  --bg-surface-card:   #FFFFFF;    /* crisp marble card surface */
  --bg-surface-elev:   #F1ECE4;    /* elevated warm stone container */
  --border-subtle:     rgba(0, 0, 0, 0.08);
  --border-gold:       rgba(212, 175, 55, 0.35);

  --color-text-main:   #0F172A;    /* deep navy slate main text */
  --color-text-muted:  #475569;    /* warm slate body text */
  --color-text-dim:    #64748B;    /* subtle caption text */

  --accent-gold:       #B8860B;    /* Olympian polished gold */
  --accent-gold-light: #D4AF37;    /* bright Greek sun gold */
  --accent-aegean:     #1D4ED8;    /* Aegean sea royal blue */
  --accent-terracotta: #C2410C;    /* terracotta ceramic accent */

  --font-display:      "Syne", "Big Shoulders Display", sans-serif;
  --font-body:         "DM Sans", sans-serif;
  --font-mono:         "JetBrains Mono", monospace;
}
```

## Microinteractions stance
- Buttons feature tactile gold borders with warm sunlit glowing background shifts.
- Subtle pointer parallax physics on 3D particles and Greek column.
