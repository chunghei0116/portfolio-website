# 3D WebGL Cyber-Ethereal Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio into a 100% graphic-intensive, breathtaking 3D WebGL experience featuring custom GLSL raymarched aurora shaders, an interactive 3D refraction crystal hero asset, 3D physics tech badges, and double-bezel dark glassmorphism.

**Architecture:** A persistent full-screen WebGL canvas background (`AuroraShaderCanvas`) rendered via `@react-three/fiber` runs underneath high-end Vantablack double-bezel glass UI sections (`Navbar`, `HeroSection`, `ProjectsSection`, `SkillsSection`, `ExperienceSection`, `ContactSection`). Dynamic 3D assets (`QuantumRefractionOrb` and `TechPhysicsSandbox`) are powered by Three.js shaders and `cannon-es` physics.

**Tech Stack:** Next.js 16 (App Router), React 19, Three.js (`three`, `@react-three/fiber`, `@react-three/drei`), `cannon-es`, Framer Motion 12, TailwindCSS 4, Lucide React / Phosphor icons.

## Global Constraints
- OLED Vantablack color palette (`#030305` base, `#0a0a10` glass cards, `#00f0ff` cyan flares).
- Double-bezel card architecture (`rounded-[2rem]` outer shell with `rounded-[calc(2rem-0.375rem)]` inner core).
- All motion uses custom spring physics or custom cubic-bezier curves (no default linear transitions).
- Cap R3F Canvas DPR to `Math.min(2, window.devicePixelRatio)` for 60FPS performance on high-DPI screens.

---

### Task 1: Design System Tokens & Double-Bezel Foundation in CSS

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: TailwindCSS 4 `@theme` & custom utility definitions.
- Produces: CSS variables for colors, double-bezel utility classes (`.double-bezel-outer`, `.double-bezel-inner`), glass backdrop blur styles, and custom glowing scrollbars.

- [ ] **Step 1: Update globals.css with Vantablack color tokens and double-bezel utility classes**

```css
@import "tailwindcss";

@layer base {
  :root {
    --bg-vantablack: #030305;
    --bg-glass-card: rgba(10, 10, 16, 0.75);
    --border-hairline: rgba(255, 255, 255, 0.1);
    --border-glow: rgba(0, 240, 255, 0.25);
    --accent-cyan: #00f0ff;
    --accent-purple: #a855f7;
    --accent-emerald: #10b981;
  }

  body {
    background-color: var(--bg-vantablack);
    color: #f8fafc;
    font-family: var(--font-sans, system-ui, sans-serif);
    overflow-x: hidden;
  }
}

.double-bezel-outer {
  border-radius: 2rem;
  padding: 0.375rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.double-bezel-inner {
  border-radius: calc(2rem - 0.375rem);
  background: rgba(8, 8, 12, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.12);
}
```

- [ ] **Step 2: Ensure fonts and layout wrapper in `src/app/layout.tsx` fit dark cyber aesthetic**

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Senior Graphics & Full-Stack Architect | Portfolio',
  description: '100% Graphic-Intensive 3D WebGL Portfolio featuring custom GLSL shaders, 3D physics, and high-end engineering.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#030305] text-white selection:bg-[#00f0ff]/30 selection:text-[#00f0ff] antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit design system foundation**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "style: configure Vantablack theme and double-bezel utilities"
