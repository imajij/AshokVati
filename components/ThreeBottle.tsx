'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/* ─── GLTF Bottle ─── */
function BottleModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/medicine-bottle.glb');

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    return maxDim > 0 ? 3.5 / maxDim : 1;
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/medicine-bottle.glb');

/* ─── Floating golden herb particles ─── */
function HerbParticles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    speeds[i] = 0.0015 + Math.random() * 0.003;
  }

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i) + speeds[i];
      pos.setY(i, y > 6 ? -6 : y);
    }
    pos.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#cccccc"
        size={0.055}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface ThreeBottleProps {
  className?: string;
  showParticles?: boolean;
  cameraZ?: number;
}

export default function ThreeBottle({
  className = '',
  showParticles = true,
  cameraZ = 8.5,
}: ThreeBottleProps) {
  return (
    <div className={`three-canvas-container ${className}`}>
      <Canvas
        camera={{ position: [0, 1, cameraZ], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight
          position={[3, 8, 5]}
          intensity={2.8}
          color="#ffffff"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-5, 2, 3]} intensity={1.4} color="#dddddd" />
        <pointLight position={[0, -2, -5]} intensity={0.5} color="#888888" />

        <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.35}>
          <Suspense fallback={null}>
            <BottleModel />
          </Suspense>
        </Float>

        {showParticles && <HerbParticles />}

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
