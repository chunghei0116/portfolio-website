"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// Constants for pipeline coordinates
const X_START = -2.2;
const X_SPLIT = -0.6;
const X_END = 2.2;
const Y_MID = 0.0;
const Y_UP = 0.5;
const Y_DOWN = -0.5;

// Lengths of segments
const TRUNK_LEN = X_SPLIT - X_START; // 1.6
const SPLIT_LEN = Y_UP - Y_MID;     // 0.5
const BRANCH_LEN = X_END - X_SPLIT;  // 2.8

export default function PipelineScene() {
  // Refs for the liquid segments
  const trunkLiquidRef = useRef<THREE.Mesh>(null!);
  const splitUpLiquidRef = useRef<THREE.Mesh>(null!);
  const splitDownLiquidRef = useRef<THREE.Mesh>(null!);
  const branchUpLiquidRef = useRef<THREE.Mesh>(null!);
  const branchMidLiquidRef = useRef<THREE.Mesh>(null!);
  const branchDownLiquidRef = useRef<THREE.Mesh>(null!);

  // Refs for liquid materials to animate colors/opacity
  const trunkMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const splitUpMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const splitDownMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const branchUpMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const branchMidMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const branchDownMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  // Refs for endpoint indicators (Inner bulbs)
  const endUpRef = useRef<THREE.Mesh>(null!);
  const endMidRef = useRef<THREE.Mesh>(null!);
  const endDownRef = useRef<THREE.Mesh>(null!);
  const endUpMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const endMidMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const endDownMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  // Refs for endpoint glows (Outer halos)
  const endUpGlowRef = useRef<THREE.Mesh>(null!);
  const endMidGlowRef = useRef<THREE.Mesh>(null!);
  const endDownGlowRef = useRef<THREE.Mesh>(null!);
  const endUpGlowMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const endMidGlowMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const endDownGlowMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const cycleDuration = 9.0;
    const progress = (time % cycleDuration) / cycleDuration; // 0 to 1

    // Define color palette
    const colorCyan = new THREE.Color("#0ea5e9"); // Base trunk flow
    const colorPurple = new THREE.Color("#a855f7"); // Dev branch (Up)
    const colorGreen = new THREE.Color("#10b981"); // Staging branch (Mid)
    const colorAmber = new THREE.Color("#f97316"); // Prod branch (Down)

    // Opacity calculation for the cycle (fade out at the end, then reset)
    let globalOpacity = 1.0;
    if (progress > 0.85 && progress <= 0.95) {
      // Fade out
      globalOpacity = THREE.MathUtils.lerp(1.0, 0.0, (progress - 0.85) / 0.1);
    } else if (progress > 0.95) {
      // Hold empty
      globalOpacity = 0.0;
    }

    // 1. Trunk Liquid progress (progress 0.0 -> 0.2)
    const pTrunk = Math.min(1.0, Math.max(0.0, progress / 0.2));
    if (trunkLiquidRef.current && trunkMatRef.current) {
      trunkLiquidRef.current.scale.set(1, pTrunk || 0.0001, 1);
      trunkLiquidRef.current.position.set(X_START + pTrunk * (TRUNK_LEN / 2), Y_MID, 0);
      trunkMatRef.current.color.copy(colorCyan);
      trunkMatRef.current.opacity = 0.8 * globalOpacity;
    }

    // 2. Split Up & Split Down progress (progress 0.2 -> 0.3)
    const pSplit = Math.min(1.0, Math.max(0.0, (progress - 0.2) / 0.1));
    if (splitUpLiquidRef.current && splitUpMatRef.current) {
      splitUpLiquidRef.current.scale.set(1, pSplit || 0.0001, 1);
      splitUpLiquidRef.current.position.set(X_SPLIT, Y_MID + pSplit * (SPLIT_LEN / 2), 0);
      splitUpMatRef.current.color.copy(colorCyan);
      splitUpMatRef.current.opacity = 0.8 * globalOpacity;
    }
    if (splitDownLiquidRef.current && splitDownMatRef.current) {
      splitDownLiquidRef.current.scale.set(1, pSplit || 0.0001, 1);
      splitDownLiquidRef.current.position.set(X_SPLIT, Y_MID - pSplit * (SPLIT_LEN / 2), 0);
      splitDownMatRef.current.color.copy(colorCyan);
      splitDownMatRef.current.opacity = 0.8 * globalOpacity;
    }

    // 3. Branches progress (progress 0.3 -> 0.75) with staggered fill
    // Middle branch fills first
    const pBranchMid = Math.min(1.0, Math.max(0.0, (progress - 0.3) / 0.35));
    // Upper branch fills slightly delayed
    const pBranchUp = Math.min(1.0, Math.max(0.0, (progress - 0.33) / 0.37));
    // Lower branch fills with most delay
    const pBranchDown = Math.min(1.0, Math.max(0.0, (progress - 0.36) / 0.39));

    // Middle branch liquid
    if (branchMidLiquidRef.current && branchMidMatRef.current) {
      branchMidLiquidRef.current.scale.set(1, pBranchMid || 0.0001, 1);
      branchMidLiquidRef.current.position.set(X_SPLIT + pBranchMid * (BRANCH_LEN / 2), Y_MID, 0);
      // Lerp color from Cyan to Green
      branchMidMatRef.current.color.copy(colorCyan).lerp(colorGreen, pBranchMid);
      branchMidMatRef.current.opacity = 0.8 * globalOpacity;
    }

    // Upper branch liquid
    if (branchUpLiquidRef.current && branchUpMatRef.current) {
      branchUpLiquidRef.current.scale.set(1, pBranchUp || 0.0001, 1);
      branchUpLiquidRef.current.position.set(X_SPLIT + pBranchUp * (BRANCH_LEN / 2), Y_UP, 0);
      // Lerp color from Cyan to Purple
      branchUpMatRef.current.color.copy(colorCyan).lerp(colorPurple, pBranchUp);
      branchUpMatRef.current.opacity = 0.8 * globalOpacity;
    }

    // Lower branch liquid
    if (branchDownLiquidRef.current && branchDownMatRef.current) {
      branchDownLiquidRef.current.scale.set(1, pBranchDown || 0.0001, 1);
      branchDownLiquidRef.current.position.set(X_SPLIT + pBranchDown * (BRANCH_LEN / 2), Y_DOWN, 0);
      // Lerp color from Cyan to Orange
      branchDownMatRef.current.color.copy(colorCyan).lerp(colorAmber, pBranchDown);
      branchDownMatRef.current.opacity = 0.8 * globalOpacity;
    }

    // 4. Endpoint indicators (glow up as liquid reaches them)
    if (endUpRef.current && endUpMatRef.current && endUpGlowRef.current && endUpGlowMatRef.current) {
      const active = pBranchUp >= 1.0;
      const pulseInner = active ? 1.0 + Math.sin(time * 6.0) * 0.08 : 0.5;
      const pulseOuter = active ? 1.0 + Math.sin(time * 6.0) * 0.25 : 0.5;

      endUpRef.current.scale.setScalar(pulseInner);
      endUpGlowRef.current.scale.setScalar(pulseOuter);

      endUpMatRef.current.color.copy(active ? colorPurple : colorCyan);
      endUpGlowMatRef.current.color.copy(active ? colorPurple : colorCyan);

      endUpMatRef.current.opacity = (active ? 0.95 : 0.1) * globalOpacity;
      endUpGlowMatRef.current.opacity = (active ? 0.35 + Math.sin(time * 6.0) * 0.1 : 0.05) * globalOpacity;
    }

    if (endMidRef.current && endMidMatRef.current && endMidGlowRef.current && endMidGlowMatRef.current) {
      const active = pBranchMid >= 1.0;
      const pulseInner = active ? 1.0 + Math.sin(time * 6.0) * 0.08 : 0.5;
      const pulseOuter = active ? 1.0 + Math.sin(time * 6.0) * 0.25 : 0.5;

      endMidRef.current.scale.setScalar(pulseInner);
      endMidGlowRef.current.scale.setScalar(pulseOuter);

      endMidMatRef.current.color.copy(active ? colorGreen : colorCyan);
      endMidGlowMatRef.current.color.copy(active ? colorGreen : colorCyan);

      endMidMatRef.current.opacity = (active ? 0.95 : 0.1) * globalOpacity;
      endMidGlowMatRef.current.opacity = (active ? 0.35 + Math.sin(time * 6.0) * 0.1 : 0.05) * globalOpacity;
    }

    if (endDownRef.current && endDownMatRef.current && endDownGlowRef.current && endDownGlowMatRef.current) {
      const active = pBranchDown >= 1.0;
      const pulseInner = active ? 1.0 + Math.sin(time * 6.0) * 0.08 : 0.5;
      const pulseOuter = active ? 1.0 + Math.sin(time * 6.0) * 0.25 : 0.5;

      endDownRef.current.scale.setScalar(pulseInner);
      endDownGlowRef.current.scale.setScalar(pulseOuter);

      endDownMatRef.current.color.copy(active ? colorAmber : colorCyan);
      endDownGlowMatRef.current.color.copy(active ? colorAmber : colorCyan);

      endDownMatRef.current.opacity = (active ? 0.95 : 0.1) * globalOpacity;
      endDownGlowMatRef.current.opacity = (active ? 0.35 + Math.sin(time * 6.0) * 0.1 : 0.05) * globalOpacity;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Pipe Wireframe Network (Dark, sleek tech blueprints) */}
      <group>
        {/* Main Trunk Pipe */}
        <mesh position={[X_START + TRUNK_LEN / 2, Y_MID, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, TRUNK_LEN, 8, 1, true]} />
          <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Vertical Split Joint */}
        <mesh position={[X_SPLIT, Y_MID, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, SPLIT_LEN * 2, 8, 1, true]} />
          <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Upper Branch Pipe */}
        <mesh position={[X_SPLIT + BRANCH_LEN / 2, Y_UP, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, BRANCH_LEN, 8, 1, true]} />
          <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Middle Branch Pipe */}
        <mesh position={[X_SPLIT + BRANCH_LEN / 2, Y_MID, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, BRANCH_LEN, 8, 1, true]} />
          <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Lower Branch Pipe */}
        <mesh position={[X_SPLIT + BRANCH_LEN / 2, Y_DOWN, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, BRANCH_LEN, 8, 1, true]} />
          <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Sleek joint rings/caps */}
        <mesh position={[X_START, Y_MID, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.075, 0.012, 8, 24]} />
          <meshBasicMaterial color="#334155" />
        </mesh>
        <mesh position={[X_SPLIT, Y_MID, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.08, 0.015, 8, 24]} />
          <meshBasicMaterial color="#475569" />
        </mesh>
        <mesh position={[X_SPLIT, Y_UP, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.075, 0.012, 8, 24]} />
          <meshBasicMaterial color="#334155" />
        </mesh>
        <mesh position={[X_SPLIT, Y_DOWN, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.075, 0.012, 8, 24]} />
          <meshBasicMaterial color="#334155" />
        </mesh>
      </group>

      {/* 2. Flowing Liquid Volumes */}
      <group>
        {/* Trunk Liquid */}
        <mesh ref={trunkLiquidRef} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, TRUNK_LEN, 16, 1, false]} />
          <meshBasicMaterial ref={trunkMatRef} transparent opacity={0.8} />
        </mesh>

        {/* Split Up Liquid */}
        <mesh ref={splitUpLiquidRef} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, SPLIT_LEN, 16, 1, false]} />
          <meshBasicMaterial ref={splitUpMatRef} transparent opacity={0.8} />
        </mesh>

        {/* Split Down Liquid */}
        <mesh ref={splitDownLiquidRef} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, SPLIT_LEN, 16, 1, false]} />
          <meshBasicMaterial ref={splitDownMatRef} transparent opacity={0.8} />
        </mesh>

        {/* Branch Up Liquid */}
        <mesh ref={branchUpLiquidRef} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, BRANCH_LEN, 16, 1, false]} />
          <meshBasicMaterial ref={branchUpMatRef} transparent opacity={0.8} />
        </mesh>

        {/* Branch Mid Liquid */}
        <mesh ref={branchMidLiquidRef} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, BRANCH_LEN, 16, 1, false]} />
          <meshBasicMaterial ref={branchMidMatRef} transparent opacity={0.8} />
        </mesh>

        {/* Branch Down Liquid */}
        <mesh ref={branchDownLiquidRef} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, BRANCH_LEN, 16, 1, false]} />
          <meshBasicMaterial ref={branchDownMatRef} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* 3. Endpoint indicators (Interactive Node status bulbs) */}
      <group>
        {/* Upper branch endpoint: DEV */}
        <group position={[X_END, Y_UP, 0.01]}>
          {/* Outer glow halo */}
          <mesh ref={endUpGlowRef}>
            <circleGeometry args={[0.18, 32]} />
            <meshBasicMaterial ref={endUpGlowMatRef} transparent opacity={0.15} depthWrite={false} />
          </mesh>
          {/* Inner solid round light */}
          <mesh ref={endUpRef}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial ref={endUpMatRef} transparent opacity={0.8} depthWrite={false} />
          </mesh>
        </group>

        {/* Middle branch endpoint: STAGING */}
        <group position={[X_END, Y_MID, 0.01]}>
          {/* Outer glow halo */}
          <mesh ref={endMidGlowRef}>
            <circleGeometry args={[0.18, 32]} />
            <meshBasicMaterial ref={endMidGlowMatRef} transparent opacity={0.15} depthWrite={false} />
          </mesh>
          {/* Inner solid round light */}
          <mesh ref={endMidRef}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial ref={endMidMatRef} transparent opacity={0.8} depthWrite={false} />
          </mesh>
        </group>

        {/* Lower branch endpoint: PROD */}
        <group position={[X_END, Y_DOWN, 0.01]}>
          {/* Outer glow halo */}
          <mesh ref={endDownGlowRef}>
            <circleGeometry args={[0.18, 32]} />
            <meshBasicMaterial ref={endDownGlowMatRef} transparent opacity={0.15} depthWrite={false} />
          </mesh>
          {/* Inner solid round light */}
          <mesh ref={endDownRef}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial ref={endDownMatRef} transparent opacity={0.8} depthWrite={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

