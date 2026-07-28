'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import type { Group } from 'three';

function Sculpture() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.13;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    group.current.position.x += (state.pointer.x * 0.45 - group.current.position.x) * 0.025;
    group.current.position.y += (state.pointer.y * 0.28 - group.current.position.y) * 0.025;
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.9}>
        <mesh rotation={[0.6, 0.1, 0.35]}>
          <icosahedronGeometry args={[1.4, 2]} />
          <meshStandardMaterial color="#f4bd84" emissive="#9f4c30" emissiveIntensity={0.4} metalness={0.88} roughness={0.22} wireframe />
        </mesh>
        <mesh rotation={[0.1, 0.6, 0.2]} scale={0.64}>
          <icosahedronGeometry args={[1.4, 2]} />
          <meshStandardMaterial color="#fff2dc" metalness={0.6} roughness={0.16} />
        </mesh>
      </Float>
      <Line points={[[-2.4, 0, 0], [0, 1.8, -0.4], [2.35, -0.15, 0.2]]} color="#f2b268" lineWidth={1.2} transparent opacity={0.7} />
      <Line points={[[-1.8, -1.65, -0.3], [0.15, -0.7, 0.1], [2.4, 1.45, -0.1]]} color="#6b9cff" lineWidth={1} transparent opacity={0.45} />
    </group>
  );
}

export default function OrbitalField() {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={43} />
      <ambientLight intensity={0.8} />
      <directionalLight color="#ffe0bd" intensity={2.5} position={[3, 3, 4]} />
      <pointLight color="#6b9cff" intensity={10} position={[-3, -1, 2]} />
      <Sculpture />
    </Canvas>
  );
}
