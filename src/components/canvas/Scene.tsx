"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState, useCallback, useRef, useEffect } from "react";
import * as THREE from "three";
import Particles from "./Particles";

function CameraController({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    // Push the camera further away on mobile (Y=18 instead of Y=10) to display more of the sheet
    camera.position.set(0, isMobile ? 18 : 10, 0);
    camera.updateProjectionMatrix();
  }, [isMobile, camera]);

  return null;
}

const Scene = () => {
  const [contextLost, setContextLost] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    <div className="fixed inset-0 -z-10 w-screen h-screen pointer-events-none bg-background select-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 10, 0], fov: 60, up: [0, 0, -1] }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={handleCreated}
        frameloop="always"
      >
        <ambientLight intensity={0.15} color="#FAF6EE" />
        {/* Main dramatic key spotlight from the top-left side */}
        <spotLight
          position={[-10, 8, -5]}
          intensity={90}
          angle={Math.PI / 4.5}
          penumbra={0.6}
          color="#E5C158"
        />
        {/* Fill spotlight from the bottom-right side to illuminate folds */}
        <spotLight
          position={[10, 7, 5]}
          intensity={45}
          angle={Math.PI / 4}
          penumbra={0.8}
          color="#C58B3C"
        />
        <Suspense fallback={null}>
          <CameraController isMobile={isMobile} />
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;