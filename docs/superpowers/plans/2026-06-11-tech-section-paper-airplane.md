# Swiss Minimalist "3D Flight City & Clouds" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a slow-scrolling 3D wireframe cloud system above the buildings in `src/components/ui/TechSection.tsx`.

**Architecture:** Create a `LowPolyCloud` sub-component rendering clustered sphere geometries, translating them along the Z-axis, and recycling them on horizon. Spawn instances inside the Canvas.

**Tech Stack:** React, Next.js, React Three Fiber, TailwindCSS, TypeScript.

---

### Task 1: Overhaul TechSection with 3D Scrolling Clouds

**Files:**
- Modify: `src/components/ui/TechSection.tsx`

- [ ] **Step 1: Rewrite TechSection.tsx with 3D scrolling clouds**
  Overwrite `src/components/ui/TechSection.tsx` to include the `LowPolyCloud` component, spawn two scrolling clouds at higher elevations in the Canvas, and keep the timeline.

```tsx
"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LowPolyCloud({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    // Scroll at the exact same speed as the buildings
    const speed = 0.55 * delta;
    if (groupRef.current) {
      groupRef.current.position.z += speed;
      // Recycle back to horizon when it passes the camera (Z > 1.5)
      if (groupRef.current.position.z > 1.5) {
        groupRef.current.position.z = -7.5;
        // Jitter the horizontal and vertical spawning points slightly on recycle
        groupRef.current.position.x = position[0] + (Math.random() - 0.5) * 0.3;
        groupRef.current.position.y = position[1] + (Math.random() - 0.5) * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Central core puff */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial color="#1F438A" wireframe transparent opacity={0.06} />
      </mesh>
      {/* Left puff */}
      <mesh position={[-0.18, -0.05, 0]}>
        <sphereGeometry args={[0.15, 10, 10]} />
        <meshBasicMaterial color="#1F438A" wireframe transparent opacity={0.06} />
      </mesh>
      {/* Right puff */}
      <mesh position={[0.18, -0.05, 0]}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshBasicMaterial color="#1F438A" wireframe transparent opacity={0.06} />
      </mesh>
      {/* Top puff */}
      <mesh position={[0, 0.12, -0.05]}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshBasicMaterial color="#1F438A" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function ScrollingBuildings() {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate 4 scrolling buildings with different horizontal offsets, heights, and depths
  const initialBuildings = useMemo(() => [
    { id: 1, x: -0.65, h: 1.8, z: -1 },
    { id: 2, x: 0.7, h: 2.3, z: -3 },
    { id: 3, x: -0.85, h: 1.4, z: -5 },
    { id: 4, x: 0.6, h: 1.9, z: -7 }
  ], []);

  useFrame((state, delta) => {
    // Frame-rate independent speed: 0.55 units per second
    const speed = 0.55 * delta;
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh) => {
        mesh.position.z += speed;
        
        // When a building passes the camera (Z > 1.5), recycle and generate randomized dimensions
        if (mesh.position.z > 1.5) {
          mesh.position.z = -7.5; // Recycle back to horizon
          
          // Randomize X offset, ensuring it spawns either on the left or right of flightpath to avoid collisions
          const isLeft = Math.random() < 0.5;
          const posX = isLeft ? -0.5 - Math.random() * 0.55 : 0.5 + Math.random() * 0.55;
          
          // Randomize dimensions
          const height = 0.8 + Math.random() * 1.5;
          const width = 0.2 + Math.random() * 0.15;
          
          mesh.position.x = posX;
          mesh.position.y = height / 2 - 1.1;
          
          // Update the geometry scale dynamically
          const scaleMesh = mesh as THREE.Mesh;
          scaleMesh.scale.set(width / 0.3, height / 1.5, width / 0.3);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {initialBuildings.map((b) => (
        <mesh key={b.id} position={[b.x, b.h / 2 - 1.1, b.z]}>
          {/* Base box geometry. We will scale this mesh procedurally on recycle */}
          <boxGeometry args={[0.3, 1.5, 0.3]} />
          {/* Sleek, procedurally spawning wireframe skyscrapers */}
          <meshBasicMaterial color="#1F438A" wireframe transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
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

  // Build the custom mesh geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [vertices, indices]);

  // Hand-coded explicit line segments to draw EVERY single crease fold 
  // (Including the central spine running down the middle, wing folds, and tips)
  const lineVertices = useMemo(() => new Float32Array([
    // Central Spine (Nose to Back Crease) - CRITICAL for recognisability!
    0, 0, 0.8,         0, -0.1, -0.6,
    // Nose to Right Under Fold (Right Crease)
    0, 0, 0.8,         0.1, -0.06, -0.55,
    // Nose to Left Under Fold (Left Crease)
    0, 0, 0.8,         -0.1, -0.06, -0.55,
    // Nose to Right Wing Tip
    0, 0, 0.8,         0.7, 0.1, -0.5,
    // Nose to Left Wing Tip
    0, 0, 0.8,         -0.7, 0.1, -0.5,
    // Right Under Fold to Right Wing Tip (Wing crease fold)
    0.1, -0.06, -0.55, 0.7, 0.1, -0.5,
    // Left Under Fold to Left Wing Tip (Wing crease fold)
    -0.1, -0.06, -0.55, -0.7, 0.1, -0.5,
    // Right Under Fold to Back Crease (Right Keel)
    0.1, -0.06, -0.55, 0, -0.1, -0.6,
    // Left Under Fold to Back Crease (Left Keel)
    -0.1, -0.06, -0.55, 0, -0.1, -0.6,
    // Back Wing Edges (Right Tip to Right Fold)
    0.7, 0.1, -0.5,    0.1, -0.06, -0.55,
    // Back Wing Edges (Left Tip to Left Fold)
    -0.7, 0.1, -0.5,   -0.1, -0.06, -0.55
  ]), []);

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(lineVertices, 3));
    return geo;
  }, [lineVertices]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Sweeping, highly fluid, majestic gliding physics (slower frequencies)
    const posY = Math.sin(time * 0.8) * 0.18;
    const posX = Math.sin(time * 0.5) * 0.45; // Wider horizontal sways
    
    // Deep, elegant banking/rolling (Z-axis)
    const roll = Math.cos(time * 0.5) * 0.3;
    // Steering/yawing (Y-axis) - nose points forward (Math.PI) + sways slowly
    const yaw = Math.cos(time * 0.5) * 0.2;
    // Pitching nose up/down slightly (X-axis)
    const pitch = Math.cos(time * 0.8) * 0.06;
    
    if (meshRef.current) {
      meshRef.current.position.set(posX, posY, 0);
      meshRef.current.rotation.set(pitch + 0.05, Math.PI + yaw, roll);
    }
    if (lineRef.current) {
      lineRef.current.position.set(posX, posY, 0);
      lineRef.current.rotation.set(pitch + 0.05, Math.PI + yaw, roll);
    }
  });

  return (
    <group>
      {/* Semi-transparent solid fill representing holographic blueprint paper */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color="#1F438A" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Sharp hand-crafted wireframe creases (Every fold is highly visible) */}
      <lineSegments ref={lineRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#1F438A" linewidth={2.5} transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

const history = [
  {
    year: "2025 — PRESENT",
    role: "MOBILE APPLICATION DEVELOPER",
    company: "AS Watson Group",
    desc: "Architecting international Kubernetes container clusters, GitLab/ArgoCD GitOps synchronization loops, and engineering high-availability client mobile engines (Flutter)."
  },
  {
    year: "2023 — 2025",
    role: "PROGRAMMER",
    company: "Asia Allied Infrastructure Group",
    desc: "Assembling stable, secure cloud EKS clusters, multi-stage automated pipelines (ArgoCD), and cross-platform native corporate solutions (Flutter)."
  },
  {
    year: "2021",
    role: "SUMMER INTERN",
    company: "EMSD HKSAR",
    desc: "Programming industrial PLC electronic automation systems, telemetry log aggregations, and maintaining critical HKSAR municipal automation infrastructures."
  }
];

export default function TechSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12 select-none">
      <div className="grid grid-cols-12 gap-8 brutalist-border bg-card-bg p-8 brutalist-shadow">
        
        {/* Left Column: Minimalist Vertical Career Timeline (col-span-12 lg:col-span-7) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
          <div>
            <span className="text-accent-blue font-mono text-[10px] font-bold uppercase tracking-wider bg-accent-blue/10 border border-black px-2.5 py-0.5">
              CAREER TIMELINE // PATHWAY
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-[950] tracking-[-0.04em] leading-none uppercase mt-4 text-foreground mb-8">
              FLIGHT PATHWAY
            </h2>
            
            {/* Flat axis point/line timeline */}
            <div className="border-l-[3px] border-black ml-4 pl-8 relative py-4 flex flex-col gap-10">
              {history.map((node) => (
                <div key={node.year} className="relative flex flex-col gap-1">
                  {/* High-contrast node dot point */}
                  <span className="w-3.5 h-3.5 rounded-full bg-[#F0A828] border-2 border-black absolute -left-[38.5px] top-1.5 z-10" />
                  
                  {/* Job Title & Year Row (Job Title in big bold, Year in custom tag) */}
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <span className="font-sans font-[950] text-xl md:text-2xl text-foreground tracking-tight leading-none uppercase">
                      {node.role}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-accent-blue/10 border border-black px-2.5 py-0.5 text-accent-blue rounded-none select-none">
                      {node.year}
                    </span>
                  </div>
                  
                  {/* Company Name Subtitle */}
                  <div className="font-mono text-xs sm:text-sm font-bold text-accent-blue uppercase tracking-widest mt-1.5">
                    {node.company}
                  </div>
                  
                  {/* Brief description */}
                  <p className="text-xs leading-relaxed text-foreground/80 font-semibold max-w-xl mt-2">
                    {node.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pure 3D Paper Airplane Canvas Window with scrolling skyscrapers & clouds (col-span-12 lg:col-span-5) */}
        <div className="col-span-12 lg:col-span-5 min-h-[360px] lg:min-h-full brutalist-border bg-white relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            {/* Zoomed out camera: position.z = 2.5 */}
            <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
              <ambientLight intensity={1.5} />
              
              {/* Infinite Scrolling Blue Skyscrapers */}
              <ScrollingBuildings />
              
              {/* Infinite Scrolling Blue Clouds */}
              <LowPolyCloud position={[-0.45, 0.7, -2]} />
              <LowPolyCloud position={[0.5, 0.8, -4.5]} />
              
              {/* Minimalist Paper Airplane */}
              <PaperAirplane />
            </Canvas>
          </div>
          <span className="absolute bottom-4 right-4 z-10 font-mono text-[8px] text-[#373C42]/40 font-bold uppercase tracking-widest">
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
