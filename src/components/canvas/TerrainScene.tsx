"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function TerrainScene() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Handle mouse movements
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Define plane geometry parameters
  const gridWidth = 28;
  const gridHeight = 28;

  const { positions, indices } = useMemo(() => {
    const tempPositions: number[] = [];
    const tempIndices: number[] = [];

    // Create custom heightmap-based vertices
    for (let y = 0; y <= gridHeight; y++) {
      for (let x = 0; x <= gridWidth; x++) {
        const u = x / gridWidth;
        const v = y / gridHeight;
        
        const xCoord = (u - 0.5) * 7;
        const yCoord = (v - 0.5) * 7;
        
        const dist = Math.sqrt(xCoord * xCoord + yCoord * yCoord);
        const z = Math.sin(dist * 1.5) * 0.45 * (1 - dist / 5); // damp at edges
        
        tempPositions.push(xCoord, yCoord, z);
      }
    }

    // Generate indices for grid triangles
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const a = y * (gridWidth + 1) + x;
        const b = y * (gridWidth + 1) + x + 1;
        const c = (y + 1) * (gridWidth + 1) + x;
        const d = (y + 1) * (gridWidth + 1) + x + 1;

        tempIndices.push(a, b, c);
        tempIndices.push(b, d, c);
      }
    }

    return {
      positions: new Float32Array(tempPositions),
      indices: new Uint16Array(tempIndices)
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Slowly rotate the mesh
    meshRef.current.rotation.z = time * 0.04;
    
    // React to mouse tilting
    meshRef.current.rotation.x = -Math.PI / 3.2 + mouseRef.current.y * 0.08;
    meshRef.current.rotation.y = mouseRef.current.x * 0.08;

    // Dynamic wave perturbation in vertices
    const geometry = meshRef.current.geometry;
    const posAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    
    for (let i = 0; i < posAttribute.count; i++) {
      const x = posAttribute.getX(i);
      const y = posAttribute.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      
      // Calculate dynamic wave displacement
      const wave = Math.sin(dist * 1.8 - time * 0.6) * 0.12 * (1 - dist / 4.5);
      
      // Base height + dynamic wave displacement
      const baseHeight = Math.sin(dist * 1.4) * 0.3 * (1 - dist / 5);
      posAttribute.setZ(i, baseHeight + wave);
    }
    posAttribute.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3.2, 0, 0]} position={[0, -0.15, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="index"
          args={[indices, 1]}
        />
      </bufferGeometry>
      {/* Wireframe with low opacity to match premium blueprint aesthetic */}
      <meshBasicMaterial 
        color="#2563EB" 
        wireframe 
        transparent 
        opacity={0.15} 
        side={THREE.DoubleSide} 
      />
    </mesh>
  );
}
