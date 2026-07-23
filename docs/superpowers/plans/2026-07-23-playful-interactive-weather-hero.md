# Playful Interactive Weather Panel & Hero Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a playful interactive weather control panel and 3D Three.js canvas hero background allowing visitors to switch between 5 weather modes (Sunny, Rainy, Snowy, Stormy, Cosmic Nebula) with dynamic particle effects, responsive lighting, interactive 3D sculptures, and click-to-burst canvas interactions.

**Architecture:** A shared React `WeatherContext` manages weather state, wind intensity, lightning triggers, and click-spawned 3D bursts. `HeroScene.tsx` delegates rendering to modular 3D weather components (`WeatherLighting`, `WeatherParticles`, `WeatherSculptures`, `WeatherBursts`), while `WeatherControlPanel.tsx` provides a sleek glassmorphic floating UI pill/widget for user interaction.

**Tech Stack:** Next.js 16, React 19, Three.js, `@react-three/fiber`, `@react-three/drei`, Framer Motion, Lucide Icons, Tailwind CSS v4.

## Global Constraints

- **Framework**: Next.js 16 App Router with React 19
- **3D Libraries**: `@react-three/fiber` and `three`
- **Animation**: `framer-motion` for UI panel transitions
- **Performance**: High FPS (60fps) with adaptive particle counts for mobile (`viewport.width < 7`)
- **No placeholders**: Full implementation code in every file

---

### Task 1: Create Weather Context (`WeatherContext.tsx`)

**Files:**
- Create: `src/context/WeatherContext.tsx`
- Modify: `src/components/MinimalHero.tsx` (wrap components in `WeatherProvider`)

**Interfaces:**
- Consumes: None
- Produces: `WeatherContext`, `WeatherProvider`, `useWeather` hook providing state `{ mode, intensity, lightningFlashTime, bursts, setMode, setIntensity, triggerLightning, addBurst }`.

- [ ] **Step 1: Create `src/context/WeatherContext.tsx`**

```tsx
'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type WeatherMode = 'sunny' | 'rainy' | 'snowy' | 'stormy' | 'cosmic';

export interface ParticleBurst {
  id: string;
  x: number;
  y: number;
  time: number;
  type: WeatherMode;
}

export interface WeatherContextType {
  mode: WeatherMode;
  intensity: number;
  lightningFlashTime: number;
  bursts: ParticleBurst[];
  setMode: (mode: WeatherMode) => void;
  setIntensity: (intensity: number) => void;
  triggerLightning: () => void;
  addBurst: (x: number, y: number) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<WeatherMode>('rainy');
  const [intensity, setIntensityState] = useState<number>(1.0);
  const [lightningFlashTime, setLightningFlashTime] = useState<number>(0);
  const [bursts, setBursts] = useState<ParticleBurst[]>([]);

  const setMode = useCallback((newMode: WeatherMode) => {
    setModeState(newMode);
  }, []);

  const setIntensity = useCallback((newIntensity: number) => {
    setIntensityState(newIntensity);
  }, []);

  const triggerLightning = useCallback(() => {
    setLightningFlashTime(Date.now());
  }, []);

  const addBurst = useCallback((x: number, y: number) => {
    const newBurst: ParticleBurst = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y,
      time: Date.now(),
      type: mode,
    };
    setBursts((prev) => [...prev.slice(-12), newBurst]);
  }, [mode]);

  return (
    <WeatherContext.Provider
      value={{
        mode,
        intensity,
        lightningFlashTime,
        bursts,
        setMode,
        setIntensity,
        triggerLightning,
        addBurst,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
```

- [ ] **Step 2: Verify type correctness with TypeScript**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors in `WeatherContext.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/context/WeatherContext.tsx
git commit -m "feat: add WeatherContext and useWeather state hook"
```

---

### Task 2: Create Weather Lighting & Environment (`WeatherLighting.tsx`)

**Files:**
- Create: `src/components/weather/WeatherLighting.tsx`

**Interfaces:**
- Consumes: `useWeather()` from `WeatherContext.tsx`
- Produces: `<WeatherLighting />` component for R3F canvas handling ambient, directional, point lights, fog, and lightning strikes.

