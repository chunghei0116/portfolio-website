# Specification: Clean Minimalist Portfolio Redesign

## 1. Goal
Redesign the portfolio website from the current 3D Retro-Brutalist design system to an ultra-clean, minimalist design system inspired by [ahronsilv.dev](http://ahronsilv.dev/).

## 2. Design System Transitions

### Global CSS (`src/app/globals.css`)
- Change CSS variables to a warm light-neutral palette:
  - Background: `#FAFAFA` (Off-white)
  - Foreground: `#171717` (Dark carbon/black)
  - Card background: `#FAFAFA`
  - Accent color: `#171717`
  - Moss shadow/muted text: `#737373` (Neutral gray)
- Redefine brutalist classes to be minimalist:
  - `.brutalist-border` -> Change to `border border-neutral-200 rounded-none` (thin, subtle gray border).
  - `.brutalist-shadow` -> Change to `box-shadow: none` (remove heavy offset shadows).
  - `.brutalist-hover-lift` -> Change to a simple hover transitions (subtle opacity change or text-color underline, no offsets).
  - Remove all thick 3D shadows.

### Canvas / 3D Removal
Remove all 3D R3F canvases from the page layouts to create a static, fast, and ultra-clean visual presentation:
1. `src/app/layout.tsx`: Remove the background `<Scene />` component.
2. `src/components/ui/Hero.tsx`: Remove the background target Mech HUD Canvas and cylinder scanning animations.
3. `src/components/ui/BentoGrid.tsx`: Remove the canvases for `GithubCoinsScene`, `CityEnvironment`, `PipelineScene`, and `FlutterParticles`.
4. `src/components/ui/TechSection.tsx`: Remove the paper airplane canvas and scrolling skyscrapers in the right column.

## 3. UI Component Updates

### Layout & Spacing
- Update [Hero.tsx](file:///Users/jones.tse/development/personal/portfolio-website/src/components/ui/Hero.tsx) headline typography: Use clean, well-spaced modern weights (`font-[500]` or `font-semibold`) and sentence-cased headings instead of massive uppercase brutalist blocks.
- Simplify [Navbar.tsx](file:///Users/jones.tse/development/personal/portfolio-website/src/components/ui/Navbar.tsx): Remove the thick border, set background to transparent or off-white with a thin bottom border, and render navigation links in small, clean uppercase text with small spacing.
- Re-architect [BentoGrid.tsx](file:///Users/jones.tse/development/personal/portfolio-website/src/components/ui/BentoGrid.tsx): Update grid containers to have transparent cards with thin gray borders, displaying text content clearly without canvas backdrops.
- Re-architect [TechSection.tsx](file:///Users/jones.tse/development/personal/portfolio-website/src/components/ui/TechSection.tsx): Remove the right-column canvas container. Let the timeline occupy the main center stage with clean alignments.
- Update [Contact.tsx](file:///Users/jones.tse/development/personal/portfolio-website/src/components/ui/Contact.tsx): Use clean, borderless container styling with simple email links.
