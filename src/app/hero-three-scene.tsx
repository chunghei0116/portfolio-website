'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  uniform float uAspect;
  uniform vec2 uMouse;
  uniform float uRadius;
  uniform float uStrength;

  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  float bulgeAt(vec2 point) {
    vec2 delta = point - uMouse;
    delta.x *= uAspect;

    float circle = 1.0 - smoothstep(0.0, uRadius, length(delta));
    return circle * circle * uStrength;
  }

  void main() {
    vUv = uv;

    vec3 newPosition = position;
    float elevation = bulgeAt(uv);
    newPosition.z += elevation;

    float epsilon = 0.003;
    float elevationLeft = bulgeAt(uv - vec2(epsilon, 0.0));
    float elevationRight = bulgeAt(uv + vec2(epsilon, 0.0));
    float elevationDown = bulgeAt(uv - vec2(0.0, epsilon));
    float elevationUp = bulgeAt(uv + vec2(0.0, epsilon));

    vec3 displacedNormal = normalize(vec3(
      -(elevationRight - elevationLeft) * 11.0,
      -(elevationUp - elevationDown) * 11.0,
      1.0
    ));

    vec4 viewPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vElevation = elevation;
    vNormal = normalize(normalMatrix * displacedNormal);
    vViewPosition = viewPosition.xyz;

    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uStrength;

  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vec4 textTexture = texture2D(uTexture, vUv);

    if (textTexture.a < 0.015) {
      discard;
    }

    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(-vViewPosition);
    vec3 lightDirection = normalize(vec3(-0.7, 0.9, 1.8));

    float diffuse = max(dot(normal, lightDirection), 0.0);
    float rim = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.2);
    float bulge = smoothstep(0.0, max(uStrength, 0.001), vElevation);

    vec3 base = textTexture.rgb * (0.52 + diffuse * 0.72);
    vec3 coolEdge = vec3(0.42, 0.58, 1.0) * rim * 0.44;
    vec3 acidGlint = vec3(0.76, 1.0, 0.22) * bulge * diffuse * 0.16;

    gl_FragColor = vec4(base + coolEdge + acidGlint, textTexture.a);
  }
`;

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

function drawMonogramTexture(width: number, height: number) {
  const maxTextureSize = 1400;
  const scale = Math.min(2, maxTextureSize / Math.max(width, height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(640, Math.round(width * scale));
  canvas.height = Math.max(640, Math.round(height * scale));

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Unable to create the JT canvas texture.');
  }

  const { width: textureWidth, height: textureHeight } = canvas;
  const fontSize = Math.min(textureHeight * 0.72, textureWidth * 0.78);

  context.clearRect(0, 0, textureWidth, textureHeight);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = `300 ${fontSize}px Satoshi, "Helvetica Neue", Arial, sans-serif`;
  context.lineJoin = 'round';

  context.save();
  context.globalAlpha = 0.16;
  context.strokeStyle = '#8cafff';
  context.lineWidth = Math.max(1.5, fontSize * 0.006);
  context.strokeText('JT', textureWidth * 0.505, textureHeight * 0.505);
  context.restore();

  const wash = context.createLinearGradient(
    textureWidth * 0.18,
    textureHeight * 0.18,
    textureWidth * 0.82,
    textureHeight * 0.82,
  );
  wash.addColorStop(0, '#ffffff');
  wash.addColorStop(0.46, '#e9efff');
  wash.addColorStop(1, '#a9b9df');

  context.fillStyle = wash;
  context.shadowColor = 'rgba(140, 175, 255, 0.24)';
  context.shadowBlur = fontSize * 0.035;
  context.fillText('JT', textureWidth * 0.5, textureHeight * 0.5);

  context.shadowBlur = 0;
  context.globalAlpha = 0.48;
  context.strokeStyle = '#d9ff4f';
  context.lineWidth = Math.max(1, fontSize * 0.0018);
  context.strokeText('JT', textureWidth * 0.5, textureHeight * 0.5);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

function BulgeText({ reducedMotion }: { reducedMotion: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const [fontRevision, setFontRevision] = useState(0);
  const targetMouse = useRef(new THREE.Vector2(0.52, 0.48));

  useEffect(() => {
    let active = true;

    document.fonts.load('300 180px Satoshi').then(() => {
      if (active) setFontRevision((revision) => revision + 1);
    });

    return () => {
      active = false;
    };
  }, []);

  const texture = useMemo(() => {
    void fontRevision;
    return drawMonogramTexture(size.width, size.height);
  }, [fontRevision, size.height, size.width]);

  const uniforms = useMemo(
    () => ({
      uAspect: { value: viewport.width / viewport.height },
      uMouse: { value: new THREE.Vector2(0.52, 0.48) },
      uRadius: { value: 0.29 },
      uStrength: { value: reducedMotion ? 0.34 : 0.0 },
      uTexture: { value: texture },
    }),
    [reducedMotion, texture, viewport.height, viewport.width],
  );

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state, delta) => {
    if (!material.current) return;

    targetMouse.current.set(
      reducedMotion ? 0.52 : state.pointer.x * 0.5 + 0.5,
      reducedMotion ? 0.48 : state.pointer.y * 0.5 + 0.5,
    );
    const follow = 1 - Math.exp(-delta * 8);
    const mouse = material.current.uniforms.uMouse.value as THREE.Vector2;

    mouse.lerp(targetMouse.current, follow);
    material.current.uniforms.uStrength.value = THREE.MathUtils.damp(
      material.current.uniforms.uStrength.value,
      reducedMotion ? 0.34 : 0.72,
      5,
      delta,
    );
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 180, 180]} />
      <shaderMaterial
        ref={material}
        depthWrite={false}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return <BulgeText reducedMotion={reducedMotion} />;
}

export default function HeroThreeScene() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="hero-three-stage"
      role="img"
      aria-label="Interactive JT typography that rises into a soft three-dimensional bulge beneath the pointer."
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
