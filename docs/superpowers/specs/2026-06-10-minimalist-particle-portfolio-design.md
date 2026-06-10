# Design Spec: Minimalist Interactive Particle Portfolio Redesign

**Date:** 2026-06-10  
**Aesthetic Theme:** Sophisticated Light Mode & 3D Cosmic Particle Nebula  

---

## 1. Design System & Visual Tokens

The design will pivot from brutalist outlines and shadows to a highly refined, luxurious minimalist appearance.

| Visual Token | Value | Tailwind Class / Style | Description |
|---|---|---|---|
| **Background** | `#FAF9F6` | `bg-[#FAF9F6]` | Soft cream/off-white physical paper-like background |
| **Foreground Text** | `#121212` | `text-[#121212]` | Sharp dark charcoal for crisp legibility |
| **Particles Accent A**| `#FFE600` | `bg-cyber-yellow` | Golden star dust |
| **Particles Accent B**| `#00F0FF` | `bg-electric-cyan` | Ethereal cosmic blue dust |
| **Borders** | `rgba(0, 0, 0, 0.04)` | `border-black/[0.04]` | Razor-thin, elegant, almost invisible dividers |
| **Card Background** | `rgba(255, 255, 255, 0.45)`| `bg-white/45 backdrop-blur-xl` | High-intensity frosted glass panels |
| **Card Shadow** | Smooth ambient | `shadow-[0_8px_30px_rgba(0,0,0,0.015)]` | Microscopic soft depth shadow |
| **Typography** | `Inter Tight` & Mono | `font-sans`, `font-mono` | Elegant letter-spacing, uppercase titles, lightweight metadata |

### Premium Hover Interaction (Floating Lift)
Instead of harsh translating offsets, cards will use custom transition classes to create a smooth floating lift:
```css
.premium-card-lift {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.premium-card-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.12);
  background-color: rgba(255, 255, 255, 0.6);
}
```

---

## 2. Core Layout & Routing

* `src/app/page.tsx` — Landing page containing the primary Bento Grid.
* `src/app/about/page.tsx` — Biography, timeline, and tech stack dashboard.
* `src/components/ui/Navbar.tsx` — Floating top navigation bar with thin borders, blur backing, and a micro-dot active page indicator.

---

## 3. Background 3D Particles Scene (`Scene.tsx` & `Particles.tsx`)

We will replace the existing wireframe primitives and grid with a responsive, high-performance **Cosmic Dust Nebula particle cloud**:

1. **Geometry & Points:**
   - Generate `3,000` float vertices programmatically representing the 3D coordinates ($x, y, z$) of the nebula cloud.
   - Use a spherical distribution with mathematical wave displacement (undulation) using a sine/cosine orbit inside the render loop.
   - Combine all particles into a single `THREE.BufferGeometry` and `THREE.Points` object for **single-draw-call performance**.

2. **Cosmic Glow Textures:**
   - We will generate or paint a small circular, soft-edge canvas texture programmatically in memory to use as the map for `pointsMaterial`. This avoids requiring a heavy local `.png` asset while ensuring the particles render as soft glowing dust, not sharp digital squares.

3. **Parallax Interactivity:**
   - **Mouse Tracking:** Map mouse movements to gentle rotation variables ($y$ and $x$ axes) of the particle group.
   - **Scroll Tracking:** Map scroll offset to camera $z$-axis and particle scale, making the space expand slightly as the user scrolls.

4. **Code Quality and Robustness:**
   - Detect mobile screen widths (disable background canvas on mobile to preserve battery and maintain a steady 60fps).
   - Gracefully handle WebGL context loss/restoration events.

---

## 4. UI Elements & Tailwind Adjustments

We will surgically refactor global CSS and UI components to align with this premium minimalist layout:

- **`src/app/globals.css`:** Update custom classes (`brutalist-border`, `brutalist-shadow`, `brutalist-press`) to utilize the premium thin outlines, large blurs, and glass backdrops.
- **`BentoCard.tsx`:** Change cards from flat opaque white to `bg-white/45 backdrop-blur-xl border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.015)]`.
- **`Navbar.tsx`:** Adapt the navbar to use matching thin outlines, glass blur backing, and smaller typography.
- **`Playbox.tsx`:** Refactor the mesh inside the playbox canvas to render a delicate, glowing golden-yellow or cyber-blue particle orb instead of the white wireframe torus.
