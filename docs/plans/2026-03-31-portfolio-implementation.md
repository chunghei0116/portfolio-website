# Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a high-performance, Next.js 16-based portfolio with a reactive 3D particle background and "Clean & Punchy" UI.

**Architecture:** Next.js 16 (App Router) + React Three Fiber for 3D + Framer Motion for UI. Using a separate Canvas component for the background to prevent unnecessary re-renders of the UI layer.

**Tech Stack:** Next.js 16.2.1, React 19, Tailwind CSS v4, Three.js, React Three Fiber, Framer Motion.

---

### Task 1: Project Scaffolding

**Files:**
- Create: Project root using `create-next-app`
- Modify: `package.json` (ensure versions)

**Step 1: Scaffold Next.js 16 app**
Run: `npx create-next-app@16.2.1 . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes --disable-git`
*Note: Using --disable-git because we already initialized it.*

**Step 2: Install 3D and Animation dependencies**
Run: `npm install three @types/three @react-three/fiber @react-three/drei framer-motion`

**Step 3: Verify dev server starts**
Run: `npm run dev`
Expected: Server starts on port 3000.

**Step 4: Commit**
Run: `git add . && git commit -m "chore: scaffold Next.js 16 project with 3D stack"`

---

### Task 2: Clean & Punchy Theme Setup

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Update Tailwind v4 configuration in globals.css**
Update `src/app/globals.css` with minimalist light-mode theme variables and Inter Tight font setup (if using Google Fonts).

**Step 2: Basic Layout Structure**
Update `src/app/layout.tsx` to include a standard layout with a background container for the canvas.

**Step 3: Commit**
Run: `git add src/app/globals.css src/app/layout.tsx && git commit -m "feat: setup global theme and layout"`

---

### Task 3: 3D Particle Background Component

**Files:**
- Create: `src/components/canvas/Scene.tsx`
- Create: `src/components/canvas/Particles.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Scene wrapper**
Implement `Scene.tsx` using `<Canvas>` from `@react-three/fiber`.

**Step 2: Implement Particle System**
Implement `Particles.tsx` using `Points` and a custom shader or `PointsMaterial`. Use `useFrame` to handle the cursor interaction.

**Step 3: Add to Home Page**
Import and place the `<Scene />` behind the hero content in `src/app/page.tsx`.

**Step 4: Commit**
Run: `git add src/components/canvas src/app/page.tsx && git commit -m "feat: add interactive 3D particle background"`

---

### Task 4: Hero Section & Entry Animations

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/ui/Hero.tsx`

**Step 1: Build Hero UI**
Create `Hero.tsx` with oversized typography and "Punchy" entrance animations using `framer-motion`.

**Step 2: Integrate Hero into Page**
Update `page.tsx` to display the Hero component.

**Step 3: Commit**
Run: `git add src/components/ui/Hero.tsx src/app/page.tsx && git commit -m "feat: add hero section with entry animations"`

---

### Task 5: Mobile Gyroscope Optimization

**Files:**
- Modify: `src/components/canvas/Particles.tsx`
- Create: `src/hooks/useDeviceOrientation.ts`

**Step 1: Device Orientation Hook**
Implement a hook to track `beta` and `gamma` rotation.

**Step 2: Apply Parallax to Particles**
Update `Particles.tsx` to shift the camera or point group based on orientation.

**Step 3: Commit**
Run: `git add src/hooks/useDeviceOrientation.ts src/components/canvas/Particles.tsx && git commit -m "perf: add mobile gyroscope parallax effect"`
