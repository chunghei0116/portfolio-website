# 3D Wireframe Brutalist Hybrid Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio website with a Neo-Brutalist & 3D Wireframe Hybrid style, making it highly interactive and professional.

**Architecture:** We will replace the soft particles background with a structured 3D wireframe scene (grid floor + floating low-poly primitives) and redesign the UI layers using heavy borders, flat offset drop shadows, cyber-vibrant accents, and custom retro elements like marquees and a simulated command terminal.

**Tech Stack:** React 19, Next.js 16, Tailwind CSS v4, Framer Motion, Three.js, React-Three-Fiber, React-Three-Drei.

---

### Task 1: Base Styles & Tailwind Configuration
**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update globals.css with visual variables and brutalist utilities**
  Add theme colors, layout overrides, and standard keyframes for the brutalist styling.
  ```css
  @import "tailwindcss";

  :root {
    --background: #F2F0EA;
    --foreground: #000000;
    --selection-bg: #FFE600;
    --selection-text: #000000;
  }

  @theme {
    --font-sans: var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif;
    
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-cyber-yellow: #FFE600;
    --color-electric-cyan: #00F0FF;
    --color-neo-red: #FF3E3E;
  }

  @layer base {
    body {
      @apply bg-background text-foreground antialiased selection:bg-cyber-yellow selection:text-black;
    }
  }

  .brutalist-border {
    @apply border-4 border-black;
  }

  .brutalist-shadow {
    @apply shadow-[8px_8px_0px_0px_#000000];
  }

  .brutalist-shadow-sm {
    @apply shadow-[4px_4px_0px_0px_#000000];
  }

  .brutalist-press {
    @apply transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-[2px_2px_0px_0px_#000000];
  }
  ```

- [ ] **Step 2: Verify changes do not break base layout build**
  Run: `npm run build`
  Expected: Build succeeds with 0 styling compile errors.

---

### Task 2: Brutalist BentoCard Component
**Files:**
- Modify: `src/components/ui/BentoCard.tsx`

- [ ] **Step 1: Rewrite BentoCard for high-contrast borders and shadows**
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
        className={`bg-white brutalist-border brutalist-shadow brutalist-press p-8 overflow-hidden rounded-none ${className}`}
      >
        {children}
      </motion.div>
    );
  }
  ```

- [ ] **Step 2: Commit updates**
  Run: `git add src/components/ui/BentoCard.tsx && git commit -m "feat: redesign BentoCard with brutalist borders and shadows"`

---

### Task 3: Redesign Floating Navbar
**Files:**
- Modify: `src/components/ui/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar to align with brutalist aesthetics**
  ```typescript
  "use client";

  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import { motion } from "react-dom" // Use standard framer-motion if next uses normal client components

  // Note: Check import of motion
  import { motion as motionClient } from "framer-motion";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  export default function Navbar() {
    const pathname = usePathname();

    return (
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-2 bg-white brutalist-border brutalist-shadow-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-6 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-200 ${
                  isActive ? "text-black bg-cyber-yellow brutalist-border border-2" : "text-black/50 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }
  ```

- [ ] **Step 2: Commit Navbar**
  Run: `git add src/components/ui/Navbar.tsx && git commit -m "feat: style Navbar with brutalist accents"`

---

### Task 4: Brutalist Hero Component & Marquee
**Files:**
- Modify: `src/components/ui/Hero.tsx`

