"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";

export default function Particles() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { mouse } = useThree();

  // Resolution for physics grid (optimized for 60fps performance on all devices)
  const cols = 32;
  const rows = 20;

  // Set up Cannon.js physics world inside useMemo to persist across renders
  const [world, particles] = useMemo(() => {
    const w = new CANNON.World({
      gravity: new CANNON.Vec3(0, 0, 0) // Zero gravity so the cloth stays centered in space
    });

    const list: CANNON.Body[][] = [];
    const width = 24;
    const height = 16;
    const dx = width / cols;
    const dy = height / rows;
    const mass = 0.8;
    const particleShape = new CANNON.Particle();

    // 1. Create particles
    for (let c = 0; c <= cols; c++) {
      list.push([]);
      for (let r = 0; r <= rows; r++) {
        // Position on X-Y plane
        const x = (c / cols - 0.5) * width;
        const y = (r / rows - 0.5) * height;
        
        // Pin the left (c = 0) and right (c = cols) edges by setting mass to 0
        const isPinned = c === 0 || c === cols;

        const body = new CANNON.Body({
          mass: isPinned ? 0 : mass,
          shape: particleShape,
          position: new CANNON.Vec3(x, y, 0),
          linearDamping: 0.5, // Help stabilize the cloth waves
          angularDamping: 0.5
        });

        list[c].push(body);
        w.addBody(body);
      }
    }

    // 2. Connect distance constraints (springs) between neighbors
    const connect = (c1: number, r1: number, c2: number, r2: number) => {
      const p1 = list[c1][r1];
      const p2 = list[c2][r2];
      const distance = p1.position.distanceTo(p2.position);
      w.addConstraint(new CANNON.DistanceConstraint(p1, p2, distance));
    };

    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        if (c < cols) connect(c, r, c + 1, r); // Horizontal springs
        if (r < rows) connect(c, r, c, r + 1); // Vertical springs
        if (c < cols && r < rows) {
          connect(c, r, c + 1, r + 1); // Diagonal shear springs
        }
      }
    }

    return [w, list];
  }, [cols, rows]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Apply wind forces to all non-pinned particles
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        const body = particles[c][r];
        if (body.mass > 0) {
          // Dynamic wind blowing along the local Z-axis (height direction once rotated)
          const windParam = (body.position.x + 12) / 24 + (body.position.y + 8) / 16;
          
          const primaryWind = Math.sin(windParam * 2.2 - time * 0.45) * 1.5;
          const secondaryWind = Math.cos((body.position.x - body.position.y) * 0.14 - time * 0.9) * 0.4;
          
          // Apply force to physics body
          body.force.set(0, 0, primaryWind + secondaryWind);
        }
      }
    }

    // Step physics simulation
    world.step(1 / 60);

    // Sync mesh geometry positions with physics particles
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        const body = particles[c][r];
        const index = (r * (cols + 1) + c) * 3;
        
        pos[index] = body.position.x;
        pos[index + 1] = body.position.y;
        pos[index + 2] = body.position.z;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  // Generate a procedural canvas-based noise texture to simulate fabric fibers and grain
  const grainTexture = useMemo(() => {
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    
    // Create high-frequency noise representing cloth threads/grain
    const imgData = ctx.createImageData(128, 128);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 90;
      const val = Math.min(255, Math.max(0, 128 + noise));
      data[i] = val;     // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      data[i + 3] = 255; // A
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(40, 26); // Repeat the noise tightly for fine, detailed grain
    return texture;
  }, []);

  // Load the generated Renaissance fresco image to place behind the cloth
  const bgTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const loader = new THREE.TextureLoader();
    const texture = loader.load("/images/renaissance_fresco.jpg");
    return texture;
  }, []);

  return (
    <group>
      {/* Background image mesh positioned under the waving cloth */}
      {bgTexture && (
        <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[22, 14]} />
          <meshBasicMaterial map={bgTexture} />
        </mesh>
      )}

      {/* Main waving cloth mesh with reduced opacity for transparency */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 16, cols, rows]} />
        <meshStandardMaterial
          color="#D39E43" // Amber gold
          roughness={0.8} // Highly matte Renaissance textile
          metalness={0.12}
          transparent
          opacity={0.6} // Reduced opacity to allow viewing the background image through it
          side={THREE.DoubleSide}
          bumpMap={grainTexture || undefined}
          bumpScale={0.06} // Tiny displacement for micro-fiber texture
          roughnessMap={grainTexture || undefined}
        />
      </mesh>
    </group>
  );
}

