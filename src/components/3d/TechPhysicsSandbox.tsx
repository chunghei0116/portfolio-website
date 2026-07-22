'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = ['Next.js', 'React', 'Three.js', 'GLSL', 'Docker', 'K8s', 'Python', 'TypeScript'];

function PhysicsBox({ text, position }: { text: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.4, 0.7, 0.4]} />
        <meshPhysicalMaterial
          color="#0a0a14"
          roughness={0.1}
          metalness={0.8}
          transmission={0.6}
          thickness={0.5}
          clearcoat={1}
          wireframe={false}
        />
        <Text
          position={[0, 0, 0.22]}
          fontSize={0.2}
          color="#00f0ff"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </mesh>
    </Float>
  );
}

export default function TechPhysicsSandbox() {
  return (
    <div className="w-full h-[400px] relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#08080c]/60 backdrop-blur-xl">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#a855f7" />

        {SKILLS.map((skill, idx) => {
          const x = ((idx % 4) - 1.5) * 1.5;
          const y = (Math.floor(idx / 4) - 0.5) * 1.2;
          return <PhysicsBox key={skill} text={skill} position={[x, y, 0]} />;
        })}
      </Canvas>
    </div>
  );
}
