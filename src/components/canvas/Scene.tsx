"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState, useCallback, useRef } from "react";
import * as THREE from "three";

function CastleTower() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.04;
    }
  });

  const bricks = [];
  const layers = 8;
  const bricksPerLayer = 10;
  const radius = 1.4;
  const brickHeight = 0.38;

  const activeMat = new THREE.MeshBasicMaterial({ 
    color: "#c9894d", 
    wireframe: true, 
    transparent: true, 
    opacity: 0.35 
  });
  
  const mutedMat = new THREE.MeshBasicMaterial({ 
    color: "#8b5a2b", 
    wireframe: true, 
    transparent: true, 
    opacity: 0.15 
  });

  for (let l = 0; l < layers; l++) {
    const y = l * (brickHeight + 0.04) - 1.4;
    const offsetAngle = (l % 2) * (Math.PI / bricksPerLayer);
    
    for (let b = 0; b < bricksPerLayer; b++) {
      // Crenellations on the top layer
      if (l === layers - 1 && b % 2 === 0) continue;
      // Weathered ruined bricks gaps
      if (l < layers - 1 && (l + b) % 11 === 0) continue;

      const angle = (b * (Math.PI * 2)) / bricksPerLayer + offsetAngle;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      bricks.push(
        <mesh 
          key={`${l}-${b}`} 
          position={[x, y, z]} 
          rotation={[0, -angle + Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.72, brickHeight, 0.28]} />
          <primitive object={l % 2 === 0 ? activeMat : mutedMat} attach="material" />
        </mesh>
      );
    }
  }

  return (
    <group ref={groupRef} position={[2.4, -0.6, -2]} scale={[1.4, 1.4, 1.4]}>
      {bricks}
    </group>
  );
}

const Scene = () => {
  const [contextLost, setContextLost] = useState(false);

  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      setContextLost(true);
    });
    canvas.addEventListener("webglcontextrestored", () => {
      setContextLost(false);
    });
  }, []);

  if (contextLost) return null;

  return (
    <div className="fixed inset-0 -z-10 w-screen h-screen pointer-events-none bg-transparent select-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 } as any}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={handleCreated}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <CastleTower />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;