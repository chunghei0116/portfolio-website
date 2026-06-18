# Specification: Warm Medieval Wireframe Portfolio Redesign

## 1. Goal
Transition the portfolio website into a warm, clean, minimalist design inspired by [ahronsilv.dev](http://ahronsilv.dev/), featuring high-fidelity 3D wireframe medieval elements (Castle Watchtower, Runic Shield, and DevOps Pipeline) rendered in golden-amber.

## 2. Design System Transitions

### Global CSS (`src/app/globals.css`)
Configure CSS variables and base styles to establish the warm, clean aesthetic:
- **`--background` / `--page`**: `#f7f4ed` (Warm off-white sand) with a top-right radial glow of `#dce9de` (soft sage green).
- **`--card-bg` / `--surface`**: `#fffdf8` (Warm clean ivory).
- **`--foreground` / `--ink`**: `#14242c` (Deep charcoal navy ink).
- **`--muted-foreground` / `--ink-soft`**: `#4a5a5c` (Muted gray-slate).
- **`--border` / `--line`**: `rgba(20, 36, 44, 0.12)` (Thin, clean divider borders).
- **`--accent-amber`**: `#c9894d` (Warm golden-amber).
- **`--accent-green`**: `#3e7256` (Forest/sage green).
- Update typography variables to use serif headings (`Cinzel`) alongside geometric body text (`Inter` or `Inter Tight`).

## 3. 3D WebGL Canvas Updates (React Three Fiber)

### Background Scene (`src/components/canvas/Scene.tsx`)
- Restore the persistent background `<Scene />` canvas in [layout.tsx](file:///Users/jones.tse/development/personal/portfolio-website/src/app/layout.tsx).
- Replace the mechanical Gundam-style rotating rings (`MechBackgroundObject`) in `Scene.tsx` with a procedural **3D Castle Watchtower** built brick-by-brick from individual wireframe boxes.
- Set the tower to rotate slowly, colored in warm golden-amber wireframe (`#c9894d` / `#8b5a2b`) to blend beautifully into the warm background.

### Hero Section (`src/components/ui/Hero.tsx`)
- Restore the 3D Canvas element in the Hero section overlay.
- Implement a **3D Wireframe Runic Astrolabe / Crest** in golden-amber wireframe that rotates on hover or mouse drift, replacing the deleted mech scan HUD.

### Bento Grid (`src/components/ui/BentoGrid.tsx`)
- Restore the DevOps Pipeline card's absolute background canvas rendering `PipelineScene` and style the pipeline flow animations to emit glowing golden-amber wireframe energy beams.
- Restore the interactive particle canvas (SodaBubbles / FlutterParticles) in Card G, configuring it to float with warm amber/gold particles.
- Style cards with warm ivory background surfaces (`#fffdf8`), thin borders (`rgba(20, 36, 44, 0.12)`), and clean spacing.

## 4. UI Component Cleanups
- **Navbar (`src/components/ui/Navbar.tsx`)**: Re-style navigation bar to use the warm translucent blur backdrop, a thin bottom border, clean serif headers, and a green active availability dot (`#3e7256`).
- **Timeline (`src/components/ui/TechSection.tsx` & `src/app/about/page.tsx`)**: Style timelines to use thin amber indicators and clean, well-spaced typography. Ensure strict layout bounds (`w-full max-w-full`) to prevent overflows on mobile Safari.
