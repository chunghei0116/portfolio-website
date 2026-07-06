"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import BentoCard from "./BentoCard";
import { CityEnvironment, CameraController } from "../canvas/CityEnvironment";
import PipelineScene from "../canvas/PipelineScene";
import FlutterParticles, { SodaBubbles } from "../canvas/FlutterParticles";

const projects = [
  {
    title: "PROJECT ALPHA // 3D CANVAS",
    category: "SUMMIT // ROUTE-01",
    description: "A high-performance 3D spatial visualization platform built with React Three Fiber and Next.js 16. Implements custom orbit controllers, high-precision vertex terrain shaders, and dynamic lighting simulation for mountain path explorations.",
    tags: ["Three.js", "R3F", "Next.js 16", "GLSL / Shaders"],
    liveUrl: "#",
    repoUrl: "https://github.com/chunghei0116",
  },
  {
    title: "PROJECT BETA // GENERATIVE ART",
    category: "SUMMIT // ROUTE-02",
    description: "Generative art collections using WebGL shaders and real-time noise displacement vectors.",
    tags: ["WebGL", "Shaders", "GLSL"],
    liveUrl: "#",
    repoUrl: "https://github.com/chunghei0116",
  },
];

interface Day {
  color: string;
  contributionCount: number;
  date: string;
}

// Generate static wave pattern for loading state
const mockContributions: Day[][] = Array.from({ length: 8 }).map((_, w) =>
  Array.from({ length: 7 }).map((_, d) => ({
    color: "#ebedf0",
    contributionCount: Math.floor(
      Math.sin(w * 0.8 + d * 0.5) * 1.5 + Math.cos(w * 0.4 - d * 0.6) * 1.5 + 2
    ),
    date: `2026-01-01`,
  }))
);

function GithubCoinsScene() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Rich silver metallic gradient background for the coin face
    const gradient = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
    gradient.addColorStop(0, "#1E293B"); // Deep charcoal silver shadow
    gradient.addColorStop(0.5, "#334155");
    gradient.addColorStop(0.85, "#94A3B8"); // Muted silver
    gradient.addColorStop(1, "#CBD5E1"); // Light silver edge

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    // Glowing silver outer rim
    ctx.strokeStyle = "#F1F5F9";
    ctx.lineWidth = 14;
    ctx.shadowColor = "#CBD5E1";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(128, 128, 110, 0, Math.PI * 2);
    ctx.stroke();

    // Clean GitHub Icon Path in bright reflective white-silver
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "#E2E8F0";
    ctx.shadowBlur = 14;
    const p = new Path2D(
      "M128 40c-48.6 0-88 39.4-88 88 0 38.9 25.2 71.9 60.2 83.5 4.4.8 6-.9 6-4.2 0-2.1-.1-7.6-.1-14.9-24.5 5.3-29.7-11.8-29.7-11.8-4-10.2-9.8-12.9-9.8-12.9-8-5.5.6-5.4.6-5.4 8.8.6 13.5 9.1 13.5 9.1 7.9 13.5 20.7 9.6 25.7 7.3.8-5.7 3.1-9.6 5.6-11.8-19.5-2.2-40.1-9.8-40.1-43.5 0-9.6 3.4-17.5 9.1-23.7-.9-2.2-4-11.2.9-23.4 0 0 7.4-2.4 24.2 9 7-2 14.6-2.9 22.1-3 7.5 0 15 1 22.1 3 16.8-11.4 24.2-9 24.2-9 4.9 12.2 1.8 21.2.9 23.4 5.7 6.2 9.1 14.1 9.1 23.7 0 33.8-20.6 41.2-40.2 43.4 3.2 2.7 6 8.2 6 16.5 0 11.9-.1 21.5-.1 24.4 0 3.3 1.6 5.1 6 4.2 35-11.7 60.2-44.7 60.2-83.5 0-48.6-39.4-88-88-88z"
    );
    ctx.fill(p);

    const tex = new THREE.CanvasTexture(canvas);
    setTexture(tex);
  }, []);

  const coinCount = 10;
  // Initialize coin physics parameters
  const coins = useRef(
    Array.from({ length: coinCount }).map((_, i) => {
      // Alternate sizes and initial depths
      const scale = 0.22 + Math.random() * 0.12;
      return {
        pos: [
          (Math.random() - 0.5) * 4.0, // x
          (Math.random() - 0.5) * 2.8, // y
          (Math.random() - 0.5) * 2.0, // z
        ] as [number, number, number],
        rotSpeed: [
          (Math.random() - 0.5) * 0.8 + 0.3, // rx
          Math.random() * 1.6 + 0.8,         // ry (main flip axis)
          (Math.random() - 0.5) * 0.4,       // rz
        ] as [number, number, number],
        drift: [
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.003,
        ] as [number, number, number],
        scale,
        phase: Math.random() * Math.PI * 2,
      };
    })
  ).current;

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, idx) => {
      const coin = coins[idx];
      if (!coin) return;

      // Update coin rotation (spinning & flipping)
      child.rotation.x += coin.rotSpeed[0] * 0.012;
      child.rotation.y += coin.rotSpeed[1] * 0.015;
      child.rotation.z += coin.rotSpeed[2] * 0.006;

      // Continuous floating movement
      child.position.x += coin.drift[0];
      child.position.y += coin.drift[1] + Math.sin(time * 0.8 + coin.phase) * 0.0015;
      child.position.z += coin.drift[2];

      // Screen boundary wrapping / bouncing
      if (Math.abs(child.position.x) > 2.5) {
        coin.drift[0] *= -1;
      }
      if (Math.abs(child.position.y) > 1.8) {
        coin.drift[1] *= -1;
      }
      if (Math.abs(child.position.z) > 1.5) {
        coin.drift[2] *= -1;
      }
    });
  });

  if (!texture) return null;

  return (
    <group ref={groupRef}>
      {coins.map((coin, idx) => (
        <mesh key={idx} position={coin.pos} scale={coin.scale}>
          {/* Cylinder representing a coin: [radiusTop, radiusBottom, height, radialSegments] */}
          <cylinderGeometry args={[0.8, 0.8, 0.08, 32]} />
          {/* 3 Materials: [rim, top cap, bottom cap] */}
          <meshStandardMaterial attach="material-0" color="#E2E8F0" metalness={1.0} roughness={0.05} />
          <meshStandardMaterial attach="material-1" map={texture} roughness={0.08} metalness={0.95} />
          <meshStandardMaterial attach="material-2" map={texture} roughness={0.08} metalness={0.95} />
        </mesh>
      ))}
    </group>
  );
}


