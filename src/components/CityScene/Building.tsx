import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { FileNode } from '../../types';
import { Html } from '@react-three/drei';

interface BuildingProps {
  file: FileNode;
  position: [number, number, number];
}

export const Building: React.FC<BuildingProps> = ({ file, position }) => {
  const [hovered, setHovered] = useState(false);
  const selectedFile = useStore((state) => state.selectedFile);
  const setSelectedFile = useStore((state) => state.setSelectedFile);

  const isSelected = selectedFile?.path === file.path;

  // 1. DIMENSION CALCULATIONS (Highly visual scaling)
  // Height = Complexity (Min 0.8, Max 7.0)
  const height = Math.max(0.8, (file.complexity / 100) * 6);
  
  // Width/Depth = Coupling (Min 0.5, Max 2.5)
  const width = Math.max(0.5, (file.coupling / 30) * 2);

  // Adjusted Y position to make building sit perfectly flat on the grid floor (y = 0)
  const adjustedY = height / 2;

  // 2. CYBER COLOUR & MATERIAL RESOLUTIONS
  const getMaterialProperties = () => {
    if (file.coverage >= 80) {
      return {
        color: '#10b981', // Neon Emerald Green
        emissive: '#10b981',
        emissiveIntensity: hovered || isSelected ? 0.8 : 0.25,
        roughness: 0.1,
        metalness: 0.8
      };
    } else if (file.coverage >= 40) {
      return {
        color: '#f59e0b', // Warm Amber Orange
        emissive: '#f59e0b',
        emissiveIntensity: hovered || isSelected ? 0.6 : 0.15,
        roughness: 0.3,
        metalness: 0.4
      };
    } else {
      return {
        color: '#f43f5e', // Decaying Crumbling Red/Rust
        emissive: '#991b1b',
        emissiveIntensity: hovered || isSelected ? 0.3 : 0.05,
        roughness: 0.9, // Matte and rough, representing high friction/decay
        metalness: 0.1
      };
    }
  };

  const matProps = getMaterialProperties();

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedFile(file);
  };

  return (
    <group 
      position={[position[0], adjustedY, position[2]]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* 3D Box Geometry representing file */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial {...matProps} />
      </mesh>

      {/* Cybernetic Wireframe Highlights Overlay */}
      <mesh>
        <boxGeometry args={[width * 1.01, height * 1.01, width * 1.01]} />
        <meshBasicMaterial 
          color={isSelected ? '#06b6d4' : hovered ? '#22d3ee' : matProps.color}
          wireframe 
          transparent
          opacity={isSelected ? 0.8 : hovered ? 0.5 : 0.15}
        />
      </mesh>

      {/* Glowing base neon ring if selected */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -height / 2 + 0.02, 0]}>
          <ringGeometry args={[width * 0.7, width * 0.8, 32]} />
          <meshBasicMaterial color="#06b6d4" side={2} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Floating Tooltip Label (Drei HTML Overlay) */}
      {hovered && (
        <Html 
          distanceFactor={12} 
          position={[0, height / 2 + 0.8, 0]} 
          center 
          className="pointer-events-none z-50 select-none"
        >
          <div className="bg-slate-950/90 border border-cyan-500/30 px-3 py-2 rounded-lg shadow-xl text-left w-48 font-mono text-[10px] space-y-1 backdrop-blur-md animate-in fade-in duration-100">
            <p className="text-cyan-400 font-bold font-outfit truncate">{file.name}</p>
            <div className="h-[1px] bg-white/5 my-1" />
            <p className="text-slate-400 flex justify-between">
              <span>Lines:</span> <span className="text-slate-100 font-bold">{file.lineCount}</span>
            </p>
            <p className="text-slate-400 flex justify-between">
              <span>Complexity:</span> <span className="text-slate-100 font-bold">{file.complexity}</span>
            </p>
            <p className="text-slate-400 flex justify-between">
              <span>Coupling:</span> <span className="text-slate-100 font-bold">{file.coupling}</span>
            </p>
            <p className="text-slate-400 flex justify-between">
              <span>Coverage:</span> <span className={`${file.coverage >= 80 ? 'text-emerald-400' : file.coverage >= 40 ? 'text-amber-400' : 'text-rose-400'} font-bold`}>{file.coverage}%</span>
            </p>
            <p className="text-[9px] text-cyan-500/60 uppercase tracking-widest text-center mt-1 animate-pulse">
              Click to inspect
            </p>
          </div>
        </Html>
      )}
    </group>
  );
};
