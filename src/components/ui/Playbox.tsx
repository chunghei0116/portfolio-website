"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import BentoCard from "./BentoCard";

interface EmitterPoint {
  x: number;
  y: number;
  z: number;
  type: "tip" | "claw" | "base";
}

function GNDrive() {
  const driveRef = useRef<THREE.Group>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  const particleCount = 280;

  // 1. Define physical vertices on the GN Drive model to act as particle emitters
  const vertexEmitters = useMemo<EmitterPoint[]>(() => {
    const emitters: EmitterPoint[] = [];

    // Core condenser tip emitter
    emitters.push({ x: 0.46, y: 0, z: 0, type: "tip" });

    // Claw tips at 120 degree offsets
    for (let i = 0; i < 3; i++) {
      const rad = (i * 120 * Math.PI) / 180;
      emitters.push({
        x: 0.22,
        y: 0.21 * Math.cos(rad),
        z: 0.21 * Math.sin(rad),
        type: "claw",
      });
    }

    // Outer base plate points
    for (let i = 0; i < 6; i++) {
      const rad = (i * 60 * Math.PI) / 180;
      emitters.push({
        x: -0.42,
        y: 0.28 * Math.cos(rad),
        z: 0.28 * Math.sin(rad),
        type: "base",
      });
    }

    return emitters;
  }, []);

  // 2. Pre-calculate particle metadata relative to their source emitter vertices
  const [positions, colors, particleMetadata] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const meta = [];

    const colorGreen = new THREE.Color("#00FF66");
    const colorMint = new THREE.Color("#88FFCC");
    const colorTeal = new THREE.Color("#00FFAA");

    for (let i = 0; i < particleCount; i++) {
      const emitterIdx = Math.floor(Math.random() * vertexEmitters.length);
      const emitter = vertexEmitters[emitterIdx];

      pos[i * 3] = emitter.x;
      pos[i * 3 + 1] = emitter.y;
      pos[i * 3 + 2] = emitter.z;

      // Color selection matching GN Drive spectrum
      const mix = Math.random();
      const finalColor = mix < 0.45 ? colorGreen : (mix < 0.8 ? colorTeal : colorMint);
      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;

      // Determine directional trajectory vectors from source vertex
      let dx = 0;
      let dy = 0;
      let dz = 0;

      if (emitter.type === "tip") {
        // High velocity jet thrust forward along +X with cone angle spread
        dx = 1.2 + Math.random() * 0.6;
        dy = (Math.random() - 0.5) * 0.6;
        dz = (Math.random() - 0.5) * 0.6;
      } else if (emitter.type === "claw") {
        // Venting radially outwards away from the locking safety hooks
        const mag = Math.sqrt(emitter.y * emitter.y + emitter.z * emitter.z) || 1;
        dx = (Math.random() - 0.5) * 0.25;
        dy = (emitter.y / mag) * (0.6 + Math.random() * 0.5);
        dz = (emitter.z / mag) * (0.6 + Math.random() * 0.5);
      } else {
        // Base venting sweeping along the drive housing
        dx = 0.4 + Math.random() * 0.4;
        const mag = Math.sqrt(emitter.y * emitter.y + emitter.z * emitter.z) || 1;
        dy = (emitter.y / mag) * 0.15 + (Math.random() - 0.5) * 0.15;
        dz = (emitter.z / mag) * 0.15 + (Math.random() - 0.5) * 0.15;
      }

      meta.push({
        emitterIdx,
        dx,
        dy,
        dz,
        age: Math.random(), // Stagger initial frames
        speed: 0.7 + Math.random() * 1.1,
      });
    }

    return [pos, col, meta];
  }, [vertexEmitters, particleCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate GN Drive group slowly
    if (driveRef.current) {
      driveRef.current.rotation.y = time * 0.25;
      driveRef.current.rotation.z = Math.sin(time * 0.15) * 0.08;
    }

    // Spin dual concentric acceleration rings
    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 1.5;
      ringRef1.current.rotation.y = time * 1.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -time * 1.3;
      ringRef2.current.rotation.z = time * 0.8;
    }

    // Animate GN particles spraying outwards from drive vertices
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const m = particleMetadata[i];
        const emitter = vertexEmitters[m.emitterIdx];

        // Increment particle lifetime
        m.age += 0.013 * m.speed;
        if (m.age > 1.0) {
          m.age = 0; // Respawn at source vertex
        }

        // Circular wobble offsets to simulate swirling vapor
        const wobbleRadius = m.age * 0.12;
        const wobbleY = Math.cos(time * 6 + i) * wobbleRadius;
        const wobbleZ = Math.sin(time * 6 + i) * wobbleRadius;

        posArray[i * 3] = emitter.x + m.dx * m.age * 0.85;
        posArray[i * 3 + 1] = emitter.y + m.dy * m.age * 0.85 + wobbleY;
        posArray[i * 3 + 2] = emitter.z + m.dz * m.age * 0.85 + wobbleZ;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={driveRef} rotation={[0, 0.3, 0.15]}>
      {/* 1. Core GN Condenser Base & Emitter Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#00FF66" toneMapped={false} />
      </mesh>

      {/* 2. Main Conical Solar Reactor Shell */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.26, 0.82, 5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} metalness={0.15} flatShading />
      </mesh>

      {/* 3. Glowing Condenser Emitter Core (Cone Tip) */}
      <mesh position={[0.42, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.08, 0.1, 5]} />
        <meshBasicMaterial color="#00FFAA" toneMapped={false} />
      </mesh>

      {/* 4. Outer base cap plate */}
      <mesh position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.12, 6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* 5. Three Clamping Safety Lock Fasteners (120 degree intervals) */}
      {[-120, 0, 120].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group key={angle} rotation={[rad, 0, 0]}>
            {/* Clamping hinge base */}
            <mesh position={[-0.2, 0.32, 0]}>
              <boxGeometry args={[0.12, 0.08, 0.08]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.5} metalness={0.15} />
            </mesh>
            {/* Claw arm structure */}
            <mesh position={[0.02, 0.28, 0]} rotation={[0, 0, -Math.PI / 9]}>
              <boxGeometry args={[0.35, 0.04, 0.06]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Clamping hook locking onto reactor body */}
            <mesh position={[0.21, 0.21, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.12, 0.04, 0.05]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.4} metalness={0.15} />
            </mesh>
          </group>
        );
      })}

      {/* 6. Dual Accent Acceleration Rings */}
      <mesh ref={ringRef1} position={[0, 0, 0]}>
        <torusGeometry args={[0.46, 0.02, 8, 32]} />
        <meshStandardMaterial color="#0A5CFF" roughness={0.3} metalness={0.7} />
      </mesh>

      <mesh ref={ringRef2} position={[0, 0, 0]}>
        <torusGeometry args={[0.55, 0.018, 8, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* 7. Vertex Particle Emitter Cloud */}
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
          size={0.06}
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function Playbox() {
  return (
    <BentoCard disableHover={true} className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
          Interact // Drag to Rotate GN Drive
        </span>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-black uppercase">
          GN DRIVE CORE
        </h3>
      </div>

      <div className="h-[200px] w-full bg-[#050b10] rounded-none relative overflow-hidden border-[3px] border-black">
        <Canvas 
          camera={{ position: [0, 0, 2.2], fov: 48 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={0.9} />
          <pointLight position={[5, 5, 5]} intensity={1.5} />
          <directionalLight position={[0, 0, 5]} intensity={1.8} />
          <GNDrive />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <p className="text-xs font-mono text-black/50">
        * Interactive Gundam 00 solar reactor emitting green GN particles directly from geometry vertices.
      </p>
    </BentoCard>
  );
}
