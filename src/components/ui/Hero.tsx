"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useRef, useMemo, Suspense } from "react";

interface ParticleMetadata {
  x: number;
  y: number;
  speedY: number;
  wobbleSpeed: number;
  wobbleForce: number;
}

function HeroParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();
  const count = 350;

  const [positions, colors, metadata] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const meta: ParticleMetadata[] = [];

    const colorBlue = new THREE.Color("#0A5CFF");
    const colorBlack = new THREE.Color("#000000");

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 4;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const isBlue = Math.random() < 0.45;
      const activeColor = isBlue ? colorBlue : colorBlack;
      cols[i * 3] = activeColor.r;
      cols[i * 3 + 1] = activeColor.g;
      cols[i * 3 + 2] = activeColor.b;

      meta.push({
        x,
        y,
        speedY: 0.006 + Math.random() * 0.012,
        wobbleSpeed: 0.4 + Math.random() * 0.6,
        wobbleForce: 0.04 + Math.random() * 0.06,
      });
    }

    return [pos, cols, meta];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const m = metadata[i];

      pos[i3 + 1] += m.speedY;
      pos[i3] = m.x + Math.sin(time * m.wobbleSpeed + i) * m.wobbleForce;

      const dx = pos[i3] - mx;
      const dy = pos[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2.0) {
        const force = (2.0 - dist) / 2.0;
        pos[i3] += (dx / (dist || 0.1)) * force * 0.1;
        pos[i3 + 1] += (dy / (dist || 0.1)) * force * 0.1;
      }

      if (pos[i3 + 1] > 6) {
        pos[i3 + 1] = -6;
        pos[i3] = (Math.random() - 0.5) * 16;
        m.x = pos[i3];
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -mouse.y * 0.12, 0.06);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouse.x * 0.12, 0.06);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        vertexColors
        sizeAttenuation={true}
        transparent
        opacity={0.7}
      />
    </points>
  );
}

function HeroMechObject() {
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.04;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.15, 0.06);
      groupRef.current.rotation.z = time * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, -2]} scale={[2.2, 2.2, 2.2]}>
      {/* Heavy Mech HUD outer ring */}
      <mesh>
        <torusGeometry args={[1.5, 0.012, 8, 64]} />
        <meshBasicMaterial color="#0A5CFF" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Target scanning circle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.05, 12, 1, true]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.04} />
      </mesh>

      {/* Sphere core */}
      <mesh>
        <sphereGeometry args={[0.7, 10, 10]} />
        <meshBasicMaterial color="#0A5CFF" wireframe transparent opacity={0.03} />
      </mesh>

      {/* Target crosshair lines */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.008, 0.008]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.05} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.008, 2.2, 0.008]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] w-full flex-col justify-end px-8 md:px-16 pt-32 pb-16 overflow-hidden bg-transparent">
      {/* 3D Hero Background Canvas underlay */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <HeroParticles />
            <HeroMechObject />
          </Suspense>
        </Canvas>
      </div>

      {/* Absolute Survey Header bar */}
      <div className="absolute top-24 left-0 w-full flex justify-between items-center px-8 md:px-16 text-alpine-mono opacity-80 select-none z-10">
        <span>ROUTE DIRECTORY v4 // EXPEDITION ACCLIMATIZED</span>
        <span>DAVOS, GRISONS, CH</span>
      </div>

      {/* Gundam Blue Trail Marker Segment [Blue | White | Blue] */}
      <div className="relative z-10 flex h-[16px] w-[70px] brutalist-border overflow-hidden mb-6">
        <div className="flex-1 bg-accent-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-accent-blue" />
      </div>

      {/* Giant Deconstructed Swiss Grotesque Headline */}
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="swiss-massive-heading text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem]"
        >
          <motion.span variants={lineVariants} className="block">
            CHUNG HEI
          </motion.span>
          <motion.span variants={lineVariants} className="block">
            ENGINEERING
          </motion.span>
          <motion.span variants={lineVariants} className="block text-accent-blue">
            ROBUST SYSTEMS
          </motion.span>
        </motion.h1>
      </div>
    </section>
  );
}