- [ ] **Step 1: Create `src/components/weather/WeatherLighting.tsx`**

```tsx
'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWeather } from '@/context/WeatherContext';

export default function WeatherLighting() {
  const { mode, lightningFlashTime } = useWeather();
  const { scene } = useThree();
  
  const ambientLightRef = useRef<THREE.AmbientLight>(null!);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  const lightningLightRef = useRef<THREE.PointLight>(null!);
  
  const lastFlashRef = useRef<number>(0);
  const flashIntensityRef = useRef<number>(0);

  // Set up background fog dynamically
  useFrame((_, delta) => {
    let targetFogColor = new THREE.Color('#050507');
    let targetFogNear = 5;
    let targetFogFar = 25;

    let targetAmbientColor = new THREE.Color('#ffffff');
    let targetAmbientIntensity = 0.6;

    let targetDirColor = new THREE.Color('#10b981');
    let targetDirIntensity = 1.5;

    if (mode === 'sunny') {
      targetFogColor = new THREE.Color('#1c1917');
      targetAmbientColor = new THREE.Color('#fef08a');
      targetAmbientIntensity = 0.8;
      targetDirColor = new THREE.Color('#f59e0b');
      targetDirIntensity = 2.5;
    } else if (mode === 'rainy') {
      targetFogColor = new THREE.Color('#030712');
      targetAmbientColor = new THREE.Color('#38bdf8');
      targetAmbientIntensity = 0.4;
      targetDirColor = new THREE.Color('#06b6d4');
      targetDirIntensity = 1.8;
    } else if (mode === 'snowy') {
      targetFogColor = new THREE.Color('#0c1427');
      targetAmbientColor = new THREE.Color('#e0f2fe');
      targetAmbientIntensity = 0.7;
      targetDirColor = new THREE.Color('#818cf8');
      targetDirIntensity = 1.6;
    } else if (mode === 'stormy') {
      targetFogColor = new THREE.Color('#020617');
      targetAmbientColor = new THREE.Color('#1e293b');
      targetAmbientIntensity = 0.3;
      targetDirColor = new THREE.Color('#3b82f6');
      targetDirIntensity = 1.0;
    }

    if (!scene.fog) {
      scene.fog = new THREE.Fog(targetFogColor, targetFogNear, targetFogFar);
    } else {
      (scene.fog as THREE.Fog).color.lerp(targetFogColor, 0.05);
      (scene.fog as THREE.Fog).near = THREE.MathUtils.lerp((scene.fog as THREE.Fog).near, targetFogNear, 0.05);
      (scene.fog as THREE.Fog).far = THREE.MathUtils.lerp((scene.fog as THREE.Fog).far, targetFogFar, 0.05);
    }

    if (ambientLightRef.current) {
      ambientLightRef.current.color.lerp(targetAmbientColor, 0.05);
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(ambientLightRef.current.intensity, targetAmbientIntensity, 0.05);
    }

    if (directionalLightRef.current) {
      directionalLightRef.current.color.lerp(targetDirColor, 0.05);
      directionalLightRef.current.intensity = THREE.MathUtils.lerp(directionalLightRef.current.intensity, targetDirIntensity, 0.05);
    }

    // Lightning Flash logic
    if (lightningFlashTime > lastFlashRef.current) {
      lastFlashRef.current = lightningFlashTime;
      flashIntensityRef.current = 18.0;
    }

    if (mode === 'stormy' && Math.random() < 0.003) {
      flashIntensityRef.current = 12.0 + Math.random() * 8.0;
    }

    if (lightningLightRef.current) {
      flashIntensityRef.current = THREE.MathUtils.lerp(flashIntensityRef.current, 0, delta * 8);
      lightningLightRef.current.intensity = flashIntensityRef.current;
    }
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.6} />
      <directionalLight ref={directionalLightRef} position={[6, 8, 6]} intensity={1.8} />
      <pointLight position={[-5, -3, -3]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[3, 4, 3]} intensity={2.0} color="#34d399" />
      
      {/* Intense flash light for stormy mode & button click */}
      <pointLight
        ref={lightningLightRef}
        position={[0, 5, 2]}
        intensity={0}
        color="#e0f2fe"
        distance={25}
        decay={1.5}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify type checking**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/weather/WeatherLighting.tsx
git commit -m "feat: add WeatherLighting component with dynamic atmosphere and lightning"
```

