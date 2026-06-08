# Design Spec: 3D Wireframe Brutalist Hybrid Portfolio Redesign

**Date:** 2026-06-08  
**Aesthetic Theme:** Neo-Brutalist & 3D Wireframe Hybrid  

---

## 1. Design System & Visual Tokens

We will use standard Tailwind CSS classes matching the Neo-Brutalist styling.

| Visual Token | Value / Tailwind Class | Description |
|---|---|---|
| **Background** | `#F2F0EA` (`bg-[#F2F0EA]`) | Off-white/cream physical paper-like background |
| **Borders** | `border-4 border-black` | Thick, raw outlines |
| **Shadows** | `shadow-[8px_8px_0px_0px_#000]` | Solid offset black shadows (no blur) |
| **Accent Primary** | `#FFE600` (`bg-[#FFE600]`) | Cyber Yellow for alerts, buttons, highlights |
| **Accent Secondary** | `#00F0FF` (`bg-[#00F0FF]`) | Electric Cyan for tags, active nav states |
| **Typography Display** | `font-sans font-black uppercase` (using Inter Tight) | Massive, punchy headings with tight line height |
| **Typography Tech** | `font-mono` | Code snippets, terminal info, date labels |

### Tactile Hover Animation (Pressed State)
Cards and buttons will use custom transition classes to create a physical "click" when hovered or active:
```css
/* Custom class or inline utility classes */
.brutalist-btn:hover {
  transform: translate(6px, 6px);
  box-shadow: 2px 2px 0px 0px #000;
}
```

---

## 2. Core Layout & Routing

The application retains its simple routing structure:
* `src/app/page.tsx` — Landing page containing the primary Bento Grid.
* `src/app/about/page.tsx` — Biography, detailed timeline, and technology dashboard.
* `src/components/ui/Navbar.tsx` — Redesigned floating navigation bar with thick borders and a Cyber-Yellow active tab highlighter.

---

## 3. Component Architecture & Bento Grid (Home Page)

The landing page bento grid will be arranged in a responsive 3-column layout:

### A. Hero Block (`col-span-3`)
* **Heading:** Giant display text: `CREATIVE DEVELOPER / 3D ENGINEER`.
* **Sub-bar:** Left: Location `HK // SHANGHAI`. Right: Animated pulsating badge: `STATUS: AVAILABLE FOR GIGS [●]`.
* **Ticker Banner:** Horizontal scrolling marquee displaying active skills: `REACT // SHADERS // THREE.JS // WEBGL // NEXT.JS`.

### B. Project Bento Cards (`col-span-2` & `col-span-1` layout)
* **Design:** High contrast cards showcasing project metadata (Category, Title, Tech).
* **Hover FX:** Underlay turns yellow/cyan, and card springs slightly.

### C. The 3D Playbox Card (`col-span-1`)
* A dedicated interactive window containing a local WebGL canvas.
* Renders a wireframe icosahedron that spinnably responds to user drag/swipe interactions.

### D. Skill Terminal Card (`col-span-1`)
* Designed to mimic a vintage terminal command window.
* Contains tech list and solid progress meters (e.g., `[██████░░░░] 60%`).

### E. Connect Stickers Card (`col-span-3`)
* Footer panel styled like a sticker board with giant clickable action links (`EMAIL`, `GITHUB`, `LINKEDIN`).

---

## 4. Three.js & WebGL Background Integration

We will refactor the existing `src/components/canvas/Particles.tsx` into a retro-futuristic wireframe workspace:

1. **Grid Floor (Landscape):** A horizontal wireframe grid positioned at the lower half of the screen. A wave function (`sin` deformation inside the animate loop) creates a digital cyber-ocean wave effect.
2. **Floating Geometric Elements:** A low-poly cube, torus, and pyramid floating in space. They rotate slowly and shift position relative to mouse cursor movements (parallax).
3. **Optimizations:** Keep geometry segment counts low (low-poly), disable canvas interactions outside the Playbox card, and toggle background animations on mobile screen widths if framerate drops.
