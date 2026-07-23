'use client';

import React from 'react';
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useWeather } from '@/context/WeatherContext';
import WeatherLighting from '@/components/weather/WeatherLighting';
import WeatherParticles from '@/components/weather/WeatherParticles';
import WeatherSculptures from '@/components/weather/WeatherSculptures';
import WeatherBursts from '@/components/weather/WeatherBursts';

/**
 * CameraRig handles subtle camera floating motion and pointer parallax tilting.
 */
function CameraRig() {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 0.6) * 0.1;
    const floatX = Math.cos(time * 0.5) * 0.08;

    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.25;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, floatX + mouseX, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, floatY + mouseY + 0.2, 0.03);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * HeroSceneContent renders all weather components inside R3F canvas context
 * and handles click events to trigger particle shockwave bursts and lightning flashes.
 */
function HeroSceneContent() {
  const { viewport } = useThree();
  const { mode, addBurst, triggerLightning } = useWeather();

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const worldX = (e.pointer.x * viewport.width) / 2;
    const worldY = (e.pointer.y * viewport.height) / 2;

    addBurst(worldX, worldY);

    if (mode === 'stormy') {
      triggerLightning();
    }
  };

  return (
    <>
      <CameraRig />
      <WeatherLighting />
      <group onPointerDown={handlePointerDown}>
        {/* Invisible raycast plane covering viewport at z=0 to guarantee click detection */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <WeatherParticles />
        <WeatherSculptures />
        <WeatherBursts />
      </group>
    </>
  );
}

export default function HeroScene() {
  return <HeroSceneContent />;
}
