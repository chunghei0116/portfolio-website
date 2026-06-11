"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import BentoCard from "./BentoCard";

// -------------------------------------------------------------
// 1. Camera Controller (Supports mouse and touch, full canvas bounds)
// -------------------------------------------------------------
const CameraControls = () => {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const prevMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = gl.domElement;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaMove = {
        x: e.clientX - prevMousePosition.current.x,
        y: e.clientY - prevMousePosition.current.y
      };

      const radius = Math.sqrt(camera.position.x ** 2 + camera.position.y ** 2 + camera.position.z ** 2);
      let theta = Math.atan2(camera.position.x, camera.position.z);
      let phi = Math.acos(camera.position.y / radius);

      theta -= deltaMove.x * 0.005;
      phi -= deltaMove.y * 0.005;
      phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));

      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);

      prevMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        prevMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - prevMousePosition.current.x,
        y: e.touches[0].clientY - prevMousePosition.current.y
      };

      const radius = Math.sqrt(camera.position.x ** 2 + camera.position.y ** 2 + camera.position.z ** 2);
      let theta = Math.atan2(camera.position.x, camera.position.z);
      let phi = Math.acos(camera.position.y / radius);

      theta -= deltaMove.x * 0.008;
      phi -= deltaMove.y * 0.008;
      phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));

      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);

      prevMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleWheel = (e: WheelEvent) => {
      const zoomFactor = 1.1;
      const radius = Math.sqrt(camera.position.x ** 2 + camera.position.y ** 2 + camera.position.z ** 2);
      let newRadius = e.deltaY > 0 ? radius * zoomFactor : radius / zoomFactor;
      newRadius = Math.max(2, Math.min(12, newRadius));
      
      camera.position.normalize().multiplyScalar(newRadius);
      camera.lookAt(0, 0, 0);
    };

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseUp);
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleMouseUp);
    element.addEventListener('wheel', handleWheel, { passive: true });

    camera.position.set(3, 2, 5);
    camera.lookAt(0, 0, 0);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseUp);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleMouseUp);
      element.removeEventListener('wheel', handleWheel);
    };
  }, [camera, gl]);

  return null;
};

// -------------------------------------------------------------
// 2. GN Helix Particles
// -------------------------------------------------------------
interface ParticleData {
  angle: number;
  radius: number;
  z: number;
  speed: number;
  radialSpeed: number;
  zSpeed: number;
}

const GNParticles = ({ count = 280, color = '#33ff88' }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const particleData = useMemo(() => {
    const data: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 0.3,
        z: (Math.random() - 0.5) * 2.5,
        speed: 0.02 + Math.random() * 0.015,
        radialSpeed: 0.008 + Math.random() * 0.01,
        zSpeed: 0.03 + Math.random() * 0.04,
      });
    }
    return data;
  }, [count]);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
      
      cols[i * 3] = baseColor.r;
      cols[i * 3 + 1] = baseColor.g;
      cols[i * 3 + 2] = baseColor.b;
    }
    return [pos, cols];
  }, [count, color]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const colAttribute = pointsRef.current.geometry.attributes.color;
    const array = posAttribute.array as Float32Array;
    const colArray = colAttribute.array as Float32Array;
    const baseColor = new THREE.Color(color);

    particleData.forEach((p, idx) => {
      p.angle += p.speed;
      p.z -= p.zSpeed;

      // Spiral dispersion after nozzle output
      if (p.z < -0.4) {
        p.radius += p.radialSpeed * 1.2;
      } else {
        p.radius = Math.max(0.05, p.radius - 0.008);
      }

      // Respawn reset
      if (p.z < -5.5 || p.radius > 3.0) {
        p.z = 1.0 + Math.random() * 0.3;
        p.radius = Math.random() * 0.15;
        p.angle = Math.random() * Math.PI * 2;
      }

      array[idx * 3] = Math.cos(p.angle) * p.radius;
      array[idx * 3 + 1] = Math.sin(p.angle) * p.radius;
      array[idx * 3 + 2] = p.z;

      const pulse = Math.sin(state.clock.getElapsedTime() * 4 + idx) * 0.2 + 0.8;
      colArray[idx * 3] = baseColor.r * pulse;
      colArray[idx * 3 + 1] = baseColor.g * pulse;
      colArray[idx * 3 + 2] = baseColor.b * pulse;
    });

    posAttribute.needsUpdate = true;
    colAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// -------------------------------------------------------------
