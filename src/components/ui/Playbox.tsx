"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import BentoCard from "./BentoCard";

function ParticleMountain() {
  const pointsRef = useRef<THREE.Points>(null!);
  const [hovered, setHovered] = useState(false);

  const rows = 35;
  const cols = 35;
  const count = rows * cols;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorWhite = new THREE.Color("#FFFFFF");
    const colorBlue = new THREE.Color("#0A5CFF");
    const colorGray = new THREE.Color("#555555");

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        // Grid positions from -1.5 to 1.5
        const x = (c / (cols - 1) - 0.5) * 3;
        const z = (r / (rows - 1) - 0.5) * 3;

        // Generate mountain contours using exp-distance peaks
        const d1 = Math.sqrt(x * x + z * z);
        const d2 = Math.sqrt((x - 0.6) * (x - 0.6) + (z + 0.6) * (z + 0.6));
        const y = 0.8 * Math.exp(-d1 * d1 * 2.5) + 0.45 * Math.exp(-d2 * d2 * 3.5) - 0.3;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        // Higher peaks are Gundam Blue, valleys are gray, general slopes are white
        let finalColor = colorWhite;
        if (y > 0.25) {
          finalColor = colorBlue;
        } else if (y < -0.15) {
          finalColor = colorGray;
        }

        col[idx * 3] = finalColor.r;
        col[idx * 3 + 1] = finalColor.g;
        col[idx * 3 + 2] = finalColor.b;
      }
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    if (!hovered) {
      pointsRef.current.rotation.y = time * 0.15;
    } else {
      pointsRef.current.rotation.y += 0.01;
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
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={true}
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
          TOPO PEAK PLAYBOX
        </h3>
      </div>

      <div className="h-[200px] w-full bg-black rounded-none relative overflow-hidden border-2 border-black">
        <Canvas camera={{ position: [0, 1.2, 2.5], fov: 55 }}>
          <ambientLight intensity={0.5} />
          <ParticleMountain />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <p className="text-xs font-mono text-black/50">
        * Interactive topographic peak mesh using React-Three-Fiber.
      </p>
    </BentoCard>
  );
}