```

---

### Task 2: Background GLSL Raymarched Aurora Canvas Component

**Files:**
- Create: `src/components/3d/AuroraShaderCanvas.tsx`

**Interfaces:**
- Consumes: `@react-three/fiber`, Three.js custom shader material (`ShaderMaterial`).
- Produces: Persistent WebGL background canvas with mouse-reactive GLSL plasma/aurora waves.

- [ ] **Step 1: Create `src/components/3d/AuroraShaderCanvas.tsx` with GLSL shader material**

```tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AuroraShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    // Simplex 2D noise helpers
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      float time = uTime * 0.25;

      // Mouse influence
      vec2 mouseDist = uv - uMouse;
      float dist = length(mouseDist);
      float mouseGlow = smoothstep(0.4, 0.0, dist) * 0.35;

      // Layered noise plasma waves
      float n1 = snoise(uv * 2.5 + vec2(time * 0.4, time * 0.2));
      float n2 = snoise(uv * 5.0 - vec2(time * 0.3, -time * 0.5)) * 0.5;
      float n3 = snoise(uv * 10.0 + vec2(time * 0.6, time * 0.3)) * 0.25;
      float combinedNoise = n1 + n2 + n3;

      // Cyber ethereal colors
      vec3 colorDeep = vec3(0.012, 0.012, 0.024);     // Deep Vantablack space
      vec3 colorCyan = vec3(0.0, 0.94, 1.0) * 0.4;       // Electric cyan
      vec3 colorPurple = vec3(0.66, 0.33, 0.97) * 0.35;  // Quantum purple

      vec3 finalColor = mix(colorDeep, colorCyan, smoothstep(-0.5, 0.8, combinedNoise));
      finalColor = mix(finalColor, colorPurple, smoothstep(-0.2, 1.0, n2));
      finalColor += vec3(0.0, 0.94, 1.0) * mouseGlow;

      gl_FragColor = vec4(finalColor, 0.85);
    }
  `,
};

function PlaneMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.set(
        state.pointer.x * 0.5 + 0.5,
        state.pointer.y * 0.5 + 0.5
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={AuroraShader.vertexShader}
        fragmentShader={AuroraShader.fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function AuroraShaderCanvas() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: true }}
      >
        <PlaneMesh />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Commit AuroraShaderCanvas component**

```bash
git add src/components/3d/AuroraShaderCanvas.tsx
git commit -m "feat: implement background GLSL raymarched aurora canvas"
```

---

### Task 3: Hero 3D Interactive Refraction Crystal Orb (`QuantumRefractionOrb.tsx`)

**Files:**
- Create: `src/components/3d/QuantumRefractionOrb.tsx`

**Interfaces:**
- Consumes: `@react-three/fiber`, `@react-three/drei` (`MeshTransmissionMaterial`, `OrbitControls`, `Float`), Three.js.
- Produces: 3D refraction crystal orb hero asset reacting to mouse pointer & scroll position.

- [ ] **Step 1: Create `src/components/3d/QuantumRefractionOrb.tsx`**

```tsx
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Ring, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function CrystalGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3 + state.pointer.y * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4 + state.pointer.x * 0.5;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -state.clock.getElapsedTime() * 0.2;
      outerRingRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return (
    <group scale={1.2}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.6, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={512}
            transmission={0.95}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            thickness={1.2}
            chromaticAberration={0.6}
            anisotropy={0.3}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.2}
            color="#a855f7"
            bg="#00f0ff"
          />
        </mesh>
      </Float>

      {/* Orbiting Particle Halo */}
      <group ref={outerRingRef}>
        <Ring args={[2.4, 2.45, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00f0ff" wireframe side={THREE.DoubleSide} transparent opacity={0.3} />
        </Ring>
      </group>

      <Sparkles count={60} scale={5} size={3} speed={0.4} color="#00f0ff" />
    </group>
  );
}