// 3. GN Drive Wireframe Model
// -------------------------------------------------------------
const GNDriveWireframe = ({ color = '#33ffaa' }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const ringsRef = useRef<THREE.Group>(null!);
  const coneRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow self-rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.2;
      groupRef.current.rotation.x = Math.cos(time * 0.1) * 0.1;
    }

    // High speed counter-spin core
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.z -= 0.04;
      const pulse = 0.95 + Math.sin(time * 6) * 0.05;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Acceleration condenser rings rotation
    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, idx) => {
        child.rotation.z += 0.015 * (1 + idx * 0.3);
        child.rotation.x = Math.sin(time * 2 + idx) * 0.04;
      });
    }

    // Slow exhaust spin
    if (coneRef.current) {
      coneRef.current.rotation.z += 0.005;
    }
  });

  const segments = 16;

  return (
    <group ref={groupRef}>
      
      {/* 1. Nose Dome */}
      <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[1.0, segments, Math.round(segments / 2), 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* 2. Pulsing Energy Core */}
      <mesh ref={innerCoreRef} position={[0, 0, 0.4]}>
        <sphereGeometry args={[0.65, 14, 14]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* 3. Main Cylinder Body */}
      <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 1.6, segments, 4, true]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* 4. Condenser Rings */}
      <group ref={ringsRef}>
        {/* Front Ring */}
        <mesh position={[0, 0, 0.9]}>
          <torusGeometry args={[1.35, 0.06, 6, segments * 2]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Mid Ring */}
        <mesh position={[0, 0, 0.4]}>
          <torusGeometry args={[1.5, 0.05, 6, segments * 2]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Rear Ring */}
        <mesh position={[0, 0, -0.1]}>
          <torusGeometry args={[1.25, 0.06, 6, segments * 2]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* 5. Exhaust Cone */}
      <group ref={coneRef} position={[0, 0, -0.4]}>
        <mesh position={[0, 0, -1.1]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[1.0, 2.2, segments, 6, true]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 0, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.7, 1.5, segments, 4, true]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.7} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 0, -2.2]}>
          <torusGeometry args={[0.15, 0.02, 4, 12]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.8} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* 6. Symmetrical Brackets */}
      <group>
        {[0, 1, 2].map((i) => {
          const angle = (i * Math.PI * 2) / 3;
          return (
            <group key={i} rotation={[0, 0, angle]}>
              <mesh position={[1.15, 0, 0.3]} rotation={[0, -0.1, 0]}>
                <boxGeometry args={[0.08, 0.12, 1.8]} />
                <meshBasicMaterial color={color} wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} />
              </mesh>
              <mesh position={[1.05, 0, 1.15]} rotation={[0, 0.4, 0]}>
                <boxGeometry args={[0.06, 0.1, 0.4]} />
                <meshBasicMaterial color={color} wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} />
              </mesh>
              <mesh position={[0.8, 0, -0.8]} rotation={[0, -0.5, 0]}>
                <boxGeometry args={[0.06, 0.1, 1.1]} />
                <meshBasicMaterial color={color} wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} />
              </mesh>
            </group>
          );
        })}
      </group>

    </group>
  );
};

// -------------------------------------------------------------
// 4. Playbox Bento Card Component
// -------------------------------------------------------------
export default function Playbox() {
  const gnColor = "#00ffaa";

  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
          Interact // Drag to Rotate GN Drive
        </span>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-black uppercase">
          GN DRIVE CORE
        </h3>
      </div>

      <div className="h-[200px] w-full bg-[#030508] rounded-none relative overflow-hidden border-[3px] border-black">
        <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.3} />
          
          <group position={[0, 0, 0.3]} scale={[0.45, 0.45, 0.45]}>
            <GNDriveWireframe color={gnColor} />
            <GNParticles color={gnColor} count={320} />
          </group>

          <gridHelper args={[10, 10, '#0f172a', '#0a0f1d']} position={[0, -2.2, 0]} />

          <CameraControls />
        </Canvas>
      </div>

      <p className="text-xs font-mono text-black/50">
        * Active GN Drive wireframe emitting green GN particles in helix streams. Drag/touch view to rotate.
      </p>
    </BentoCard>
  );
}
