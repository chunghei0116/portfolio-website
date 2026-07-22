'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Ring, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function CrystalGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3 + state.pointer.y * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4 + state.pointer.x * 0.5;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -state.clock.getElapsedTime() * 0.2;
      outerRingRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return (
    <group scale={1.2}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.6, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={512}
            transmission={0.95}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            thickness={1.2}
            chromaticAberration={0.6}
            anisotropy={0.3}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.2}
            color="#a855f7"
            background={new THREE.Color('#00f0ff')}
          />
        </mesh>
      </Float>

      {/* Orbiting Particle Halo */}
      <group ref={outerRingRef}>
        <Ring args={[2.4, 2.45, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00f0ff" wireframe side={THREE.DoubleSide} transparent opacity={0.3} />
        </Ring>
      </group>

      <Sparkles count={60} scale={5} size={3} speed={0.4} color="#00f0ff" />
    </group>
  );
}

export default function QuantumRefractionOrb() {
  return (
    <div className="w-full h-[450px] md:h-[550px] relative flex items-center justify-center">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#a855f7" />
        <CrystalGeometry />
      </Canvas>
    </div>
  );
}
