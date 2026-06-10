# Minimalist Interactive Particle Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pivot the portfolio website from its current semi-brutalist wireframe theme to an ultra-refined, premium minimalist light mode portfolio featuring a high-performance 3D Cosmic Dust Nebula background using React-Three-Fiber.

**Architecture:** Replacing static wireframe primitives in the background with a 3,000-particle point cloud rendered in a single draw call. Updating global CSS and UI components to use high-intensity glass backdrops, thin micro-outlines, and elegant hover-lift states.

**Tech Stack:** React 19, Next.js 16, Tailwind CSS v4, Three.js, React-Three-Fiber, Framer Motion

---

## File Structure Changes

- Modify: `src/app/globals.css` — Update custom utility classes and design tokens.
- Modify: `src/components/ui/BentoCard.tsx` — Add frosted glass backing and thin outlines.
- Modify: `src/components/canvas/Particles.tsx` — Refactor background 3D points system.
- Modify: `src/components/ui/Playbox.tsx` — Update internal 3D preview mesh to render matching particle sphere.
- Modify: `src/components/ui/Navbar.tsx` — Align floating navbar style with thin borders and frosted glass.

---

## Tasks

### Task 1: Refactor Global CSS Styles & Design Tokens

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update design tokens and custom classes**

Replace the existing theme colors and brutalist classes with soft premium values. Paste this replacement code:

```css
@import "tailwindcss";

:root {
  --background: #FAF9F6;
  --foreground: #121212;
  --selection-bg: #FFE600; /* Warm golden cyber-yellow */
  --selection-text: #000000;
}

@theme {
  --font-sans: var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif;
  
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-cyber-yellow: #FFE600;
  --color-electric-cyan: #00F0FF;
  --color-neo-red: #FF3E3E;
  --color-selection-bg: var(--selection-bg);
  
  --font-weight-punchy: 800;
  --font-weight-bold: 700;
}

@layer base {
  *, ::after, ::before {
    @apply border-black/[0.04];
  }

  body {
    @apply bg-background text-foreground antialiased selection:bg-selection-bg selection:text-black;
    font-feature-settings: "ss01", "ss02", "cv01", "cv11";
  }
}

/* Punchy light mode typography */
.punchy-heading {
  @apply font-sans font-punchy tracking-tight leading-[0.9] uppercase text-[#121212];
}

/* Elegant micro-border outline */
.brutalist-border {
  @apply border border-black/[0.04] rounded-2xl;
}

/* Soft atmospheric ambient shadows */
.brutalist-shadow {
  @apply shadow-[0_8px_30px_rgba(0,0,0,0.015)] border border-black/[0.03];
}

.brutalist-shadow-sm {
  @apply shadow-[0_4px_20px_rgba(0,0,0,0.01)] border border-black/[0.02];
}

/* Premium smooth hover/lift translation */
.brutalist-press {
  @apply transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:border-black/[0.08] hover:bg-white/60 active:translate-y-0 active:shadow-[0_8px_30px_rgba(0,0,0,0.015)];
}

/* Subdued secondary info */
.text-decorative {
  @apply text-black/35 font-mono text-[10px] font-bold tracking-widest uppercase;
}

@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
  display: flex;
  width: max-content;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
```

- [ ] **Step 2: Commit global style modifications**

```bash
git add src/app/globals.css
git commit -m "style: update global design tokens and utility classes for premium minimalist look"
```

---

### Task 2: Update Bento Cards to Frosted Glass Styling

**Files:**
- Modify: `src/components/ui/BentoCard.tsx`

- [ ] **Step 1: Replace BentoCard body**

Modify the card styles to use transparent white backing (`bg-white/45`), thin borders (`border-black/[0.04]`), and high-intensity glass blur (`backdrop-blur-xl`).

```typescript
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function BentoCard({ children, className = "", delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
      className={`bg-white/45 backdrop-blur-xl brutalist-border brutalist-shadow brutalist-press p-8 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit BentoCard change**

```bash
git add src/components/ui/BentoCard.tsx
git commit -m "style: implement frosted glass with high-intensity backdrop blur for BentoCard"
```

---

### Task 3: Refactor 3D Scene Background to Cosmic Dust Particles

**Files:**
- Modify: `src/components/canvas/Particles.tsx`

- [ ] **Step 1: Replace background particles code**

Implement the 3,000+ star point-cloud system with manual pre-calculated orbital spherical distribution, smooth mouse hover rotation, and auto-generated soft circle alpha texture.

