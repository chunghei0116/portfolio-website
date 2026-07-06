"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ScrollingBuildings() {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate 10 modern buildings with staggered Z positions and distinct cool-tone blueprint colors
  const initialBuildings = useMemo(() => [
    { id: 1, x: -0.65, h: 1.8, w: 0.3, z: -1, color: "#1e3a8a" }, // Deep Blue
    { id: 2, x: 0.7, h: 2.3, w: 0.24, z: -2, color: "#0284c7" },  // Sky/Cyan Blue
    { id: 3, x: -0.85, h: 1.4, w: 0.28, z: -3, color: "#1F438A" }, // Steel Blue
    { id: 4, x: 0.6, h: 1.9, w: 0.26, z: -4, color: "#0369a1" },  // Slate Blue
    { id: 5, x: -0.55, h: 2.1, w: 0.25, z: -5, color: "#0891b2" }, // Cyan-teal
    { id: 6, x: 0.8, h: 1.6, w: 0.3, z: -6, color: "#2563eb" },   // Royal Blue
    { id: 7, x: -0.75, h: 2.5, w: 0.22, z: -7, color: "#1d4ed8" },  // Cobalt Blue
    { id: 8, x: 0.5, h: 1.7, w: 0.27, z: -8, color: "#3b82f6" },   // Dodger Blue
    { id: 9, x: -0.9, h: 2.0, w: 0.29, z: -9, color: "#1e3a8a" },   // Deep Blue
    { id: 10, x: 0.75, h: 2.2, w: 0.24, z: -10, color: "#0284c7" } // Sky/Cyan Blue
  ], []);

  useFrame((state, delta) => {
    // Frame-rate independent speed: increased to 1.1 units per second for faster flight feel
    const speed = 1.1 * delta;
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh) => {
        mesh.position.z += speed;
        
        // When a building passes the camera (Z > 1.5), recycle and generate randomized dimensions
        if (mesh.position.z > 1.5) {
          mesh.position.z = -10.5; // Recycle back to horizon (since we have 10 buildings going to z = -10)
          
          // Randomize X offset, ensuring it spawns either on the left or right of flightpath to avoid collisions
          const isLeft = Math.random() < 0.5;
          const posX = isLeft ? -0.5 - Math.random() * 0.55 : 0.5 + Math.random() * 0.55;
          
          // Randomize dimensions
          const height = 0.8 + Math.random() * 1.5;
          const width = 0.2 + Math.random() * 0.15;
          
          mesh.position.x = posX;
          mesh.position.y = height / 2 - 1.1;
          
          // Update the geometry scale dynamically
          const scaleMesh = mesh as THREE.Mesh;
          scaleMesh.scale.set(width / 0.3, height / 1.5, width / 0.3);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {initialBuildings.map((b) => (
        <mesh key={b.id} position={[b.x, b.h / 2 - 1.1, b.z]}>
          {/* Base box geometry. We will scale this mesh procedurally on recycle */}
          <boxGeometry args={[0.3, 1.5, 0.3]} />
          {/* Sleek, procedurally spawning wireframe skyscrapers using individual cool-tone colors */}
          <meshBasicMaterial color={b.color} wireframe transparent opacity={0.09} />
        </mesh>
      ))}
    </group>
  );
}

function PaperAirplane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const lineRef = useRef<THREE.LineSegments>(null!);

  // Define vertices for a classic paper airplane
  // Nose is pointing towards +Z (forward)
  const vertices = useMemo(() => new Float32Array([
    0, 0, 0.8,       // 0: Nose (N)
    0, -0.1, -0.6,   // 1: Center Back Fold (C)
    0.7, 0.1, -0.5,  // 2: Right Wing Tip (R)
    -0.7, 0.1, -0.5, // 3: Left Wing Tip (L)
    0.1, -0.06, -0.55, // 4: Right Under Fold (Rf)
    -0.1, -0.06, -0.55 // 5: Left Under Fold (Lf)
  ]), []);

  // Indices mapping the triangular faces of a folded paper airplane
  const indices = useMemo(() => [
    // Top Right Wing
    0, 2, 4,
    // Top Left Wing
    0, 5, 3,
    // Bottom Right Crease
    0, 4, 1,
    // Bottom Left Crease
    0, 1, 5
  ], []);

  // Build the custom mesh geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [vertices, indices]);

  // Hand-coded explicit line segments to draw EVERY single crease fold 
  // (Including the central spine running down the middle, wing folds, and tips)
  const lineVertices = useMemo(() => new Float32Array([
    // Central Spine (Nose to Back Crease) - CRITICAL for recognisability!
    0, 0, 0.8,         0, -0.1, -0.6,
    // Nose to Right Under Fold (Right Crease)
    0, 0, 0.8,         0.1, -0.06, -0.55,
    // Nose to Left Under Fold (Left Crease)
    0, 0, 0.8,         -0.1, -0.06, -0.55,
    // Nose to Right Wing Tip
    0, 0, 0.8,         0.7, 0.1, -0.5,
    // Nose to Left Wing Tip
    0, 0, 0.8,         -0.7, 0.1, -0.5,
    // Right Under Fold to Right Wing Tip (Wing crease fold)
    0.1, -0.06, -0.55, 0.7, 0.1, -0.5,
    // Left Under Fold to Left Wing Tip (Wing crease fold)
    -0.1, -0.06, -0.55, -0.7, 0.1, -0.5,
    // Right Under Fold to Back Crease (Right Keel)
    0.1, -0.06, -0.55, 0, -0.1, -0.6,
    // Left Under Fold to Back Crease (Left Keel)
    -0.1, -0.06, -0.55, 0, -0.1, -0.6,
    // Back Wing Edges (Right Tip to Right Fold)
    0.7, 0.1, -0.5,    0.1, -0.06, -0.55,
    // Back Wing Edges (Left Tip to Left Fold)
    -0.7, 0.1, -0.5,   -0.1, -0.06, -0.55
  ]), []);

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(lineVertices, 3));
    return geo;
  }, [lineVertices]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Speeded up flight sways to match the faster background scroll
    const posY = Math.sin(time * 1.25) * 0.18;
    const posX = Math.sin(time * 0.85) * 0.45; 
    
    // Banking/rolling (Z-axis)
    const roll = Math.cos(time * 0.85) * 0.3;
    // Steering/yawing (Y-axis)
    const yaw = Math.cos(time * 0.85) * 0.2;
    // Pitching nose up/down slightly (X-axis)
    const pitch = Math.cos(time * 1.25) * 0.06;
    
    if (meshRef.current) {
      meshRef.current.position.set(posX, posY, 0);
      meshRef.current.rotation.set(pitch + 0.05, Math.PI + yaw, roll);
    }
    if (lineRef.current) {
      lineRef.current.position.set(posX, posY, 0);
      lineRef.current.rotation.set(pitch + 0.05, Math.PI + yaw, roll);
    }
  });

  return (
    <group>
      {/* Semi-transparent solid fill representing holographic blueprint paper */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color="#1F438A" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Sharp hand-crafted wireframe creases (Every fold is highly visible) */}
      <lineSegments ref={lineRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#1F438A" linewidth={2.5} transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

function ResponsiveScene() {
  const { size } = useThree();
  // Scale dynamically based on physical canvas height & width (in pixels)
  // Base target: 500px height / 600px width for scale 1.0
  const heightScale = Math.max(0.45, Math.min(1.0, size.height / 500));
  const widthScale = Math.max(0.45, Math.min(1.0, size.width / 600));
  const scale = Math.min(heightScale, widthScale);

  return (
    <group scale={scale}>
      <ScrollingBuildings />
      <PaperAirplane />
    </group>
  );
}

const history = [
  {
    year: "2025 — PRESENT",
    role: "MOBILE APPLICATION DEVELOPER",
    company: "AS Watson Group",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    year: "2023 — 2025",
    role: "PROGRAMMER",
    company: "Asia Allied Infrastructure Group",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate."
  },
  {
    year: "2021",
    role: "SUMMER INTERN",
    company: "EMSD HKSAR",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mollis nunc sed id semper risus in hendrerit gravida rutrum."
  }
];

export default function TechSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12 select-none">
      <div className="grid grid-cols-12 gap-8 brutalist-border bg-card-bg p-4 sm:p-8 brutalist-shadow">
        
        {/* Left Column: Minimalist Vertical Career Timeline (col-span-12 lg:col-span-7) */}
        <div className="col-span-12 lg:col-span-7 min-w-0 w-full max-w-full flex flex-col justify-between">
          <div>
            <span className="text-accent-blue font-mono text-[10px] font-bold uppercase tracking-wider bg-accent-blue/5 border border-black/5 px-2.5 py-0.5">
              CAREER TIMELINE // PATHWAY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-punchy tracking-[-0.04em] leading-none uppercase mt-4 text-foreground mb-8">
              FLIGHT PATHWAY
            </h2>
            
            {/* Brutalist Coordinate Grid Timeline */}
            <div className="flex flex-col border-t border-black/5 divide-y divide-black/5 mt-6 w-full max-w-full">
              {history.map((node) => (
                <div key={node.year} className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-4 w-full max-w-full">
                  {/* Left Metadata Coordinate block */}
                  <div className="flex flex-row md:flex-col items-center md:items-start gap-2.5 min-w-[150px]">
                    <span className="font-mono text-[11px] font-black uppercase tracking-wider bg-white text-neutral-700 border border-black/5 px-2.5 py-1.5 shadow-sm select-none">
                      [ {node.year} ]
                    </span>
                  </div>

                  {/* Right Content Block */}
                  <div className="flex-1 min-w-0 w-full max-w-full">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                      <span className="font-sans font-punchy text-lg sm:text-xl text-foreground tracking-tight uppercase break-words">
                        {node.role}
                      </span>
                      <span className="hidden md:inline text-black/20 font-mono text-xs font-bold select-none">&mdash;&gt;</span>
                      <span className="font-mono text-xs font-black text-accent-blue uppercase tracking-wider md:tracking-widest">
                        {node.company}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-foreground/80 font-semibold mt-2.5 max-w-2xl">
                      {node.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pure 3D Paper Airplane Canvas Window with scrolling skyscrapers (col-span-12 lg:col-span-5) */}
        <div className="col-span-12 lg:col-span-5 min-w-0 min-h-[250px] sm:min-h-[360px] lg:min-h-full border border-black/5 rounded-2xl bg-black/5 relative overflow-hidden z-0 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden rounded-2xl">
            {/* Camera adjusted to a lower, dynamic profile angle looking down slightly at the plane */}
            <Canvas 
              camera={{ position: [0, 0.38, 2.3], fov: 50 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            >
              <ambientLight intensity={1.5} />
              <ResponsiveScene />
            </Canvas>
          </div>
          <span className="absolute bottom-4 right-4 z-10 font-mono text-[8px] text-black/30 font-bold uppercase tracking-widest">
            * 3D LIVE VECTOR FLIGHT SYSTEM
          </span>
        </div>

      </div>
    </section>
  );
}