---

### Task 3: Create Multi-Mode Weather Particles (`WeatherParticles.tsx`)

**Files:**
- Create: `src/components/weather/WeatherParticles.tsx`

**Interfaces:**
- Consumes: `useWeather()`
- Produces: `<WeatherParticles />` rendering custom particle meshes for Sun motes, Rain droplets, Snowflakes, Storm clouds, and Cosmic starfield.

- [ ] **Step 1: Create `src/components/weather/WeatherParticles.tsx`**

```tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWeather } from '@/context/WeatherContext';

export default function WeatherParticles() {
  const { mode, intensity } = useWeather();
  const { viewport } = useThree();

  const pointsRef = useRef<THREE.Points>(null!);
  const isMobile = viewport.width < 7;
  const count = isMobile ? 1200 : 2800;

  // Particle positions, velocities & base colors
  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    const color1 = new THREE.Color('#10b981');
    const color2 = new THREE.Color('#00f0ff');
    const color3 = new THREE.Color('#8b5cf6');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      vel[i * 3] = (Math.random() - 0.5) * 0.05;
      vel[i * 3 + 1] = -0.1 - Math.random() * 0.2; // default downward velocity
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

      const rand = Math.random();
      const baseColor = rand > 0.6 ? color1 : rand > 0.3 ? color2 : color3;
      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }

    return [pos, col, vel];
  }, [count]);

  const particleTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    const time = state.clock.getElapsedTime();
    const speed = intensity * delta;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      if (mode === 'rainy' || mode === 'stormy') {
        // High speed downward rain/storm
        const fallSpeed = (mode === 'stormy' ? 22 : 14) * speed * (0.8 + (i % 5) * 0.1);
        const windX = (mode === 'stormy' ? 3.5 : 0.8) * speed;

        posArray[idx] += windX;
        posArray[idx + 1] -= fallSpeed;

        // Reset top when falling off screen
        if (posArray[idx + 1] < -10) {
          posArray[idx + 1] = 12;
          posArray[idx] = (Math.random() - 0.5) * 24;
        }
      } else if (mode === 'snowy') {
        // Gentle tumbling snowflakes with sine wave swaying
        const fallSpeed = 2.5 * speed * (0.6 + (i % 3) * 0.2);
        const swayX = Math.sin(time * 1.5 + i) * 0.02 * intensity;
        const swayZ = Math.cos(time * 1.2 + i) * 0.02 * intensity;

        posArray[idx] += swayX;
        posArray[idx + 1] -= fallSpeed;
        posArray[idx + 2] += swayZ;

        if (posArray[idx + 1] < -10) {
          posArray[idx + 1] = 12;
          posArray[idx] = (Math.random() - 0.5) * 24;
        }
      } else if (mode === 'sunny') {
        // Upward floating warm sun motes
        posArray[idx] += Math.sin(time * 0.8 + i) * 0.008 * intensity;
        posArray[idx + 1] += 0.8 * speed;
        posArray[idx + 2] += Math.cos(time * 0.8 + i) * 0.008 * intensity;

        if (posArray[idx + 1] > 10) {
          posArray[idx + 1] = -10;
          posArray[idx] = (Math.random() - 0.5) * 24;
        }
      } else {
        // Cosmic starfield rotation
        posArray[idx + 1] += Math.sin(time * 0.5 + i) * 0.002;
      }
    }

    posAttr.needsUpdate = true;

    // Cosmic orbit tilt
    if (mode === 'cosmic') {
      pointsRef.current.rotation.y += delta * 0.03 * intensity;
    } else {
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, state.pointer.x * 0.1, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={mode === 'snowy' ? 0.18 : mode === 'sunny' ? 0.14 : 0.1}
        vertexColors
        transparent
        opacity={mode === 'stormy' ? 0.95 : 0.8}
        map={particleTexture || undefined}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
```

