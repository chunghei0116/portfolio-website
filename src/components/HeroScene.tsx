'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Color Palette for Dark Obsidian Theme with Electric Accents
const COLOR_EMERALD = new THREE.Color('#10b981');
const COLOR_CYAN = new THREE.Color('#00f0ff');
const COLOR_SLATE = new THREE.Color('#475569');
const COLOR_VIOLET = new THREE.Color('#8b5cf6');

/**
 * High-performance 3D Particle Starfield with Pointer Parallax
 */
function ParticleStarfield() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  const isMobile = viewport.width < 7;
  const count = isMobile ? 1200 : 2800;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const rand = Math.random();
      const baseColor = rand > 0.6 ? COLOR_EMERALD : rand > 0.3 ? COLOR_CYAN : COLOR_SLATE;

      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }

    return [pos, col];
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
      gradient.addColorStop(0.3, 'rgba(16, 185, 129, 0.8)');
      gradient.addColorStop(0.7, 'rgba(0, 240, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(9, 9, 11, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.008;

    const targetX = state.pointer.x * 0.3;
    const targetY = state.pointer.y * 0.3;

    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      targetX * 0.4 + state.clock.elapsedTime * 0.02,
      0.05
    );
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      -targetY * 0.4 + Math.sin(state.clock.elapsedTime * 0.4) * 0.04,
      0.05
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
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
 * Interactive 3D Wireframe Sculptures reacting to pointer movements
 */
function FloatingSculptures() {
  const outerGroupRef = useRef<THREE.Group>(null!);
  const octahedronRef = useRef<THREE.Mesh>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!outerGroupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Octahedron rotation & hover
    if (octahedronRef.current) {
      octahedronRef.current.rotation.y += delta * 0.3;
      octahedronRef.current.rotation.x += delta * 0.15;
      octahedronRef.current.position.y = Math.sin(time * 1.2) * 0.2;
    }

    // Torus knot slow counter rotation
    if (torusRef.current) {
      torusRef.current.rotation.y -= delta * 0.2;
      torusRef.current.rotation.z += delta * 0.1;
      torusRef.current.position.y = Math.cos(time * 0.9) * 0.15 - 0.5;
    }

    // Small orb orbit
    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(time * 1.5) * 1.8;
      sphereRef.current.position.z = Math.cos(time * 1.5) * 1.8;
      sphereRef.current.position.y = Math.sin(time * 2) * 0.4;
    }

    // Smooth pointer tilt
    const targetRotX = -state.pointer.y * 0.35;
    const targetRotY = state.pointer.x * 0.35;

    outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(outerGroupRef.current.rotation.x, targetRotX, 0.05);
    outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(outerGroupRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <group ref={outerGroupRef} position={[1.8, 0, -1]}>
      {/* Central Wireframe Octahedron */}
      <mesh ref={octahedronRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Interlocking Outer Torus Ring */}
      <mesh ref={torusRef} position={[0, -0.2, 0]}>
        <torusGeometry args={[1.8, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Floating Glowing Sphere Orb */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#10b981"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

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

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight position={[6, 8, 6]} intensity={1.8} color="#10b981" />
      <pointLight position={[-5, -3, -3]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[3, 4, 3]} intensity={2.0} color="#34d399" />

      <CameraRig />
      <ParticleStarfield />
      <FloatingSculptures />
    </>
  );
}
