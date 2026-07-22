# Design Specification: 100% Graphic-Intensive 3D WebGL Cyber-Ethereal Portfolio Redesign

- **Date**: 2026-07-22
- **Status**: Approved
- **Target Experience**: Agency-grade $150k+ immersive WebGL/Shader portfolio

---

## 1. Executive Summary & Aesthetic Vision
The portfolio will undergo a complete 100% redesign into a breathtaking, graphic-intensive, 3D WebGL cyber-ethereal experience. It merges high-end dark glassmorphism (Vantablack OLED theme, double-bezel cards, backdrop blurs) with cutting-edge WebGL graphics built using Three.js, React Three Fiber, custom GLSL raymarched shaders, and dynamic 3D physics.

---

## 2. Design System & Visual Aesthetics

### 2.1 Theme & Color Palette
- **Base Background**: Vantablack (`#030305`)
- **Primary Glass Surface**: Recessed Vantablack Glass (`rgba(10, 10, 16, 0.7)` with `backdrop-blur-2xl`)
- **Hairline Borders**: Glowing Subtle Silver/Cyan (`rgba(255, 255, 255, 0.08)` to `rgba(56, 189, 248, 0.25)`)
- **Accent Flares**: Electric Cyan (`#00f0ff`), Quantum Purple (`#a855f7`), Emerald Glow (`#10b981`)
- **Copy**: Pure White (`#ffffff`), Muted Slate (`#94a3b8`), Monospace Cyan (`#38bdf8`)

### 2.2 Typography Scale
- **Display Headings**: `Plus Jakarta Sans` / `Clash Display` (Heavy uppercase tracking, bold Grotesk)
- **Body**: `Inter` / `DM Sans` (Clean geometric copy)
- **Monospace Metadata**: `JetBrains Mono` (Coordinates, FPS counters, tech badges, status pills)

### 2.3 Double-Bezel Card Architecture (Doppelrand)
Every major UI component (project cards, skill blocks, contact form) uses nested double-bezel enclosures:
- **Outer Shell**: `rounded-[2rem] p-1.5 bg-white/5 border border-white/10 ring-1 ring-white/5 shadow-2xl`
- **Inner Core**: `rounded-[calc(2rem-0.375rem)] bg-black/60 p-6 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`

---

## 3. 3D WebGL & Shader Architecture

### 3.1 Background Raymarched Shader (`AuroraShaderCanvas`)
- A continuous background WebGL canvas using a custom GLSL fragment shader.
- Generates raymarched volumetric plasma/aurora waves with subtle noise displacement.
- Reacts to mouse position (chromatic dispersion around cursor) and scroll velocity.

### 3.2 Hero 3D Asset (`QuantumRefractionOrb`)
- Built with `@react-three/fiber` and `@react-three/drei`.
- Uses `MeshTransmissionMaterial` for real-time glass refraction, chromatic aberration, thickness distortion, and roughness.
- Features dynamic multi-axis rotation reacting to user cursor and scroll position.
- Enclosed by an orbiting glowing particle ring (`Points` mesh with custom GLSL alpha glow shader).

### 3.3 Interactive 3D Physics Sandbox (`TechPhysicsSandbox`)
- Integrated using `cannon-es` and `@react-three/fiber`.
- Renders 3D geometric shapes (cubes, spheres, capsules) mapped with key technical skills (Next.js, Three.js, React, TypeScript, Docker, Kubernetes, Python, GLSL).
- Users can click, drag, throw, and bounce tech badges in real 3D physical space.

### 3.4 Image Hover Shader (`DistortionCard`)
- Project cards feature custom WebGL image distortion on hover (fluid wave distortion and chromatic split).

---

## 4. Detailed Component & Section Breakdown

### 4.1 Floating Glass Island Navbar (`Navbar.tsx`)
- Floating pill detached from top (`fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-6 py-3 bg-black/60 backdrop-blur-2xl border border-white/10`).
- Live status indicator badge (`🟢 Available for Senior / Lead Roles`).
- Navigation anchor links with smooth scroll.
- Sound effect toggle / FPS performance monitor pill.

### 4.2 Hero Section (`HeroSection.tsx`)
- Pill Eyebrow Tag: `[ 01 // SENIOR FULL-STACK & GRAPHICS ARCHITECT ]`
- Massive Heading: **"ENGINEERING DIGITAL REALITY & NEXT-GEN WEB EXPERIENCES"**
- Subtitle: Highlighting full-stack expertise, 3D WebGL graphics, and scalable DevOps architecture.
- Centerpiece: Interactive 3D Quantum Refraction Crystal.
- Nested CTA Buttons:
  - Primary: `[ View Selected Work ↗ ]` with inner circular arrow wrapper and hover physics.
  - Secondary: `[ Get In Touch ]` with glass highlight.

### 4.3 Featured Projects Bento Grid (`ProjectsSection.tsx`)
- Asymmetrical bento layout (`col-span-8` next to `col-span-4`).
- Double-bezel cards with 3D tilt interaction on mouse move.
- Filter tabs: All, WebGL & 3D, Full-Stack Apps, DevOps & Cloud.
- Interactive modal / expanded drawer for detailed project case studies.

### 4.4 Tech Stack & Physics Playground (`SkillsSection.tsx`)
- Toggleable dual modes:
  1. **3D Particle Constellation**: Interactive particle galaxy organized by categories (Frontend, Backend, 3D/GLSL, DevOps).
  2. **Physics Sandbox**: Real-time 3D rigid body physics playground with draggable skill blocks.

### 4.5 Career Timeline & Achievements (`ExperienceSection.tsx`)
- Vertical glowing electric cable timeline.
- Staggered double-bezel cards for work history, key engineering feats, and metrics.

### 4.6 Contact & Interactive Footer (`ContactSection.tsx`)
- Cyber-ethereal glass contact form with real-time GLSL glow outline.
- Instant copy email button with feedback toast.
- Live GMT/local clock + social links pills (GitHub, LinkedIn, Twitter/X, Email).

---

## 5. Performance & Mobile Optimization Strategy
1. **DPR Capping**: Cap R3F canvas `dpr` to `Math.min(2, window.devicePixelRatio)` to maintain 60FPS on high-DPI displays.
2. **Adaptive Quality / Fallback**: Lower particle count and disable heavy refraction depth on low-power GPU mobile devices.
3. **Hardware-Accelerated Motion**: All CSS/Framer Motion reveals use `transform` and `opacity` exclusively.
4. **Mobile Layout Fallback**: Responsive collapse below `768px` into full-width stacks (`w-full px-4`).

---

## 6. Implementation Timeline & Next Steps
1. Write design document and commit to repository.
2. Invoke `writing-plans` skill to generate a granular step-by-step implementation plan.
3. Execute implementation plan with full verification.
