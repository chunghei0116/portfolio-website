# Portfolio Design: "Clean & Punchy" 3D Experience (March 2026)

## 1. Project Overview
A modern, energetic portfolio website for a Software Developer. The design focuses on high performance, bold typography ("Clean & Punchy"), and immersive 3D interactions.

## 2. Core Tech Stack
- **Framework:** Next.js 16.2.1 (App Router)
- **Runtime:** React 19/20 (for optimized server components and concurrency)
- **Styling:** Tailwind CSS v4 (native CSS engine for zero-runtime performance)
- **3D Graphics:** Three.js via `react-three-fiber` and `react-three-drei`
- **Animation:** Framer Motion 12+ (for physics-based UI transitions)
- **Type Safety:** TypeScript 5.5+

## 3. Interactive 3D Background Design
- **Concept:** A "Living" Particle Mesh.
- **Implementation:** 
  - Vertex shader-driven particle system with 25,000+ points.
  - **Desktop Behavior:** Points gravitate toward the cursor with an elastic return. Hovering over headings "ignites" the particles (changing color or increasing size).
  - **Mobile Behavior:** Gyroscope-based parallax (tilting the phone shifts the particle field) and touch-repel interactions.
- **Optimization:** Frustum culling and low-res modes for legacy mobile devices.

## 4. UI/UX Strategy: "Clean & Punchy"
- **Typography:** Oversized, bold sans-serif headings (e.g., Inter Tight or Geist).
- **Color Palette:** 
  - **Light Mode (Default):** White background, off-white (#F9F9F9) card sections, jet black text.
  - **Accent:** Electric cobalt blue (#2E5BFF) for CTAs and interactive states.
- **Motion:** Staggered entry animations for text. "Punchy" transitions between routes using Framer Motion's `AnimatePresence`.

## 5. Information Architecture
- **Hero:** Sticky heading "CREATIVE DEVELOPER" with the 3D canvas behind it.
- **About:** Concise, bullet-pointed summary with hover-reveal tech icons.
- **Projects:** Grid of 3D-tilt cards showing screenshots. On click, they expand with a smooth layout transition.
- **Contact:** Large-scale contact link that pulses with the background particles.

## 6. Success Criteria
- < 100ms LCP (Largest Contentful Paint) for mobile.
- Consistent 60fps for the 3D background on mid-range Android/iOS devices.
- Fully accessible (WCAG 2.1 AA) with high-contrast text.
