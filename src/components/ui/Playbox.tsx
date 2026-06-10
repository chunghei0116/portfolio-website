"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import BentoCard from "./BentoCard";

// Pure seeded pseudorandom number generator to satisfy React render purity rules
function createSeededRandom(seed: number) {
  let s = seed;
  return function () {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };
}

function ParticleSphere() {
  const pointsRef = useRef<THREE.Points>(null!);
  const [hovered, setHovered] = useState(false);

  const count = 600;

  // Pre-calculate positions and colors inside a spherical shell deterministically
  const [positions, colors] = useMemo(() => {
    const random = createSeededRandom(42);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorYellow = new THREE.Color("#FFE600");
    const colorCyan = new THREE.Color("#00F0FF");

    for (let i = 0; i < count; i++) {
      const u = random();
      const v = random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.0 + random() * 0.25; // Spherical shell thickness

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const finalColor = random() > 0.5 ? colorYellow : colorCyan;
      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;
    }
    return [pos, col];
  }, []);

  const particleTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => {
    return () => {
      particleTexture?.dispose();
    };
  }, [particleTexture]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    if (!hovered) {
      pointsRef.current.rotation.x = time * 0.15;
      pointsRef.current.rotation.y = time * 0.25;
    } else {
      pointsRef.current.rotation.y += 0.015;
    }
  });

  return (
    <points
      ref={pointsRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
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
        size={0.12}
        vertexColors
        transparent
        opacity={0.9}
        map={particleTexture || undefined}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
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
          3D ORB PLAYBOX
        </h3>
      </div>

      <div className="h-[200px] w-full bg-neutral-950 rounded-xl relative overflow-hidden shadow-inner border border-white/[0.05]">
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <ambientLight intensity={0.5} />
          <ParticleSphere />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <p className="text-xs font-mono text-black/50">
        * Interactive cosmic particle shell using React-Three-Fiber.
      </p>
    </BentoCard>
  );
}
