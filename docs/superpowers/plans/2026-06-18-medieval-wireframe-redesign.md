# Medieval Wireframe Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio into a warm, clean, minimalist design with procedural 3D golden-amber wireframe medieval elements (Castle, Shield, Tree & Path, Fire Flame).

**Architecture:** Update variables in `globals.css` to match `ahronsilv.dev` warm tones. Re-enable Three.js background and hero canvases with customized R3F procedural wireframe geometries (Castle Watchtower, Runic Shield, Winding Path with Trees, and a Bonfire with rising flame particles).

**Tech Stack:** React, Next.js, TailwindCSS, Three.js, React Three Fiber (R3F), Framer Motion.

---

### Task 1: Style Variables & Typography Config

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace global CSS style variables**
  Update the variables under `:root` to transition styling to the warm, clean tone. Add the Google Font import for `Cinzel` serif headings.

  ```css
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;500;600;700;800&display=swap');

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --background: 243 240 231;      /* #f7f4ed */
    --foreground: 20 36 44;         /* #14242c */
    --card: 255 253 248;            /* #fffdf8 */
    --card-foreground: 20 36 44;
    --popover: 255 253 248;
    --popover-foreground: 20 36 44;
    --primary: 23 51 59;            /* #17333b */
    --primary-foreground: 255 253 248;
    --secondary: 237 241 234;       /* #edf1ea */
    --secondary-foreground: 20 36 44;
    --muted: 237 241 234;
    --muted-foreground: 74 90 92;   /* #4a5a5c */
    --accent: 201 137 77;           /* #c9894d (golden-amber) */
    --accent-foreground: 255 253 248;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 20 36 44 / 0.12;      /* rgba(20, 36, 44, 0.12) */
    --input: 20 36 44 / 0.12;
    --ring: 201 137 77;
    --radius: 1rem;
  }
  ```

- [ ] **Step 2: Verify type checks pass**
  Run: `npx tsc --noEmit`
  Expected: Success with no type-checking errors.

- [ ] **Step 3: Commit styles changes**
  ```bash
  git add src/app/globals.css
  git commit -m "style: configure warm clean medieval color palette variables in globals.css"
  ```

---

### Task 2: Background 3D Watchtower Scene

