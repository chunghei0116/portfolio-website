'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWeather, WeatherMode } from '@/context/WeatherContext';

// Color Palettes for the Celestial Sun/Core Orb per weather mode
const ORB_PALETTES: Record<
  WeatherMode,
  {
    color: THREE.Color;
    emissive: THREE.Color;
    scale: number;
    pos: [number, number, number];
    visible: boolean;
  }
> = {
  sunny: {
    color: new THREE.Color('#fef08a'),
    emissive: new THREE.Color('#f59e0b'),
    scale: 2.2,
    pos: [2.5, 1.8, -2],
    visible: true,
  },
  rainy: {
    color: new THREE.Color('#38bdf8'),
    emissive: new THREE.Color('#0284c7'),
    scale: 0.8,
    pos: [2.5, 2.0, -3],
    visible: false,
  },
  snowy: {
    color: new THREE.Color('#e0f2fe'),
    emissive: new THREE.Color('#a5f3fc'),
    scale: 1.0,
    pos: [2.5, 2.0, -3],
    visible: false,
  },
  stormy: {
    color: new THREE.Color('#93c5fd'),
    emissive: new THREE.Color('#3b82f6'),
    scale: 0.8,
    pos: [2.5, 2.0, -3],
    visible: false,
  },
  cosmic: {
    color: new THREE.Color('#f0abfc'),
    emissive: new THREE.Color('#c084fc'),
    scale: 1.2,
    pos: [1.8, 0, -2],
    visible: true,
  },
};

/**
 * WeatherSculptures now renders pure natural atmospheric weather elements:
 * - A glowing 3D Sun in Sunny mode.
 * - Celestial glow core in Cosmic mode.
 * - Removed artificial wireframe shapes (Octahedron & Torus) for a clean pure-weather aesthetic.
 */
export const WeatherSculptures: React.FC = () => {
  const { mode, lightningFlashTime } = useWeather();
  const sunOrbRef = useRef<THREE.Mesh>(null!);
  const orbMatRef = useRef<THREE.MeshStandardMaterial>(null!);

  const targetScaleRef = useRef<THREE.Vector3>(new THREE.Vector3(1, 1, 1));
  const targetOrbPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!sunOrbRef.current) return;
    const time = state.clock.getElapsedTime();
    const config = ORB_PALETTES[mode] || ORB_PALETTES.sunny;

    // Position & Scale animation
    if (config.visible) {
      targetScaleRef.current.set(config.scale, config.scale, config.scale);
      targetOrbPosRef.current.set(
        config.pos[0] + Math.sin(time * 0.8) * 0.2,
        config.pos[1] + Math.sin(time * 1.5) * 0.15,
        config.pos[2]
      );
    } else {
      targetScaleRef.current.set(0.001, 0.001, 0.001);
    }

    sunOrbRef.current.scale.lerp(targetScaleRef.current, Math.min(1, delta * 3.0));
    sunOrbRef.current.position.lerp(targetOrbPosRef.current, Math.min(1, delta * 3.0));
    sunOrbRef.current.rotation.y += delta * 0.4;

    // Color & Emissive updating
    const isLightning = Date.now() - lightningFlashTime < 150;
    const lerpSpeed = isLightning ? 0.85 : Math.min(1, delta * 3.5);

    if (orbMatRef.current) {
      orbMatRef.current.color.lerp(isLightning ? new THREE.Color('#ffffff') : config.color, lerpSpeed);
      orbMatRef.current.emissive.lerp(isLightning ? new THREE.Color('#ffffff') : config.emissive, lerpSpeed);
      orbMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        orbMatRef.current.emissiveIntensity,
        mode === 'sunny' ? 2.2 : 1.2,
        lerpSpeed
      );
    }
  });

  return (
    <mesh ref={sunOrbRef}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        ref={orbMatRef}
        roughness={0.1}
        metalness={0.1}
        emissiveIntensity={1.5}
      />
    </mesh>
  );
};

export default WeatherSculptures;
