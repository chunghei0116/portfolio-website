"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState, useCallback, useRef } from "react";
import * as THREE from "three";
import Particles from "./Particles";



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
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;