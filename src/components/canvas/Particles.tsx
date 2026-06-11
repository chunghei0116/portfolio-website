"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleMetadata {
  x: number;
  y: number;
  speedY: number;
  wobbleSpeed: number;
  wobbleForce: number;
}

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();
  const count = 180; // Reduced to 180 for an extremely clean, minimal, and premium look

  const [positions, colors, metadata] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const meta: ParticleMetadata[] = [];

    const colorBlue = new THREE.Color("#1F438A");
    const colorBlack = new THREE.Color("#373C42");

    for (let i = 0; i < count; i++) {
      // Staggered initial coordinates distributed evenly
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 6;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // 40% Ebikawa Blue, 60% Phantom Grey
      const isBlue = Math.random() < 0.40;
      const activeColor = isBlue ? colorBlue : colorBlack;
      cols[i * 3] = activeColor.r;
      cols[i * 3 + 1] = activeColor.g;
      cols[i * 3 + 2] = activeColor.b;

      meta.push({
        x,
        y,
        speedY: 0.006 + Math.random() * 0.014,
        wobbleSpeed: 0.25 + Math.random() * 0.5,
        wobbleForce: 0.02 + Math.random() * 0.04,
      });
    }

    return [pos, cols, meta];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const m = metadata[i];

      // Float upwards
      pos[i3 + 1] += m.speedY;
      // Soft horizontal wave sway
      pos[i3] = m.x + Math.sin(time * m.wobbleSpeed + i) * m.wobbleForce;

      // Mouse repulsion (horizontal-only parting like water to prevent mid-air trapping)
      const dx = pos[i3] - mx;
      const dy = pos[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2.5) {
        const force = (2.5 - dist) / 2.5;
        // Push left or right cleanly on the X-axis
        pos[i3] += (dx / (dist || 0.1)) * force * 0.15;
      }

      // Recycle particles with dynamic Y-jitter to prevent bottom-stacking/bunching
      if (pos[i3 + 1] > 7) {
        pos[i3 + 1] = -7 - Math.random() * 4; // Jitter entry height
        pos[i3] = (Math.random() - 0.5) * 22;
        m.x = pos[i3];
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Soft parallax rotation based on mouse coordinates
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -mouse.y * 0.08, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouse.x * 0.08, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.10} // Reduced to 0.10 for sharp, tiny, minimalist vector dots
        vertexColors
        sizeAttenuation={true}
        transparent
        opacity={0.65}
      />
    </points>
  );
}
