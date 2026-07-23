# Interactive Weather Panel & Three.js Hero Background Engine Design

## Overview
An interactive, playful weather system integrated into the portfolio website's Hero section. Visitors can switch between 5 distinct weather modes (Sunny, Rainy, Snowy, Stormy, Cosmic Nebula) using a sleek floating glassmorphic control panel. Each mode dynamically transforms the background Three.js scene, lighting, particle behavior, and 3D wireframe sculptures, while allowing visitors to click/tap directly on the hero canvas to trigger weather burst effects (lightning strikes, ripple splashes, solar flares, snow flurries).

---

## 1. System Architecture & Component Hierarchy

```
src/
├── context/
│   └── WeatherContext.tsx         # Global/Hero weather state manager
├── components/
│   ├── WeatherControlPanel.tsx    # Glassmorphism UI panel (top-right overlay)
│   ├── HeroCanvas.tsx             # R3F Canvas wrapper with fallback gradient
│   ├── HeroScene.tsx              # Main R3F scene delegator
│   ├── weather/
│   │   ├── WeatherLighting.tsx    # Dynamic lighting & atmospheric fog controller
│   │   ├── WeatherParticles.tsx   # Multi-mode particle systems (Rain, Snow, Motes, Starfield)
│   │   ├── WeatherSculptures.tsx   # 3D wireframe shapes reacting to weather & lightning
│   │   └── WeatherBursts.tsx      # World-space interactive particle bursts on canvas click
│   └── MinimalHero.tsx            # Main Hero section component hosting UI & Canvas
```

### State Structure (`WeatherContext.tsx`)
```ts
export type WeatherMode = 'sunny' | 'rainy' | 'snowy' | 'stormy' | 'cosmic';

export interface ParticleBurst {
  id: string;
  x: number;
  y: number;
  time: number;
  type: WeatherMode;
}

export interface WeatherState {
  mode: WeatherMode;
  intensity: number; // 0.5 to 2.5x multiplier
  lightningFlashTime: number; // Timestamp for instant thunder/lightning
  bursts: ParticleBurst[];
  setMode: (mode: WeatherMode) => void;
  setIntensity: (intensity: number) => void;
  triggerLightning: () => void;
  addBurst: (x: number, y: number) => void;
}
```

---

## 2. 3D Weather Modes & Shaders

| Mode | Lighting & Colors | Particle Behavior | Interactive Canvas Click |
|---|---|---|---|
| ☀️ **Sunny** | Golden directional (`#f59e0b`), amber ambient | Glowing sun orb top-right + floating warm dust motes | Expanding golden solar flares & ring waves |
| 🌧️ **Rainy** | Dark slate ambient (`#0f172a`), emerald/cyan highlights | 2,000+ vertical dripping rain streaks with velocity lerp | Camera-plane ripple splash rings & water droplets |
| ❄️ **Snowy** | Cool silver/cyan (`#e0f2fe`), violet backlight | Tumbling 3D snowflakes with turbulence sway | Instant 30-particle blizzard explosion from cursor |
| ⚡ **Stormy** | Dark moody fog, 15+ intensity point light flash | Turbulent high-speed rain/particles, glowing neon blue wireframes | Instant screen-illuminating lightning strike |
| 🌌 **Cosmic** | Deep obsidian base, cyan (`#00f0ff`) & emerald (`#10b981`) | Signature 2,800-particle starfield & orbiting geometry | Pulsing violet energy rings |

---

## 3. Weather Control Panel UI (`WeatherControlPanel.tsx`)

### Position & Layout
* **Placement**: Top-right corner of the Hero section, styled with `backdrop-blur-xl bg-zinc-950/70 border border-white/10`.
* **Collapsed Mode**: Compact pill showing active weather icon, mode label, and expand toggle button.
* **Expanded Mode**:
  1. **Tab Switcher**: 5 icon buttons (`Sun`, `CloudRain`, `Snowflake`, `Zap`, `Sparkles`) with Framer Motion animated tab indicator.
  2. **Intensity Slider**: Range slider controlling `intensity` (0.5x to 2.5x speed/density).
  3. **Action Trigger Button**: Interactive button to trigger instant action (`⚡ Strike Lightning`, `☀️ Solar Burst`, `🌧️ Heavy Downpour`, `❄️ Snow Flurry`).

---

## 4. Performance & Micro-Interactions

* **Device Optimization**: Detects mobile viewports (`viewport.width < 7`) and caps particle count (1,000 on mobile vs 2,800 on desktop) to ensure solid 60 FPS.
* **Non-blocking Event System**: R3F `Canvas` receives pointer events via `pointer-events-auto` layer underneath text, ensuring visitors can interact with both CTA buttons and 3D background elements effortlessly.
* **Reduced Motion**: Respects `prefers-reduced-motion` media queries by dampening particle velocity.

---

## 5. Verification Plan

1. Build & TypeScript compilation: Run `npm run build` or `npx tsc --noEmit` to verify zero type errors.
2. Interactive testing: Test weather switching, slider intensity changes, canvas clicks across all 5 weather modes.
3. Mobile & Desktop responsiveness check.
