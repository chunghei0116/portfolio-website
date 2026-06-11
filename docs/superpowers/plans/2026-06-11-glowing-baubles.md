# Swiss Editorial "Glowing Glass Baubles" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement premium glassy 3D spheres (baubles) with tiny internal point lights inside the 3D City Card (`CityEnvironment.tsx`) and the Paper Airplane Tech Section (`TechSection.tsx`).

**Architecture:** Create a `GlowingBauble` helper component that leverages `<meshPhysicalMaterial>` and `<pointLight>`. Render multiple instances of `GlowingBauble` inside the respective 3D environments.

**Tech Stack:** React, Next.js, React Three Fiber, TailwindCSS, TypeScript.

---

### Task 1: Overhaul CityEnvironment with Glowing Baubles

**Files:**
- Modify: `src/components/canvas/CityEnvironment.tsx`

- [ ] **Step 1: Implement GlowingBauble and update CityEnvironment**
  Add the `GlowingBauble` component and render three instances of it (blue, red, yellow) floating above the buildings in `src/components/canvas/CityEnvironment.tsx`.

```tsx
"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function GlowingBauble({ position, color, size = 0.15 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Soft vertical bobbing floating motion
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0] * 5.0) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 24, 24]} />
      {/* Glistening, glassy physical material */}
      <meshPhysicalMaterial
        color={color}
        roughness={0.05}
        metalness={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        transmission={0.65}
        ior={1.5}
        thickness={0.3}
      />
      {/* Tiny internal light source casting glow on surroundings */}
      <pointLight color={color} intensity={2.5} distance={3.5} decay={2} />
    </mesh>
  );
}

export function CameraController({ isExpanded }: { isExpanded: boolean }) {
  useFrame((state) => {
    // Smooth camera glide target
    const targetPos = isExpanded ? new THREE.Vector3(0, -0.15, 1.2) : new THREE.Vector3(0, 0.5, 2.8);
    const targetFov = isExpanded ? 75 : 50;

    // Smoothly glide camera position and FOV
    state.camera.position.lerp(targetPos, 0.08);

    if (state.camera instanceof THREE.PerspectiveCamera) {
      state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 0.08);
      state.camera.updateProjectionMatrix();
    }

    // Dynamically adjust camera lookAt depending on expansion
    const targetLookAt = isExpanded ? new THREE.Vector3(0, -0.15, 0) : new THREE.Vector3(0, -0.2, 0);
    state.camera.lookAt(targetLookAt);
  });

  return null;
}

export function CityEnvironment({ isExpanded }: { isExpanded: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate 25 buildings (5x5 grid)
  const buildings = useMemo(() => {
    const list = [];
    const size = 5;
    const spacing = 0.55;
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const posX = (x - size / 2) * spacing;
        const posZ = (z - size / 2) * spacing;
        // Procedural height scaling
        const height = 0.4 + Math.sin(x * 1.5 + z * 2.3) * 0.4 + Math.cos(x * 0.9) * 0.3;
        list.push({
          id: `${x}-${z}`,
          position: [posX, height / 2 - 0.5, posZ] as [number, number, number],
          args: [0.3, height, 0.3] as [number, number, number],
        });
      }
    }
    return list;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Rotate slowly in card mode, accelerate inside immersive mode
      const speed = isExpanded ? 0.22 : 0.08;
      groupRef.current.rotation.y += speed * 0.015;
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        {buildings.map((b) => (
          <mesh key={b.id} position={b.position}>
            <boxGeometry args={b.args} />
            <meshBasicMaterial color="#1F438A" wireframe transparent opacity={0.15} />
          </mesh>
        ))}
        <gridHelper args={[4, 12, "#373C42", "#373C42"]} position={[0, -0.52, 0]} />
      </group>

      {/* Floating Glowing Beacons orbiting above the skyscrapers */}
      <GlowingBauble position={[-0.8, 0.4, -0.6]} color="#1F438A" size={0.16} /> {/* Ebikawa Blue */}
      <GlowingBauble position={[0.7, 0.2, 0.5]} color="#C82833" size={0.14} />  {/* Classic Red */}
      <GlowingBauble position={[0.4, 0.5, -0.8]} color="#F0A828" size={0.12} />  {/* Antenna Yellow */}
    </group>
  );
}
```

---

### Task 2: Overhaul TechSection with Glowing Baubles

**Files:**
- Modify: `src/components/ui/TechSection.tsx`

- [ ] **Step 1: Add GlowingBauble and update Paper Airplane canvas**
  Add the `GlowingBauble` component and render two instances of it (blue, yellow) floating in the paper airplane's canvas in `src/components/ui/TechSection.tsx`.

