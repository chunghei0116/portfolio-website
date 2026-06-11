"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import BentoCard from "./BentoCard";

function GNDrive() {
  const driveRef = useRef<THREE.Group>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  const particleCount = 200;

  // Pre-calculate particle spiral parameters
  const [positions, colors, initialData] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const data = [];

    const colorGreen = new THREE.Color("#00FF66");
    const colorMint = new THREE.Color("#88FFCC");
    const colorTeal = new THREE.Color("#00FFAA");

    for (let i = 0; i < particleCount; i++) {
      // Conical spiral trajectory parameters
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.25 + Math.random() * 0.95;
      const y = (Math.random() - 0.5) * 1.4;

      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = radius * Math.sin(theta);

      // Mix green GN particle shades
      const mix = Math.random();
      const finalColor = mix < 0.4 ? colorGreen : (mix < 0.75 ? colorTeal : colorMint);
      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;

      data.push({
        theta,
        radius,
        y,
        speed: 0.4 + Math.random() * 1.3,
      });
    }
    return [pos, col, data];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate GN Drive group slowly
    if (driveRef.current) {
      driveRef.current.rotation.y = time * 0.25;
      driveRef.current.rotation.z = Math.sin(time * 0.15) * 0.1;
    }

    // Spin dual ring braces in opposite directions
    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 1.6;
      ringRef1.current.rotation.y = time * 1.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -time * 1.4;
      ringRef2.current.rotation.z = time * 0.9;
    }

    // Animate GN particles spiraling out from drive condenser
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const d = initialData[i];
        const currentTheta = d.theta + time * d.speed;
        const currentRadius = d.radius + (Math.sin(time * d.speed * 0.6 + i) * 0.15);

        posArray[i * 3] = currentRadius * Math.cos(currentTheta);
        posArray[i * 3 + 1] = d.y + Math.sin(time * 1.2 + i) * 0.06;
        posArray[i * 3 + 2] = currentRadius * Math.sin(currentTheta);
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={driveRef} rotation={[0, 0.4, 0.2]}>
      {/* Central GN Core Condenser (Glowing Green Sphere) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#00FF66" toneMapped={false} />
      </mesh>

      {/* Main GN Drive Cone housing (Metallic faceted cone) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.28, 0.85, 5]} />
        <meshStandardMaterial color="#222222" roughness={0.1} metalness={0.9} flatShading />
      </mesh>

      {/* Outer base plate cylinder (Metallic white ring cap) */}
      <mesh position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.12, 6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Dual Rotating Acceleration Ring Braces */}
      <mesh ref={ringRef1} position={[0, 0, 0]}>
        <torusGeometry args={[0.48, 0.025, 8, 32]} />
        <meshStandardMaterial color="#0A5CFF" roughness={0.15} metalness={0.85} />
      </mesh>

      <mesh ref={ringRef2} position={[0, 0, 0]}>
        <torusGeometry args={[0.58, 0.02, 8, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* GN Particles cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function Playbox() {
  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
          Interact // Drag to Rotate GN Drive
        </span>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-black uppercase">
          GN DRIVE CORE
        </h3>
      </div>

      <div className="h-[200px] w-full bg-black rounded-none relative overflow-hidden border-[3px] border-black">
        <Canvas camera={{ position: [0, 0, 2.2], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={1.5} />
          <GNDrive />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <p className="text-xs font-mono text-black/50">
        * Interactive Gundam 00 active GN Drive emitting green GN particles.
      </p>
    </BentoCard>
  );
}