- [ ] **Step 2: Verify type checking**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/weather/WeatherParticles.tsx
git commit -m "feat: add WeatherParticles system supporting rain, snow, sun motes, and cosmic modes"
```

---

### Task 4: Create Reactive 3D Wireframe Sculptures (`WeatherSculptures.tsx`)

**Files:**
- Create: `src/components/weather/WeatherSculptures.tsx`

**Interfaces:**
- Consumes: `useWeather()`
- Produces: `<WeatherSculptures />` displaying interactive wireframe shapes (Octahedron, Torus, Sun Orb) with dynamic colors and material shifts based on active weather.

- [ ] **Step 1: Create `src/components/weather/WeatherSculptures.tsx`**

```tsx
'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWeather } from '@/context/WeatherContext';

export default function WeatherSculptures() {
  const { mode, lightningFlashTime } = useWeather();

  const outerGroupRef = useRef<THREE.Group>(null!);
  const octahedronRef = useRef<THREE.Mesh>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const sunOrbRef = useRef<THREE.Mesh>(null!);
  const octaMaterialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const torusMaterialRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state, delta) => {
    if (!outerGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Octahedron rotation & hover float
    if (octahedronRef.current) {
      const rotSpeed = mode === 'stormy' ? 0.8 : mode === 'sunny' ? 0.4 : 0.25;
      octahedronRef.current.rotation.y += delta * rotSpeed;
      octahedronRef.current.rotation.x += delta * (rotSpeed * 0.5);
      octahedronRef.current.position.y = Math.sin(time * 1.2) * 0.2;
    }

    // Torus counter-rotation
    if (torusRef.current) {
      torusRef.current.rotation.y -= delta * 0.2;
      torusRef.current.rotation.z += delta * 0.1;
      torusRef.current.position.y = Math.cos(time * 0.9) * 0.15 - 0.5;
    }

    // Sun Orb scale/float
    if (sunOrbRef.current) {
      const targetScale = mode === 'sunny' ? 1.8 : 0.8;
      sunOrbRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);
      sunOrbRef.current.position.x = mode === 'sunny' ? 2.2 : Math.sin(time * 1.5) * 1.8;
      sunOrbRef.current.position.y = mode === 'sunny' ? 1.5 : Math.sin(time * 2) * 0.4;
      sunOrbRef.current.position.z = mode === 'sunny' ? -1 : Math.cos(time * 1.5) * 1.8;
    }

    // Dynamic Material Color lerp based on weather
    let octaTargetColor = new THREE.Color('#10b981');
    let torusTargetColor = new THREE.Color('#00f0ff');

    if (mode === 'sunny') {
      octaTargetColor = new THREE.Color('#f59e0b');
      torusTargetColor = new THREE.Color('#fbbf24');
    } else if (mode === 'rainy') {
      octaTargetColor = new THREE.Color('#06b6d4');
      torusTargetColor = new THREE.Color('#3b82f6');
    } else if (mode === 'snowy') {
      octaTargetColor = new THREE.Color('#a5f3fc');
      torusTargetColor = new THREE.Color('#c084fc');
    } else if (mode === 'stormy') {
      octaTargetColor = new THREE.Color('#60a5fa');
      torusTargetColor = new THREE.Color('#e0f2fe');
    }

    // Instant flash on lightning
    if (Date.now() - lightningFlashTime < 150) {
      octaTargetColor = new THREE.Color('#ffffff');
      torusTargetColor = new THREE.Color('#38bdf8');
    }

    if (octaMaterialRef.current) {
      octaMaterialRef.current.color.lerp(octaTargetColor, 0.08);
    }
    if (torusMaterialRef.current) {
      torusMaterialRef.current.color.lerp(torusTargetColor, 0.08);
    }

    // Pointer parallax tilt
    const targetRotX = -state.pointer.y * 0.35;
    const targetRotY = state.pointer.x * 0.35;
    outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(outerGroupRef.current.rotation.x, targetRotX, 0.05);
    outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(outerGroupRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <group ref={outerGroupRef} position={[1.8, 0, -1]}>
      {/* Wireframe Octahedron */}
      <mesh ref={octahedronRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          ref={octaMaterialRef}
          color="#10b981"
          wireframe
          transparent
          opacity={0.75}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Interlocking Torus Ring */}
      <mesh ref={torusRef} position={[0, -0.2, 0]}>
        <torusGeometry args={[1.8, 0.03, 16, 100]} />
        <meshStandardMaterial
          ref={torusMaterialRef}
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Weather Sun / Glowing Orb */}
      <mesh ref={sunOrbRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={mode === 'sunny' ? '#f59e0b' : '#34d399'}
          emissive={mode === 'sunny' ? '#fbbf24' : '#10b981'}
          emissiveIntensity={mode === 'sunny' ? 2.5 : 1.2}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 2: Verify type checking**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/weather/WeatherSculptures.tsx
git commit -m "feat: add WeatherSculptures component with dynamic weather material reactions"
```

---

### Task 5: Create World-Space Click Weather Bursts (`WeatherBursts.tsx`)

**Files:**
- Create: `src/components/weather/WeatherBursts.tsx`

**Interfaces:**
- Consumes: `bursts` from `useWeather()`
- Produces: `<WeatherBursts />` rendering expanding 3D shockwaves, water splash droplets, or solar flares at canvas click locations.

- [ ] **Step 1: Create `src/components/weather/WeatherBursts.tsx`**

```tsx
'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWeather } from '@/context/WeatherContext';

function SingleBurst({ x, y, type, time }: { x: number; y: number; type: string; time: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    const age = (Date.now() - time) / 1000; // Age in seconds
    if (age > 1.2) return;

    if (meshRef.current) {
      const scale = 1 + age * 4;
      meshRef.current.scale.set(scale, scale, scale);
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - age / 1.2);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 4;
    }
  });

  const color =
    type === 'sunny'
      ? '#f59e0b'
      : type === 'rainy'
      ? '#38bdf8'
      : type === 'snowy'
      ? '#e0f2fe'
      : type === 'stormy'
      ? '#60a5fa'
      : '#c084fc';

  return (
    <group position={[x, y, 0]}>
      <mesh ref={meshRef}>
        <ringGeometry args={[0.1, 0.2, 32]} />
        <meshBasicMaterial color={color} transparent opacity={1} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.25, 0.28, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} wireframe />
      </mesh>
    </group>
  );
}

