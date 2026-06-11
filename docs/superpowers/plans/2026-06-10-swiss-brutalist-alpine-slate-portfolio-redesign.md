# Swiss Neo-Brutalist "Alpine Slate" Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio website into a high-impact Swiss Neo-Brutalist layout featuring massive typography, sharp white bento panels, faint topographic surveying grid lines, and a cold alpine-slate color palette inspired by overcast mountains, glaciers, and fir forests.

**Architecture:** We will replace the current cyber-yellow soft-shadow layout with pure, sharp geometric layouts. The background uses a faint topographic surveyor grid overlaid with slow-drifting Swiss-red and forest-green particles. Bento panels are styled as solid white, flat-edged, unblurred glass blocks that pop out with heavy unblurred shadows.

**Tech Stack:** React 19, Next.js 16, Tailwind CSS v4, Three.js, React Three Fiber (R3F), Framer Motion, TypeScript

---

### Task 1: Global Styles & Theme Settings

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update globals.css color tokens and brutalist styles**
  Replace the entire body of `src/app/globals.css` with clean, cold-toned alpine variables, topo map grid styling, and flat-border unblurred brutalist utilities.

  ```css
  @import "tailwindcss";

  :root {
    --background: #F1F3F5; /* Alpine Slate (冷灰頁岩) */
    --foreground: #000000; /* Pure Black */
    --card-bg: #FFFFFF; /* Pure Alpine Snow */
    --accent-red: #E60000; /* Swiss Trail Red */
    --moss-shadow: #1C2E24; /* Moss Shadow deep fir-green */
    --grid-color: #DDE2E5; /* Survey map faint grid lines */
    --selection-bg: #E60000;
    --selection-text: #FFFFFF;
  }

  @theme {
    --font-sans: var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif;
    
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-card-bg: var(--card-bg);
    --color-accent-red: var(--accent-red);
    --color-moss-shadow: var(--moss-shadow);
    --color-grid-color: var(--grid-color);
    
    --font-weight-punchy: 950;
    --font-weight-bold: 800;
  }

  @layer base {
    body {
      @apply bg-background text-foreground antialiased selection:bg-accent-red selection:text-white;
      font-feature-settings: "ss01", "ss02", "cv01", "cv11";
      background-image: 
        linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
      background-size: 80px 80px;
    }
  }

  /* Massive Swiss Grotesque Headline style */
  .swiss-massive-heading {
    @apply font-sans font-punchy tracking-[-0.05em] leading-[0.82] uppercase text-black;
  }

  /* Heavy solid flat-edge brutalist borders */
  .brutalist-border {
    @apply border-[4px] border-black rounded-none;
  }

  /* Solid unblurred flat-shadow utility */
  .brutalist-shadow {
    box-shadow: 8px 8px 0px #000000;
  }

  /* Solid heavy hover lift with flat transition */
  .brutalist-hover-lift {
    @apply transition-all duration-300 ease-out;
  }
  .brutalist-hover-lift:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px #000000;
  }
  .brutalist-hover-lift:active {
    transform: translate(2px, 2px);
    box-shadow: 4px 4px 0px #000000;
  }

  /* Monospaced alpine tag typography */
  .text-alpine-mono {
    @apply font-mono text-[0.75rem] font-bold tracking-[0.12em] uppercase text-moss-shadow;
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

- [ ] **Step 2: Verify compiling state**
  Run: `npm run build` or `npm run lint` to ensure globals.css does not throw compilation exceptions with Tailwind CSS v4 directives.

---

### Task 2: Rebuild Bento Card Component

**Files:**
- Modify: `src/components/ui/BentoCard.tsx`

- [ ] **Step 1: Redesign BentoCard base styling**
  Change `src/components/ui/BentoCard.tsx` to follow flat-corner Swiss brutalist frames. Eliminate rounded-2xl corners, soft shadows, and translucent gradients in favor of pure white, solid thick borders, and the flat `brutalist-shadow` hover effect.

  ```tsx
  "use client";

  import React from "react";

  interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
  }

  export default function BentoCard({ children, className = "" }: BentoCardProps) {
    return (
      <div
        className={`brutalist-border bg-card-bg p-8 brutalist-shadow brutalist-hover-lift ${className}`}
      >
        {children}
      </div>
    );
  }
  ```

- [ ] **Step 2: Run type check**
  Run: `npx tsc --noEmit` to confirm TypeScript parameters are intact.

---

### Task 3: Refactor Home Page & Hero Layout

**Files:**
- Modify: `src/components/ui/Hero.tsx`

- [ ] **Step 1: Re-architect Hero with Swiss massive typography**
  Refactor `Hero.tsx` to implement a giant, deconstructed Helvetica layout with tight line heights. Remove soft yellow blurs and insert the Swiss Trail Red indicator band blocks.

  ```tsx
  "use client";

  import { motion } from "framer-motion";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as const;

  export default function Hero() {
    return (
      <section className="relative flex min-h-[85vh] w-full flex-col justify-end px-8 md:px-16 pt-32 pb-16 overflow-hidden bg-transparent">
        {/* Absolute Survey Header bar */}
        <div className="absolute top-24 left-0 w-full flex justify-between items-center px-8 md:px-16 text-alpine-mono opacity-80 select-none">
          <span>ROUTE DIRECTORY v4 // EXPEDITION ACCLIMATIZED</span>
          <span>DAVOS, GRISONS, CH</span>
        </div>

        {/* Alpine Swiss Trail Marker Segment [Red | White | Red] */}
        <div className="relative z-10 flex h-[16px] w-[70px] brutalist-border overflow-hidden mb-6">
          <div className="flex-1 bg-accent-red" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-accent-red" />
        </div>

        {/* Giant Deconstructed Swiss Grotesque Headline */}
        <div className="max-w-7xl w-full mx-auto relative z-10">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="swiss-massive-heading text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem]"
          >
            <motion.span variants={lineVariants} className="block">
              CHUNG HEI
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              ENGINEERING
            </motion.span>
            <motion.span variants={lineVariants} className="block text-accent-red">
              ROBUST SYSTEMS
            </motion.span>
          </motion.h1>
        </div>
      </section>
    );
  }
  ```

---

### Task 4: Rebuild Bento Grid Content

**Files:**
- Modify: `src/components/ui/BentoGrid.tsx`

- [ ] **Step 1: Rebuild bento cards with Alpine Slate design parameters**
  Update `src/components/ui/BentoGrid.tsx` to display solid high-contrast white cards, the custom Swiss Red statistics badge, and flat black tag pills. Map actual projects (Project Alpha & Beta) and the Skill Terminal.

  ```tsx
  "use client";

  import BentoCard from "./BentoCard";
  import Playbox from "./Playbox";
  import SkillTerminal from "./SkillTerminal";

  const projects = [
    {
      title: "PROJECT ALPHA // 3D CANVAS",
      category: "SUMMIT // ROUTE-01",
      description: "A high-performance 3D spatial visualization platform built with React Three Fiber and Next.js 16. Implements custom orbit controllers, high-precision vertex terrain shaders, and dynamic lighting simulation for mountain path explorations.",
      tags: ["Three.js", "R3F", "Next.js 16", "GLSL / Shaders"],
      liveUrl: "#",
      repoUrl: "https://github.com/chunghei0116",
    },
    {
      title: "Project Beta",
      category: "SUMMIT // ROUTE-02",
      description: "Generative art collections using customized WebGL shaders and real-time noise displacement vectors.",
      tags: ["WebGL", "Shaders", "GLSL"],
      liveUrl: "#",
      repoUrl: "https://github.com/chunghei0116",
    },
  ];

  export default function BentoGrid() {
    return (
      <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 scroll-mt-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Skill terminal (col-span-1) */}
          <div className="col-span-1">
            <SkillTerminal />
          </div>

          {/* Interactive Playbox (col-span-1) */}
          <div className="col-span-1">
            <Playbox />
          </div>

          {/* Featured Telemetry stats card (col-span-1) - High impact Swiss red back */}
          <div className="col-span-1 brutalist-border bg-accent-red text-white p-8 brutalist-shadow brutalist-hover-lift flex flex-col justify-between min-h-[350px]">
            <div>
              <span className="font-mono text-[0.75rem] font-bold tracking-[0.12em] uppercase text-white border-b-2 border-white pb-1 inline-block">
                ASCENT TELEMETRY
              </span>
              <h3 className="mt-6 text-6xl font-sans font-[950] tracking-[-0.05em] leading-[0.8] uppercase text-white">
                4,810M
              </h3>
              <p className="mt-4 text-sm font-bold leading-relaxed text-white">
                TOTAL ACCUMULATED VERTICAL PRODUCTION DEPLOYMENTS SHIPPED AT SCALE.
              </p>
            </div>
            <div className="border-t border-white/20 pt-4 text-left font-mono text-[0.75rem] font-bold uppercase tracking-wider text-white">
              SYS_STATUS: 100% OPERATIONAL
            </div>
          </div>

          {/* Project card 1 (col-span-2) */}
          <BentoCard className="col-span-1 md:col-span-2 min-h-[350px] flex flex-col justify-between">
            <div>
              <span className="draft-card-label text-alpine-mono">
                {projects[0].category}
              </span>
              <h3 className="swiss-box-title text-4xl mt-2">
                {projects[0].title}
              </h3>
              <p className="swiss-box-desc font-normal mt-4 text-moss-shadow max-w-2xl">
                {projects[0].description}
              </p>
              <div className="swiss-tag-group">
                {projects[0].tags.map((tag) => (
                  <span key={tag} className="swiss-flat-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="swiss-actions">
              <a href={projects[0].liveUrl} className="swiss-btn-solid">
                EXPLORE LIVE SUMMIT
              </a>
              <a
                href={projects[0].repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="swiss-btn-outline"
              >
                GITHUB REPO
              </a>
            </div>
          </BentoCard>

          {/* Project card 2 (col-span-1) */}
          <BentoCard className="col-span-1 min-h-[350px] flex flex-col justify-between">
            <div>
              <span className="draft-card-label text-alpine-mono">
                {projects[1].category}
              </span>
              <h3 className="swiss-box-title mt-2">
                {projects[1].title}
              </h3>
              <p className="swiss-box-desc font-normal mt-4 text-moss-shadow">
                {projects[1].description}
              </p>
              <div className="swiss-tag-group">
                {projects[1].tags.map((tag) => (
                  <span key={tag} className="swiss-flat-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="swiss-actions">
              <a
                href={projects[1].liveUrl}
                className="swiss-btn-outline"
                style={{ padding: "0.5rem 1rem" }}
              >
                RECONNOITER
              </a>
            </div>
          </BentoCard>

        </div>
      </section>
    );
  }
  ```

---

### Task 5: Refactor Navigation Bar

**Files:**
- Modify: `src/components/ui/Navbar.tsx`

- [ ] **Step 1: Simplify navigation bar to match Swiss Neo-Brutalist parameters**
  Update `src/components/ui/Navbar.tsx` with sharp, flat border parameters, slate grey backgrounds, and heavy black borders. Eliminate rounded corners and floating background shadows.

  ```tsx
  "use client";

  import React, { useEffect, useState } from "react";

  export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-4 border-black bg-[#F1F3F5] px-8 py-4 flex justify-between items-center`}
      >
        <span className="font-sans font-black tracking-[-0.04em] uppercase text-xl text-black">
          CHUNG HEI
        </span>
        
        <div className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-moss-shadow bg-white/40 border border-black/10 px-3 py-1.5 rounded-none">
          <span>🟢 STATUS: ACCLIMATIZED</span>
        </div>
      </nav>
    );
  }
  ```

---

### Task 6: High-Contrast Swiss Particle Background Scene

**Files:**
- Modify: `src/components/canvas/Particles.tsx`

- [ ] **Step 1: Adjust particle coloring and blend parameters in Particles.tsx**
  Update `Particles.tsx` to color particles with Swiss Red (`#E60000`), Moss Shadow deep green (`#1C2E24`), and slate grey (`#64748B`), and swap the material blending mode to `THREE.NormalBlending` for ultra-clean visibility over the light slate background.

  ```tsx
  "use client";

  import { useFrame } from "@react-three/fiber";
  import { useRef, useMemo, useEffect } from "react";
  import * as THREE from "three";

  const count = 1200; // Moderated count for clean Swiss minimalist layout

  // Pre-calculate positions and colors outside render to remain pure and high-performance
  const [positions, colors, originalPositions] = (() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    // Swiss Trail Red (#E60000), Moss Shadow (#1C2E24), Slate Grey (#64748B)
    const color1 = new THREE.Color("#E60000");
    const color2 = new THREE.Color("#1C2E24");
    const color3 = new THREE.Color("#64748B");

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 8 + 1.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = r * Math.cos(phi);

      const mix = Math.random();
      let finalColor;
      if (mix < 0.25) {
        finalColor = color1;
      } else if (mix < 0.65) {
        finalColor = color2;
      } else {
        finalColor = color3;
      }

      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;
    }
    return [pos, col, pos.slice()];
  })();

  export default function Particles() {
    const pointsRef = useRef<THREE.Points>(null!);
    const mouseRef = useRef({ x: 0, y: 0 });
    const scrollYRef = useRef(0);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        scrollYRef.current = window.scrollY;
      };
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Solid sharp circle texture
    const particleTexture = useMemo(() => {
      if (typeof window === "undefined") return null;
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.beginPath();
      ctx.arc(8, 8, 6, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    }, []);

    useFrame((state) => {
      const time = state.clock.getElapsedTime();

      pointsRef.current.rotation.y = time * 0.015;
      pointsRef.current.rotation.z = time * 0.005;

      pointsRef.current.rotation.y += (mouseRef.current.x * 0.08 - pointsRef.current.rotation.y) * 0.05;
      pointsRef.current.rotation.x += (-mouseRef.current.y * 0.08 - pointsRef.current.rotation.x) * 0.05;

      const scrollFraction = scrollYRef.current / (typeof document !== "undefined" ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight) : 1000);
      pointsRef.current.scale.setScalar(1 + scrollFraction * 0.15);
      pointsRef.current.position.z = scrollFraction * 1.0;

      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const x = posArray[i * 3];
        const originalY = originalPositions[i * 3 + 1];
        posArray[i * 3 + 1] = originalY + Math.sin(time * 0.3 + x * 0.25) * 0.12;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;

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
          size={0.05}
          vertexColors
          transparent
          opacity={0.6}
          map={particleTexture || undefined}
          depthWrite={false}
          blending={THREE.NormalBlending} /* Sharp contrast blending for light backgrounds */
        />
      </points>
    );
  }
  ```

---

### Task 7: Run Final red-green Verification

**Files:**
- Modify: None (Verification only)

- [ ] **Step 1: Test locally**
  Execute local compilation check:
  Run: `npm run build`
  Expected: Successful Next.js static asset bundling with zero static analysis exceptions.
