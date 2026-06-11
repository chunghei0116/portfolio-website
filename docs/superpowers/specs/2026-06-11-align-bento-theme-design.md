# Specification: Swiss Editorial "Static 3D City Card" Bento Grid

## Goal
Remove the clickable expanding/dive-in portal and router redirection on Card D in `src/components/ui/BentoGrid.tsx`. Keep the 3D procedural wireframe city running as a static, non-expanding background within Card D's card boundaries. Revert `/about`'s background to the original Gundam-blue persistent mechanical rings.

## Design Details
- **Card D (Static 3D City Card - Center Focal Card):**
  - **No Click Action:** Remove `isExpanded` state, click handlers, ESC listeners, and fullscreen exit buttons.
  - **3D Canvas:** Render a local 3D Canvas constrained inside Card D (`absolute inset-0 z-0 opacity-80 pointer-events-none`).
  - **City & Camera:** Render `CityEnvironment` and `CameraController` statically (set `isExpanded` permanently to `false` for bird's-eye view, or adjust camera settings to keep a beautifully centered bird's-eye miniature).
- **Persistent Scene (`Scene.tsx`):**
  - Revert to render only `<Particles />` and `<MechBackgroundObject />` across all page routes (removing `/about`'s background city rendering) to keep the focal attention centered directly on the homepage Bento Grid.