- [ ] **Step 1: Redesign Hero with bold typography and marquee banner**
  ```typescript
  "use client";

  import { motion } from "framer-motion";

  export default function Hero() {
    return (
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-start gap-8 bg-white brutalist-border brutalist-shadow p-8 md:p-16">
          <div className="flex w-full flex-wrap justify-between items-center border-b-4 border-black pb-6 gap-4">
            <span className="text-sm font-mono font-bold tracking-widest bg-black text-white px-3 py-1">
              EST. 2026 // PORTFOLIO
            </span>
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 bg-green-500 rounded-full animate-pulse border-2 border-black" />
              <span className="text-xs font-mono font-bold uppercase">
                STATUS: OPEN FOR WORK
              </span>
            </div>
          </div>

          <h1 className="w-full text-left font-sans font-black tracking-tight leading-[0.85] uppercase text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[9rem]">
            CREATIVE <br />
            DEVELOPER <br />
            & <span className="bg-cyber-yellow px-4 brutalist-border">3D ENGINEER</span>
          </h1>

          <div className="w-full overflow-hidden bg-black py-4 mt-4 brutalist-border">
            <div className="flex whitespace-nowrap animate-marquee">
              <span className="text-sm font-mono font-black uppercase text-white tracking-[0.2em] px-8">
                ✦ REACT // THREE.JS // WEBGL // SHADERS // TAILWIND // TYPESCRIPT // STYLISH MOTION ✦
              </span>
              <span className="text-sm font-mono font-black uppercase text-white tracking-[0.2em] px-8">
                ✦ REACT // THREE.JS // WEBGL // SHADERS // TAILWIND // TYPESCRIPT // STYLISH MOTION ✦
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 2: Add Tailwind animation rule for marquee in globals.css**
  Append below style classes in `src/app/globals.css`:
  ```css
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  .animate-marquee {
    animation: marquee 15s linear infinite;
    display: flex;
    width: max-content;
  }
  ```

---

### Task 5: Interactive 3D Playbox Component
**Files:**
- Create: `src/components/ui/Playbox.tsx`

- [ ] **Step 1: Write Playbox element rendering interactive 3D geometry**
  Create file `src/components/ui/Playbox.tsx`:
  ```typescript
  "use client";

  import { Canvas, useFrame } from "@react-three/fiber";
  import { useRef, useState } from "react";
  import { OrbitControls } from "@react-three/drei";
  import * as THREE from "three";
  import BentoCard from "./BentoCard";

  function Shape() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
      if (!hovered) {
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      }
    });

    return (
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.8 : 1.5}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={hovered ? "#00F0FF" : "#000000"}
          wireframe
          wireframeLinewidth={2}
        />
      </mesh>
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
            3D PLAYBOX
          </h3>
        </div>

        <div className="h-[200px] w-full brutalist-border bg-zinc-50 relative overflow-hidden">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <Shape />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <p className="text-xs font-mono text-black/60">
          * Renders low-poly icosahedron wireframe using React-Three-Fiber.
        </p>
      </BentoCard>
    );
  }
  ```

---

### Task 6: Skill Terminal Component
**Files:**
- Create: `src/components/ui/SkillTerminal.tsx`

- [ ] **Step 1: Implement retro Terminal UI to list skills**
  Create file `src/components/ui/SkillTerminal.tsx`:
  ```typescript
  "use client";

  import BentoCard from "./BentoCard";

  const skills = [
    { name: "Next.js", rating: 90, bar: "█████████░" },
    { name: "React", rating: 95, bar: "██████████" },
    { name: "Three.js", rating: 80, bar: "████████░░" },
    { name: "WebGL / GLSL", rating: 70, bar: "███████░░░" },
    { name: "TypeScript", rating: 90, bar: "█████████░" },
    { name: "Tailwind CSS", rating: 95, bar: "██████████" },
  ];

  export default function SkillTerminal() {
    return (
      <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
        <div>
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
              System Console // Terminal
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-black" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" />
            </div>
          </div>
          <h3 className="mt-4 text-2xl font-black tracking-tight text-black uppercase">
            ACTIVE CODES
          </h3>
        </div>

        <div className="mt-4 font-mono text-xs bg-zinc-950 text-[#00F0FF] p-4 brutalist-border space-y-3">
          <p className="text-zinc-500">// Loading skill module metrics...</p>
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col gap-1">
              <div className="flex justify-between font-bold">
                <span>> {skill.name}</span>
                <span>{skill.rating}%</span>
              </div>
              <div className="text-cyber-yellow tracking-widest">{skill.bar}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-xs font-mono text-black/50">
            * Systems updated real-time.
          </p>
        </div>
      </BentoCard>
    );
  }
  ```

---

### Task 7: Update BentoGrid layout and Home Page
**Files:**
- Modify: `src/components/ui/BentoGrid.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite BentoGrid using custom layout items, Playbox, and Terminal**
  ```typescript
  "use client";

  import BentoCard from "./BentoCard";
  import Playbox from "./Playbox";
  import SkillTerminal from "./SkillTerminal";

  const projects = [
    {
      title: "Project Alpha",
      category: "3D EXPERIENCES",
      description: "A high-performance 3D visualization platform using Three.js and Next.js 16.",
      tags: "NEXT.JS // R3F // GLSL",
      className: "col-span-1 md:col-span-2 row-span-1 min-h-[300px]",
    },
    {
      title: "Project Beta",
      category: "CREATIVE CODING",
      description: "Generative art collection using React-Three-Fiber and custom shaders.",
      tags: "WEBGL // SHADERS",
      className: "col-span-1 min-h-[300px]",
    },
  ];

  export default function BentoGrid() {
    return (
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Skill terminal (col-span-1) */}
          <div className="col-span-1">
            <SkillTerminal />
          </div>

          {/* Interactive Playbox (col-span-1) */}
          <div className="col-span-1">
            <Playbox />
          </div>

          {/* Project card 2 (col-span-1) */}
          <BentoCard className="col-span-1 min-h-[400px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
                {projects[1].category}
              </span>
              <h3 className="mt-4 text-3xl font-black tracking-tight text-black uppercase">
                {projects[1].title}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-black/70">
              {projects[1].description}
            </p>
            <div className="mt-auto border-t-2 border-black pt-4 flex justify-between items-center">
              <span className="font-mono text-xs font-bold text-black/60">{projects[1].tags}</span>
              <button className="bg-black text-white hover:bg-cyber-yellow hover:text-black font-mono text-xs font-bold px-3 py-1.5 brutalist-border border-2 brutalist-press">
                LAUNCH
              </button>
            </div>
          </BentoCard>

          {/* Project card 1 (col-span-2) */}
          <BentoCard className="col-span-1 md:col-span-2 min-h-[350px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
                {projects[0].category}
              </span>
              <h3 className="mt-4 text-4xl font-black tracking-tight text-black uppercase">
                {projects[0].title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-black/70 max-w-2xl">
                {projects[0].description}
              </p>
            </div>
            <div className="mt-8 border-t-2 border-black pt-4 flex justify-between items-center">
              <span className="font-mono text-xs font-bold text-black/60">{projects[0].tags}</span>
              <button className="bg-black text-white hover:bg-cyber-yellow hover:text-black font-mono text-xs font-bold px-4 py-2 brutalist-border border-2 brutalist-press">
                LAUNCH PROJECT
              </button>
            </div>
          </BentoCard>

          {/* Retro Banner / Sticker board connect (col-span-1) */}
          <BentoCard className="col-span-1 min-h-[350px] flex flex-col justify-between bg-electric-cyan/20">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
                LAB NOTES
              </span>
              <h3 className="mt-4 text-3xl font-black tracking-tight text-black uppercase">
                CREATIVE SPACE
              </h3>
            </div>
            <p className="text-sm font-mono text-black/70">
              Experimenting with canvas particles, orbital controls, and hardware-accelerated shaders.
            </p>
            <div className="bg-black text-cyber-yellow p-3 text-center font-mono font-bold uppercase text-xs brutalist-border">
              CORE PIPELINE ACTIVE
            </div>
          </BentoCard>
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 2: Verify compiling and layouts function correctly**
  Run: `npm run build`
  Expected: Build completes successfully.

---

### Task 8: Three.js Wireframe & Mesh Background
**Files:**
- Modify: `src/components/canvas/Particles.tsx`

- [ ] **Step 1: Refactor background canvas particles to 3D grid and floating meshes**
  ```typescript
  "use client";

  import { useFrame } from "@react-three/fiber";
  import { useRef } from "react";
  import * as THREE from "three";

  export default function Particles() {
    const gridRef = useRef<THREE.GridHelper>(null!);
    const meshRef1 = useRef<THREE.Mesh>(null!);
    const meshRef2 = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
      const time = state.clock.getElapsedTime();

      // Rotate floating elements
      if (meshRef1.current) {
        meshRef1.current.rotation.x = time * 0.15;
        meshRef1.current.rotation.y = time * 0.2;
        meshRef1.current.position.y = Math.sin(time * 0.4) * 0.5 + 2;
      }
      if (meshRef2.current) {
        meshRef2.current.rotation.x = -time * 0.2;
        meshRef2.current.rotation.z = time * 0.1;
        meshRef2.current.position.y = Math.cos(time * 0.3) * 0.5 - 2;
      }

      // Rotate perspective grid slightly to show depth
      if (gridRef.current) {
        gridRef.current.rotation.y = Math.sin(time * 0.05) * 0.1;
      }
    });

    return (
      <group>
        {/* Retro Grid Plane */}
        <gridHelper
          ref={gridRef}
          args={[30, 30, "#000000", "#d1d1cc"]}
          position={[0, -4, 0]}
          rotation={[0.1, 0, 0]}
        />

        {/* Floating Primitive 1 (Low-poly Torus Knot) */}
        <mesh ref={meshRef1} position={[-4, 2, -3]}>
          <torusKnotGeometry args={[0.8, 0.25, 40, 6, 2, 3]} />
          <meshBasicMaterial color="#000000" wireframe />
        </mesh>

        {/* Floating Primitive 2 (Low-poly Icosahedron) */}
        <mesh ref={meshRef2} position={[4, -2, -3]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#000000" wireframe />
        </mesh>
      </group>
    );
  }
  ```

---

### Task 9: Redesign Contact Section
**Files:**
- Modify: `src/components/ui/Contact.tsx`

- [ ] **Step 1: Rewrite Contact with brutalist layout**
  ```typescript
  "use client";

  import { motion } from "framer-motion";

  export default function Contact() {
    return (
      <section className="relative flex w-full flex-col items-center justify-center px-6 py-24">
        <div className="w-full max-w-7xl bg-cyber-yellow brutalist-border brutalist-shadow p-8 md:p-16 flex flex-col items-center text-center gap-8">
          <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-none">
            LET&apos;S WORK TOGETHER.
          </h2>
          
          <p className="max-w-2xl font-mono text-sm md:text-base text-black/80">
            HAVE A COOL PROJECT OR WANT TO COLLABORATE ON AN INTERACTIVE WEB SITE? DROP AN EMAIL AND CONNECT NOW.
          </p>

          <a
            href="mailto:hello@example.com"
            className="bg-black text-white hover:bg-white hover:text-black font-mono font-bold text-lg md:text-xl px-12 py-6 brutalist-border border-4 brutalist-press uppercase"
          >
            SEND HELLO
          </a>
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 2: Commit changes**
  Run: `git add src/components/ui/Contact.tsx && git commit -m "feat: redesign Contact segment with raw styling"`

---

### Task 10: Redesign About Page Layout
**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Replace About page with custom brutalist styling layout matching the Spec**
  ```typescript
  "use client";

  import BentoCard from "@/components/ui/BentoCard";
  import SkillTerminal from "@/components/ui/SkillTerminal";

  export default function AboutPage() {
    return (
      <div className="relative w-full min-h-screen px-6 py-32">
        <main className="max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-1 md:col-span-3 bg-white brutalist-border brutalist-shadow p-8 md:p-12 mb-4">
            <span className="text-xs font-mono font-bold tracking-widest bg-cyber-yellow px-2 py-1 brutalist-border border-2">
              BIOGRAPHY // OVERVIEW
            </span>
            <h1 className="mt-6 font-sans font-black text-6xl md:text-8xl uppercase leading-none">
              ABOUT ME
            </h1>
          </div>

          <BentoCard className="col-span-1 md:col-span-2 min-h-[300px] flex flex-col justify-center">
            <h2 className="text-3xl font-black uppercase text-black">
              CRAFTING DIGITAL OBJECTS
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/70">
              I am a creative developer operating at the boundary of design systems and functional code. I build interactive websites designed to excite visitors and feel alive under the mouse.
            </p>
          </BentoCard>

          <div className="col-span-1">
            <SkillTerminal />
          </div>

          <BentoCard className="col-span-1 md:col-span-3 min-h-[300px]">
            <h3 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-2">
              TIMELINE // WORK RECORD
            </h3>
            <div className="space-y-6 font-mono text-xs text-black/80">
              <div className="flex flex-col md:flex-row gap-4 border-b border-black/10 pb-4">
                <span className="font-bold text-cyber-yellow bg-black px-2 py-0.5 self-start">2022 — PRES</span>
                <div>
                  <h4 className="font-black text-sm uppercase">Lead Engineer @ Aesthetic Lab</h4>
                  <p className="mt-1">Building high-performance interactive modules and custom canvases.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <span className="font-bold text-black bg-cyber-yellow px-2 py-0.5 self-start">2020 — 2022</span>
                <div>
                  <h4 className="font-black text-sm uppercase">Interactive Designer @ Studio X</h4>
                  <p className="mt-1">Crafting flat vector components, typography assets, and UI motion prototypes.</p>
                </div>
              </div>
            </div>
          </BentoCard>
        </main>
      </div>
    );
  }
  ```

- [ ] **Step 2: Verify full website build passes and has no console errors**
  Run: `npm run build`
  Expected: Successful compilation, bundle size report, and exit status 0.
