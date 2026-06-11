"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export function CameraController({ isExpanded }: { isExpanded: boolean }) {
  useFrame((state) => {
    // Smooth camera glide target
    const targetPos = isExpanded ? new THREE.Vector3(0, -0.15, 1.2) : new THREE.Vector3(0, 0.5, 2.8);
    const targetFov = isExpanded ? 75 : 50;

    // Smoothly glide camera position and FOV
    state.camera.position.lerp(targetPos, 0.08);

    if (state.camera instanceof THREE.PerspectiveCamera) {
      state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 0.08);
      state.camera.updateProjectionMatrix();
    }

    // Dynamically adjust camera lookAt depending on expansion
    const targetLookAt = isExpanded ? new THREE.Vector3(0, -0.15, 0) : new THREE.Vector3(0, -0.2, 0);
    state.camera.lookAt(targetLookAt);
  });

  return null;
}

export function CityEnvironment({ isExpanded }: { isExpanded: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate 25 buildings (5x5 grid)
  const buildings = useMemo(() => {
    const list = [];
    const size = 5;
    const spacing = 0.55;
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const posX = (x - size / 2) * spacing;
        const posZ = (z - size / 2) * spacing;
        // Procedural height scaling
        const height = 0.4 + Math.sin(x * 1.5 + z * 2.3) * 0.4 + Math.cos(x * 0.9) * 0.3;
        list.push({
          id: `${x}-${z}`,
          position: [posX, height / 2 - 0.5, posZ] as [number, number, number],
          args: [0.3, height, 0.3] as [number, number, number],
        });
      }
    }
    return list;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Rotate slowly in card mode, accelerate inside immersive mode
      const speed = isExpanded ? 0.22 : 0.08;
      groupRef.current.rotation.y += speed * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      {buildings.map((b) => (
        <mesh key={b.id} position={b.position}>
          <boxGeometry args={b.args} />
          <meshBasicMaterial color="#1F438A" wireframe transparent opacity={0.15} />
        </mesh>
      ))}
      <gridHelper args={[4, 12, "#373C42", "#373C42"]} position={[0, -0.52, 0]} />
    </group>
  );
}
