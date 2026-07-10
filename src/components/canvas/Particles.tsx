"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  // Significantly increased grid dimensions for a denser, more intense particle sheet (approx. 12,350 particles)
  const cols = 130;
  const rows = 95;
  const count = cols * rows;

  const [positions, colors, initialData] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colsArray = new Float32Array(count * 3);
    const data: { x: number; z: number; index: number }[] = [];

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
        // Map grid coordinates to X-Z plane
        const x = ((c / (cols - 1)) - 0.5) * 24;
        const y = 0;
        const z = ((r / (rows - 1)) - 0.5) * 16;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        const color = colorsList[Math.floor(Math.random() * colorsList.length)];
        colsArray[idx * 3] = color.r;
        colsArray[idx * 3 + 1] = color.g;
        colsArray[idx * 3 + 2] = color.b;

        data.push({ x, z, index: idx });
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
      const { x, z } = initialData[i];

      // Coordinate parameter for diagonal wave propagation on X-Z plane
      const waveParam = (x + 12) / 24 + (z + 8) / 16; 
      
      // Primary smooth diagonal wave (like a broad wind gust rippling through fabric)
      const primaryFreq = 3.5;
      const primarySpeed = 1.2;
      const primaryWave = Math.sin(waveParam * primaryFreq - time * primarySpeed) * 1.1;

      // Secondary perpendicular ripple (creates the folding and fluttering texture of cloth)
      const secondaryFreq = 0.22;
      const secondarySpeed = 2.4;
      const secondaryWave = Math.cos((x - z) * secondaryFreq - time * secondarySpeed) * 0.35;

      // Total displacement on the Y-axis (height displacement viewed from above)
      pos[i3 + 1] = primaryWave + secondaryWave;

      // Micro-sway in X & Z for organic fabric flexibility
      pos[i3] = x + Math.sin(time * 0.3 + z) * 0.04;
      pos[i3 + 2] = z + Math.cos(time * 0.3 + x) * 0.04;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Reset rotation to 0 since camera is positioned on Y-axis looking straight down at X-Z plane
    pointsRef.current.rotation.x = 0;
    pointsRef.current.rotation.y = 0;
    pointsRef.current.rotation.z = 0;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04} // Smaller particles for a high-density dust appearance
        vertexColors
        sizeAttenuation={true}
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

