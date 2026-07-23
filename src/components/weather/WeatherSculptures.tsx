'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWeather, WeatherMode } from '@/context/WeatherContext';

// White flash color for lightning strikes
const WHITE = new THREE.Color('#ffffff');

// Color Palettes per weather mode
const PALETTES: Record<
  WeatherMode,
  {
    primary: THREE.Color;
    secondary: THREE.Color;
    orbColor: THREE.Color;
    orbEmissive: THREE.Color;
  }
> = {
  sunny: {
    primary: new THREE.Color('#f59e0b'),
    secondary: new THREE.Color('#fbbf24'),
    orbColor: new THREE.Color('#fef08a'),
    orbEmissive: new THREE.Color('#f59e0b'),
  },
  rainy: {
    primary: new THREE.Color('#06b6d4'),
    secondary: new THREE.Color('#3b82f6'),
    orbColor: new THREE.Color('#38bdf8'),
    orbEmissive: new THREE.Color('#0284c7'),
  },
  snowy: {
    primary: new THREE.Color('#a5f3fc'),
    secondary: new THREE.Color('#c084fc'),
    orbColor: new THREE.Color('#e0f2fe'),
    orbEmissive: new THREE.Color('#a5f3fc'),
  },
  stormy: {
    primary: new THREE.Color('#60a5fa'),
    secondary: new THREE.Color('#e0f2fe'),
    orbColor: new THREE.Color('#93c5fd'),
    orbEmissive: new THREE.Color('#3b82f6'),
  },
  cosmic: {
    primary: new THREE.Color('#c084fc'),
    secondary: new THREE.Color('#a855f7'),
    orbColor: new THREE.Color('#f0abfc'),
    orbEmissive: new THREE.Color('#c084fc'),
  },
};

/**
 * WeatherSculptures renders interactive wireframe meshes (Octahedron, Torus ring, Sun Orb)
 * with dynamic material color lerping, sun scaling in sunny mode, lightning flashing,
 * and mouse parallax rotation.
 */
export const WeatherSculptures: React.FC = () => {
  const { mode, lightningFlashTime } = useWeather();

  const outerGroupRef = useRef<THREE.Group>(null!);
  const octahedronRef = useRef<THREE.Mesh>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const sunOrbRef = useRef<THREE.Mesh>(null!);

  const octahedronMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const torusMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const orbMatRef = useRef<THREE.MeshStandardMaterial>(null!);

  const targetScaleRef = useRef<THREE.Vector3>(new THREE.Vector3(1, 1, 1));
  const targetOrbPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!outerGroupRef.current) return;

    const time = state.clock.getElapsedTime();

    // 1. Octahedron rotation & hover float
    if (octahedronRef.current) {
      octahedronRef.current.rotation.y += delta * 0.35;
      octahedronRef.current.rotation.x += delta * 0.18;
      octahedronRef.current.position.y = Math.sin(time * 1.2) * 0.2;
    }

    // 2. Torus ring rotation & hover float
    if (torusRef.current) {
      torusRef.current.rotation.y -= delta * 0.22;
      torusRef.current.rotation.z += delta * 0.12;
      torusRef.current.position.y = Math.cos(time * 0.9) * 0.15 - 0.2;
    }

    // 3. Sun Orb positioning & scaling
    if (sunOrbRef.current) {
      if (mode === 'sunny') {
        // Expand sun orb and shift position to prominent float
        targetScaleRef.current.set(1.8, 1.8, 1.8);
        targetOrbPosRef.current.set(
          Math.sin(time * 0.8) * 0.3,
          1.2 + Math.sin(time * 1.5) * 0.25,
          Math.cos(time * 0.8) * 0.3
        );
      } else {
        // Standard orbiting orb position & scale
        targetScaleRef.current.set(1.0, 1.0, 1.0);
        targetOrbPosRef.current.set(
          Math.sin(time * 1.5) * 2.0,
          Math.sin(time * 2.0) * 0.4,
          Math.cos(time * 1.5) * 2.0
        );
      }

      sunOrbRef.current.scale.lerp(targetScaleRef.current, Math.min(1, delta * 3.0));
      sunOrbRef.current.position.lerp(targetOrbPosRef.current, Math.min(1, delta * 3.0));
      sunOrbRef.current.rotation.y += delta * 0.5;
    }

    // 4. Parallax tilt on outer group
    const targetRotX = -state.pointer.y * 0.35;
    const targetRotY = state.pointer.x * 0.35;
    outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(outerGroupRef.current.rotation.x, targetRotX, 0.05);
    outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(outerGroupRef.current.rotation.y, targetRotY, 0.05);

    // 5. Dynamic color lerping & lightning flash effect
    const isLightning = Date.now() - lightningFlashTime < 150;
    const palette = PALETTES[mode] || PALETTES.sunny;

    const targetPrimary = isLightning ? WHITE : palette.primary;
    const targetSecondary = isLightning ? WHITE : palette.secondary;
    const targetOrbColor = isLightning ? WHITE : palette.orbColor;
    const targetOrbEmissive = isLightning ? WHITE : palette.orbEmissive;

    const lerpSpeed = isLightning ? 0.85 : Math.min(1, delta * 3.5);

    if (octahedronMatRef.current) {
      octahedronMatRef.current.color.lerp(targetPrimary, lerpSpeed);
    }
    if (torusMatRef.current) {
      torusMatRef.current.color.lerp(targetSecondary, lerpSpeed);
    }
    if (orbMatRef.current) {
      orbMatRef.current.color.lerp(targetOrbColor, lerpSpeed);
      orbMatRef.current.emissive.lerp(targetOrbEmissive, lerpSpeed);
      orbMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        orbMatRef.current.emissiveIntensity,
        mode === 'sunny' ? 1.8 : 1.2,
        lerpSpeed
      );
    }
  });

  return (
    <group ref={outerGroupRef} position={[1.8, 0, -1]}>
      {/* Central Wireframe Octahedron */}
      <mesh ref={octahedronRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          ref={octahedronMatRef}
          wireframe
          transparent
          opacity={0.75}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Interlocking Outer Torus Ring */}
      <mesh ref={torusRef} position={[0, -0.2, 0]}>
        <torusGeometry args={[1.9, 0.04, 16, 100]} />
        <meshStandardMaterial
          ref={torusMatRef}
          wireframe
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Dynamic Sun Orb / Orbiting Sphere */}
      <mesh ref={sunOrbRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          ref={orbMatRef}
          roughness={0.1}
          metalness={0.2}
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
};

export default WeatherSculptures;