export default function WeatherBursts() {
  const { bursts } = useWeather();

  return (
    <>
      {bursts.map((burst) => (
        <SingleBurst key={burst.id} x={burst.x} y={burst.y} type={burst.type} time={burst.time} />
      ))}
    </>
  );
}
```

- [ ] **Step 2: Verify type checking**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/weather/WeatherBursts.tsx
git commit -m "feat: add WeatherBursts component for click-spawned 3D shockwaves"
```

---

### Task 6: Integrate Components into `HeroScene.tsx` & `HeroCanvas.tsx`

**Files:**
- Modify: `src/components/HeroScene.tsx`
- Modify: `src/components/HeroCanvas.tsx`

**Interfaces:**
- Consumes: `WeatherLighting`, `WeatherParticles`, `WeatherSculptures`, `WeatherBursts`, `useWeather()`
- Produces: Updated R3F Hero canvas capturing pointer click events and delegating to weather subsystems.

- [ ] **Step 1: Update `src/components/HeroScene.tsx`**

```tsx
'use client';

import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import WeatherLighting from './weather/WeatherLighting';
import WeatherParticles from './weather/WeatherParticles';
import WeatherSculptures from './weather/WeatherSculptures';
import WeatherBursts from './weather/WeatherBursts';
import { useWeather } from '@/context/WeatherContext';

function CameraRig() {
  const { mode } = useWeather();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 0.6) * 0.1;
    const floatX = Math.cos(time * 0.5) * 0.08;

    const mouseX = state.pointer.x * (mode === 'stormy' ? 0.6 : 0.4);
    const mouseY = state.pointer.y * 0.25;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, floatX + mouseX, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, floatY + mouseY + 0.2, 0.03);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  const { addBurst, triggerLightning, mode } = useWeather();
  const { viewport } = useThree();

  const handlePointerDown = (e: { pointer: { x: number; y: number } }) => {
    // Map normalized pointer coordinates (-1 to 1) to world space
    const worldX = (e.pointer.x * viewport.width) / 2;
    const worldY = (e.pointer.y * viewport.height) / 2;
    addBurst(worldX, worldY);

    if (mode === 'stormy') {
      triggerLightning();
    }
  };

  return (
    <group onPointerDown={handlePointerDown}>
      <CameraRig />
      <WeatherLighting />
      <WeatherParticles />
      <WeatherSculptures />
      <WeatherBursts />
    </group>
  );
}
```

