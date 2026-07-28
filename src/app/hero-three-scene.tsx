'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type Vector3Tuple = [number, number, number];

type LetterPartProps = {
  geometry: THREE.BufferGeometry;
  metalMaterial: THREE.MeshPhysicalMaterial;
  position: Vector3Tuple;
  rotation?: Vector3Tuple;
  scale?: Vector3Tuple;
  wireMaterial: THREE.MeshBasicMaterial;
};

type FloatingWireProps = {
  geometry: THREE.BufferGeometry;
  material: THREE.MeshBasicMaterial;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: number;
  speed: Vector3Tuple;
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(media.matches);

    updatePreference();
    media.addEventListener('change', updatePreference);

    return () => media.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
}

function LetterPart({
  geometry,
  metalMaterial,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  wireMaterial,
}: LetterPartProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry} material={metalMaterial} />
      <mesh geometry={geometry} material={wireMaterial} scale={1.018} />
    </group>
  );
}

function FloatingWire({
  geometry,
  material,
  position,
  rotation,
  scale,
  speed,
}: FloatingWireProps) {
  const object = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!object.current) return;

    object.current.rotation.x += delta * speed[0];
    object.current.rotation.y += delta * speed[1];
    object.current.rotation.z += delta * speed[2];
  });

  return (
    <mesh
      ref={object}
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(84 * 3);
    let seed = 114;

    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = (random() - 0.5) * 8.5;
      positions[index + 1] = (random() - 0.5) * 7;
      positions[index + 2] = -1 - random() * 5;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.018;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#d9ff4f"
        size={0.026}
        sizeAttenuation
        transparent
        opacity={0.72}
        depthWrite={false}
      />
    </points>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const monogram = useRef<THREE.Group>(null);
  const wireStack = useRef<THREE.Group>(null);

  const resources = useMemo(() => {
    const metalMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#eef4ff'),
      roughness: 0.2,
      metalness: 0.82,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      emissive: new THREE.Color('#0d1d43'),
      emissiveIntensity: 0.35,
    });

    const monogramWireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#d9ff4f'),
      wireframe: true,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });

    const acidWireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#d9ff4f'),
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const blueWireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#8cafff'),
      wireframe: true,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return {
      acidWireMaterial,
      blueWireMaterial,
      capsuleLong: new THREE.CapsuleGeometry(0.17, 2.05, 6, 14),
      capsuleShort: new THREE.CapsuleGeometry(0.15, 1.08, 6, 14),
      hook: new THREE.TorusGeometry(0.54, 0.17, 14, 52, Math.PI),
      icosahedron: new THREE.IcosahedronGeometry(0.95, 1),
      metalMaterial,
      monogramWireMaterial,
      octahedron: new THREE.OctahedronGeometry(0.82, 1),
      torusKnot: new THREE.TorusKnotGeometry(0.68, 0.15, 88, 8, 2, 3),
      wireCube: new THREE.BoxGeometry(1.05, 1.05, 1.05, 3, 3, 3),
    };
  }, []);

  useEffect(
    () => () => {
      Object.values(resources).forEach((resource) => resource.dispose());
    },
    [resources],
  );

  useFrame((state, delta) => {
    if (reducedMotion) return;

    if (monogram.current) {
      monogram.current.rotation.x = THREE.MathUtils.damp(
        monogram.current.rotation.x,
        -state.pointer.y * 0.16,
        4,
        delta,
      );
      monogram.current.rotation.y = THREE.MathUtils.damp(
        monogram.current.rotation.y,
        -0.12 + state.pointer.x * 0.28,
        4,
        delta,
      );
      monogram.current.position.y = Math.sin(state.clock.elapsedTime * 0.72) * 0.07;
    }

    if (wireStack.current) {
      wireStack.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.24) * 0.06;
      wireStack.current.rotation.y = THREE.MathUtils.damp(
        wireStack.current.rotation.y,
        state.pointer.x * -0.12,
        3,
        delta,
      );
    }
  });

  return (
    <>
      <fog attach="fog" args={['#111a2d', 5.2, 13]} />
      <ambientLight color="#7f91bd" intensity={0.8} />
      <directionalLight color="#ffffff" intensity={3.4} position={[3.5, 5, 5]} />
      <pointLight color="#d9ff4f" decay={2} distance={11} intensity={34} position={[-3, -1, 4]} />
      <pointLight color="#4771ff" decay={2} distance={10} intensity={28} position={[2.5, 0.5, 3]} />

      <group ref={wireStack}>
        <FloatingWire
          geometry={resources.icosahedron}
          material={resources.blueWireMaterial}
          position={[-2.15, 1.55, -1.7]}
          rotation={[0.2, 0.35, -0.15]}
          scale={0.78}
          speed={[0.08, 0.14, 0.04]}
        />
        <FloatingWire
          geometry={resources.octahedron}
          material={resources.acidWireMaterial}
          position={[2.15, 1.55, -1.1]}
          rotation={[0.4, -0.2, 0.2]}
          scale={0.68}
          speed={[-0.12, 0.1, 0.08]}
        />
        <FloatingWire
          geometry={resources.torusKnot}
          material={resources.blueWireMaterial}
          position={[2.2, -1.45, -2.1]}
          rotation={[0.25, 0.4, 0]}
          scale={0.54}
          speed={[0.08, -0.1, 0.13]}
        />
        <FloatingWire
          geometry={resources.wireCube}
          material={resources.acidWireMaterial}
          position={[-2.25, -1.45, -0.8]}
          rotation={[0.55, 0.35, -0.12]}
          scale={0.62}
          speed={[0.1, 0.12, -0.05]}
        />

        <mesh position={[0.1, 0, -2.7]} rotation={[0.9, 0.22, 0.12]}>
          <torusGeometry args={[2.35, 0.012, 5, 128]} />
          <meshBasicMaterial color="#8cafff" transparent opacity={0.28} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0, -2.2]} rotation={[1.42, -0.32, 0.22]}>
          <torusGeometry args={[1.82, 0.009, 5, 128]} />
          <meshBasicMaterial color="#d9ff4f" transparent opacity={0.22} depthWrite={false} />
        </mesh>
      </group>

      <group ref={monogram} position={[0, 0, 0.15]} rotation={[0, -0.12, -0.04]} scale={1.08}>
        <LetterPart
          geometry={resources.capsuleLong}
          metalMaterial={resources.metalMaterial}
          wireMaterial={resources.monogramWireMaterial}
          position={[-0.58, 0.28, 0]}
        />
        <LetterPart
          geometry={resources.hook}
          metalMaterial={resources.metalMaterial}
          wireMaterial={resources.monogramWireMaterial}
          position={[-1.12, -0.92, 0]}
          rotation={[0, 0, Math.PI]}
        />
        <LetterPart
          geometry={resources.capsuleShort}
          metalMaterial={resources.metalMaterial}
          wireMaterial={resources.monogramWireMaterial}
          position={[-0.58, 1.37, 0]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[0.46, 0.78, 0.78]}
        />

        <LetterPart
          geometry={resources.capsuleLong}
          metalMaterial={resources.metalMaterial}
          wireMaterial={resources.monogramWireMaterial}
          position={[0.82, 0.28, 0]}
        />
        <LetterPart
          geometry={resources.capsuleShort}
          metalMaterial={resources.metalMaterial}
          wireMaterial={resources.monogramWireMaterial}
          position={[0.82, 1.37, 0]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[1.05, 1, 1]}
        />
      </group>

      <group position={[0.12, -0.05, -0.48]} rotation={[0.04, 0.08, 0.02]} scale={1.13}>
        <mesh geometry={resources.capsuleLong} material={resources.blueWireMaterial} position={[-0.58, 0.28, 0]} />
        <mesh
          geometry={resources.hook}
          material={resources.blueWireMaterial}
          position={[-1.12, -0.92, 0]}
          rotation={[0, 0, Math.PI]}
        />
        <mesh
          geometry={resources.capsuleShort}
          material={resources.blueWireMaterial}
          position={[0.82, 1.37, 0]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[1.05, 1, 1]}
        />
        <mesh geometry={resources.capsuleLong} material={resources.blueWireMaterial} position={[0.82, 0.28, 0]} />
      </group>

      <gridHelper
        args={[9, 18, '#6f91ed', '#32466f']}
        position={[0, -2.18, -2.4]}
        rotation={[0, 0, 0]}
      />
      <ParticleField />
    </>
  );
}

export default function HeroThreeScene() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="hero-three-stage"
      role="img"
      aria-label="Interactive three-dimensional JT monogram surrounded by precision wireframe forms."
    >
      <Canvas
        aria-hidden="true"
        camera={{ fov: 37, near: 0.1, far: 50, position: [0, 0, 7] }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.12;
        }}
      >
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
