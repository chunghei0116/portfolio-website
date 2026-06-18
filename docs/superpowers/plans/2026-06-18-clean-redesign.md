# Clean Minimalist Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio website from the current 3D Retro-Brutalist design system to an ultra-clean, minimalist design system inspired by ahronsilv.dev.

**Architecture:** Update variables and utility classes in globals.css to transition colors and borders to clean neutrals. Remove R3F canvases from layouts (layout.tsx, Hero.tsx, BentoGrid.tsx, TechSection.tsx) to focus purely on elegant typography, structure, and text content.

**Tech Stack:** Next.js 16, TailwindCSS, React.

---

### Task 1: Redesign global styles in globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace CSS variables and classes in globals.css**
Update color values to warm light-neutral off-whites and dark grays, and redefine brutalist border/shadow/hover classes to be thin, minimalist, and flat.

Replace `src/app/globals.css` content:

```css
@import "tailwindcss";

:root {
  --background: #FAFAFA; /* Elegant Off-White */
  --foreground: #171717; /* Carbon Black */
  --card-bg: #FAFAFA;
  --accent-blue: #171717; /* Charcoal/Neutral Black */
  --classic-red: #DC2626;
  --antenna-yellow: #F59E0B;
  --moss-shadow: #737373; /* Neutral Slate Gray */
  --grid-color: transparent;
  --selection-bg: #171717;
  --selection-text: #FFFFFF;
}

@theme {
  --font-sans: var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif;
  
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card-bg: var(--card-bg);
  --color-accent-blue: var(--accent-blue);
  --color-classic-red: var(--classic-red);
  --color-antenna-yellow: var(--antenna-yellow);
  --color-moss-shadow: var(--moss-shadow);
  
  --font-weight-punchy: 600; /* Sleek semibold instead of massive black */
  --font-weight-bold: 500;
}

@layer base {
  html {
    max-width: 100vw;
    overflow-x: hidden;
    background-color: var(--background);
  }
  body {
    max-width: 100vw;
    overflow-x: hidden;
    background-color: transparent;
    @apply text-foreground antialiased selection:bg-accent-blue selection:text-white;
    font-feature-settings: "ss01", "ss02", "cv01", "cv11";
  }
}

/* Massive Headline style - transitioned to clean semibold */
.swiss-massive-heading {
  @apply font-sans font-punchy tracking-[-0.03em] leading-[1.15] text-[#171717];
}

/* Thin coordinate borders instead of brutalist 4px borders */
.brutalist-border {
  @apply border border-neutral-200 rounded-none;
}

/* Remove heavy unblurred shadows */
.brutalist-shadow {
  box-shadow: none;
}

/* Clean, simple hover transitions */
.brutalist-hover-lift {
  @apply transition-opacity duration-300 ease-out;
}
.brutalist-hover-lift:hover {
  @apply opacity-80;
  transform: none;
  box-shadow: none;
}
.brutalist-hover-lift:active {
  transform: none;
  box-shadow: none;
}

/* Monospaced tag typography */
.text-alpine-mono {
  @apply font-mono text-[0.7rem] tracking-[0.08em] uppercase text-moss-shadow;
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

- [ ] **Step 2: Commit changes**
Run:
```bash
git add src/app/globals.css
git commit -m "style: transition globals.css variables and utility classes to clean minimalist design system"
```

---

### Task 2: Remove 3D Canvases from Layout and Components

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/ui/Navbar.tsx`
- Modify: `src/components/ui/Hero.tsx`
- Modify: `src/components/ui/BentoGrid.tsx`
- Modify: `src/components/ui/TechSection.tsx`

- [ ] **Step 1: Remove background Scene in layout.tsx**
Open `src/app/layout.tsx` and delete the import and rendering of `<Scene />` (the floating particle canvas).

Remove:
`import Scene from "@/components/canvas/Scene";`
And remove `<Scene />` from layout JSX.

Updated `src/app/layout.tsx` JSX output:
```tsx
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="min-h-full font-sans antialiased text-foreground selection:bg-accent-blue selection:text-white">
        {/* Floating Brutalist Navbar */}
        <Navbar />
        
        <main className="relative min-h-screen flex flex-col">
          {/* Animated Route Transitions */}
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </body>
    </html>
  );
```

- [ ] **Step 2: Simplify Navbar.tsx styling**
Remove the custom border-b-4 class, set background to transparent/solid off-white, and replace `border-b-4 border-black` with `border-b border-neutral-100`.

Updated `Navbar.tsx` render:
```tsx
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-neutral-200/60 bg-[#FAFAFA]/80 backdrop-blur-[8px] px-8 py-4 flex justify-between items-center`}
    >
      <span className="font-sans font-black tracking-[-0.04em] uppercase text-lg text-black">
        CHUNG HEI
      </span>
      
      <div className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-moss-shadow bg-neutral-100 border border-neutral-200 px-2.5 py-1.5 rounded-none">
        <span>🟢 AVAILABLE</span>
      </div>
    </nav>
  );
