# Swiss Editorial "Static 3D City Card" Bento Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the interactive, expanding onclick dive-in/redirect portal from Card D. Refactor Card D to be a static, non-clickable bento card rendering the bird's-eye 3D city scene in its background. Revert the persistent site-wide Scene.tsx.

**Architecture:** Remove router, escape listener, and click states from `BentoGrid.tsx`. Revert `Scene.tsx` to render the default mechanical background.

**Tech Stack:** React, Next.js, React Three Fiber, TailwindCSS, TypeScript.

---

### Task 1: Revert Persistent Scene.tsx

**Files:**
- Modify: `src/components/canvas/Scene.tsx`

- [ ] **Step 1: Revert Scene.tsx to default Gundam rings**
  Remove route-based city canvas rendering from `src/components/canvas/Scene.tsx` and return it to rendering the default mechanical rings.

```tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState, useCallback, useRef } from "react";
import * as THREE from "three";
import Particles from "./Particles";

function MechBackgroundObject() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.08;
      groupRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, -0.8, -2.5]} scale={[1.8, 1.8, 1.8]}>
      {/* Outer rotating mechanical ring (Gundam Blue accent) */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.6, 0.02, 8, 48]} />
        <meshBasicMaterial color="#0A5CFF" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Inner offset acceleration rings (White/Black wireframe) */}
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.3, 0.015, 6, 36]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Center mechanical cylinder axis */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2.8, 8, 4, true]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.04} />
      </mesh>

      {/* Concentric blueprint disk grids */}
      <mesh position={[0, 0, 1.4]}>
        <ringGeometry args={[0.1, 1.1, 16, 1]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.03} />
      </mesh>
      <mesh position={[0, 0, -1.4]}>
        <ringGeometry args={[0.1, 1.1, 16, 1]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.03} />
      </mesh>

      {/* Outer support struts */}
      {[0, 120, 240].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh key={angle} position={[1.45 * Math.cos(rad), 1.45 * Math.sin(rad), 0]}>
            <boxGeometry args={[0.04, 0.04, 2.5]} />
            <meshBasicMaterial color="#0A5CFF" wireframe transparent opacity={0.04} />
          </mesh>
        );
      })}
    </group>
  );
}

const Scene = () => {
  const [contextLost, setContextLost] = useState(false);

  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    const canvas = gl.domElement;

    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      setContextLost(true);
    });

    canvas.addEventListener("webglcontextrestored", () => {
      setContextLost(false);
    });
  }, []);

  if (contextLost) return null;

  return (
    <div className="fixed inset-0 -z-10 w-screen h-screen pointer-events-none bg-transparent select-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={handleCreated}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <Particles />
          <MechBackgroundObject />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
```

---

### Task 2: Simplify BentoGrid

**Files:**
- Modify: `src/components/ui/BentoGrid.tsx`

- [ ] **Step 1: Simplify BentoGrid to static layout**
  Remove expanded states, exit buttons, key listeners, and routers, and make Card D a static, non-clickable bento card.

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import BentoCard from "./BentoCard";
import { CityEnvironment, CameraController } from "../canvas/CityEnvironment";

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
    description: "Generative art collections using WebGL shaders and real-time noise displacement vectors.",
    tags: ["WebGL", "Shaders", "GLSL"],
    liveUrl: "#",
    repoUrl: "https://github.com/chunghei0116",
  },
];

