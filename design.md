# Design — Soft Utilitarian Playful Cyber (3D GLSL Portfolio)

A locked design system for this app, configured for the Soft Utilitarian & Playful 3D Shader theme.

## Genre
playful-atmospheric

## Theme
Soft Utilitarian Cyber Clay / Kinetic 3D Shader

- vibe: "soft graphite clay paper, big condensed display typography, electric glitch accents, 3D WebGL shader runtime"
- main page: Giant typography hero with GLSL shader canvas background, interactive shader parameter controller, dual-CTA action bar, graphic-intensive 3D project cards, soft utilitarian grid layout, interactive web audio feedback.

## System (Fonts)
- Display: "Syne", "Big Shoulders Display", "Space Grotesk", sans-serif (heavy condensed display sans, tracking-tight)
- Body: "DM Sans", "Inter", sans-serif (clean soft geometric body sans)
- Mono: "JetBrains Mono", monospace (monospace metadata, coordinates & glitch captions)

## Provenance
- Date: 2026-07-22
- Spacing: 4-point spacing scale
- Axes: dark-mode / heavy-condensed-sans / soft-clay-graphite & electric-glitch-accents

## Tokens

```css
:root {
  --bg-surface:        #09090d;    /* deep soft graphite base */
  --bg-surface-card:   #121218;    /* soft clay card surface */
  --bg-surface-elev:   #1a1a24;    /* elevated container */
  --border-subtle:     rgba(255, 255, 255, 0.08);
  --border-glitch:     rgba(0, 240, 255, 0.3);

  --color-text-main:   #f8fafc;
  --color-text-muted:  #94a3b8;
  --color-text-dim:    #64748b;

  --accent-cyan:       #00f0ff;    /* glitch electric cyan */
  --accent-purple:     #a855f7;    /* electric violet */
  --accent-teal:       #2dd4bf;    /* soft mint teal */
  --accent-coral:      #f43f5e;    /* glitch coral red */
  --accent-indigo:     #6366f1;    /* soft indigo */

  --font-display:      "Syne", "Big Shoulders Display", sans-serif;
  --font-body:         "DM Sans", sans-serif;
  --font-mono:         "JetBrains Mono", monospace;
}
```

## Microinteractions stance
- Big typography headers feature RGB split text glitch animation on hover.
- Buttons feature tactile double-bezel borders with glowing accent background shifts.
- Interactive Web Audio sound effects provide optional futuristic feedback.