```

- [ ] **Step 3: Remove background Canvas from Hero.tsx**
Open `src/components/ui/Hero.tsx`. Remove the `<Canvas>` HUD underlay, the `Gundam Blue Trail` marker, and the absolute directory tags. Also set the headline font styles to sentence-cased clean sizes.

Updated `Hero.tsx` code:
```tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

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
  hidden: { opacity: 0, y: 30 },
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
    <section className="relative flex min-h-[70vh] w-full flex-col justify-end px-6 sm:px-8 md:px-16 pt-32 pb-16 overflow-hidden bg-transparent">
      {/* Absolute Survey Header bar */}
      <div className="absolute top-24 left-0 w-full flex justify-between items-center px-6 sm:px-8 md:px-16 font-mono text-[9px] tracking-wider text-moss-shadow select-none z-10 border-b border-neutral-100 pb-3">
        <span>CHUNG HEI &bull; MOBILE & GITOPS</span>
        <span className="hidden sm:inline">HONG KONG</span>
      </div>

      {/* Giant Clean Headline */}
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="swiss-massive-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <motion.span variants={lineVariants} className="block font-medium">
            I build software that
          </motion.span>
          <motion.span variants={lineVariants} className="block font-medium">
            helps teams move with confidence.
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 text-sm sm:text-base text-moss-shadow max-w-xl font-sans font-medium leading-relaxed"
        >
          I’m Chung Hei, a developer operating across mobile infrastructure, native integrations, web applications, and DevOps services.
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Clean BentoGrid.tsx and remove Canvases**
Open `src/components/ui/BentoGrid.tsx`. Delete the imports and usages of `Canvas`, `GithubCoinsScene`, `CityEnvironment`, `PipelineScene`, and `SodaBubbles`.
Update the grid items to render on simple clean neutral background. Set `brutalist-border` class updates so they inherit the new thin gray borders. Remove the `box-shadow` styles.