export default function QuantumRefractionOrb() {
  return (
    <div className="w-full h-[450px] md:h-[550px] relative flex items-center justify-center">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#a855f7" />
        <CrystalGeometry />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Commit QuantumRefractionOrb component**

```bash
git add src/components/3d/QuantumRefractionOrb.tsx
git commit -m "feat: implement 3D Quantum Refraction Crystal Orb hero component"
```

---

### Task 4: Floating Glass Island Navbar (`Navbar.tsx`)

**Files:**
- Create: `src/components/ui/Navbar.tsx`

**Interfaces:**
- Consumes: Framer Motion 12, Lucide icons (`Sparkles`, `Code2`, `Layers`, `Briefcase`, `Mail`, `Volume2`, `VolumeX`).
- Produces: Floating glass pill navigation with live availability badge, smooth anchors, and audio toggle.

- [ ] **Step 1: Create `src/components/ui/Navbar.tsx`**

```tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Briefcase, Mail, Volume2, VolumeX } from 'lucide-react';

export default function Navbar() {
  const [muted, setMuted] = useState(true);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-auto">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between rounded-full px-5 py-2.5 bg-[#0a0a10]/70 backdrop-blur-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        {/* Brand / Status Indicator */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f0ff]"></span>
          </div>
          <div className="flex flex-col text-xs font-mono">
            <span className="font-semibold tracking-wider text-white group-hover:text-[#00f0ff] transition-colors">
              JONES.DEV
            </span>
            <span className="text-[10px] text-slate-400">AVAILABLE FOR ROLES</span>
          </div>
        </a>

        {/* Navigation Anchors */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-slate-300">
          <a href="#projects" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <Briefcase className="w-3.5 h-3.5 text-[#00f0ff]" /> WORK
          </a>
          <a href="#skills" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <Code2 className="w-3.5 h-3.5 text-[#a855f7]" /> STACK
          </a>
          <a href="#experience" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-[#10b981]" /> EXPERIENCE
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMuted(!muted)}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00f0ff]/50 text-slate-300 hover:text-white transition-all"
            title={muted ? 'Enable Ambient WebGL Audio' : 'Mute Sound'}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00f0ff]" />}
          </button>

          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-medium text-white bg-white/10 border border-white/15 hover:bg-[#00f0ff] hover:text-black transition-all duration-300"
          >
            <span>CONTACT</span>
            <Mail className="w-3.5 h-3.5 text-[#00f0ff] group-hover:text-black transition-colors" />
          </a>
        </div>
      </motion.nav>
    </header>
  );
}
```

- [ ] **Step 2: Commit Navbar component**

```bash
git add src/components/ui/Navbar.tsx
git commit -m "feat: implement floating glass island navbar component"
```

---

### Task 5: Hero Section Component (`HeroSection.tsx`)

**Files:**
- Create: `src/components/ui/HeroSection.tsx`

**Interfaces:**
- Consumes: Framer Motion 12, `QuantumRefractionOrb`, Lucide icons (`ArrowUpRight`, `Terminal`, `ShieldCheck`).
- Produces: High-impact hero section with massive typography, 3D refraction crystal, eyebrow badge, and button-in-button CTAs.

- [ ] **Step 1: Create `src/components/ui/HeroSection.tsx`**

```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal, ShieldCheck } from 'lucide-react';
import QuantumRefractionOrb from '../3d/QuantumRefractionOrb';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100dvh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden px-4">
      {/* Eyebrow Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00f0ff] uppercase tracking-[0.2em] mb-6"
      >
        <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
        <span>01 // SENIOR GRAPHICS & FULL-STACK ARCHITECT</span>
      </motion.div>

      {/* Massive Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-center max-w-5xl bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent leading-[1.08] mb-6"
      >
        ENGINEERING DIGITAL REALITY &amp; SHADER ART
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-slate-400 text-sm sm:text-lg text-center max-w-2xl font-mono leading-relaxed mb-8"
      >
        Crafting high-performance WebGL 3D graphics, real-time GLSL fragment shaders, and resilient full-stack cloud architectures.
      </motion.p>

      {/* 3D Refraction Orb Centerpiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full max-w-3xl my-2"
      >
        <QuantumRefractionOrb />
      </motion.div>

      {/* CTAs with Button-in-Button Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 z-10"
      >
        <a
          href="#projects"
          className="group relative inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-xs font-mono font-semibold tracking-wider text-black bg-[#00f0ff] hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
        >
          <span>EXPLORE WORK</span>
          <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            <ArrowUpRight className="w-4 h-4 text-black" />
          </div>
        </a>

        <a
          href="#experience"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-mono font-medium text-slate-300 bg-white/5 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300"
        >
          <ShieldCheck className="w-4 h-4 text-[#a855f7]" />
          <span>CAREER TRACK RECORD</span>
        </a>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit HeroSection component**

```bash
git add src/components/ui/HeroSection.tsx
git commit -m "feat: implement HeroSection with 3D crystal and double-bezel CTAs"
```

---

### Task 6: Featured Projects Bento Grid Component (`ProjectsSection.tsx`)

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/components/ui/ProjectsSection.tsx`

**Interfaces:**
- Consumes: Project data structure, Framer Motion 12, Lucide icons (`ExternalLink`, `Github`, `FolderGit2`).
- Produces: Asymmetrical bento grid of selected projects with 3D tilt cards and category filtering.

- [ ] **Step 1: Create `src/data/projects.ts` with rich project showcase metadata**

```ts
export interface Project {
  id: string;
  title: string;
  category: 'WebGL & 3D' | 'Full-Stack Apps' | 'DevOps & Cloud';
  description: string;
  metrics: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  colSpan: string;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'cyber-shaders',
    title: 'CyberSpace GLSL Shader Engine',
    category: 'WebGL & 3D',
    description: 'Real-time WebGL audio-reactive particle engine with volumetric raymarched lighting and GPU instancing.',
    metrics: '60 FPS @ 4K Resolution',
    tech: ['Three.js', 'GLSL Shaders', 'WebAudio API', 'TypeScript'],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    colSpan: 'col-span-12 lg:col-span-8',
    accent: '#00f0ff',
  },
  {
    id: 'devops-mesh',
    title: 'Kubeflow Cloud Observability',
    category: 'DevOps & Cloud',
    description: 'Distributed microservice telemetry dashboard tracking 10k+ container clusters in real-time.',
    metrics: '99.999% SLA Uptime',
    tech: ['Kubernetes', 'Go', 'Docker', 'Prometheus', 'Next.js'],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    colSpan: 'col-span-12 lg:col-span-4',
    accent: '#a855f7',
  },
  {
    id: 'mobile-flutter-registry',
    title: 'Retro Flip Clock & Registry System',
    category: 'Full-Stack Apps',
    description: 'Tactile industrial mechanical split-flap display system with real-time sync and WebSockets backend.',
    metrics: '< 15ms Latency',
    tech: ['Next.js 16', 'React 19', 'WebSockets', 'TailwindCSS 4'],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    colSpan: 'col-span-12 lg:col-span-5',
    accent: '#10b981',
  },
  {
    id: 'quantum-finance',
    title: 'Quantum Portfolio Arbitrage AI',
    category: 'Full-Stack Apps',
    description: 'AI-driven high-frequency algorithmic financial analysis pipeline with automated risk checklists.',
    metrics: '1.2M Events/sec',
    tech: ['Python', 'FastAPI', 'Redis', 'Next.js', 'Three.js'],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    colSpan: 'col-span-12 lg:col-span-7',
    accent: '#38bdf8',
  },
];
```

- [ ] **Step 2: Create `src/components/ui/ProjectsSection.tsx`**

```tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../../data/projects';

export default function ProjectsSection() {
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'WebGL & 3D', 'Full-Stack Apps', 'DevOps & Cloud'];

  const filteredProjects = filter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00f0ff] uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>SELECTED ARCHITECTURE &amp; BUILDS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            FEATURED PROJECTS
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                filter === cat
                  ? 'bg-[#00f0ff] text-black font-semibold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`${project.colSpan} group relative`}
          >
            <div className="double-bezel-outer transition-transform duration-500 group-hover:-translate-y-1">
              <div className="double-bezel-inner p-7 flex flex-col justify-between h-full min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#00f0ff]">
                      {project.metrics}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-mono leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/5">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#00f0ff] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit ProjectsSection component**

```bash
git add src/data/projects.ts src/components/ui/ProjectsSection.tsx
git commit -m "feat: implement ProjectsSection with bento grid and double-bezel cards"
```

---

### Task 7: Tech Stack & 3D Physics Sandbox Component (`SkillsSection.tsx`)

**Files:**
- Create: `src/components/3d/TechPhysicsSandbox.tsx`
- Create: `src/components/ui/SkillsSection.tsx`

**Interfaces:**
- Consumes: `@react-three/fiber`, `cannon-es`, Framer Motion 12.
- Produces: Dual-mode skills section (3D Particle Constellation + Real-time 3D rigid body physics sandbox).

- [ ] **Step 1: Create `src/components/3d/TechPhysicsSandbox.tsx` with rigid body physics simulation**

```tsx
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = ['Next.js', 'React', 'Three.js', 'GLSL', 'Docker', 'K8s', 'Python', 'TypeScript'];

function PhysicsBox({ text, position }: { text: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.4, 0.7, 0.4]} />
        <meshPhysicalMaterial
          color="#0a0a14"
          roughness={0.1}
          metalness={0.8}
          transmission={0.6}
          thickness={0.5}
          clearcoat={1}
          wireframe={false}
        />
        <Text
          position={[0, 0, 0.22]}
          fontSize={0.2}
          color="#00f0ff"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </mesh>
    </Float>
  );
}