- [ ] **Step 2: Update `src/components/HeroCanvas.tsx`**

Make sure `pointer-events-auto` allows pointer clicks to reach `HeroScene`.

```tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export function HeroGradientFallback() {
  return (
    <div
      className="absolute inset-0 -z-10 bg-[#050507] transition-opacity duration-1000"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(0,240,255,0.08),rgba(255,255,255,0))]" />
    </div>
  );
}

export default function HeroCanvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <HeroGradientFallback />;
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-auto cursor-pointer">
      <HeroGradientFallback />
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0.2, 5.5], fov: 48 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          eventSource={typeof document !== 'undefined' ? (document.body as HTMLElement) : undefined}
          eventPrefix="client"
          className="h-full w-full"
        >
          <HeroScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 3: Verify type checking**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroScene.tsx src/components/HeroCanvas.tsx
git commit -m "feat: integrate weather components and click listeners into HeroScene and HeroCanvas"
```

---

### Task 7: Build Glassmorphic Weather Control Panel UI (`WeatherControlPanel.tsx`)

**Files:**
- Create: `src/components/WeatherControlPanel.tsx`

**Interfaces:**
- Consumes: `useWeather()`
- Produces: Floating interactive weather control widget with Framer Motion animations, tab switcher, intensity slider, and action trigger.

- [ ] **Step 1: Create `src/components/WeatherControlPanel.tsx`**

```tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  CloudRain,
  Snowflake,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Wind,
  Activity,
} from 'lucide-react';
import { useWeather, WeatherMode } from '@/context/WeatherContext';

const WEATHER_MODES: { id: WeatherMode; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'sunny', label: 'Sunny', icon: Sun, color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
  { id: 'rainy', label: 'Rainy', icon: CloudRain, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
  { id: 'snowy', label: 'Snowy', icon: Snowflake, color: 'text-sky-300 border-sky-400/40 bg-sky-400/10' },
  { id: 'stormy', label: 'Stormy', icon: Zap, color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
  { id: 'cosmic', label: 'Cosmic', icon: Sparkles, color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
];

export default function WeatherControlPanel() {
  const { mode, intensity, setMode, setIntensity, triggerLightning } = useWeather();
  const [isExpanded, setIsExpanded] = useState(false);

  const activeModeConfig = WEATHER_MODES.find((m) => m.id === mode) || WEATHER_MODES[1];
  const ActiveIcon = activeModeConfig.icon;

  return (
    <div className="absolute top-20 right-6 md:top-24 md:right-10 z-30 font-sans">
      <motion.div
        layout
        className="backdrop-blur-xl bg-zinc-950/80 border border-white/15 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden transition-colors"
      >
        {/* Collapsed Header / Pill Toggle */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg border ${activeModeConfig.color} animate-pulse`}>
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono tracking-wider uppercase text-zinc-300 font-semibold">
                {activeModeConfig.label} Mode
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                Wind {intensity.toFixed(1)}x • Tap Canvas
              </span>
            </div>
          </div>

          <button
            aria-label="Toggle Weather Controls"
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Controls Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="px-4 pb-4 pt-2 border-t border-white/10 flex flex-col gap-4"
            >
              {/* Weather Mode Tabs */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2 block">
                  Select Atmosphere
                </label>
                <div className="grid grid-cols-5 gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-white/5">
                  {WEATHER_MODES.map((item) => {
                    const Icon = item.icon;
                    const isActive = mode === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setMode(item.id)}
                        className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs transition-all duration-200 ${
                          isActive
                            ? 'text-white font-medium shadow-md'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTabBackground"
                            className="absolute inset-0 bg-white/15 border border-white/20 rounded-lg"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <Icon className={`w-4 h-4 relative z-10 ${isActive ? activeModeConfig.color.split(' ')[0] : ''}`} />
                        <span className="text-[9px] font-mono mt-1 relative z-10">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Intensity / Wind Speed Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3 text-emerald-400" /> Particle Turbulence
                  </span>
                  <span className="text-zinc-200">{intensity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={intensity}
                  onChange={(e) => setIntensity(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  triggerLightning();
                }}
                className="w-full py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-xs font-mono font-medium text-zinc-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>
                  {mode === 'stormy'
                    ? '⚡ Trigger Lightning Strike'
                    : mode === 'rainy'
                    ? '🌧️ Rain Downburst'
                    : mode === 'sunny'
                    ? '☀️ Solar Flare Wave'
                    : mode === 'snowy'
                    ? '❄️ Flurry Burst'
                    : '🌌 Energy Pulse'}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Verify type checking**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/WeatherControlPanel.tsx
git commit -m "feat: add WeatherControlPanel glassmorphism floating widget"
```

---

### Task 8: Update `MinimalHero.tsx` & Run Build Verification

**Files:**
- Modify: `src/components/MinimalHero.tsx`

**Interfaces:**
- Consumes: `WeatherProvider`, `WeatherControlPanel`, `HeroCanvas`
- Produces: Completed Hero section featuring dynamic weather background & interactive control panel.

- [ ] **Step 1: Update `src/components/MinimalHero.tsx`**

```tsx
'use client';

import React from 'react';
import HeroCanvas from './HeroCanvas';
import WeatherControlPanel from './WeatherControlPanel';
import { WeatherProvider } from '@/context/WeatherContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function MinimalHero() {
  return (
    <WeatherProvider>
      <section id="top" className="relative min-h-[100dvh] w-full flex flex-col justify-center px-6 overflow-hidden">
        {/* Floating Weather Control Panel UI */}
        <WeatherControlPanel />

        {/* 3D Canvas Background Layer */}
        <HeroCanvas />

        <div className="max-w-4xl mx-auto w-full relative z-10 pt-20 md:pt-24 pb-12 flex flex-col justify-center pointer-events-none">
          {/* Eyebrow Micro-Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400 mb-8 w-fit pointer-events-auto">
            <Sparkles className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
            <span>Creative Technologist &amp; Architect</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.96] uppercase text-white max-w-4xl mb-8 pointer-events-none">
            Purposeful Code. <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-emerald-300 to-cyan-400 leading-[1.1] inline-block pb-1">
              Fluid Interfaces.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-zinc-300 font-normal max-w-xl leading-relaxed mb-10 pointer-events-none">
            Crafting high-performance WebGL experiences, clean React architectures, and interactive digital products with obsession for detail.
          </p>

          {/* Button CTAs */}
          <div className="flex flex-wrap items-center gap-4 font-sans text-xs pointer-events-auto">
            <a
              href="#works"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-3 rounded-full font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.3)] transform active:scale-[0.98]"
            >
              <span>Explore Selected Work</span>
              <div className="w-7 h-7 rounded-full bg-zinc-950/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-950" strokeWidth={2} />
              </div>
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-3 rounded-full font-semibold text-zinc-200 bg-white/[0.04] border border-white/15 hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 transform active:scale-[0.98]"
            >
              <span>Get in Touch</span>
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-200" strokeWidth={1.5} />
              </div>
            </a>
          </div>
        </div>
      </section>
    </WeatherProvider>
  );
}
```

- [ ] **Step 2: Run Full Production Build Verification**

Run: `npm run build`
Expected: Successful build with zero TypeScript or Lint errors.

- [ ] **Step 3: Final Commit**

```bash
git add src/components/MinimalHero.tsx
git commit -m "feat: wrap MinimalHero in WeatherProvider and add WeatherControlPanel widget"
```
