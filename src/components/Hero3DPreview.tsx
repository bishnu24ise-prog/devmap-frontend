import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Edges } from '@react-three/drei';
import * as THREE from 'three';

// A single abstract glowing building
const GlowingBuilding = ({ position, scale, color }: { position: [number, number, number], scale: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Slight bobbing animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} emissive={color} emissiveIntensity={0.8} />
      <Edges scale={1.05} threshold={15} color="#ffffff" />
    </mesh>
  );
};

// The rotating city block
const CityBlock = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Base platform */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color="#0f172a" transparent opacity={0.8} />
        <Edges scale={1.01} color="#22d3ee" />
      </mesh>
      
      {/* Abstract Buildings */}
      <GlowingBuilding position={[-2, 1.5, -2]} scale={[1.5, 3, 1.5]} color="#22d3ee" />
      <GlowingBuilding position={[2, 2.5, -1]} scale={[2, 5, 2]} color="#818cf8" />
      <GlowingBuilding position={[-1, 1, 2]} scale={[1.2, 2, 1.2]} color="#38bdf8" />
      <GlowingBuilding position={[3, 1, 3]} scale={[1, 2, 1]} color="#a78bfa" />
      <GlowingBuilding position={[0, 4, 0]} scale={[1.8, 8, 1.8]} color="#2dd4bf" />
      <GlowingBuilding position={[-3, 2, 1]} scale={[1, 4, 1]} color="#4ade80" />
      
      {/* Floating data particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 8, Math.random() * 8, (Math.random() - 0.5) * 8]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

export const Hero3DPreview: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 80%)' }}>
      <Canvas camera={{ position: [10, 8, 10], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, 10, -10]} intensity={2} color="#22d3ee" />
        <pointLight position={[10, 5, 10]} intensity={2} color="#818cf8" />
        
        <CityBlock />
        
        {/* We disable zoom/pan because it's just a background effect, but auto-rotate adds life */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};
