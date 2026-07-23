'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWeather, WeatherMode } from '@/context/WeatherContext';

const MODE_PALETTES: Record<WeatherMode, THREE.Color[]> = {
  sunny: [
    new THREE.Color('#fef08a'),
    new THREE.Color('#f59e0b'),
    new THREE.Color('#fbbf24'),
    new THREE.Color('#fff7ed'),
  ],
  rainy: [
    new THREE.Color('#38bdf8'),
    new THREE.Color('#0284c7'),
    new THREE.Color('#7dd3fc'),
    new THREE.Color('#bae6fd'),
  ],
  snowy: [
    new THREE.Color('#ffffff'),
    new THREE.Color('#f8fafc'),
    new THREE.Color('#e0f2fe'),
    new THREE.Color('#bae6fd'),
  ],
  stormy: [
    new THREE.Color('#38bdf8'),
    new THREE.Color('#818cf8'),
    new THREE.Color('#94a3b8'),
    new THREE.Color('#e0f2fe'),
  ],
  cosmic: [
    new THREE.Color('#a855f7'),
    new THREE.Color('#06b6d4'),
    new THREE.Color('#ec4899'),
    new THREE.Color('#38bdf8'),
    new THREE.Color('#facc15'),
  ],
};

export const WeatherParticles: React.FC = () => {
  const { mode, intensity } = useWeather();
  const { viewport } = useThree();

  const pointsRef = useRef<THREE.Points>(null!);
  const geomRef = useRef<THREE.BufferGeometry>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);

  const isMobile = viewport.width < 7;
  const count = isMobile ? 1200 : 2800;

  // Initialize buffers & random attributes per particle
  const { positions, colors, targetColors, speedFactors, randomPhases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const targetCol = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    const initialPalette = MODE_PALETTES[mode] || MODE_PALETTES.sunny;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 36;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 26;

      speeds[i] = 0.6 + Math.random() * 0.8;
      phases[i] = Math.random() * Math.PI * 2;

      const baseColor = initialPalette[Math.floor(Math.random() * initialPalette.length)];
      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;

      targetCol[i * 3] = baseColor.r;
      targetCol[i * 3 + 1] = baseColor.g;
      targetCol[i * 3 + 2] = baseColor.b;
    }

    return {
      positions: pos,
      colors: col,
      targetColors: targetCol,
      speedFactors: speeds,
      randomPhases: phases,
    };
  }, [count]);

  // Update target colors when mode changes
  useEffect(() => {
    const palette = MODE_PALETTES[mode] || MODE_PALETTES.sunny;
    for (let i = 0; i < count; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)];
      targetColors[i * 3] = color.r;
      targetColors[i * 3 + 1] = color.g;
      targetColors[i * 3 + 2] = color.b;
    }
  }, [mode, count, targetColors]);

  // Create soft radial particle texture
  const particleTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!geomRef.current) return;

    const time = state.clock.getElapsedTime();
    const clampedDelta = Math.min(delta, 0.1);
    const safeIntensity = Math.max(0.5, Math.min(2.5, intensity));

    const posAttr = geomRef.current.attributes.position as THREE.BufferAttribute;
    const colAttr = geomRef.current.attributes.color as THREE.BufferAttribute;

    if (!posAttr || !colAttr) return;

    const posArray = posAttr.array as Float32Array;
    const colArray = colAttr.array as Float32Array;

    // Smoothly lerp colors to target mode palette
    const colorLerp = Math.min(1, clampedDelta * 4.5);
    for (let i = 0; i < count * 3; i++) {
      colArray[i] += (targetColors[i] - colArray[i]) * colorLerp;
    }
    colAttr.needsUpdate = true;

    // Physics per weather mode
    if (mode === 'stormy' || mode === 'rainy') {
      const isStorm = mode === 'stormy';
      const baseSpeed = (isStorm ? 22.0 : 14.0) * safeIntensity;
      const windSpeed = (isStorm ? 3.5 : 0.8) * safeIntensity;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const spf = speedFactors[i];

        // Downward vertical rain with wind drift
        posArray[idx + 1] -= baseSpeed * spf * clampedDelta;
        posArray[idx] += windSpeed * spf * clampedDelta;
        posArray[idx + 2] += Math.sin(time * 3 + randomPhases[i]) * 0.1 * clampedDelta;

        // Wrap rain droplets from bottom back to top
        if (posArray[idx + 1] < -13) {
          posArray[idx + 1] = 14 + Math.random() * 4;
          posArray[idx] = (Math.random() - 0.5) * 36 - windSpeed * 0.5;
          posArray[idx + 2] = (Math.random() - 0.5) * 26;
        }
      }

      if (pointsRef.current) {
        pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, 0, 0.05);
        pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, 0, 0.05);
      }
    } else if (mode === 'snowy') {
      const fallSpeed = 2.0 * safeIntensity;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const spf = speedFactors[i];
        const phase = randomPhases[i];

        // Gentle falling snowflake
        posArray[idx + 1] -= fallSpeed * spf * clampedDelta;

        // Sine/cosine turbulence sway
        const swayX = Math.sin(time * 1.5 + phase) * 0.4;
        const swayZ = Math.cos(time * 1.2 + phase) * 0.3;

        posArray[idx] += swayX * clampedDelta;
        posArray[idx + 2] += swayZ * clampedDelta;

        // Wrap snowflakes at bottom back to top
        if (posArray[idx + 1] < -13) {
          posArray[idx + 1] = 13 + Math.random() * 3;
          posArray[idx] = (Math.random() - 0.5) * 36;
          posArray[idx + 2] = (Math.random() - 0.5) * 26;
        }
      }

      if (pointsRef.current) {
        pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, 0, 0.05);
        pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, 0, 0.05);
      }
    } else if (mode === 'sunny') {
      const floatSpeed = 0.85 * safeIntensity;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const spf = speedFactors[i];
        const phase = randomPhases[i];

        // Upward floating warm sun motes
        posArray[idx + 1] += floatSpeed * spf * clampedDelta;

        const swayX = Math.sin(time * 0.8 + phase) * 0.25;
        const swayZ = Math.cos(time * 0.7 + phase) * 0.2;

        posArray[idx] += swayX * clampedDelta;
        posArray[idx + 2] += swayZ * clampedDelta;

        // Wrap sun motes at top back to bottom
        if (posArray[idx + 1] > 14) {
          posArray[idx + 1] = -13 - Math.random() * 3;
          posArray[idx] = (Math.random() - 0.5) * 36;
          posArray[idx + 2] = (Math.random() - 0.5) * 26;
        }
      }

      if (pointsRef.current) {
        pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, 0, 0.05);
        pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, 0, 0.05);
      }
    } else if (mode === 'cosmic') {
      // Rotating starfield around Y axis
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const phase = randomPhases[i];

        // Subtle position wobble
        posArray[idx + 1] += Math.sin(time * 1.0 + phase) * 0.06 * clampedDelta;
      }

      if (pointsRef.current) {
        pointsRef.current.rotation.y += clampedDelta * 0.15 * safeIntensity;
        pointsRef.current.rotation.x += clampedDelta * 0.04 * safeIntensity;
      }
    }

    posAttr.needsUpdate = true;

    // Smoothly adjust particle size based on mode and intensity
    if (materialRef.current) {
      const targetSize =
        mode === 'snowy'
          ? 0.14
          : mode === 'sunny'
          ? 0.15
          : mode === 'cosmic'
          ? 0.11
          : mode === 'stormy'
          ? 0.09
          : 0.08;
      materialRef.current.size = THREE.MathUtils.lerp(
        materialRef.current.size,
        targetSize * Math.min(1.4, Math.max(0.7, safeIntensity)),
        clampedDelta * 3
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        map={particleTexture || undefined}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

export default WeatherParticles;