Updated `BentoGrid.tsx` JSX layout code:
```tsx
"use client";

import { useState, useEffect } from "react";
import BentoCard from "./BentoCard";

interface Day {
  color: string;
  contributionCount: number;
  date: string;
}

export default function BentoGrid() {
  const [githubCount, setGithubCount] = useState<string>("4.8K+");

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data.count) {
          const num = Number(data.count);
          if (num >= 1000) {
            setGithubCount(`${(num / 1000).toFixed(1)}K+`);
          } else {
            setGithubCount(`${num}+`);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching github count", err);
      });
  }, []);

  return (
    <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 scroll-mt-24 select-none">
      <div className="grid grid-cols-12 gap-6 auto-rows-min">
        
        {/* Card A: GITHUB - Minimal Stat (col-span-4) */}
        <div className="col-span-12 md:col-span-4 min-w-0 brutalist-border bg-neutral-50/60 p-6 flex flex-col justify-between min-h-[220px]">
          <div className="w-full">
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-moss-shadow uppercase">
              GITHUB CONTRIBUTIONS
            </span>
            <div className="mt-6">
              <h3 className="text-5xl font-sans font-semibold tracking-tight text-neutral-900">
                {githubCount}
              </h3>
            </div>
          </div>

          <div className="w-full">
            <a
              href="https://github.com/chunghei0116"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-wider text-accent-blue border-t border-neutral-200/60 pt-3 group hover:opacity-80"
            >
              <span>VIEW PROFILE ↗</span>
            </a>
          </div>
        </div>

        {/* Card B: PROJECT ALPHA - Simple Header (col-span-8) */}
        <BentoCard className="col-span-12 md:col-span-8 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-moss-shadow uppercase">
              PROJECTS // ROUTE-01
            </span>
            <h3 className="text-3xl font-sans font-semibold tracking-tight mt-4 text-neutral-900">
              PROJECT ALPHA // 3D CANVAS
            </h3>
            <p className="mt-2 text-xs font-medium text-moss-shadow max-w-2xl leading-relaxed">
              A high-performance 3D spatial visualization platform built with React Three Fiber. Implements custom orbit controllers, terrain shaders, and dynamic lighting simulation.
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-moss-shadow">
            THREE.JS &bull; R3F &bull; NEXT.JS
          </span>
        </BentoCard>

        {/* Card C: ROUTE LOG / TIMELINE (col-span-3, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-moss-shadow uppercase border-b border-neutral-200/60 pb-1.5 inline-block w-full">
              DEVELOPMENT ARCHIVE
            </span>
            <h3 className="text-2xl font-sans font-semibold tracking-tight mt-6 text-neutral-900">
              2026 ROADMAP
            </h3>
            <div className="flex flex-col gap-4 mt-6 font-mono text-xs font-bold text-neutral-800 uppercase tracking-tight">
              <div className="flex items-center gap-2">🟢 <span>Q1 SYNC</span></div>
              <div className="flex items-center gap-2 text-moss-shadow">⚪ <span>Q2 BRIDGE</span></div>
              <div className="flex items-center gap-2 text-neutral-300">⚪ <span>Q3 STABLE</span></div>
            </div>
          </div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-moss-shadow">
            STAGES
          </span>
        </BentoCard>

        {/* Card D: PROFILE - Center Focal Card (col-span-6, row-span-2) */}
        <BentoCard 
          className="col-span-12 md:col-span-6 md:row-span-2 flex flex-col justify-end min-h-[340px] bg-neutral-50/60 p-6"
        >
          <div className="w-full flex flex-col justify-end">
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-moss-shadow uppercase mb-2">ABOUT</span>
            <h3 className="text-4xl font-sans font-semibold tracking-tight text-neutral-900 uppercase">
              CHUNG HEI
            </h3>
            <div className="border-t border-neutral-200/60 pt-4 mt-6">
              <h4 className="text-base font-sans font-semibold tracking-tight uppercase leading-none text-neutral-800">
                DEVOPS & MOBILE ENGINEER
              </h4>
              <p className="mt-2 text-xs font-medium text-moss-shadow leading-relaxed">
                Operating at the intersection of high-availability backend orchestration and smooth native cross-platform experiences.
              </p>
            </div>
          </div>
        </BentoCard>

        {/* Card E: PROJECT BETA (col-span-3, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-moss-shadow uppercase border-b border-neutral-200/60 pb-1.5 inline-block w-full">
              PROJECTS // ROUTE-02
            </span>
            <h3 className="text-2xl font-sans font-semibold tracking-tight mt-6 text-neutral-900">
              PROJECT BETA
            </h3>
            <p className="mt-2 text-xs font-medium text-moss-shadow leading-relaxed">
              Generative art collections using WebGL shaders and real-time noise displacement vectors.
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-moss-shadow">
            WEBGL &bull; SHADERS &bull; GLSL
          </span>
        </BentoCard>

        {/* Card F: GITOPS PIPELINE (col-span-12) */}
        <div className="col-span-12 brutalist-border bg-[#171717] text-white p-6 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-neutral-400 uppercase">
              SYSTEM DEPLOYMENTS
            </span>
            <h3 className="text-2xl font-sans font-semibold tracking-tight text-white mt-4">
              DEVOPS CORE STACK
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-neutral-800 pt-6 mt-6">
            <div className="flex flex-col items-start">
              <span className="font-sans font-bold text-xs uppercase text-white tracking-tight block mb-1">01 / KUBERNETES</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-neutral-400">ArgoCD, GitOps loops, Helm, EKS cluster deploys</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-sans font-bold text-xs uppercase text-white tracking-tight block mb-1">02 / HYPERVISOR</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-neutral-400">Docker containers, multi-stage hermetic builds</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-sans font-bold text-xs uppercase text-white tracking-tight block mb-1">03 / CLOUD SYSTEMS</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-neutral-400">Linux systems, self-hosted homelabs, AWS cloud</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 5: Clean TechSection.tsx and remove Right Column Canvas**
Remove the Canvas container inside `TechSection.tsx` right column entirely. Clean up layout to be centered and elegant.

Updated layout inside `TechSection.tsx` (lines 214-275):
```tsx
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12 select-none">
      <div className="brutalist-border bg-card-bg p-6 sm:p-8">
        
        {/* Main timeline header */}
        <div className="border-b border-neutral-200/60 pb-4 mb-6">
          <span className="text-moss-shadow font-mono text-[9px] font-bold uppercase tracking-wider bg-neutral-100 border border-neutral-200 px-2 py-0.5">
            CAREER TIMELINE // PATHWAY
          </span>
          <h2 className="text-3xl font-sans font-semibold tracking-tight uppercase mt-4 text-foreground">
            FLIGHT PATHWAY
          </h2>
        </div>

        {/* Brutalist Coordinate Grid Timeline */}
        <div className="flex flex-col divide-y divide-neutral-200/60 w-full max-w-full">
          {history.map((node) => (
            <div key={node.year} className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 w-full max-w-full">
              {/* Left Metadata Coordinate block */}
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-neutral-100 border border-neutral-200 px-2 py-1 select-none text-moss-shadow">
                  [ {node.year} ]
                </span>
              </div>

              {/* Right Content Block */}
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <span className="font-sans font-semibold text-base text-foreground tracking-tight uppercase break-words">
                    {node.role}
                  </span>
                  <span className="hidden md:inline text-neutral-300 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-bold text-accent-blue uppercase">
                    {node.company}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-moss-shadow font-medium mt-2 max-w-2xl">
                  {node.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
```

- [ ] **Step 6: Commit all layout updates**
Run:
```bash
git add src/app/layout.tsx src/components/ui/Navbar.tsx src/components/ui/Hero.tsx src/components/ui/BentoGrid.tsx src/components/ui/TechSection.tsx
git commit -m "style: clean R3F canvas components and refine cards, header, and timeline layouts to be minimalist"
```

---

### Task 3: Validate and Typecheck Redesign

- [ ] **Step 1: Run TypeScript compiler**
Run: `npx tsc --noEmit`
Expected: Success with no errors.
