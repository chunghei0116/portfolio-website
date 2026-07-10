# Design Spec: Renaissance-Inspired Portfolio Revamp

**Date:** 2026-07-10  
**Aesthetic Theme:** Renaissance Humanism / Da Vinci Sketchbook  

---

## 1. Visual Theme Options (Renaissance Style)

We propose three distinct design executions of the Renaissance style for this portfolio:

### Approach A: Classical Chiaroscuro (Dramatic Contrast)
*   **Concept:** Emphasizes dramatic light-and-dark contrast (chiaroscuro) using parchment tones and deep charcoal/sienna offsets.
*   **Colors:** Parchment Cream (`#F7F4EB`), Dark Walnut (`#2B221E`), Gold Ochre (`#C59B27`), Terracotta (`#A9442A`).
*   **Structure:** Dynamic editorial grids resembling classical manuscripts.

### Approach B: Da Vinci Blueprint / Codex (Recommended)
*   **Concept:** Merges Renaissance art with technical engineering (perfect for a software developer). The layout resembles Leonardo da Vinci's personal journals and notebooks.
*   **Colors:** Aged Paper (`#FAF6EE`), Ink Sepia (`#3E2A20`), Drawing Charcoal (`#1F1A17`), Gold Accents (`#D4AF37`).
*   **Visuals:** Thin grid overlays, technical circle annotations, structural lines, and our fluid-dynamics-inspired particle wave.
*   **Typography:** High-contrast classic serif headlines (e.g., Cormorant Garamond / Playfair) paired with clean monospace subtitles.

### Approach C: Neo-Classical Gallery
*   **Concept:** A modern, clean, gallery-like layout with strict architectural proportions (Golden Ratio).
*   **Colors:** Carrara Marble White (`#F8F9FA`), Antique Gold (`#B89742`), Deep Bronze (`#3C3530`).
*   **Structure:** Spacious, airy grids, framed artwork styling for projects, and highly symmetric alignment.

---

## 2. Interactive Background: Diagonal Particle Wave

The background is a 3D-projected vector mesh representing fluid dynamics studies (reminiscent of Leonardo's sketches of flowing water):

*   **Geometry:** A flat grid sheet of 1,350 particles in the X-Y plane.
*   **Movement:** A sine-wave displacement traveling diagonally from **bottom-left to top-right**.
*   **Palette:** Shimmering gold, ochre, sienna, and warm parchment dots.
*   **Interaction:** Smooth coordinate parallax that tilts slightly on mouse movement.

---

## 3. Plan to Clean and Revamp the Site

1.  **Aesthetic Clean:**
    *   Reset `src/app/globals.css` variable system (introducing warm paper, gold, sepia, sienna).
    *   Remove cold blue gradients and high-tech gundam/neon tags.
2.  **Layout Overhaul:**
    *   Re-arrange the layout into a classical editorial grid.
    *   Transform Bento cards into parchment sheets with delicate double-borders or gold outlines.
3.  **Content Revamp:**
    *   Update typography to classical serif headers and monospace notes.
    *   Incorporate the GitHub contribution telemetry dashboard inside a stylized "ascent log" card.