export default function BentoGrid() {
  return (
    <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 scroll-mt-24 select-none">
      <div className="grid grid-cols-12 gap-6 auto-rows-min">
        
        {/* Card A: ASCENT TELEMETRY - Giant Stat (col-span-4) */}
        <div className="col-span-12 md:col-span-4 brutalist-border bg-accent-blue text-white p-8 brutalist-shadow brutalist-hover-lift flex flex-col justify-between min-h-[200px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] uppercase text-white/70 border-b-2 border-white/20 pb-1.5 inline-block">
              ASCENT TELEMETRY
            </span>
            <h3 className="text-6xl md:text-7xl font-sans font-[950] tracking-[-0.05em] leading-none uppercase text-white mt-6">
              4.8K+
            </h3>
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-emerald-300">
            * LIVE PROD DEPLOYMENTS
          </span>
        </div>

        {/* Card B: PROJECT ALPHA - Massive Heading (col-span-8) */}
        <BentoCard className="col-span-12 md:col-span-8 flex flex-col justify-between min-h-[200px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] text-foreground/50 uppercase">
              SUMMIT // ROUTE-01
            </span>
            <h3 className="text-4xl md:text-5xl font-sans font-[950] tracking-[-0.04em] leading-[0.85] uppercase mt-4 text-foreground">
              PROJECT ALPHA
            </h3>
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-foreground/50">
            3D CANVAS VISUALIZATION // R3F & SHADERS
          </span>
        </BentoCard>

        {/* Card C: ROUTE LOG / TIMELINE (col-span-3, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[380px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] text-foreground/50 uppercase border-b border-foreground/10 pb-1.5 inline-block w-full">
              ROUTE LOG
            </span>
            <h3 className="text-3xl font-sans font-[950] tracking-[-0.04em] leading-none uppercase mt-6 text-foreground">
              2026
            </h3>
            <div className="flex flex-col gap-5 mt-6 font-sans font-[900] text-sm md:text-base leading-none text-foreground uppercase tracking-tight">
              <div>Q1 SYNC //</div>
              <div className="text-accent-blue">Q2 BRIDGE //</div>
              <div className="text-foreground/40">Q3 STABLE //</div>
            </div>
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-foreground/40">
            * PROGRESS ARCHIVE
          </span>
        </BentoCard>

        {/* Card D: WELCOME PROFILE - Center Focal Card (col-span-6, row-span-2) with static 3D City background and giant Swiss typography */}
        <BentoCard 
          className="col-span-12 md:col-span-6 md:row-span-2 flex flex-col justify-between min-h-[380px] bg-[#FFFBF4] border-black border-[5px] shadow-[12px_12px_0px_#000000] hover:shadow-[16px_16px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 relative overflow-hidden p-0"
        >
          {/* Static Background 3D City Canvas */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            <Canvas camera={{ position: [0, 0.5, 2.8], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[5, 5, 5]} intensity={2} />
              <CityEnvironment isExpanded={false} />
              <CameraController isExpanded={false} />
            </Canvas>
          </div>

          {/* Foreground overlay static UI details */}
          <div className="flex justify-between items-start p-8 relative z-10 pointer-events-none w-full">
            <span className="text-accent-blue font-mono text-[9px] font-bold uppercase tracking-wider bg-accent-blue/10 border border-black px-2.5 py-0.5">
              3D CANVAS CITY
            </span>
          </div>

          <div className="p-8 relative z-10 pointer-events-none w-full flex-1 flex flex-col justify-end">
            <h3 className="text-5xl md:text-6xl font-sans font-[950] tracking-[-0.05em] leading-[0.8] uppercase text-foreground">
              CHUNG HEI
            </h3>
            <div className="border-t border-black/10 pt-4 mt-6">
              <h4 className="text-2xl font-sans font-[950] tracking-tight uppercase leading-none text-foreground">
                DEVOPS & MOBILE
              </h4>
              <span className="text-foreground/50 block font-mono text-[9px] font-bold uppercase tracking-widest mt-2">
                3D PROCEDURAL CITY ARCHITECTURE SYSTEM ACTIVE
              </span>
            </div>
          </div>
        </BentoCard>

        {/* Card E: PROJECT BETA - Small square project card (col-span-3, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[380px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] text-foreground/50 uppercase border-b border-foreground/10 pb-1.5 inline-block w-full">
              SUMMIT // ROUTE-02
            </span>
            <h3 className="text-3xl font-sans font-[950] tracking-[-0.04em] leading-none uppercase mt-6 text-foreground">
              PROJECT BETA
            </h3>
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-foreground/50 leading-snug">
            WEBGL SHADERS & DISPLACEMENTS
          </span>
        </BentoCard>

        {/* Card F: GITOPS PIPELINE (col-span-8) */}
        <div className="col-span-12 md:col-span-8 brutalist-border bg-foreground text-background p-8 brutalist-shadow brutalist-hover-lift flex flex-col justify-between min-h-[240px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] text-background/50 uppercase border-b border-background/20 pb-1.5 inline-block">
              DECLARATIVE SYNC
            </span>
            <h3 className="text-4xl md:text-5xl font-sans font-[950] tracking-[-0.04em] leading-none uppercase text-background mt-6">
              GITOPS CD LOOP
            </h3>
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-background/60">
            100% OK // ARGOCD AUTOMATED PRODUCTION CONTROLLER
          </span>
        </div>

        {/* Card G: TECH STACK - High Impact Tagline (col-span-4) */}
        <BentoCard className="col-span-12 md:col-span-4 flex flex-col justify-between min-h-[240px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] text-foreground/50 uppercase border-b border-foreground/10 pb-1.5 inline-block w-full">
              TOOLSETS
            </span>
            <h3 className="text-xl md:text-2xl font-sans font-[950] tracking-tight uppercase mt-6 text-foreground leading-[1.1]">
              NEXT // FLUTTER // AWS // EKS
            </h3>
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-foreground/40">
            * STABLE BUILDS ACTIVE
          </span>
        </BentoCard>

      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run verification and typechecking**
  Run: `npx tsc --noEmit`
  Expected: Successful compilation with no errors.
