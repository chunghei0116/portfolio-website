"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useRef, Suspense } from "react";

function HeroMechObject() {
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.04;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.15, 0.06);
      groupRef.current.rotation.z = time * 0.015;
    }
  });

  const isMobile = viewport.width < 7;
  const posX = isMobile ? 0 : 1.8;
  const posY = isMobile ? 1.0 : 0;
  const posZ = isMobile ? -2.5 : -2;
  const scaleVal = isMobile ? 1.4 : 2.2;

  return (
    <group ref={groupRef} position={[posX, posY, posZ]} scale={[scaleVal, scaleVal, scaleVal]}>
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
    <section className="relative flex min-h-[85vh] w-full flex-col justify-end px-6 sm:px-8 md:px-16 pt-32 pb-16 overflow-hidden bg-transparent">
      {/* Premium Cybernetic Network Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.72] pointer-events-none select-none"
        style={{ backgroundImage: "url('/light_cyber_mesh_bg.jpg')" }}
      />
      {/* Light vignette gradient overlay for the image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/30 via-transparent to-background pointer-events-none" />

      {/* 3D Hero Background Canvas underlay (Only contains the heavy mech HUD crosshairs) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <HeroMechObject />
          </Suspense>
        </Canvas>
      </div>

      {/* Absolute Survey Header bar */}
      <div className="absolute top-28 left-0 w-full flex justify-between items-center px-6 sm:px-8 md:px-16 font-mono text-[8px] sm:text-[10px] tracking-wider text-neutral-500 opacity-80 select-none z-10">
        <span>ROUTE DIRECTORY v4 // EXPEDITION ACTIVE</span>
        <span className="hidden sm:inline">DAVOS, GRISONS, CH</span>
      </div>

      {/* Gundam Blue Trail Marker Segment [Blue | White | Blue] */}
      <div className="relative z-10 flex h-[8px] w-[60px] border border-black/5 rounded-full overflow-hidden mb-6 bg-white/40 backdrop-blur-xs">
        <div className="flex-1 bg-accent-blue" />
        <div className="flex-1 bg-black/10" />
        <div className="flex-1 bg-accent-blue" />
      </div>

      {/* Giant Deconstructed Swiss Grotesque Headline */}
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <h1 className="swiss-massive-heading text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem]">
            <motion.span variants={lineVariants} className="block">
              CHUNG HEI
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              ENGINEERING
            </motion.span>
            <motion.span variants={lineVariants} className="block text-accent-blue">
              ROBUST SYSTEMS
            </motion.span>
          </h1>

          {/* Subtext describing core expertise */}
          <motion.p
            variants={lineVariants}
            className="mt-6 font-mono text-[0.8rem] md:text-sm font-bold uppercase tracking-wide text-moss-shadow max-w-[65ch] leading-relaxed"
          >
            DEVOPS INFRASTRUCTURE &amp; MOBILE APPLICATIONS. I BUILD SCALABLE AUTOMATION SYSTEMS AND CROSS-PLATFORM NATIVE PRODUCTS.
          </motion.p>

          {/* Premium Neo-Brutalist CTAs */}
          <motion.div
            variants={lineVariants}
            className="mt-8 flex flex-wrap gap-4 items-center"
          >
            <a
              href="#projects"
              className="bg-accent-blue text-white border border-black/5 px-6 py-3 font-mono text-[0.75rem] font-bold uppercase transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)] rounded-full active:translate-y-[-1px] active:scale-[0.98]"
            >
              EXPLORE PROJECTS
            </a>
            <a
              href="#contact"
              className="bg-white/80 text-neutral-900 border border-black/10 px-6 py-3 font-mono text-[0.75rem] font-bold uppercase transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] rounded-full active:translate-y-[-1px] active:scale-[0.98] backdrop-blur-xs"
            >
              CONTACT ME
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
