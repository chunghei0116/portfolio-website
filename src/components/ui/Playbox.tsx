"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import BentoCard from "./BentoCard";

function Shape() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!hovered) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.7 : 1.5}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        color={hovered ? "#00F0FF" : "#ffffff"}
        wireframe
        wireframeLinewidth={1.5}
        transparent
        opacity={hovered ? 0.8 : 0.25}
      />
    </mesh>
  );
}

export default function Playbox() {
  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
          Interact // Drag to Rotate
        </span>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-black uppercase">
          3D PLAYBOX
        </h3>
      </div>

      <div className="h-[200px] w-full bg-neutral-950 rounded-xl relative overflow-hidden shadow-inner border border-white/[0.05]">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <Shape />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <p className="text-xs font-mono text-black/50">
        * Interactive wireframe mesh using React-Three-Fiber.
      </p>
    </BentoCard>
  );
}