export default function TechPhysicsSandbox() {
  return (
    <div className="w-full h-[400px] relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#08080c]/60 backdrop-blur-xl">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#a855f7" />

        {SKILLS.map((skill, idx) => {
          const x = (idx % 4 - 1.5) * 1.5;
          const y = (Math.floor(idx / 4) - 0.5) * 1.2;
          return <PhysicsBox key={skill} text={skill} position={[x, y, 0]} />;
        })}
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/SkillsSection.tsx`**

```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import TechPhysicsSandbox from '../3d/TechPhysicsSandbox';

export default function SkillsSection() {
  const skillCategories = [
    { title: 'Frontend & WebGL', items: ['Next.js 16', 'React 19', 'Three.js / R3F', 'GLSL Shaders', 'TailwindCSS 4', 'TypeScript'] },
    { title: 'Backend & Cloud', items: ['Node.js', 'Python', 'FastAPI', 'Docker', 'Kubernetes', 'Redis'] },
    { title: 'Architecture & Tooling', items: ['WebSockets', 'CI/CD Pipelines', 'TDD & Jest', 'Performance Optimization', 'Git Worktrees'] },
  ];

  return (
    <section id="skills" className="py-28 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#a855f7] uppercase tracking-widest mb-3">
          <Cpu className="w-3.5 h-3.5 text-[#a855f7]" />
          <span>TECHNICAL CAPABILITIES</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          STACK &amp; 3D PHYSICS MATRIX
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Category List */}
        <div className="lg:col-span-6 space-y-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="double-bezel-outer"
            >
              <div className="double-bezel-inner p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-mono text-[#00f0ff]">
                  // {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:border-[#00f0ff]/50 hover:text-white transition-all"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Physics Sandbox Viewport */}
        <div className="lg:col-span-6">
          <TechPhysicsSandbox />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit SkillsSection component**

```bash
git add src/components/3d/TechPhysicsSandbox.tsx src/components/ui/SkillsSection.tsx
git commit -m "feat: implement SkillsSection with 3D physics sandbox component"
```

---

### Task 8: Career Experience Timeline Component (`ExperienceSection.tsx`)

**Files:**
- Create: `src/components/ui/ExperienceSection.tsx`

**Interfaces:**
- Consumes: Framer Motion 12, Lucide icons (`Briefcase`, `Calendar`, `Award`).
- Produces: Staggered double-bezel career timeline along an electric glowing vertical timeline cable.

- [ ] **Step 1: Create `src/components/ui/ExperienceSection.tsx`**

```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Award } from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'Lead Graphics & Full-Stack Engineer',
    company: 'Vanguard Digital Lab',
    period: '2024 — PRESENT',
    description: 'Spearheaded WebGL shader engines and high-frequency React architecture for enterprise clients, cutting render bottlenecks by 45%.',
    achievements: ['Architected custom GLSL particle system', 'Led team of 6 engineers on Next.js redesign', 'Achieved 99.9% uptime SLA'],
  },
  {
    role: 'Senior Full-Stack Architect',
    company: 'Apex Cloud Systems',
    period: '2022 — 2024',
    description: 'Designed containerized microservices and web application frontends handling millions of daily events.',
    achievements: ['Deployed Kubernetes observability pipeline', 'Integrated real-time WebSockets telemetry', 'Reduced bundle sizes by 35%'],
  },
  {
    role: 'Software Engineer (Frontend / 3D)',
    company: 'Nexus Interactive',
    period: '2020 — 2022',
    description: 'Built interactive 3D WebGL configurators and responsive web applications for global brands.',
    achievements: ['Created 3D product viewports using Three.js', 'Published reusable design tokens system'],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-4 max-w-5xl mx-auto">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#10b981] uppercase tracking-widest mb-3">
          <Award className="w-3.5 h-3.5 text-[#10b981]" />
          <span>CAREER TIMELINE</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          PROFESSIONAL EXPERIENCE
        </h2>
      </div>

      <div className="relative border-l-2 border-[#00f0ff]/30 pl-6 md:pl-10 space-y-12 ml-4 md:ml-8">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative group"
          >
            {/* Electric Cable Node */}
            <div className="absolute -left-[31px] md:-left-[47px] top-6 w-4 h-4 rounded-full bg-[#030305] border-2 border-[#00f0ff] shadow-[0_0_10px_#00f0ff] group-hover:scale-125 transition-transform" />

            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-7">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-[#00f0ff] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {exp.period}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{exp.company}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{exp.role}</h3>
                <p className="text-slate-300 text-sm font-mono leading-relaxed mb-4">{exp.description}</p>

                <ul className="space-y-1.5">
                  {exp.achievements.map((ach) => (
                    <li key={ach} className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <span className="text-[#00f0ff]">▹</span> {ach}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit ExperienceSection component**

```bash
git add src/components/ui/ExperienceSection.tsx
git commit -m "feat: implement ExperienceSection timeline component"
```

---

### Task 9: Contact & Interactive Footer Component (`ContactSection.tsx`)

**Files:**
- Create: `src/components/ui/ContactSection.tsx`

**Interfaces:**
- Consumes: Framer Motion 12, Lucide icons (`Mail`, `Copy`, `Check`, `Github`, `Linkedin`, `Twitter`, `Clock`).
- Produces: Double-bezel contact form, quick-copy email, live GMT time clock, and social pills.

- [ ] **Step 1: Create `src/components/ui/ContactSection.tsx`**

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Github, Linkedin, Twitter, Clock } from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string>('');

  const email = 'jones.dev@example.com';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false }) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-28 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="double-bezel-outer"
      >
        <div className="double-bezel-inner p-8 md:p-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00f0ff] uppercase tracking-widest mb-6">
            <Mail className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>INITIATE COLLABORATION</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            LET’S BUILD SOMETHING EXTRAORDINARY
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-xl mb-8">
            Open for senior/lead engineering roles, high-end WebGL graphics contracts, and architectural consulting.
          </p>

          {/* Email Copy Box */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 bg-white/10 border border-white/20 hover:border-[#00f0ff] text-white font-mono text-xs md:text-sm transition-all"
            >
              <span>{email}</span>
              {copied ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4 text-[#00f0ff]" />}
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
              <Github className="w-4 h-4" /> GITHUB
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
              <Linkedin className="w-4 h-4" /> LINKEDIN
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
              <Twitter className="w-4 h-4" /> TWITTER
            </a>
          </div>
        </div>
      </motion.div>

      {/* Footer info */}
      <div className="mt-12 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 gap-4">
        <span>© {new Date().getFullYear()} JONES.DEV — ALL RIGHTS RESERVED</span>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>SYS_TIME: {time || '00:00:00 UTC'}</span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit ContactSection component**

```bash
git add src/components/ui/ContactSection.tsx
git commit -m "feat: implement ContactSection and footer component"
```

---

### Task 10: Page Orchestration & Build Verification

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: All UI sections and `AuroraShaderCanvas`.
- Produces: Complete 100% graphic-intensive portfolio page.

- [ ] **Step 1: Update `src/app/page.tsx` to orchestrate background shader and sections**

```tsx
import AuroraShaderCanvas from '@/components/3d/AuroraShaderCanvas';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/ui/HeroSection';
import ProjectsSection from '@/components/ui/ProjectsSection';
import SkillsSection from '@/components/ui/SkillsSection';
import ExperienceSection from '@/components/ui/ExperienceSection';
import ContactSection from '@/components/ui/ContactSection';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030305] text-white">
      {/* Background WebGL Aurora Canvas */}
      <AuroraShaderCanvas />

      {/* Floating Island Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
```

- [ ] **Step 2: Run build and lint verification commands**

Run: `npm run build`
Expected: Production build compiles cleanly with zero TypeScript or ESLint errors.

- [ ] **Step 3: Final commit**

```bash
git add src/app/page.tsx
git commit -m "feat: orchestrate full 3D WebGL cyber-ethereal portfolio page"
```
