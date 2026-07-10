"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);

  // Significantly increased grid dimensions for a denser, more intense particle sheet
  const cols = 90;
  const rows = 65;
  const count = cols * rows;

  const [positions, colors, initialData] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colsArray = new Float32Array(count * 3);
    const data: { x: number; y: number; index: number }[] = [];

    // Warm gold, sienna, and ivory tones
    const colorsList = [
      new THREE.Color("#E5C158"), // Gold
      new THREE.Color("#D39E43"), // Amber
      new THREE.Color("#C58B3C"), // Ochre
      new THREE.Color("#FAF6EE"), // Ivory / Parchment Cream
    ];

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Map grid coordinates to 3D space
        const x = ((c / (cols - 1)) - 0.5) * 24;
        const y = ((r / (rows - 1)) - 0.5) * 16;
        const z = 0;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        const color = colorsList[Math.floor(Math.random() * colorsList.length)];
        colsArray[idx * 3] = color.r;
        colsArray[idx * 3 + 1] = color.g;
        colsArray[idx * 3 + 2] = color.b;

        data.push({ x, y, index: idx });
        idx++;
      }
    }

    return [pos, colsArray, data];
  }, [cols, rows, count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const { x, y } = initialData[i];

      // Normalized coordinates: wave travels from bottom-left to top-right
      const waveParam = (x + 12) / 24 + (y + 8) / 16; 
      
      // Slim/Sharp wave displacement (using Math.pow to narrow the wave crest)
      const amplitude = 1.2;
      const frequency = 5.0; // Higher frequency for a tighter, slimmer wave front
      const speed = 2.5;
      
      const rawWave = Math.sin(waveParam * frequency - time * speed);
      // Math.pow of positive part makes the wave peaks very sharp/slim
      const zDisplacement = Math.pow(Math.max(0, rawWave), 3.5) * amplitude;

      // Update Z coordinate
      pos[i3 + 2] = zDisplacement;

      // Micro-sway in X & Y for organic fluidity
      pos[i3] = x + Math.sin(time * 0.4 + y) * 0.03;
      pos[i3 + 1] = y + Math.cos(time * 0.4 + x) * 0.03;
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
        size={0.055} // Smaller particles for a high-intensity, sharp vector texture
        vertexColors
        sizeAttenuation={true}
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

