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

    vec3 base = textTexture.rgb * (0.58 + diffuse * 0.64);
    vec3 coolEdge = vec3(0.28, 0.45, 1.0) * rim * 0.4;
    vec3 acidGlint = vec3(0.68, 0.9, 0.12) * bulge * diffuse * 0.12;

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

function drawHeadlineTexture(width: number, height: number) {
  const maxTextureSize = 1800;
  const scale = Math.min(2, maxTextureSize / Math.max(width, height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(720, Math.round(width * scale));
  canvas.height = Math.max(320, Math.round(height * scale));

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Unable to create the hero headline texture.');
  }

  const { width: textureWidth, height: textureHeight } = canvas;
  const lines = ['MOBILE CRAFT.', 'CLOUD CALM.'];
  const displayFont =
    getComputedStyle(document.body).getPropertyValue('--font-hermes-display').trim() ||
    'Bodoni Moda, Didot, Georgia, serif';
  let fontSize = textureHeight * 0.46;

  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.font = `500 ${fontSize}px ${displayFont}`;

  const widestLine = Math.max(...lines.map((line) => context.measureText(line).width));
  fontSize *= Math.min(1, (textureWidth * 0.97) / widestLine);
  context.font = `500 ${fontSize}px ${displayFont}`;
  context.lineJoin = 'round';

  const gradient = context.createLinearGradient(0, 0, textureWidth, textureHeight);
  gradient.addColorStop(0, '#f5f7fb');
  gradient.addColorStop(0.48, '#c9c4ff');
  gradient.addColorStop(1, '#8b7cff');

  const linePositions = [textureHeight * 0.27, textureHeight * 0.73];

  lines.forEach((line, index) => {
    const x = textureWidth * 0.012;
    const y = linePositions[index];

    context.save();
    context.globalAlpha = 0.18;
    context.strokeStyle = index === 0 ? '#8b7cff' : '#b9ff72';
    context.lineWidth = Math.max(1.5, fontSize * 0.006);
    context.strokeText(line, x + fontSize * 0.018, y + fontSize * 0.018);
    context.restore();

    context.fillStyle = gradient;
    context.shadowColor = 'rgba(139, 124, 255, 0.24)';
    context.shadowBlur = fontSize * 0.025;
    context.fillText(line, x, y);

    context.shadowBlur = 0;
    context.globalAlpha = 0.42;
    context.strokeStyle = index === 0 ? '#f5f7fb' : '#8b7cff';
    context.lineWidth = Math.max(1, fontSize * 0.0016);
    context.strokeText(line, x, y);
    context.globalAlpha = 1;
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

function BulgeHeadline({ reducedMotion }: { reducedMotion: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const [fontRevision, setFontRevision] = useState(0);
  const targetMouse = useRef(new THREE.Vector2(0.36, 0.52));

  useEffect(() => {
    let active = true;

    const displayFont =
      getComputedStyle(document.body).getPropertyValue('--font-hermes-display').trim() ||
      'Bodoni Moda, Didot, Georgia, serif';

    document.fonts.load(`500 180px ${displayFont}`).then(() => {
      if (active) setFontRevision((revision) => revision + 1);
    });

    return () => {
      active = false;
    };
  }, []);

  const texture = useMemo(() => {
    void fontRevision;
    return drawHeadlineTexture(size.width, size.height);
  }, [fontRevision, size.height, size.width]);

  const uniforms = useMemo(
    () => ({
      uAspect: { value: viewport.width / viewport.height },
      uMouse: { value: new THREE.Vector2(0.36, 0.52) },
      uRadius: { value: 0.22 },
      uStrength: { value: reducedMotion ? 0.22 : 0 },
      uTexture: { value: texture },
    }),
    [reducedMotion, texture, viewport.height, viewport.width],
  );

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state, delta) => {
    if (!material.current) return;

    targetMouse.current.set(
      reducedMotion ? 0.36 : state.pointer.x * 0.5 + 0.5,
      reducedMotion ? 0.52 : state.pointer.y * 0.5 + 0.5,
    );

    const follow = 1 - Math.exp(-delta * 8);
    const mouse = material.current.uniforms.uMouse.value as THREE.Vector2;

    mouse.lerp(targetMouse.current, follow);
    material.current.uniforms.uStrength.value = THREE.MathUtils.damp(
      material.current.uniforms.uStrength.value,
      reducedMotion ? 0.22 : 0.48,
      5,
      delta,
    );
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 220, 80]} />
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

export default function HeroTitleEffect() {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <div className={`hero-title-effect hero-reveal ${ready ? 'is-ready' : ''}`}>
      <h1 id="hero-title" className="hero-title-source w-full max-w-6xl">
        MOBILE CRAFT.
        <span>CLOUD CALM.</span>
      </h1>

      <div className="hero-title-canvas" aria-hidden="true">
        <Canvas
          camera={{ fov: 37, near: 0.1, far: 50, position: [0, 0, 7] }}
          dpr={[1, 1.5]}
          frameloop={reducedMotion ? 'demand' : 'always'}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.08;
            setReady(true);
          }}
        >
          <BulgeHeadline reducedMotion={reducedMotion} />
        </Canvas>
      </div>
    </div>
  );
}
