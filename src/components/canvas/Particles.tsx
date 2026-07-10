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

      // Coordinate parameter for diagonal wave propagation
      const waveParam = (x + 12) / 24 + (y + 8) / 16; 
      
      // Primary smooth diagonal wave (like a broad wind gust rippling through fabric)
      const primaryFreq = 3.5;
      const primarySpeed = 1.2;
      const primaryWave = Math.sin(waveParam * primaryFreq - time * primarySpeed) * 1.1;

      // Secondary perpendicular ripple (creates the folding and fluttering texture of cloth)
      const secondaryFreq = 0.22;
      const secondarySpeed = 2.4;
      const secondaryWave = Math.cos((x - y) * secondaryFreq - time * secondarySpeed) * 0.35;

      // Total displacement on the Z-axis (continuous, symmetric wave without sharp clamping)
      pos[i3 + 2] = primaryWave + secondaryWave;

      // Micro-sway in X & Y for organic fabric flexibility
      pos[i3] = x + Math.sin(time * 0.3 + y) * 0.04;
      pos[i3 + 1] = y + Math.cos(time * 0.3 + x) * 0.04;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Set high-overhead top-to-bottom perspective (tilted to look down the sheet from the top)
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -Math.PI / 2.4 - mouse.y * 0.08, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouse.x * 0.08, 0.05);
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, Math.PI / 16, 0.05);
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

