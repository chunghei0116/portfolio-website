# Design Spec: Swiss Neo-Brutalist "Alpine Slate" Redesign

**Date:** 2026-06-10  
**Aesthetic Theme:** Cold Alpine Raw (Swiss Neo-Brutalist & High-Altitude Slate Slate)  

---

## 1. Design System & Visual Tokens

The design will shift from abstract interactive particle nebulas to a sharp, high-contrast, bold Swiss editorial layout with mountain hiking influences. It adopts a cold-toned alpine color scheme, evoking overcast granite peaks, glacial mist, and spruce forests.

| Visual Token | Hex Code | Purpose | Visual Representation |
|---|---|---|---|
| **Background** | `#F1F3F5` | Main page body backdrop | Alpine Slate (冷灰頁岩) — cold grey slate |
| **Card Fill** | `#FFFFFF` | Bento Grid panel backing | Pure Alpine Snow — extreme high-contrast pop |
| **Grid Lines** | `#DDE2E5` | Survey layout grid overlay | Faint topographic经纬 lines (80px x 80px) |
| **Borders & Primary Text**| `#000000` | Thick outlines, grotesque titles | Pure Black — raw iron carabiners and steel cables |
| **Accent Color** | `#E60000` | Section dividers, trail marks, CTAs | Swiss Trail Red — iconic gravel marker & safety red |
| **Subtle Highlight** | `#1C2E24` | Secondary text, deep forest accents | Moss Shadow — dense, dark fir-forest green |

### Styling Utilities (Brutalist Architecture)
```css
/* Heavy flat brutalist shadow */
.brutalist-card-shadow {
  box-shadow: 8px 8px 0px #000000;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.brutalist-card-shadow:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0px #000000;
}
```

---

## 2. Typography Hierarchy & Rules

We enforce absolute typographic discipline using high-impact grotesque typefaces and tight spacing, characteristic of mid-century Swiss design:

*   **Primary Hero Title:** `font-sans font-[950] tracking-[-0.06em] leading-[0.8] uppercase text-black`
    *   Large title running on screen (`font-size: 7.5rem` or dynamic `10vw` to `12vw` to fully capture attention).
*   **Bento Card Titles:** `font-sans font-[900] tracking-[-0.03em] leading-[0.9] uppercase` (`font-size: 2.2rem`).
*   **Monospace Metadata:** `font-mono text-[0.8rem] font-black tracking-[0.12em] uppercase text-[#1C2E24]`.
*   **Body Narrative Text:** `font-sans font-bold leading-[1.45] text-[#1C2E24]`.

---

## 3. Core Layout & Structure

The site will structure content like a mountain routing catalog, splitting sections as milestones on a trail log:

1.  **Site Header (Navbar):**
    *   A high-contrast banner with minimal padding.
    *   Left side: Hiker name (`CHUNG HEI`).
    *   Right side: Current status: `🟢 STATUS: ACCLIMATIZED // OPEN FOR WORK`.
    *   Background: `#F1F3F5` with a thick solid `4px` black bottom border.
2.  **Swiss Trail Marker Accent:**
    *   A physical horizontal bar composed of three solid segments: `[Red (#E60000) \| White (#FFFFFF) \| Red (#E60000)]` representing a traditional alpine trail marker.
3.  **Hero Display Panel (`Hero.tsx`):**
    *   Displays giant, deconstructed headings stacked vertically:
        *   `CHUNG HEI`
        *   `ENGINEERING`
        *   `ROBUST SYSTEMS`
4.  **Bento Grid Panel (`BentoGrid.tsx`):**
    *   Organized into asymmetric columns using pure white cards on the slate grey background.
    *   **Card 1 (Double Width - 2 Cols):** "BASECAMP // TRAILHEAD"
        *   Summary of biography and skills. Includes clean, flat tag markers for React, Next.js, and TypeScript.
    *   **Card 2 (Single Width - 1 Col):** "ASCENT TELEMETRY // STATS"
        *   High-contrast Swiss Red background with solid white text displaying vertical elevation statistics (e.g. `4,810M` - total vertical deployments at scale).
    *   **Card 3 (Double Width - 2 Cols):** "SUMMIT // ROUTE-01"
        *   Showcase of Major Project (Project Alpha) featuring high-performance 3D canvas and React Three Fiber rendering details.
    *   **Card 4 (Single Width - 1 Col):** "SUMMIT // ROUTE-02"
        *   Showcase of Creative Coding Project (Project Beta) featuring custom shaders and generative art.

---

## 4. Implementation Phase Checklist

We will surgically refactor existing files, preserving React 19 / Next 16 logic, while totally overhauling stylesheets and layout styling.

- [ ] **`src/app/globals.css`:** Update design tokens, define Swiss Alpine Slate color codes, remove soft shadow variables, and implement heavy flat-border brutalist styling rules.
- [ ] **`src/components/ui/Hero.tsx`:** Swap standard text for the giant Swiss deconstructed title and integrate the Swiss Trail Red indicator bands.
- [ ] **`src/components/ui/BentoGrid.tsx`:** Rebuild bento cards to have flat sharp corners, white backing, 4px solid borders, and hard solid shadows. Eliminate warm yellow highlights in favor of Swiss Red accents.
- [ ] **`src/components/ui/BentoCard.tsx`:** Align base styles to pure white backgrounds, 4px borders, and remove rounded corner constraints to fit the brutalist aesthetic.
- [ ] **`src/components/ui/Navbar.tsx`:** Simplify to an elegant, solid navigation border aligned with Swiss grid lines.
- [ ] **WebGL & Canvas Adjustments (`Scene.tsx` & `Playbox.tsx`):** Keep the high-performance Three.js setup, but render high-contrast black/white contour peaks or sharp technical geometric coordinate trails to align with the mountain-survey theme.
