'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWeather, WeatherMode } from '@/context/WeatherContext';

const LIGHTING_CONFIG: Record<
  WeatherMode,
  {
    bg: THREE.Color;
    fog: THREE.Color;
    ambientColor: THREE.Color;
    ambientIntensity: number;
    dirColor: THREE.Color;
    dirIntensity: number;
    fogNear: number;
    fogFar: number;
  }
> = {
  sunny: {
    bg: new THREE.Color('#1c1917'),
    fog: new THREE.Color('#291e0a'),
    ambientColor: new THREE.Color('#fef08a'),
    ambientIntensity: 0.9,
    dirColor: new THREE.Color('#f59e0b'),
    dirIntensity: 2.2,
    fogNear: 15,
    fogFar: 70,
  },
  rainy: {
    bg: new THREE.Color('#030712'),
    fog: new THREE.Color('#030712'),
    ambientColor: new THREE.Color('#38bdf8'),
    ambientIntensity: 0.4,
    dirColor: new THREE.Color('#0284c7'),
    dirIntensity: 0.9,
    fogNear: 8,
    fogFar: 40,
  },
  snowy: {
    bg: new THREE.Color('#0c1427'),
    fog: new THREE.Color('#0c1427'),
    ambientColor: new THREE.Color('#e0f2fe'),
    ambientIntensity: 0.7,
    dirColor: new THREE.Color('#93c5fd'),
    dirIntensity: 1.4,
    fogNear: 10,
    fogFar: 50,
  },
  stormy: {
    bg: new THREE.Color('#020617'),
    fog: new THREE.Color('#020617'),
    ambientColor: new THREE.Color('#1e293b'),
    ambientIntensity: 0.25,
    dirColor: new THREE.Color('#475569'),
    dirIntensity: 0.5,
    fogNear: 5,
    fogFar: 30,
  },
  cosmic: {
    bg: new THREE.Color('#030712'),
    fog: new THREE.Color('#030712'),
    ambientColor: new THREE.Color('#1e1b4b'),
    ambientIntensity: 0.35,
    dirColor: new THREE.Color('#a855f7'),
    dirIntensity: 0.8,
    fogNear: 12,
    fogFar: 60,
  },
};

export const WeatherLighting: React.FC = () => {
  const { mode, intensity, lightningFlashTime } = useWeather();

  const bgRef = useRef<THREE.Color>(null!);
  const fogRef = useRef<THREE.Fog>(null!);
  const ambientRef = useRef<THREE.AmbientLight>(null!);
  const dirRef = useRef<THREE.DirectionalLight>(null!);
  const lightningRef = useRef<THREE.PointLight>(null!);
  const cyanPointRef = useRef<THREE.PointLight>(null!);
  const emeraldPointRef = useRef<THREE.PointLight>(null!);

  const lightningIntensity = useRef(0);
  const prevFlashTimeRef = useRef(lightningFlashTime);

  // Trigger lightning when lightningFlashTime changes
  useEffect(() => {
    if (lightningFlashTime > 0 && lightningFlashTime !== prevFlashTimeRef.current) {
      prevFlashTimeRef.current = lightningFlashTime;
      lightningIntensity.current = 18 * Math.max(0.8, intensity);
      if (lightningRef.current) {
        lightningRef.current.position.set(
          (Math.random() - 0.5) * 16,
          6 + Math.random() * 6,
          -2 + (Math.random() - 0.5) * 6
        );
      }
    }
  }, [lightningFlashTime, intensity]);

  useFrame((_, delta) => {
    const config = LIGHTING_CONFIG[mode] || LIGHTING_CONFIG.sunny;
    const lerpSpeed = Math.min(1, delta * 3.5);

    // Lerp background color
    if (bgRef.current) {
      bgRef.current.lerp(config.bg, lerpSpeed);
    }

    // Lerp fog
    if (fogRef.current) {
      fogRef.current.color.lerp(config.fog, lerpSpeed);
      const targetNear = config.fogNear / (mode === 'stormy' || mode === 'rainy' ? Math.max(0.7, intensity) : 1);
      const targetFar = config.fogFar / (mode === 'stormy' || mode === 'rainy' ? Math.max(0.7, intensity) : 1);
      fogRef.current.near = THREE.MathUtils.lerp(fogRef.current.near, targetNear, lerpSpeed);
      fogRef.current.far = THREE.MathUtils.lerp(fogRef.current.far, targetFar, lerpSpeed);
    }

    // Lerp ambient light
    if (ambientRef.current) {
      ambientRef.current.color.lerp(config.ambientColor, lerpSpeed);
      const targetAmbient = config.ambientIntensity + (lightningIntensity.current > 2 ? 0.4 : 0);
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity,
        targetAmbient,
        lerpSpeed
      );
    }

    // Lerp directional light
    if (dirRef.current) {
      dirRef.current.color.lerp(config.dirColor, lerpSpeed);
      const targetDirIntensity = config.dirIntensity * (mode === 'sunny' ? Math.min(1.5, intensity) : 1);
      dirRef.current.intensity = THREE.MathUtils.lerp(
        dirRef.current.intensity,
        targetDirIntensity,
        lerpSpeed
      );
    }

    // Random lightning flash in stormy mode
    if (mode === 'stormy' && Math.random() < 0.007 * intensity) {
      lightningIntensity.current = (10 + Math.random() * 8) * intensity;
      if (lightningRef.current) {
        lightningRef.current.position.set(
          (Math.random() - 0.5) * 20,
          8 + Math.random() * 4,
          -4 + (Math.random() - 0.5) * 8
        );
      }
    }

    // Lightning decay
    if (lightningIntensity.current > 0.01) {
      lightningIntensity.current *= 0.86;
      if (lightningIntensity.current < 0.01) lightningIntensity.current = 0;
    }

    if (lightningRef.current) {
      lightningRef.current.intensity = lightningIntensity.current;
    }

    // Cosmic point lights lerp
    const targetCosmicIntensity = mode === 'cosmic' ? 4.0 * Math.max(0.8, intensity) : 0;
    if (cyanPointRef.current) {
      cyanPointRef.current.intensity = THREE.MathUtils.lerp(
        cyanPointRef.current.intensity,
        targetCosmicIntensity,
        lerpSpeed
      );
    }
    if (emeraldPointRef.current) {
      emeraldPointRef.current.intensity = THREE.MathUtils.lerp(
        emeraldPointRef.current.intensity,
        targetCosmicIntensity,
        lerpSpeed
      );
    }
  });

  return (
    <>
      <color attach="background" ref={bgRef} args={['#1c1917']} />
      <fog attach="fog" ref={fogRef} args={['#291e0a', 15, 70]} />

      <ambientLight ref={ambientRef} intensity={0.9} color="#fef08a" />
      <directionalLight
        ref={dirRef}
        position={[5, 10, 5]}
        intensity={2.2}
        color="#f59e0b"
        castShadow={false}
      />

      {/* Lightning Point Light */}
      <pointLight
        ref={lightningRef}
        color="#e0f2fe"
        distance={25}
        decay={2}
        intensity={0}
        position={[0, 8, -2]}
      />

      {/* Cosmic Accent Lights */}
      <pointLight
        ref={cyanPointRef}
        color="#06b6d4"
        distance={25}
        decay={2}
        intensity={0}
        position={[-6, 3, -3]}
      />
      <pointLight
        ref={emeraldPointRef}
        color="#10b981"
        distance={25}
        decay={2}
        intensity={0}
        position={[6, -3, -3]}
      />
    </>
  );
};

export default WeatherLighting;
