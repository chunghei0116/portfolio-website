"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);

  // Grid dimensions for the particle sheet
  const cols = 45;
  const rows = 30;
  const count = cols * rows;

  const [positions, colors, initialData] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colsArray = new Float32Array(count * 3);
    const data: { x: number; y: number; index: number }[] = [];

    // Renaissance color palette: warm gold, sienna, cream, and terracotta tones
    const colorsList = [
      new THREE.Color("#E5C158"), // Gold
      new THREE.Color("#D39E43"), // Warm Amber
      new THREE.Color("#C58B3C"), // Ochre
      new THREE.Color("#EDE6D6"), // Parchment Cream
    ];

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Map grid coordinates to 3D space
        // X ranges from -12 to 12, Y ranges from -8 to 8
        const x = ((c / (cols - 1)) - 0.5) * 24;
        const y = ((r / (rows - 1)) - 0.5) * 16;
        const z = 0;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        // Assign a warm Renaissance color
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

      // Wave starting from bottom-left (low x, low y) to top-right (high x, high y)
      // We align the wave wave-front along the line X + Y = constant
      // Scaling factor coordinates: X ranges from -12 to 12, Y from -8 to 8
      const waveParam = (x + 12) / 24 + (y + 8) / 16; 
      
      // Calculate wave displacement (Z-axis ripple)
      // Wave travels in the direction of increasing waveParam (bottom-left to top-right)
      const amplitude = 0.8;
      const frequency = 4.0;
      const speed = 2.0;
      const zDisplacement = Math.sin(waveParam * frequency - time * speed) * amplitude;

      // Update Z coordinate
      pos[i3 + 2] = zDisplacement;

      // Add a tiny, subtle idle sway to X and Y for a natural organic feel
      pos[i3] = x + Math.sin(time * 0.5 + y) * 0.05;
      pos[i3 + 1] = y + Math.cos(time * 0.5 + x) * 0.05;
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
        size={0.12}
        vertexColors
        sizeAttenuation={true}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
}

