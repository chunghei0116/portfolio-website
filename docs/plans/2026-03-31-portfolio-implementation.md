# Portfolio Implementation Plan (v2 - Expanded)

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a high-performance, Next.js 16-based portfolio with a reactive 3D particle background, "Clean & Punchy" UI, and a 2026-style Bento Grid.

**Architecture:** Next.js 16 (App Router) + React Three Fiber for 3D + Framer Motion for UI. Using glassmorphism for bento cards to let the 3D particles show through.

**Tech Stack:** Next.js 16.2.1, React 19, Tailwind CSS v4, Three.js, React Three Fiber, Framer Motion.

---

### Task 1: Project Scaffolding [COMPLETED]
### Task 2: Clean & Punchy Theme Setup [COMPLETED]
### Task 3: 3D Particle Background Component [COMPLETED]
### Task 4: Hero Section & Entry Animations [COMPLETED]

---

### Task 5: Mobile Gyroscope Optimization [COMPLETED]

---

### Task 6: Bento Grid Projects Section

**Files:**
- Create: `src/components/ui/BentoGrid.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build Bento Card component**
Create `BentoCard.tsx` with "Bento 2.0" styling:
- Glassmorphism: `bg-white/10 backdrop-blur-xl border border-white/20`.
- Tactile Squircles: `rounded-[2.5rem]`.
- Hover Effect: A subtle "glow" using a radial gradient that follows the mouse.

**Step 2: Implement Projects Grid**
In `BentoGrid.tsx`, create a responsive grid layout with varying card sizes (e.g., 2x2, 1x1, 2x1).

**Step 3: Integrate into Home Page**
Add the `<BentoGrid />` below the Hero section in `src/app/page.tsx`.

**Step 4: Commit**
Run: `git add src/components/ui src/app/page.tsx && git commit -m "feat: add 2026-style bento grid projects section"`

---

### Task 7: About Page with Active Tiles

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/components/ui/SkillsCloud.tsx`

**Step 1: Create About Page route**
Scaffold `src/app/about/page.tsx` with a large "Clean & Punchy" heading.

**Step 2: Implement "Active" Skills Tile**
Create `SkillsCloud.tsx`—an interactive tile where tech icons float and react to hover/touch.

**Step 3: Layout About Content**
Use a 2-column bento-inspired layout for "Experience" and "Bio" tiles.

**Step 4: Commit**
Run: `git add src/app/about src/components/ui/SkillsCloud.tsx && git commit -m "feat: add about page with active skills tile"`

---

### Task 8: Navigation & Glassmorphism Header

**Files:**
- Create: `src/components/ui/Navbar.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Build Floating Navbar**
Create a minimalist, floating navbar with glassmorphism that stays at the top.

**Step 2: Add Route Transitions**
Use Framer Motion's `AnimatePresence` in `layout.tsx` for "punchy" transitions between Home and About.

**Step 3: Commit**
Run: `git add src/components/ui/Navbar.tsx src/app/layout.tsx && git commit -m "feat: add glassmorphism navbar and route transitions"`
