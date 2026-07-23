'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWeather, WeatherMode, ParticleBurst } from '@/context/WeatherContext';

const BURST_COLORS: Record<WeatherMode, string> = {
  sunny: '#f59e0b',
  rainy: '#38bdf8',
  snowy: '#e0f2fe',
  stormy: '#60a5fa',
  cosmic: '#c084fc',
};

const MAX_AGE_SECONDS = 1.2;

interface BurstRingProps {
  burst: ParticleBurst;
}

const BurstRing: React.FC<BurstRingProps> = ({ burst }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerMeshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!);
  const innerMaterialRef = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    const age = (Date.now() - burst.time) / 1000;
    if (age >= MAX_AGE_SECONDS) {
      meshRef.current.visible = false;
      if (innerMeshRef.current) innerMeshRef.current.visible = false;
      return;
    }

    const progress = Math.min(1, Math.max(0, age / MAX_AGE_SECONDS));
    const easeOut = 1 - Math.pow(1 - progress, 3);

    // Outer shockwave expansion
    const scale = 0.2 + easeOut * 3.5;
    meshRef.current.scale.set(scale, scale, scale);

    // Inner shockwave expansion
    if (innerMeshRef.current) {
      const innerScale = 0.1 + easeOut * 2.2;
      innerMeshRef.current.scale.set(innerScale, innerScale, innerScale);
    }

    // Smooth opacity fade out
    const opacity = Math.max(0, (1 - progress) * 0.85);
    materialRef.current.opacity = opacity;

    if (innerMaterialRef.current) {
      innerMaterialRef.current.opacity = opacity * 0.6;
    }
  });

  const colorStr = BURST_COLORS[burst.type] || BURST_COLORS.sunny;

  return (
    <group position={[burst.x, burst.y, 0]}>
      {/* Primary Expanding Shockwave Ring */}
      <mesh ref={meshRef}>
        <ringGeometry args={[0.2, 0.28, 32]} />
        <meshBasicMaterial
          ref={materialRef}
          color={colorStr}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary Inner Ripple Ring */}
      <mesh ref={innerMeshRef}>
        <ringGeometry args={[0.08, 0.14, 32]} />
        <meshBasicMaterial
          ref={innerMaterialRef}
          color={colorStr}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export const WeatherBursts: React.FC = () => {
  const { bursts } = useWeather();

  return (
    <group>
      {bursts.map((burst) => (
        <BurstRing key={burst.id} burst={burst} />
      ))}
    </group>
  );
};

export default WeatherBursts;
