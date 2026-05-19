import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import { Building } from './Building';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ShieldAlert, HelpCircle } from 'lucide-react';

export const CityScene: React.FC = () => {
  const repoData = useStore((state) => state.repoData);
  const filterSettings = useStore((state) => state.filterSettings);
  const updateFilterSettings = useStore((state) => state.updateFilterSettings);
  const selectedFile = useStore((state) => state.selectedFile);

  if (!repoData) return null;

  // 1. FILTER BUILDINGS BASED ON USER SETTINGS
  const filteredDistricts = Object.entries(repoData.districts).reduce((acc, [folder, files]) => {
    const matchingFiles = files.filter((file) => {
      const matchSearch = file.name.toLowerCase().includes(filterSettings.searchQuery.toLowerCase()) ||
                          file.path.toLowerCase().includes(filterSettings.searchQuery.toLowerCase());
      const matchLanguage = filterSettings.selectedLanguage === 'all' || 
                            file.language.toLowerCase() === filterSettings.selectedLanguage.toLowerCase();
      const matchDebt = file.debtScore >= filterSettings.minDebt;
      const matchComplexity = file.complexity >= filterSettings.minComplexity;

      return matchSearch && matchLanguage && matchDebt && matchComplexity;
    });

    if (matchingFiles.length > 0) {
      acc[folder] = matchingFiles;
    }
    return acc;
  }, {} as Record<string, typeof repoData.districts[string]>);

  const districtsList = Object.entries(filteredDistricts);
  const totalDistricts = districtsList.length;

  // 2. DISTRICT POSITIONING IN A CIRCULAR RING METROPOLIS
  const getDistrictCenter = (index: number): [number, number] => {
    if (totalDistricts <= 1) return [0, 0];
    const angle = (index / totalDistricts) * Math.PI * 2;
    const radius = 16; // Distance from center for districts
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  };

  return (
    <div className="w-full h-full relative flex flex-col bg-[#020617] overflow-hidden">
      
      {/* 3D R3F Canvas Container */}
      <div className="flex-1 w-full h-full canvas-container relative">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-mono text-sm z-10">
            ⏳ Generating 3D district buffers...
          </div>
        }>
          <Canvas
            shadows
            camera={{ position: [0, 15, 30], fov: 50 }}
            gl={{ antialias: true }}
          >
            {/* Ambient Background Light */}
            <ambientLight intensity={0.4} />
            
            {/* Custom directional sun spotlight with shadow maps */}
            <directionalLight
              castShadow
              position={[10, 25, 15]}
              intensity={1.2}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
            
            {/* Futuristic Grid Floor */}
            <gridHelper 
              args={[100, 50, '#06b6d4', '#1e293b']} 
              position={[0, -0.01, 0]} 
            />

            {/* Render all districts and their internal file buildings */}
            {districtsList.map(([folder, files], dIndex) => {
              const [dcX, dcZ] = getDistrictCenter(dIndex);
              
              // Lay out files in a compact square sub-grid centered on district center
              const count = files.length;
              const gridW = Math.ceil(Math.sqrt(count));
              const spacing = 3.6; // Spacing parameter for individual buildings

              return (
                <group key={folder}>
                  {/* Glowing District Label Floor Anchor */}
                  <Html
                    position={[dcX, 0.05, dcZ]}
                    center
                    className="pointer-events-none select-none"
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-mono text-cyan-400/50 uppercase tracking-widest bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/10 whitespace-nowrap shadow-lg">
                        /{folder}
                      </span>
                    </div>
                  </Html>

                  {/* Render files in a compact local matrix grid */}
                  {files.map((file, fIndex) => {
                    const row = Math.floor(fIndex / gridW);
                    const col = fIndex % gridW;
                    
                    // Offset relative to district center so cluster sits centered
                    const offX = (col - (gridW - 1) / 2) * spacing;
                    const offZ = (row - (gridW - 1) / 2) * spacing;

                    return (
                      <Building
                        key={file.path}
                        file={file}
                        position={[dcX + offX, 0, dcZ + offZ]}
                      />
                    );
                  })}
                </group>
              );
            })}

            {/* Smooth Navigation Orbit Camera Controls */}
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={5}
              maxDistance={60}
              maxPolarAngle={Math.PI / 2 - 0.05} // Block camera from going underground
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Floating Control Sliders HUD on top-left of the viewport */}
      <Card className="absolute top-4 left-4 z-10 w-[260px] border-white/5 bg-slate-950/85 backdrop-blur-xl p-4 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-300 font-outfit uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5 text-cyan-400" /> Filter HUD
          </h4>
          <div className="h-[1px] bg-white/5 mb-3" />
          
          <div className="space-y-3 font-sans">
            {/* Search filter */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Search File</label>
              <Input
                value={filterSettings.searchQuery}
                onChange={(e) => updateFilterSettings({ searchQuery: e.target.value })}
                placeholder="Search by name..."
                className="h-8 text-xs bg-slate-900/60"
              />
            </div>

            {/* Minimum Debt Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                <span>Min Debt Index</span>
                <span className="text-cyan-400 font-bold">{filterSettings.minDebt}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={filterSettings.minDebt}
                onChange={(e) => updateFilterSettings({ minDebt: parseInt(e.target.value) })}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Minimum Complexity Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                <span>Min Complexity</span>
                <span className="text-cyan-400 font-bold">{filterSettings.minComplexity}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={filterSettings.minComplexity}
                onChange={(e) => updateFilterSettings({ minComplexity: parseInt(e.target.value) })}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Language filter */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Language</label>
              <select
                value={filterSettings.selectedLanguage}
                onChange={(e) => updateFilterSettings({ selectedLanguage: e.target.value })}
                className="w-full h-8 rounded-lg border border-white/5 bg-slate-900/60 px-2 py-1 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
              >
                <option value="all">All Languages</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="go">Go</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Camera Instructions Guide Badge at the bottom center */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-950/70 border border-white/5 px-3 py-1.5 rounded-full text-[10px] text-slate-400 font-mono tracking-wider pointer-events-none select-none flex items-center gap-1.5 backdrop-blur-md">
        <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
        <span>Rotate: Left Click + Drag &bull; Pan: Right Click + Drag &bull; Zoom: Scroll &bull; Click to Inspect</span>
      </div>
    </div>
  );
};
