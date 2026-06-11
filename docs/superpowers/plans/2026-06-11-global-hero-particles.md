# Move Hero Particles to Whole Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overwrite the global persistent `Particles.tsx` background with the blue/black `HeroParticles` logic, and remove the local particles inside `Hero.tsx` to prevent duplicates.

**Architecture:** Refactor `src/components/canvas/Particles.tsx` to handle 500 particles with mouse repulsion. Modify `src/components/ui/Hero.tsx` to strip out `HeroParticles` and its invocation.

**Tech Stack:** React, Next.js, React Three Fiber, TailwindCSS, TypeScript.

---

### Task 1: Overhaul Global Particles

**Files:**
- Modify: `src/components/canvas/Particles.tsx`

- [ ] **Step 1: Rewrite global Particles.tsx**
  Replace `src/components/canvas/Particles.tsx` with the clean black-and-blue rising particle logic from `HeroParticles`.

```tsx
"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleMetadata {
  x: number;
  y: number;
  speedY: number;
  wobbleSpeed: number;
  wobbleForce: number;
}

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();
  const count = 500; // Calibrated for full-site background coverage and maximum fps

  const [positions, colors, metadata] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const meta: ParticleMetadata[] = [];

    const colorBlue = new THREE.Color("#0A5CFF");
    const colorBlack = new THREE.Color("#000000");

    for (let i = 0; i < count; i++) {
      // Random coordinates distributed across the viewport
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 6;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // 45% Blue particles, 55% Black particles
      const isBlue = Math.random() < 0.45;
      const activeColor = isBlue ? colorBlue : colorBlack;
      cols[i * 3] = activeColor.r;
      cols[i * 3 + 1] = activeColor.g;
      cols[i * 3 + 2] = activeColor.b;

      meta.push({
        x,
        y,
        speedY: 0.008 + Math.random() * 0.016,
        wobbleSpeed: 0.3 + Math.random() * 0.6,
        wobbleForce: 0.03 + Math.random() * 0.05,
      });
    }

    return [pos, cols, meta];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const m = metadata[i];

      // Float upwards
      pos[i3 + 1] += m.speedY;
      // Soft horizontal wave sway
      pos[i3] = m.x + Math.sin(time * m.wobbleSpeed + i) * m.wobbleForce;

      // Mouse repulsion
      const dx = pos[i3] - mx;
      const dy = pos[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2.5) {
        const force = (2.5 - dist) / 2.5;
        pos[i3] += (dx / (dist || 0.1)) * force * 0.12;
        pos[i3 + 1] += (dy / (dist || 0.1)) * force * 0.12;
      }

      // Recycle particles falling off the top edge back to the bottom
      if (pos[i3 + 1] > 7) {
        pos[i3 + 1] = -7;
        pos[i3] = (Math.random() - 0.5) * 20;
        m.x = pos[i3];
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Slight parallax rotation based on mouse coordinates
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -mouse.y * 0.1, 0.06);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouse.x * 0.1, 0.06);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        vertexColors
        sizeAttenuation={true}
        transparent
        opacity={0.75}
      />
    </points>
  );
}
```

---

### Task 2: Simplify Hero.tsx

**Files:**
- Modify: `src/components/ui/Hero.tsx`

- [ ] **Step 1: Strip local particles from Hero.tsx**
  Remove `HeroParticles` and its reference in `<Canvas>` inside `src/components/ui/Hero.tsx`.

```tsx
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useRef, Suspense } from "react";

function HeroMechObject() {
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.04;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.15, 0.06);
      groupRef.current.rotation.z = time * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, -2]} scale={[2.2, 2.2, 2.2]}>
      {/* Heavy Mech HUD outer ring */}
      <mesh>
        <torusGeometry args={[1.5, 0.012, 8, 64]} />
        <meshBasicMaterial color="#0A5CFF" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Target scanning circle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.05, 12, 1, true]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.04} />
      </mesh>

      {/* Sphere core */}
      <mesh>
        <sphereGeometry args={[0.7, 10, 10]} />
        <meshBasicMaterial color="#0A5CFF" wireframe transparent opacity={0.03} />
      </mesh>

      {/* Target crosshair lines */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.008, 0.008]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.05} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.008, 2.2, 0.008]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

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
      {/* 3D Hero Background Canvas underlay (Only contains the heavy mech HUD crosshairs) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <HeroMechObject />
          </Suspense>
        </Canvas>
      </div>

      {/* Absolute Survey Header bar */}
      <div className="absolute top-24 left-0 w-full flex justify-between items-center px-8 md:px-16 text-alpine-mono opacity-80 select-none z-10">
        <span>ROUTE DIRECTORY v4 // EXPEDITION ACCLIMATIZED</span>
        <span>DAVOS, GRISONS, CH</span>
      </div>

      {/* Gundam Blue Trail Marker Segment [Blue | White | Blue] */}
      <div className="relative z-10 flex h-[16px] w-[70px] brutalist-border overflow-hidden mb-6">
        <div className="flex-1 bg-accent-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-accent-blue" />
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
          <motion.span variants={lineVariants} className="block text-accent-blue">
            ROBUST SYSTEMS
          </motion.span>
        </motion.h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run verification and typechecking**
  Run: `npx tsc --noEmit`
  Expected: Successful compilation with no errors.