```tsx
"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlowingBauble({ position, color, size = 0.15 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Soft vertical bobbing floating motion
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0] * 5.0) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 24, 24]} />
      {/* Glistening, glassy physical material */}
      <meshPhysicalMaterial
        color={color}
        roughness={0.05}
        metalness={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        transmission={0.65}
        ior={1.5}
        thickness={0.3}
      />
      {/* Tiny internal light source casting glow on surroundings */}
      <pointLight color={color} intensity={2.5} distance={3.5} decay={2} />
    </mesh>
  );
}

function PaperAirplane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const lineRef = useRef<THREE.LineSegments>(null!);

  // Define vertices for a classic paper airplane
  // Nose is pointing towards +Z (forward)
  const vertices = useMemo(() => new Float32Array([
    0, 0, 0.8,       // 0: Nose (N)
    0, -0.1, -0.6,   // 1: Center Back Fold (C)
    0.7, 0.1, -0.5,  // 2: Right Wing Tip (R)
    -0.7, 0.1, -0.5, // 3: Left Wing Tip (L)
    0.1, -0.06, -0.55, // 4: Right Under Fold (Rf)
    -0.1, -0.06, -0.55 // 5: Left Under Fold (Lf)
  ]), []);

  // Indices mapping the triangular faces of a folded paper airplane
  const indices = useMemo(() => [
    // Top Right Wing
    0, 2, 4,
    // Top Left Wing
    0, 5, 3,
    // Bottom Right Crease
    0, 4, 1,
    // Bottom Left Crease
    0, 1, 5
  ], []);

  // Build the custom geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [vertices, indices]);

  // Extract edges/lines for the sharp wireframe borders
  const edgesGeometry = useMemo(() => {
    const geo = new THREE.EdgesGeometry(geometry);
    return geo;
  }, [geometry]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth gliding/swooping thermal flight math
    const posY = Math.sin(time * 1.0) * 0.15;
    const posX = Math.sin(time * 0.7) * 0.35;
    
    // Banking/rolling into swerves
    const roll = Math.cos(time * 0.7) * 0.22;
    // Pitching nose up/down slightly
    const pitch = Math.cos(time * 1.0) * 0.08;
    
    if (meshRef.current) {
      meshRef.current.position.set(posX, posY, 0);
      meshRef.current.rotation.set(pitch + 0.1, time * 0.15, roll);
    }
    if (lineRef.current) {
      lineRef.current.position.set(posX, posY, 0);
      lineRef.current.rotation.set(pitch + 0.1, time * 0.15, roll);
    }
  });

  return (
    <group>
      {/* Semi-transparent solid fill representing holographic blueprint paper */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color="#1F438A" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Sharp high-contrast wireframe outlines */}
      <lineSegments ref={lineRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#1F438A" linewidth={2} transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

const techItems = [
  { name: "React", desc: "Interactive Component Architectures" },
  { name: "Next.js 16", desc: "Turbopack Core Routing & SSR" },
  { name: "TypeScript", desc: "Strict Static Structural Typing" },
  { name: "Flutter", desc: "High-Performance Mobile Handshakes" },
  { name: "TailwindCSS", desc: "Fluid Grotesque Visual Tokens" },
  { name: "Kubernetes", desc: "Zero-Downtime Rolling Replica Schedules" },
  { name: "Docker", desc: "Multi-Stage Hermetic Containers" },
  { name: "GitOps", desc: "Declarative Cluster Reconciles" },
  { name: "ArgoCD", desc: "Sync Drift Prevention Controllers" },
  { name: "AWS Cloud", desc: "Budget Resource Node Scalings" },
];

export default function TechSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12 select-none">
      <div className="grid grid-cols-12 gap-6 brutalist-border bg-card-bg p-8 brutalist-shadow">
        
        {/* Left Column: Tech Stack Header & Lists */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-between">
          <div>
            <span className="text-accent-blue font-mono text-[10px] font-bold uppercase tracking-wider bg-accent-blue/10 border border-black px-2.5 py-0.5">
              TECH ENGINE // CORE STACK
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-[950] tracking-[-0.04em] leading-none uppercase mt-4 text-foreground">
              CORE TOOLSETS
            </h2>
            
            {/* Minimalist Grid of Tech Stack Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {techItems.map((tech) => (
                <div key={tech.name} className="border-b border-black/10 pb-3 flex flex-col">
                  <span className="font-sans font-black text-base text-foreground uppercase tracking-tight">
                    {tech.name}
                  </span>
                  <span className="font-mono text-[9px] text-foreground/50 uppercase tracking-wide mt-1">
                    {tech.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Paper Airplane Canvas Window */}
        <div className="col-span-12 lg:col-span-6 min-h-[300px] lg:min-h-full brutalist-border bg-white relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1.8], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <PaperAirplane />
              
              {/* Floating Glowing Beacons */}
              <GlowingBauble position={[-0.6, 0.2, -0.4]} color="#1F438A" size={0.15} /> {/* Ebikawa Blue */}
              <GlowingBauble position={[0.6, -0.2, 0.4]} color="#F0A828" size={0.11} />  {/* Antenna Yellow */}
            </Canvas>
          </div>
          <span className="absolute bottom-4 right-4 z-10 font-mono text-[8px] text-foreground/40 font-bold uppercase tracking-widest">
            * 3D LIVE VECTOR FLIGHT SYSTEM
          </span>
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run verification and typechecking**
  Run: `npx tsc --noEmit`
  Expected: Successful compilation with no errors.
