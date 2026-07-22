'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Color Palette Constants
const COLOR_GOLD = new THREE.Color('#C59B27');
const COLOR_AEGEAN = new THREE.Color('#1A2B4C');
const COLOR_GOLD_BRIGHT = new THREE.Color('#F3E5AB');
const COLOR_AEGEAN_LIGHT = new THREE.Color('#3B5278');

/**
 * Dense 3D Particle System representing the Golden Starfield of Olympus.
 */
function GoldenStarfield() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  // Scale particle count for mobile screens (viewport width < 7)
  const isMobile = viewport.width < 7;
  const count = isMobile ? 1500 : 3500;

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute particles in a deep spherical/cylindrical volume
      const radius = 2 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // 65% Gold variations, 35% Aegean Blue variations
      const isGold = Math.random() > 0.35;
      const baseColor = isGold
        ? (Math.random() > 0.4 ? COLOR_GOLD : COLOR_GOLD_BRIGHT)
        : (Math.random() > 0.4 ? COLOR_AEGEAN : COLOR_AEGEAN_LIGHT);

      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;

      // Varied star sizes
      sz[i] = Math.random() * 0.08 + 0.02;
    }

    return [pos, col, sz];
  }, [count]);

  // Create a soft glowing circular particle texture using HTML Canvas
  const particleTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(235, 200, 100, 0.8)');
      gradient.addColorStop(0.7, 'rgba(26, 43, 76, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Continuous slow background rotation
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.01;

    // Smooth Mouse Parallax shift
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.4;

    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetX * 0.5 + state.clock.elapsedTime * 0.03, 0.05);
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -targetY * 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        map={particleTexture || undefined}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Low-Poly / Wireframe Greek Column & Sacred Geometry Centerpiece.
 */
function SacredGreekColumn() {
  const groupRef = useRef<THREE.Group>(null!);
  const innerPolyRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow majestic rotation
    groupRef.current.rotation.y += delta * 0.2;

    // Inner sacred geometry counter-rotates and floats slightly
    if (innerPolyRef.current) {
      innerPolyRef.current.rotation.y -= delta * 0.4;
      innerPolyRef.current.rotation.x += delta * 0.15;
      innerPolyRef.current.position.y = 2.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }

    // Subtle pointer parallax tilt
    const targetRotX = -state.pointer.y * 0.25;
    const targetRotZ = state.pointer.x * 0.25;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* --- Column Base (Plinth & Torus) --- */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.25, 1.6]} />
        <meshStandardMaterial color="#1A2B4C" wireframe roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.75, 0.85, 0.25, 16]} />
        <meshStandardMaterial color="#C59B27" wireframe roughness={0.2} metalness={0.9} />
      </mesh>

      {/* --- Fluted Column Shaft --- */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.6, 0.68, 1.85, 12, 8]} />
        <meshStandardMaterial
          color="#C59B27"
          wireframe
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={1.0}
        />
      </mesh>

      {/* --- Column Capital (Top Pedestal & Abacus) --- */}
      <mesh position={[0, 2.25, 0]}>
        <cylinderGeometry args={[0.85, 0.65, 0.25, 16]} />
        <meshStandardMaterial color="#C59B27" wireframe roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 2.45, 0]}>
        <boxGeometry args={[1.5, 0.2, 1.5]} />
        <meshStandardMaterial color="#1A2B4C" wireframe roughness={0.3} metalness={0.8} />
      </mesh>

      {/* --- Floating Sacred Geometry Gem (Above Capital) --- */}
      <mesh ref={innerPolyRef} position={[0, 3.2, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#F3E5AB"
          wireframe
          emissive="#C59B27"
          emissiveIntensity={0.6}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

/**
 * Camera controller with smooth floating motion & mouse tracking.
 */
function CameraController() {
  useFrame((state) => {
    // Subtle float oscillation
    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 0.8) * 0.15;
    const floatX = Math.cos(time * 0.6) * 0.1;

    // Mouse influence on camera position
    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.3;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, floatX + mouseX, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, floatY + mouseY + 0.5, 0.03);
    state.camera.lookAt(0, 0.2, 0);
  });

  return null;
}

/**
 * Complete Three.js Hero Scene
 */
export default function HeroScene() {
  return (
    <>
      {/* Ambient Lighting with Aegean Blue warmth */}
      <ambientLight intensity={0.4} color="#1A2B4C" />

      {/* Golden Key Lights for Olympus Shimmer */}
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#C59B27" />
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#00F0FF" />
      <pointLight position={[0, 3, 2]} intensity={1.8} color="#F3E5AB" />

      {/* Camera Movement Controller */}
      <CameraController />

      {/* 3D Elements */}
      <GoldenStarfield />
      <SacredGreekColumn />
    </>
  );
}
