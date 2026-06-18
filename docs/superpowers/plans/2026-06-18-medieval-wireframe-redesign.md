# Medieval Wireframe Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio into a warm, clean, minimalist design with procedural 3D golden-amber wireframe medieval elements.

**Architecture:** Update variables in `globals.css` to match `ahronsilv.dev` warm tones. Re-enable Three.js background and hero canvases with customized R3F procedural wireframe geometries (Castle Watchtower, Runic Astrolabe, and DevOps Pipeline beams).

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
          camera={{ position: [0, 0, 6], fof: 60 } as any}
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

  ```typescript
  import Navbar from "@/components/ui/Navbar";
  import Scene from "@/components/canvas/Scene";
  import PageTransition from "@/components/ui/PageTransition";
  ```

- [ ] **Step 3: Run typescript compiler check**
  Run: `npx tsc --noEmit`
  Expected: SUCCESS

- [ ] **Step 4: Commit background canvas**
  ```bash
  git add src/components/canvas/Scene.tsx src/app/layout.tsx
  git commit -m "feat: restore Scene background canvas and implement 3D Castle Watchtower"
  ```

---

### Task 3: Hero Runic Astrolabe & Styling

**Files:**
- Modify: `src/components/ui/Hero.tsx`

- [ ] **Step 1: Write HeroMedievalCrest component and restore Hero canvas underlay**
  Restore R3F canvas render and code the Golden-Amber Wireframe astrolabe.

  ```typescript
  function HeroMedievalCrest() {
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
        {/* Outer Runic Circle */}
        <mesh>
          <torusGeometry args={[1.5, 0.03, 8, 48]} />
          <primitive object={activeMat} attach="material" />
        </mesh>
        
        {/* Central Shield plate representation */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.04, 8, 1, true]} />
          <primitive object={mutedMat} attach="material" />
        </mesh>

        {/* Diagonal Cross braces */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[2.2, 0.08, 0.08]} />
          <primitive object={activeMat} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[2.2, 0.08, 0.08]} />
          <primitive object={activeMat} attach="material" />
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
  git commit -m "feat: restore Hero 3D Canvas and implement 3D Wireframe Runic Astrolabe"
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

### Task 5: Bento 3D Pipeline & Particle Canvases

**Files:**
- Modify: `src/components/ui/BentoGrid.tsx`

- [ ] **Step 1: Restore 3D Canvas elements inside Bento Cards**
  - Card F: DevOps Pipeline Canvas underlay rendering `PipelineScene` styled to flow with glowing golden-amber wireframe paths.
  - Card G: Flutter particles rendering `SodaBubbles` and `FlutterParticles` in warm amber/gold hues.

- [ ] **Step 2: Run complete typescript verification**
  Run: `npx tsc --noEmit`
  Expected: Success with no warnings.

- [ ] **Step 3: Commit final layout canvases**
  ```bash
  git add src/components/ui/BentoGrid.tsx
  git commit -m "feat: restore DevOps pipeline and particle canvases inside bento layout in warm amber style"
  ```
