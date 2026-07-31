'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

function Tube({ points, radius, material }: { points: THREE.Vector3[]; radius: number; material: THREE.Material }) {
  const geometry = useMemo(
    () => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 92, radius, 10, false),
    [points, radius],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} material={material} castShadow receiveShadow />;
}

function HikingStick({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const wood = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#2d1b16', roughness: 0.39, metalness: 0, clearcoat: 0.18, clearcoatRoughness: 0.48 }),
    [],
  );
  const grip = useMemo(() => new THREE.MeshStandardMaterial({ color: '#191b20', roughness: 0.72, metalness: 0.08 }), []);
  const cord = useMemo(() => new THREE.MeshStandardMaterial({ color: '#9e75c7', roughness: 0.58, metalness: 0.03 }), []);
  const ferrule = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#c6c8ca', roughness: 0.22, metalness: 0.9 }), []);
  const shaft = useMemo(() => [
    new THREE.Vector3(-0.05, -3.9, 0), new THREE.Vector3(-0.17, -2.65, 0.02),
    new THREE.Vector3(-0.02, -1.25, -0.02), new THREE.Vector3(-0.11, 0.2, 0),
    new THREE.Vector3(0.03, 1.6, 0.02), new THREE.Vector3(-0.04, 3.08, 0),
  ], []);
  const loop = useMemo(() => [
    new THREE.Vector3(-0.02, 2.68, 0.08), new THREE.Vector3(-0.56, 2.48, 0.14),
    new THREE.Vector3(-0.63, 1.6, 0.18), new THREE.Vector3(-0.52, 1.05, 0.16),
    new THREE.Vector3(-0.35, 1.1, 0.14),
  ], []);

  useFrame((state) => {
    if (!root.current || reducedMotion) return;
    root.current.rotation.z = -0.12 + Math.sin(state.clock.elapsedTime * 0.46) * 0.018;
    root.current.rotation.y = -0.27 + Math.sin(state.clock.elapsedTime * 0.32) * 0.045;
  });

  return (
    <group ref={root} rotation={[-0.08, -0.27, -0.12]} scale={0.91}>
      <Tube points={shaft} radius={0.118} material={wood} />
      {/* Carved crown: overlapping organic lobes preserve the irregular hand-carved silhouette. */}
      <mesh position={[-0.04, 3.22, 0]} rotation={[0.08, 0.1, -0.16]} scale={[1.48, 0.72, 0.86]} material={wood} castShadow>
        <sphereGeometry args={[0.29, 28, 20]} />
      </mesh>
      <mesh position={[-0.18, 3.1, 0.03]} rotation={[0.1, 0, 0.46]} scale={[0.82, 1.15, 0.8]} material={wood} castShadow>
        <sphereGeometry args={[0.25, 24, 18]} />
      </mesh>
      <group position={[0, 1.77, 0]}>
        <mesh material={grip} castShadow>
          <cylinderGeometry args={[0.165, 0.18, 1.68, 32]} />
        </mesh>
        {Array.from({ length: 11 }, (_, index) => (
          <mesh key={index} position={[0, 0.7 - index * 0.145, 0]} material={cord} rotation={[0, 0, 0.02]}>
            <torusGeometry args={[0.183, 0.014, 8, 32]} />
          </mesh>
        ))}
      </group>
      <Tube points={loop} radius={0.028} material={cord} />
      <mesh position={[-0.35, 1.03, 0.14]} material={cord} castShadow><sphereGeometry args={[0.075, 16, 12]} /></mesh>
      <mesh position={[-0.35, 0.88, 0.14]} material={cord} castShadow><sphereGeometry args={[0.055, 16, 12]} /></mesh>
      <group position={[-0.05, -3.86, 0]}>
        <mesh material={ferrule} castShadow><cylinderGeometry args={[0.14, 0.125, 0.36, 32]} /></mesh>
        {[0.08, -0.06, -0.18].map((y) => <mesh key={y} material={ferrule} position={[0, y, 0]}><torusGeometry args={[0.143, 0.012, 8, 32]} /></mesh>)}
      </group>
    </group>
  );
}

export default function HikingStickHero() {
  const reducedMotion = useReducedMotion();
  return (
    <div className="hiking-stick-ambient" aria-hidden="true">
      <Canvas
        camera={{ fov: 33, position: [0, 0, 9.2] }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => { gl.outputColorSpace = THREE.SRGBColorSpace; gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.12; }}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[-3, 5, 5]} intensity={2.4} color="#fff0dc" />
        <directionalLight position={[4, 1, 2]} intensity={1.2} color="#a89cff" />
        <HikingStick reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
