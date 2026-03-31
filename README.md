# Developer Portfolio (March 2026)

A high-performance, immersive portfolio website built with a "Clean & Punchy" aesthetic. Featuring a reactive 3D particle background, 2026-style Bento Grid layouts, and seamless route transitions.

## 🚀 Core Tech Stack

- **Framework:** [Next.js 16.2.1](https://nextjs.org/) (App Router)
- **Runtime:** React 19/20 (for optimized server components)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Native CSS engine)
- **3D Graphics:** [Three.js](https://threejs.org/) via `react-three-fiber`
- **Animation:** [Framer Motion 12+](https://www.framer.com/motion/)
- **Type Safety:** TypeScript 5.5+

## ✨ Key Features

- **Interactive 3D Background:** A vertex shader-driven particle system (8,000+ points) that reacts to mouse proximity on desktop and gyroscope tilt on mobile.
- **"Clean & Punchy" UI:** Bold typography (Inter Tight), high-contrast light-mode primary aesthetic, and tactile "squircle" rounding (`2.5rem`).
- **Active Bento Grid:** 2026-style "Active Grids" with glassmorphism and backdrop-blur effects that let 3D particles show through the UI.
- **Skills Cloud:** An interactive, floating tech-tag cloud that responds to cursor movement on the About page.
- **Route Transitions:** "Punchy" staggered animations between Home and About pages using `AnimatePresence`.
- **Mobile Optimized:** Integrated iOS gyroscope permission handling and responsive touch interactions.

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm (standard)

### Installation
```bash
git clone <your-repo-url>
cd personal
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the development server.

### Build
```bash
npm run build
npm start
```

## 📂 Project Structure

- `src/app`: Next.js App Router (pages, layout, globals).
- `src/components/canvas`: 3D-specific components (Scene, Particles).
- `src/components/ui`: Shared UI components (Hero, BentoGrid, Navbar).
- `src/hooks`: Custom React hooks (Device Orientation, Cursor Tracking).
- `docs/plans`: Architectural design and implementation plans.

## 🎨 Design Principles

1. **YAGNI:** Keep the code lean and focused.
2. **Performance First:** 60fps 3D interactions even on mid-range mobile devices.
3. **Accessibility:** WCAG 2.1 AA compliant contrast and semantic structure.
4. **Visual Hierarchy:** Using size and bold weights to signal importance ("Loudness Control").

---
Built with ⚡ by Gemini CLI (March 2026)
