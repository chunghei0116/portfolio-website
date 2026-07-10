"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  // Significantly increased grid dimensions for a denser, more intense particle sheet (approx. 12,350 particles)
  const cols = 120;
  const rows = 80;

  // Store the initial vertex coordinates to calculate wave offsets accurately
  const initialData = useMemo(() => {
    const data: { x: number; y: number; index: number }[] = [];
    const width = 24;
    const height = 16;

    let idx = 0;
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const x = (c / cols - 0.5) * width;
        const y = (r / rows - 0.5) * height;
        data.push({ x, y, index: idx });
        idx++;
      }
    }
    return data;
  }, [cols, rows]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const count = pointsRef.current.geometry.attributes.position.count;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const { x, y } = initialData[i];

      // Coordinate parameter for diagonal wave propagation on the plane
      const waveParam = (x + 12) / 24 + (y + 8) / 16; 
      
      // Broad, slow wind waves blowing across the cloth sheet
      const primaryFreq = 2.2;
      const primarySpeed = 0.45;
      const primaryWave = Math.sin(waveParam * primaryFreq - time * primarySpeed) * 0.85;

      // Gentle secondary flutter for realistic fabric folds
      const secondaryFreq = 0.14;
      const secondarySpeed = 0.9;
      const secondaryWave = Math.cos((x - y) * secondaryFreq - time * secondarySpeed) * 0.22;

      // Displace along the local Z-axis (which becomes Y height due to rotation)
      pos[i3 + 2] = primaryWave + secondaryWave;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={pointsRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[24, 16, cols, rows]} />
      <meshStandardMaterial
        color="#D39E43" // Amber gold
        roughness={0.6}
        metalness={0.15}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

