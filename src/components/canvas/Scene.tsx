"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState, useCallback, useRef } from "react";
import * as THREE from "three";
import Particles from "./Particles";

function MechBackgroundObject() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.08;
      groupRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, -0.8, -2.5]} scale={[1.8, 1.8, 1.8]}>
      {/* Outer rotating mechanical ring (Gundam Blue accent) */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.6, 0.02, 8, 48]} />
        <meshBasicMaterial color="#0A5CFF" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Inner offset acceleration rings (White/Black wireframe) */}
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.3, 0.015, 6, 36]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Center mechanical cylinder axis */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2.8, 8, 4, true]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.04} />
      </mesh>

      {/* Concentric blueprint disk grids */}
      <mesh position={[0, 0, 1.4]}>
        <ringGeometry args={[0.1, 1.1, 16, 1]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.03} />
      </mesh>
      <mesh position={[0, 0, -1.4]}>
        <ringGeometry args={[0.1, 1.1, 16, 1]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.03} />
      </mesh>

      {/* Outer support struts */}
      {[0, 120, 240].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh key={angle} position={[1.45 * Math.cos(rad), 1.45 * Math.sin(rad), 0]}>
            <boxGeometry args={[0.04, 0.04, 2.5]} />
            <meshBasicMaterial color="#0A5CFF" wireframe transparent opacity={0.04} />
          </mesh>
        );
      })}
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
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={handleCreated}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <Particles />
          <MechBackgroundObject />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;