**Files:**
- Modify: `src/components/canvas/Scene.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace background object with 3D Wireframe Castle Watchtower**
  Modify `src/components/canvas/Scene.tsx` to remove the mechanical ring structures and write a procedural wireframe castle watchtower built block-by-block.

  ```typescript
  "use client";

  import { Canvas, useFrame } from "@react-three/fiber";
  import { Suspense, useState, useCallback, useRef } from "react";
  import * as THREE from "three";

  function CastleTower() {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      if (groupRef.current) {
        groupRef.current.rotation.y = time * 0.08;
        groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.04;
      }
    });

    const bricks = [];
    const layers = 8;
    const bricksPerLayer = 10;
    const radius = 1.4;
    const brickHeight = 0.38;

    const activeMat = new THREE.MeshBasicMaterial({ 
      color: "#c9894d", 
      wireframe: true, 
      transparent: true, 
      opacity: 0.35 
    });
    
    const mutedMat = new THREE.MeshBasicMaterial({ 
      color: "#8b5a2b", 
      wireframe: true, 
      transparent: true, 
      opacity: 0.15 
    });

    for (let l = 0; l < layers; l++) {
      const y = l * (brickHeight + 0.04) - 1.4;
      const offsetAngle = (l % 2) * (Math.PI / bricksPerLayer);
      
      for (let b = 0; b < bricksPerLayer; b++) {
        // Crenellations on the top layer
        if (l === layers - 1 && b % 2 === 0) continue;
        // Weathered ruined bricks gaps
        if (l < layers - 1 && (l + b) % 11 === 0) continue;

        const angle = (b * (Math.PI * 2)) / bricksPerLayer + offsetAngle;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        bricks.push(
          <mesh 
            key={`${l}-${b}`} 
            position={[x, y, z]} 
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <boxGeometry args={[0.72, brickHeight, 0.28]} />
            <primitive object={l % 2 === 0 ? activeMat : mutedMat} attach="material" />
          </mesh>
        );
      }
    }

    return (
      <group ref={groupRef} position={[2.4, -0.6, -2]} scale={[1.4, 1.4, 1.4]}>
        {bricks}
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
          camera={{ position: [0, 0, 6], fov: 60 } as any}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={handleCreated}
          frameloop="always"
        >
          <Suspense fallback={null}>
            <CastleTower />
          </Suspense>
        </Canvas>
      </div>
    );
  };

  export default Scene;
  ```

- [ ] **Step 2: Restore Scene background rendering in layout.tsx**
  Add `<Scene />` back into the main body elements of `src/app/layout.tsx`.

- [ ] **Step 3: Run typescript compiler check**
  Run: `npx tsc --noEmit`
  Expected: SUCCESS

- [ ] **Step 4: Commit background canvas**
  ```bash
  git add src/components/canvas/Scene.tsx src/app/layout.tsx
  git commit -m "feat: restore Scene background canvas and implement 3D Castle Watchtower"
  ```

---

### Task 3: Hero Runic Shield & Styling

**Files:**
- Modify: `src/components/ui/Hero.tsx`

- [ ] **Step 1: Write HeroMedievalShield component and restore Hero canvas underlay**
  Restore R3F canvas render and code the Golden-Amber Wireframe Shield and Crossed Swords.

  ```typescript
  function HeroMedievalShield() {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      if (groupRef.current) {
        groupRef.current.rotation.y = time * 0.08;
        groupRef.current.rotation.z = -time * 0.03;
      }
    });

    const activeMat = new THREE.MeshBasicMaterial({ color: "#c9894d", wireframe: true, transparent: true, opacity: 0.35 });
    const mutedMat = new THREE.MeshBasicMaterial({ color: "#8b5a2b", wireframe: true, transparent: true, opacity: 0.15 });

    return (
      <group ref={groupRef} position={[1.8, 0, -2.2]} scale={[2.0, 2.0, 2.0]}>
        {/* Shield outline geometry */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.0, 0.6, 0.1, 5, 2, true]} />
          <primitive object={activeMat} attach="material" />
        </mesh>
        
        {/* Swords crossed (represented as wireframe lines or slender boxes) */}
        <mesh position={[0, 0, -0.1]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[2.0, 0.08, 0.04]} />
          <primitive object={mutedMat} attach="material" />
        </mesh>
        <mesh position={[0, 0, -0.1]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[2.0, 0.08, 0.04]} />
          <primitive object={mutedMat} attach="material" />
        </mesh>
      </group>
    );
  }
  ```

- [ ] **Step 2: Run compiler check**
  Run: `npx tsc --noEmit`
  Expected: SUCCESS

- [ ] **Step 3: Commit Hero updates**
  ```bash
  git add src/components/ui/Hero.tsx
  git commit -m "feat: restore Hero 3D Canvas and implement 3D Wireframe Runic Shield"
  ```

---

### Task 4: UI Navigation & Layout Panels Clean

**Files:**
- Modify: `src/components/ui/Navbar.tsx`
- Modify: `src/components/ui/BentoGrid.tsx`

- [ ] **Step 1: Re-style navbar to warm clean tone**
  Apply parchment backgrounds, fine lines, serif headers, and the forest green status indicator in `src/components/ui/Navbar.tsx`.

- [ ] **Step 2: Re-style Bento cards to clean paper surface**
  Remove brutalist offsets and thick borders. Configure `BentoCard` elements to use `--card` backgrounds, thin `border border-border` lines, and proper padding bounds to prevent mobile webkit overflow.

- [ ] **Step 3: Verify build compiles cleanly**
  Run: `npx tsc --noEmit`
  Expected: SUCCESS

- [ ] **Step 4: Commit layout refinements**
  ```bash
  git add src/components/ui/Navbar.tsx src/components/ui/BentoGrid.tsx
  git commit -m "style: align Navbar and BentoGrid cards with warm minimalist design"
  ```

---

### Task 5: Bento 3D Winding Path and Bonfire Canvases

**Files:**
- Modify: `src/components/ui/BentoGrid.tsx`

- [ ] **Step 1: Restore 3D Winding Path and Trees in Card A**
  Implement the wireframe terrain with a path and trees using procedural cone geometries.

  ```typescript
  function WindingPathAndTrees() {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      if (groupRef.current) groupRef.current.rotation.y = time * 0.05;
    });

    const activeMat = new THREE.MeshBasicMaterial({ color: "#c9894d", wireframe: true, transparent: true, opacity: 0.4 });
    const mutedMat = new THREE.MeshBasicMaterial({ color: "#8b5a2b", wireframe: true, transparent: true, opacity: 0.15 });

    return (
      <group ref={groupRef} position={[0, -0.2, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1.2, 32, 1, 0, Math.PI * 1.5]} />
          <primitive object={mutedMat} attach="material" />
        </mesh>
        {[-0.8, 0.8, 1.2].map((x, idx) => {
          const z = idx === 1 ? -0.5 : 0.6;
          return (
            <group key={idx} position={[x, -0.3, z]}>
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.03, 0.05, 0.3, 4]} />
                <primitive object={mutedMat} attach="material" />
              </mesh>
              <mesh position={[0, 0.5, 0]}>
                <coneGeometry args={[0.22, 0.6, 5]} />
                <primitive object={activeMat} attach="material" />
              </mesh>
            </group>
          );
        })}
      </group>
    );
  }
  ```

- [ ] **Step 2: Restore 3D Bonfire and Rising Flames in Card G**
  Write a procedural bonfire that updates rising wireframe particle scale.

  ```typescript
  function BonfireAndFlames() {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      if (groupRef.current) groupRef.current.rotation.y = time * 0.2;
    });

    const activeMat = new THREE.MeshBasicMaterial({ color: "#c9894d", wireframe: true, transparent: true, opacity: 0.5 });
    const mutedMat = new THREE.MeshBasicMaterial({ color: "#8b5a2b", wireframe: true, transparent: true, opacity: 0.2 });

    return (
      <group ref={groupRef} position={[0, -0.2, 0]}>
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 4]} />
          <primitive object={mutedMat} attach="material" />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 4]} />
          <primitive object={mutedMat} attach="material" />
        </mesh>
        {Array.from({ length: 4 }).map((_, idx) => {
          const angle = (idx * Math.PI) / 2;
          return (
            <mesh key={idx} position={[Math.cos(angle)*0.15, 0.1, Math.sin(angle)*0.15]}>
              <coneGeometry args={[0.1, 0.4, 4]} />
              <primitive object={activeMat} attach="material" />
            </mesh>
          );
        })}
      </group>
    );
  }
  ```

- [ ] **Step 3: Run complete typescript verification**
  Run: `npx tsc --noEmit`
  Expected: Success with no warnings.

- [ ] **Step 4: Commit final layout canvases**
  ```bash
  git add src/components/ui/BentoGrid.tsx
  git commit -m "feat: implement 3D wireframe Winding Path and Bonfire flame components in BentoGrid"
  ```