export default function BentoGrid() {
  const [githubCount, setGithubCount] = useState<string>("4.8K+");
  const [contributions, setContributions] = useState<Day[][]>([]);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data.count) {
          const num = Number(data.count);
          if (num >= 1000) {
            setGithubCount(`${(num / 1000).toFixed(1)}K+`);
          } else {
            setGithubCount(`${num}+`);
          }
        }
        if (Array.isArray(data.contributions)) {
          setContributions(data.contributions);
        }
      })
      .catch((err) => {
        console.error("Error fetching github count", err);
      });
  }, []);

  return (
    <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 scroll-mt-24 select-none">
      <div className="grid grid-cols-12 gap-6 auto-rows-min">
        
        {/* Card A: GITHUB - 3D Landscape Stat (col-span-4) */}
        <div className="col-span-12 md:col-span-4 min-w-0 brutalist-border bg-[#0D1117] bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px] text-white min-h-[220px] md:min-h-[240px] brutalist-shadow brutalist-hover-lift flex flex-col justify-between relative overflow-hidden">
          
          {/* Background 3D Rotating Contribution Scene */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none select-none">
            <Canvas camera={{ position: [3, 2.5, 3], fov: 40 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 12, 10]} intensity={12.0} />
              <pointLight position={[2, 3, 2]} intensity={8.0} />
              <pointLight position={[-3, -2, -3]} intensity={5.0} />
              <GithubCoinsScene />
            </Canvas>
          </div>

          <div className="p-5 sm:p-7 relative z-10 pointer-events-none w-full">
            <div className="border-b-2 border-white/10 pb-2.5">
              <span className="font-mono text-[0.75rem] md:text-sm font-bold tracking-[0.15em] uppercase text-white/85">
                GITHUB CONTRIBUTIONS
              </span>
            </div>

            <div className="mt-5">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-sans font-punchy tracking-[-0.05em] leading-none uppercase text-white">
                {githubCount}
              </h3>
            </div>
          </div>

          <div className="p-5 sm:p-7 pt-0 relative z-10 w-full">
            <a
              href="https://github.com/chunghei0116"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between font-mono text-[9px] md:text-xs font-black uppercase tracking-widest text-[#39D353]/90 border-t border-white/10 pt-3 group hover:text-[#39D353]"
            >
              <span className="group-hover:underline">VIEW PROFILE</span>
              <svg className="w-3.5 h-3.5 fill-current transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Card B: PROJECT ALPHA - Massive Heading (col-span-8) */}
        <BentoCard className="col-span-12 md:col-span-8 flex flex-col justify-between min-h-[160px] md:min-h-[200px] relative overflow-hidden">
          {/* Background Line-art illustration */}
          <div className="absolute right-0 bottom-0 top-0 w-full sm:w-1/2 opacity-35 z-0 pointer-events-none select-none mix-blend-multiply">
            <img 
              src="/lineart_tauri.jpg" 
              alt="Project Alpha Line-art" 
              className="w-full h-full object-contain object-right-bottom"
            />
          </div>

          <div className="relative z-10 pointer-events-none">
            <span className="font-mono text-[0.75rem] md:text-sm font-bold tracking-[0.15em] text-foreground/50 uppercase">
              ROUTE-01
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-sans font-punchy tracking-[-0.04em] leading-tight uppercase mt-4 text-foreground">
              PROJECT ALPHA
            </h3>
          </div>
          <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/50 relative z-10">
            3D CANVAS VISUALIZATION
          </span>
        </BentoCard>

        {/* Card C: ROUTE LOG / TIMELINE (col-span-3, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[240px] md:min-h-[380px]">
          <div>
            <span className="font-mono text-[0.75rem] md:text-sm font-bold tracking-[0.15em] text-foreground/50 uppercase border-b border-black/5 pb-1.5 inline-block w-full">
              ROUTE LOG
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-punchy tracking-[-0.04em] leading-none uppercase mt-6 text-foreground">
              2026
            </h3>
            <div className="flex flex-col gap-5 mt-6 font-sans font-bold text-[10px] sm:text-xs md:text-base leading-none text-foreground uppercase tracking-tight">
              <div>Q1 SYNC</div>
              <div className="text-accent-blue">Q2 BRIDGE</div>
              <div className="text-foreground/40">Q3 STABLE</div>
            </div>
          </div>
          <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/40">
            PROGRESS ARCHIVE
          </span>
        </BentoCard>

        {/* Card D: WELCOME PROFILE - Center Focal Card (col-span-6, row-span-2) with static 3D City background and giant Swiss typography */}
        <div 
          className="col-span-12 md:col-span-6 md:row-span-2 min-w-0 flex flex-col justify-end min-h-[280px] md:min-h-[380px] bg-white/78 backdrop-blur-md border border-black/5 shadow-xl shadow-black/5 hover:border-accent-blue/20 hover:shadow-accent-blue/5 hover:-translate-y-1 relative overflow-hidden p-5 sm:p-8 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {/* Static Background 3D City Canvas */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            <Canvas camera={{ position: [0, 0.5, 2.8], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[5, 5, 5]} intensity={2} />
              <CityEnvironment isExpanded={false} />
              <CameraController isExpanded={false} />
            </Canvas>
          </div>

          <div className="relative z-10 pointer-events-none w-full flex flex-col justify-end">
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-sans font-punchy tracking-[-0.05em] leading-[0.8] uppercase text-foreground">
              CHUNG HEI
            </h3>
            <div className="border-t border-black/5 pt-4 mt-6">
              <h4 className="text-base sm:text-lg md:text-2xl font-sans font-punchy tracking-tight uppercase leading-none text-foreground">
                DEVOPS & MOBILE
              </h4>
            </div>
          </div>
        </div>

        {/* Card E: PROJECT BETA - Small square project card (col-span-3, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[240px] md:min-h-[380px] relative overflow-hidden">
          {/* Background Line-art illustration */}
          <div className="absolute inset-x-0 bottom-8 h-1/2 opacity-45 z-0 pointer-events-none select-none mix-blend-multiply">
            <img 
              src="/lineart_flutter.jpg" 
              alt="Project Beta Line-art" 
              className="w-full h-full object-contain object-bottom"
            />
          </div>

          <div className="relative z-10 pointer-events-none">
            <span className="font-mono text-[0.75rem] md:text-sm font-bold tracking-[0.15em] text-foreground/50 uppercase border-b border-black/5 pb-1.5 inline-block w-full">
              ROUTE-02
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-punchy tracking-[-0.04em] leading-none uppercase mt-6 text-foreground">
              PROJECT BETA
            </h3>
          </div>
          <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/50 leading-snug relative z-10">
            WEBGL SHADERS & DISPLACEMENTS
          </span>
        </BentoCard>

        {/* Card F: GITOPS PIPELINE (col-span-8) */}
        <div className="col-span-12 md:col-span-8 min-w-0 brutalist-border bg-accent-blue text-white p-5 sm:p-8 brutalist-shadow brutalist-hover-lift flex flex-col justify-between min-h-[280px] md:min-h-[240px] relative overflow-hidden">
          
          {/* Absolute Background 3D Flowing Pipeline Canvas */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none select-none">
            <Canvas camera={{ position: [0, 0, 1.8], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <PipelineScene />
            </Canvas>
          </div>

          {/* Frosted Glass Overlay for Readability */}
          <div className="absolute inset-0 z-[5] bg-accent-blue/60 backdrop-blur-[3px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 w-full relative z-10 pointer-events-none">
            <div>
              <span className="font-mono text-[0.75rem] md:text-sm font-bold tracking-[0.15em] text-white/85 uppercase border-b border-white/20 pb-1.5 inline-block">
                SYSTEM DEPLOYMENTS
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-punchy tracking-[-0.04em] leading-none uppercase text-white mt-4">
                DEVOPS CORE
              </h3>
            </div>
          </div>

          {/* 3-Column Typographic DevOps Stack Grid with Custom SVG Icons */}
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6 mt-6 relative z-10 pointer-events-none">
            <div className="flex flex-col items-start">
              {/* Kubernetes heptagon-wheel icon (Purple to match upper branch) */}
              <svg className="w-6 h-6 text-[#c084fc] mb-3 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L20.5 7v10L12 22L3.5 17V7L12 2z" />
                <path d="M12 2v20M3.5 7l17 10M3.5 17l17-10" />
                <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
              </svg>
              <span className="font-sans font-punchy text-[10px] sm:text-xs md:text-sm uppercase text-white tracking-tight block mb-1">01 / KUBERNETES</span>
              <span className="font-mono text-[8px] sm:text-[9px] md:text-[11px] uppercase tracking-wide text-white/60">ArgoCD, GitOps loops, Helm, EKS cluster deploys</span>
            </div>
            <div className="flex flex-col items-start">
              {/* Docker/Hypervisor isometric container stack icon (Emerald to match middle branch) */}
              <svg className="w-6 h-6 text-[#34d399] mb-3 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
                <path d="M2 7v10M12 12v10M22 7v10" />
              </svg>
              <span className="font-sans font-punchy text-[10px] sm:text-xs md:text-sm uppercase text-white tracking-tight block mb-1">02 / HYPERVISOR</span>
              <span className="font-mono text-[8px] sm:text-[9px] md:text-[11px] uppercase tracking-wide text-white/60">Docker containers, multi-stage hermetic builds</span>
            </div>
            <div className="flex flex-col items-start">
              {/* Bare-Metal Server Rack icon (Amber/Orange to match lower branch) */}
              <svg className="w-6 h-6 text-[#fb923c] mb-3 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="5" rx="1" />
                <rect x="2" y="11" width="20" height="5" rx="1" />
                <rect x="2" y="19" width="20" height="5" rx="1" />
                <path d="M6 5.5h.01M6 13.5h.01M6 21.5h.01" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M17 5.5h2M17 13.5h2M17 21.5h2" strokeWidth="1.2" />
              </svg>
              <span className="font-sans font-punchy text-[10px] sm:text-xs md:text-sm uppercase text-white tracking-tight block mb-1">03 / BARE-METAL</span>
              <span className="font-mono text-[8px] sm:text-[9px] md:text-[11px] uppercase tracking-wide text-white/60">Linux systems, self-hosted homelabs, AWS cloud</span>
            </div>
          </div>
        </div>

        {/* Card G: Interactive Flutter Particle Canvas (col-span-4) */}
        <BentoCard className="col-span-12 md:col-span-4 min-w-0 min-h-[180px] md:min-h-[240px] relative overflow-hidden !bg-[radial-gradient(circle_at_center,rgba(57,206,253,0.15)_0%,rgba(255,255,255,1)_70%)]">
          {/* Background Interactive Flutter Particle Canvas */}
          <div className="absolute inset-0 z-0 opacity-100 select-none">
            <Canvas camera={{ position: [0, 0, 1.8], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <SodaBubbles />
              <FlutterParticles />
            </Canvas>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
