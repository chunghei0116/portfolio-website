"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three';
import BentoCard from "./BentoCard";

interface EmitterPoint {
  x: number;
  y: number;
  z: number;
  type: "tip" | "exhaust" | "base";
}

function GNDrive() {
  const driveRef = useRef<THREE.Group>(null!);
  const coneRef = useRef<THREE.LineSegments>(null!);
  const starRef = useRef<THREE.LineSegments>(null!);
  const ringRefs = useRef<(THREE.LineSegments | null)[]>([]);
  const particlesRef = useRef<THREE.Points>(null!);

  const particleCount = 300;

  // 1. Define physical emitters based on the new online layout geometry
  const vertexEmitters = useMemo<EmitterPoint[]>(() => {
    const emitters: EmitterPoint[] = [];

    // Cone tip condenser emitter (at the front)
    emitters.push({ x: 0, y: 0, z: 3.0, type: "tip" });

    // Exhaust port gear emitter (at the back)
    emitters.push({ x: 0, y: 0, z: -3.8, type: "exhaust" });

    // Base cylinder ring points
    for (let i = 0; i < 8; i++) {
      const rad = (i * 45 * Math.PI) / 180;
      emitters.push({
        x: 1.2 * Math.cos(rad),
        y: 1.2 * Math.sin(rad),
        z: -0.5,
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

      const mix = Math.random();
      const finalColor = mix < 0.45 ? colorGreen : (mix < 0.8 ? colorTeal : colorMint);
      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;

      let dx = 0;
      let dy = 0;
      let dz = 0;

      if (emitter.type === "tip") {
        // Jet thrust forward along Z
        dx = (Math.random() - 0.5) * 0.8;
        dy = (Math.random() - 0.5) * 0.8;
        dz = 1.2 + Math.random() * 0.8;
      } else if (emitter.type === "exhaust") {
        // Venting backwards along -Z
        dx = (Math.random() - 0.5) * 0.8;
        dy = (Math.random() - 0.5) * 0.8;
        dz = -1.2 - Math.random() * 0.8;
      } else {
        // Spreading radially from base
        const mag = Math.sqrt(emitter.x * emitter.x + emitter.y * emitter.y) || 1;
        dx = (emitter.x / mag) * (0.6 + Math.random() * 0.6);
        dy = (emitter.y / mag) * (0.6 + Math.random() * 0.6);
        dz = (Math.random() - 0.5) * 0.4;
      }

      meta.push({
        emitterIdx,
        dx,
        dy,
        dz,
        age: Math.random(),
        speed: 0.6 + Math.random() * 1.2,
      });
    }

    return [pos, col, meta];
  }, [vertexEmitters, particleCount]);

  // 3. Pre-generate wireframe edges geometry from the online reference demo sizes
  const [coneEdges, cylEdges, starEdges, ringEdges] = useMemo(() => {
    const ring1 = new THREE.EdgesGeometry(new THREE.TorusGeometry(2.2, 0.08, 8, 32));
    const ring2 = new THREE.EdgesGeometry(new THREE.TorusGeometry(2.5, 0.08, 8, 32));
    const ring3 = new THREE.EdgesGeometry(new THREE.TorusGeometry(2.8, 0.08, 8, 32));

    return [
      new THREE.EdgesGeometry(new THREE.ConeGeometry(1.2, 3, 16, 8)),
      new THREE.EdgesGeometry(new THREE.CylinderGeometry(1.2, 1.2, 3, 16, 6)),
      new THREE.EdgesGeometry(new THREE.CylinderGeometry(1.5, 1.0, 0.8, 8, 2)),
      [ring1, ring2, ring3],
    ];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate GN Drive group slowly for perspective view
    if (driveRef.current) {
      driveRef.current.rotation.y = time * 0.15;
    }

    // Spin core and exhaust
    if (coneRef.current) {
      coneRef.current.rotation.y = time * 0.8;
    }
    if (starRef.current) {
      starRef.current.rotation.y = -time * 1.2;
    }

    // Spin outer rings at different speeds
    ringRefs.current.forEach((ring, index) => {
      if (ring) {
        ring.rotation.z = time * (0.3 + index * 0.2);
      }
    });

    // Animate GN particles spraying from vertices
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const m = particleMetadata[i];
        const emitter = vertexEmitters[m.emitterIdx];

        m.age += 0.013 * m.speed;
        if (m.age > 1.0) {
          m.age = 0;
        }

        const wobbleRadius = m.age * 0.15;
        const wobbleX = Math.cos(time * 6 + i) * wobbleRadius;
        const wobbleY = Math.sin(time * 6 + i) * wobbleRadius;

        posArray[i * 3] = emitter.x + m.dx * m.age * 1.2 + wobbleX;
        posArray[i * 3 + 1] = emitter.y + m.dy * m.age * 1.2 + wobbleY;
        posArray[i * 3 + 2] = emitter.z + m.dz * m.age * 1.2;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={driveRef} scale={[0.22, 0.22, 0.22]} rotation={[0.4, 0.6, 0.1]}>
      {/* A. Central Cone (尖頭) */}
      <lineSegments ref={coneRef} geometry={coneEdges} position={[0, 0, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <lineBasicMaterial color="#33ffaa" transparent opacity={0.85} />
      </lineSegments>

      {/* B. Main Cylinder (後方主圓柱體) */}
      <lineSegments geometry={cylEdges} position={[0, 0, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </lineSegments>

      {/* C. Star Exhaust (後方星形/齒輪狀排氣口) */}
      <lineSegments ref={starRef} geometry={starEdges} position={[0, 0, -3.4]} rotation={[Math.PI / 2, 0, 0]}>
        <lineBasicMaterial color="#0A5CFF" transparent opacity={0.8} />
      </lineSegments>

      {/* D. Three Outer Rings (Torus wireframes offset on Z) */}
      {[0.8, -0.5, -1.8].map((zPos, index) => (
        <lineSegments
          key={zPos}
          ref={(el) => {
            ringRefs.current[index] = el;
          }}
          geometry={ringEdges[index]}
          position={[0, 0, zPos]}
        >
          <lineBasicMaterial color={index === 1 ? "#0A5CFF" : "#ffffff"} transparent opacity={0.75} />
        </lineSegments>
      ))}

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
          size={0.07}
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
          camera={{ position: [0, 0, 2.5], fov: 48 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <GNDrive />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <p className="text-xs font-mono text-black/50">
        * Active GN Drive wireframe emitting green GN particles from geometry vertices.
      </p>
    </BentoCard>
  );
}
