"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Particles() {
  const gridRef = useRef<THREE.GridHelper>(null!);
  const meshRef1 = useRef<THREE.Mesh>(null!);
  const meshRef2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate floating elements
    if (meshRef1.current) {
      meshRef1.current.rotation.x = time * 0.15;
      meshRef1.current.rotation.y = time * 0.2;
      meshRef1.current.position.y = Math.sin(time * 0.4) * 0.5 + 2;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = -time * 0.2;
      meshRef2.current.rotation.z = time * 0.1;
      meshRef2.current.position.y = Math.cos(time * 0.3) * 0.5 - 2;
    }

    // Rotate perspective grid slightly to show depth
    if (gridRef.current) {
      gridRef.current.rotation.y = Math.sin(time * 0.05) * 0.1;
    }
  });

  return (
    <group>
      {/* Retro Grid Plane */}
      <gridHelper
        ref={gridRef}
        args={[30, 30, "#000000", "#d1d1cc"]}
        position={[0, -4, 0]}
        rotation={[0.1, 0, 0]}
      />

      {/* Floating Primitive 1 (Low-poly Torus Knot) */}
      <mesh ref={meshRef1} position={[-4, 2, -3]}>
        <torusKnotGeometry args={[0.8, 0.25, 40, 6, 2, 3]} />
        <meshBasicMaterial color="#000000" wireframe />
      </mesh>

      {/* Floating Primitive 2 (Low-poly Icosahedron) */}
      <mesh ref={meshRef2} position={[4, -2, -3]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#000000" wireframe />
      </mesh>
    </group>
  );
}
