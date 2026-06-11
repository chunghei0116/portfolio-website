# Specification: Move Hero Particles to Whole Website

## Goal
Move the beautiful rising black-and-blue particles from the local Hero background canvas to the global, persistent background canvas so they flow seamlessly across the entire website, and remove the local copy in `src/components/ui/Hero.tsx` to prevent duplicates and improve performance.

## Design Details
- **Global Particles (`src/components/canvas/Particles.tsx`):**
  - Overwrite the global background particles with the precise code and logic of `HeroParticles` from the Hero section.
  - Increase particle count to `500` (from `350` in the Hero) to perfectly balance full-screen visual density with 60fps rendering performance.
  - Colors are kept as a premium combination of bright blue `#0A5CFF` and black `#000000`, floating elegantly on the Warm Ivory `#FDFBF7` website background.
  - Retain the mouse repulsion/deflection logic, so particles gently slide away as the user moves their cursor anywhere on the webpage.
- **Hero Section (`src/components/ui/Hero.tsx`):**
  - Remove the local `<HeroParticles />` sub-component and its invocation inside the Canvas to eliminate duplicate particle calculations and overlapping render threads.
  - Keep `<HeroMechObject />` running in the Hero's local canvas so the architectural wireframe crosshair continues to align perfectly with the headers.
