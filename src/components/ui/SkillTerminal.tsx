"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import BentoCard from "./BentoCard";

interface BalloonState {
  name: string;
  color: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

const initialBalloons: BalloonState[] = [
  { name: "Flutter", color: "#E60000", x: -1.2, y: -0.8, z: 0, vx: 0, vy: 0, vz: 0 },
  { name: "Kubernetes", color: "#1C2E24", x: -0.6, y: 0.2, z: -0.1, vx: 0, vy: 0, vz: 0 },
  { name: "Docker", color: "#7F8E96", x: 0, y: -0.6, z: 0.1, vx: 0, vy: 0, vz: 0 },
  { name: "GitOps / ArgoCD", color: "#000000", x: 0.6, y: 0.6, z: 0, vx: 0, vy: 0, vz: 0 },
  { name: "Next.js / React", color: "#E60000", x: 1.2, y: -0.4, z: -0.2, vx: 0, vy: 0, vz: 0 },
  { name: "AWS Cloud", color: "#1C2E24", x: 1.4, y: 0.8, z: 0.2, vx: 0, vy: 0, vz: 0 },
];

function BalloonPhysics({ windTrigger, resetWind }: { windTrigger: boolean; resetWind: () => void }) {
  const balloons = useRef<BalloonState[]>(JSON.parse(JSON.stringify(initialBalloons)));
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    // Convert 2D cursor coords to approximate bounds matching our orthographic/fov plane
    const mouseX = state.pointer.x * 2.2;
    const mouseY = state.pointer.y * 1.5;

    const radius = 0.35;
    const list = balloons.current;

    for (let i = 0; i < list.length; i++) {
      const b = list[i];

      // Gentler buoyancy force (float upwards)
      b.vy += 0.0006;
      // Soft random Brownian movements
      b.vx += (Math.random() - 0.5) * 0.0015;
      b.vy += (Math.random() - 0.5) * 0.0015;

      // Wind Gust Impulse Trigger
      if (windTrigger) {
        b.vx += (Math.random() - 0.5) * 0.25;
        b.vy += (Math.random() - 0.5) * 0.25;
        b.vz += (Math.random() - 0.5) * 0.15;
      }

      // Cursor/Mouse repulsion
      const dx = b.x - mouseX;
      const dy = b.y - mouseY;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      if (distToMouse < 0.9) {
        const force = (0.9 - distToMouse) * 0.02;
        b.vx += (dx / (distToMouse || 0.01)) * force;
        b.vy += (dy / (distToMouse || 0.01)) * force;
      }

      // Ball-to-Ball Collision Repulsion
      for (let j = i + 1; j < list.length; j++) {
        const other = list[j];
        const sx = b.x - other.x;
        const sy = b.y - other.y;
        const sz = b.z - other.z;
        const sdist = Math.sqrt(sx * sx + sy * sy + sz * sz);
        const minDist = radius * 2.0;

        if (sdist < minDist) {
          const overlap = minDist - sdist;
          const pushFactor = overlap * 0.06;
          const forceX = (sx / (sdist || 0.01)) * pushFactor;
          const forceY = (sy / (sdist || 0.01)) * pushFactor;
          const forceZ = (sz / (sdist || 0.01)) * pushFactor;

          b.vx += forceX;
          b.vy += forceY;
          b.vz += forceZ;
          other.vx -= forceX;
          other.vy -= forceY;
          other.vz -= forceZ;
        }
      }

      // Apply coordinates update
      b.x += b.vx;
      b.y += b.vy;
      b.z += b.vz;

      // Soft damping friction
      b.vx *= 0.94;
      b.vy *= 0.94;
      b.vz *= 0.94;

      // Boundary Collisions X
      if (b.x > 2.0) {
        b.x = 2.0;
        b.vx *= -0.7;
      } else if (b.x < -2.0) {
        b.x = -2.0;
        b.vx *= -0.7;
      }

      // Boundary Collisions Y
      if (b.y > 1.3) {
        b.y = 1.3;
        b.vy *= -0.7;
      } else if (b.y < -1.3) {
        b.y = -1.3;
        b.vy *= -0.7;
      }

      // Boundary Collisions Z
      if (b.z > 0.4) {
        b.z = 0.4;
        b.vz *= -0.7;
      } else if (b.z < -0.4) {
        b.z = -0.4;
        b.vz *= -0.7;
      }

      // Update actual rendered mesh position
      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.set(b.x, b.y, b.z);
      }
    }

    if (windTrigger) {
      resetWind();
    }
  });

  return (
    <>
      {initialBalloons.map((item, index) => (
        <mesh
          key={item.name}
          ref={(el) => {
            meshRefs.current[index] = el;
          }}
          castShadow
        >
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color={item.color}
            roughness={0.2}
            metalness={0.1}
          />
          <Html center distanceFactor={4}>
            <div className="bg-white text-black font-mono text-[9px] font-black px-2 py-0.5 border border-black uppercase whitespace-nowrap select-none shadow-[2px_2px_0px_#000000] pointer-events-none">
              {item.name}
            </div>
          </Html>
        </mesh>
      ))}
    </>
  );
}

export default function SkillTerminal() {
  const [windTrigger, setWindTrigger] = useState(false);

  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
            Ascent Skills // Core Telemetry
          </span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 bg-neutral-200 border border-black" />
            <span className="w-2.5 h-2.5 bg-neutral-200 border border-black" />
            <span className="w-2.5 h-2.5 bg-neutral-200 border border-black" />
          </div>
        </div>
        <div className="flex items-baseline justify-between mt-4">
          <h3 className="text-2xl font-black tracking-tight text-black uppercase">
            SKILL ASCENT
          </h3>
          <button
            onClick={() => setWindTrigger(true)}
            className="bg-accent-red text-white border-2 border-black px-3 py-1 font-mono text-[0.65rem] font-bold uppercase transition-all duration-100 shadow-[2px_2px_0px_#000000] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[1px_1px_0px_#000000]"
          >
            TRIGGER GUST // 💨
          </button>
        </div>
      </div>

      <div className="mt-4 h-[220px] w-full bg-neutral-100 border-[3px] border-black relative overflow-hidden rounded-none">
        <Canvas camera={{ position: [0, 0, 2.8], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} intensity={1.5} />
          <BalloonPhysics windTrigger={windTrigger} resetWind={() => setWindTrigger(false)} />
        </Canvas>
      </div>

      <div className="mt-4">
        <p className="text-xs font-mono text-black/50">
          * Float, bounce, and interact. Use mouse cursor to push technology balloons.
        </p>
      </div>
    </BentoCard>
  );
}
