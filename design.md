# Design — Minimalist Sunlit Marble Homeric Epic

A locked design system for this app, configured for the Minimalist Sunlit Marble & Olympian Gold theme.

## Genre
editorial-minimalist

## Theme
Minimalist Sunlit Marble / Olympian Gold

- vibe: "spacious sunlit alabaster ivory background, high typographic restraint, subtle gold accents, 3D WebGL particle hero"
- page structure: 3 core sections (Hero -> Selected Labors -> Technical Arsenal -> Summon Portal) with generous whitespace and 0 information bloat.

## System (Fonts)
- Display: "Syne", "Big Shoulders Display", sans-serif (tracking-tight display)
- Body: "DM Sans", "Inter", sans-serif (clean minimal body)
- Mono: "JetBrains Mono", monospace (clean metadata tags)

## Tokens

```css
:root {
  --bg-surface:        #FAF8F5;    /* sunlit alabaster ivory base */
  --bg-card:           #FFFFFF;    /* crisp marble card */
  --border-subtle:     rgba(184, 134, 11, 0.2);

  --color-text-main:   #0F172A;    /* deep navy slate */
  --color-text-muted:  #475569;    /* warm slate */

  --accent-gold:       #B8860B;    /* Olympian gold */
  --accent-gold-light: #D4AF37;    /* sunlit gold glow */
}
```