```typescript
"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Monitor mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const count = 3000;

  // Pre-calculate positions and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    // Golden Yellow (#FFE600), Cyber Cyan (#00F0FF), Soft Silver-Grey (#CCCCCC)
    const color1 = new THREE.Color("#FFE600");
    const color2 = new THREE.Color("#00F0FF");
    const color3 = new THREE.Color("#CCCCCC");

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 8 + 1.5; // Spread between 1.5 and 9.5 units

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // Slightly flattened ellipsoidal nebula
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Randomly mix particle colors
      const mix = Math.random();
      let finalColor;
      if (mix < 0.3) {
        finalColor = color1;
      } else if (mix < 0.6) {
        finalColor = color2;
      } else {
        finalColor = color3;
      }

      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;
    }
    return [pos, col];
  }, []);

  // Programmatically paint a soft circular alpha glow texture
  const particleTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Constant slow drift rotation
    pointsRef.current.rotation.y = time * 0.03;
    pointsRef.current.rotation.z = time * 0.01;

    // Smooth lerped mouse parallax
    pointsRef.current.rotation.y += (mouseRef.current.x * 0.12 - pointsRef.current.rotation.y) * 0.05;
    pointsRef.current.rotation.x += (-mouseRef.current.y * 0.12 - pointsRef.current.rotation.x) * 0.05;

    // Request next frame
    state.invalidate();
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.8}
        map={particleTexture || undefined}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
```

- [ ] **Step 2: Commit particle system changes**

```bash
git add src/components/canvas/Particles.tsx
git commit -m "feat: replace background wireframes with high-performance 3D Cosmic Dust Nebula points system"
```

---

### Task 4: Align Playbox 3D Preview with Particle Theme

**Files:**
- Modify: `src/components/ui/Playbox.tsx`

- [ ] **Step 1: Replace wireframe object with interactive particle sphere**

Modify the interactive canvas inside `Playbox.tsx` to render a 500-particle glowing yellow/cyan orb rotating interactively, matching the overall website aesthetic perfectly.

```typescript
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import BentoCard from "./BentoCard";

function ParticleSphere() {
  const pointsRef = useRef<THREE.Points>(null!);
  const [hovered, setHovered] = useState(false);

  const count = 600;

  // Pre-calculate positions and colors inside a spherical shell
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorYellow = new THREE.Color("#FFE600");
    const colorCyan = new THREE.Color("#00F0FF");

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.0 + Math.random() * 0.25; // Spherical shell thickness

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const finalColor = Math.random() > 0.5 ? colorYellow : colorCyan;
      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;
    }
    return [pos, col];
  }, []);

  const particleTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!hovered) {
      pointsRef.current.rotation.x = time * 0.15;
      pointsRef.current.rotation.y = time * 0.25;
    } else {
      pointsRef.current.rotation.y += 0.015;
    }
  });

  return (
    <points
      ref={pointsRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.9}
        map={particleTexture || undefined}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Playbox() {
  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
          Interact // Drag to Rotate
        </span>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-black uppercase">
          3D ORB PLAYBOX
        </h3>
      </div>

      <div className="h-[200px] w-full bg-neutral-950 rounded-xl relative overflow-hidden shadow-inner border border-white/[0.05]">
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <ambientLight intensity={0.5} />
          <ParticleSphere />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <p className="text-xs font-mono text-black/50">
        * Interactive cosmic particle shell using React-Three-Fiber.
      </p>
    </BentoCard>
  );
}
```

- [ ] **Step 2: Commit Playbox alignment changes**

```bash
git add src/components/ui/Playbox.tsx
git commit -m "feat: refactor 3D Playbox to display interactive glowing particle orb matching main theme"
```

---

### Task 5: Refactor Floating Navbar & Page Transitions

**Files:**
- Modify: `src/components/ui/Navbar.tsx`

- [ ] **Step 1: Replace Navbar layout code**

Refactor the floating navbar to remove thick black borders/shadows and use beautiful ultra-thin lines (`border-black/[0.04]`), transparent blur backing (`bg-white/45 backdrop-blur-xl`), elegant tracking typography, and a subtle active micro-indicator dot.

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 mx-auto w-full max-w-sm px-4">
      <nav className="flex items-center justify-between rounded-full border border-black/[0.04] bg-white/45 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] backdrop-blur-xl">
        {/* Profile/Brand Dot */}
        <Link href="/" className="ml-3.5 flex items-center gap-2 select-none group">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-yellow/60 opacity-65"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-yellow"></span>
          </span>
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#121212] opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            J.TSE
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative rounded-full px-4 py-1.5 text-center font-mono text-[10px] font-bold tracking-wider text-[#121212]"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Active Indicator Underlay */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 -z-10 rounded-full bg-white/80 border border-black/[0.03] shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Indicator Underlay */}
                {hoveredIndex === idx && !isActive && (
                  <motion.div
                    layoutId="hoverNav"
                    className="absolute inset-0 -z-10 rounded-full bg-black/[0.02]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                <span className={isActive ? "opacity-100 text-black" : "opacity-50 hover:opacity-80 transition-opacity"}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Commit Navbar modifications**

```bash
git add src/components/ui/Navbar.tsx
git commit -m "style: redesign floating navbar to utilize elegant glass blurred body, micro-borders and spring underlays"
```

---

### Task 6: Build Verification & Final Test

- [ ] **Step 1: Run linter and build check**

Explain: I will execute the linter and the Next.js production compiler to ensure all code changes compile perfectly with zero type warnings or syntax errors.

Run: `npm run lint && npm run build`
Expected: Execution finishes successfully with exit code 0.
