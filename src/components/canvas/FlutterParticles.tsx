"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleData {
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  noiseSpeed: number;
  noiseForce: number;
  phase: number;
}

export default function FlutterParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 1600; // Increased to 1600 particles for a rich, solid logo visualization

  // Generate target shapes and positions
  const [positions, colors, metadata] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const meta: ParticleData[] = [];

    // Colors mapping to Flutter's cyan-to-blue brand palette
    const colorLightCyan = new THREE.Color("#38bdf8"); // Tailwind sky-400 (Top piece)
    const colorMediumBlue = new THREE.Color("#0284c7"); // Tailwind sky-600 (Middle piece)
    const colorDarkBlue = new THREE.Color("#0369a1"); // Tailwind sky-700 (Bottom piece)

    // Base scale and offset for centering
    const scale = 0.7;
    const offsetX = 0.1;
    const offsetY = 0.05;

    // Distribute particles across the three parallelograms of the Flutter logo
    for (let i = 0; i < count; i++) {
      let targetX = 0;
      let targetY = 0;
      let activeColor = colorMediumBlue;

      // Determine which shape to put the particle in
      // 38% Top, 38% Middle, 24% Bottom
      const randType = Math.random();
      const a = Math.random(); // Uniform random variable along u
      const b = Math.random(); // Uniform random variable along v

      if (randType < 0.38) {
        // 1. Top piece (slanted up-right)
        // Origin: [-0.75, 0.3]. Vector u: [0.6, 0]. Vector v: [0.5, 0.5]
        const rawX = -0.75 + a * 0.6 + b * 0.5;
        const rawY = 0.3 + b * 0.5;
        targetX = (rawX - offsetX) * scale;
        targetY = (rawY - offsetY) * scale;
        activeColor = colorLightCyan;
      } else if (randType < 0.76) {
        // 2. Middle piece (slanted down-right)
        // Origin: [-0.25, -0.2]. Vector u: [0.6, 0]. Vector v: [-0.5, 0.5]
        const rawX = -0.25 + a * 0.6 - b * 0.5;
        const rawY = -0.2 + b * 0.5;
        targetX = (rawX - offsetX) * scale;
        targetY = (rawY - offsetY) * scale;
        activeColor = colorMediumBlue;
      } else {
        // 3. Bottom piece (slanted up-right, parallel to top piece)
        // Origin: [-0.65, -0.7]. Vector u: [0.6, 0]. Vector v: [0.5, 0.5]
        const rawX = -0.65 + a * 0.6 + b * 0.5;
        const rawY = -0.7 + b * 0.5;
        targetX = (rawX - offsetX) * scale;
        targetY = (rawY - offsetY) * scale;
        activeColor = colorDarkBlue;
      }

      // Initial positions set randomly scattered, which will pull together into the shape
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = 0; // Flat 2D layout

      cols[i * 3] = activeColor.r;
      cols[i * 3 + 1] = activeColor.g;
      cols[i * 3 + 2] = activeColor.b;

      meta.push({
        targetX,
        targetY,
        vx: 0,
        vy: 0,
        noiseSpeed: 0.8 + Math.random() * 1.5,
        noiseForce: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    return [pos, cols, meta];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const m = metadata[i];

      // 1. Gentle floating background noise
      const floatX = Math.sin(time * m.noiseSpeed + m.phase) * m.noiseForce;
      const floatY = Math.cos(time * m.noiseSpeed + m.phase) * m.noiseForce;

      const currentX = pos[i3];
      const currentY = pos[i3 + 1];

      // 2. Return force pulling particles back to target shape
      const restoreForceX = (m.targetX + floatX - currentX) * 0.06;
      const restoreForceY = (m.targetY + floatY - currentY) * 0.06;

      // Update velocities with damping
      m.vx = (m.vx + restoreForceX) * 0.85;
      m.vy = (m.vy + restoreForceY) * 0.85;

      // Apply positions
      pos[i3] += m.vx;
      pos[i3 + 1] += m.vy;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08} // Moderately sized vector particles for a solid shape definition
        vertexColors
        sizeAttenuation={true}
        transparent
        opacity={0.85}
      />
    </points>
  );
}
