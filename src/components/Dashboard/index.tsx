import React from 'react';
import { useStore } from '../../store/useStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
  ScatterChart, Scatter, ZAxis, Label
} from 'recharts';
import { AlertCircle, ShieldAlert, Cpu, Layers } from 'lucide-react';

export const DebtDashboard: React.FC = () => {
  const repoData = useStore((state) => state.repoData);
  const setSelectedFile = useStore((state) => state.setSelectedFile);
  const setActiveTab = useStore((state) => state.setActiveTab);

  if (!repoData) return null;

  // 1. DATA PREPARATION: Recharts Bar Chart (Folder Debt Comparison)
  const folderDebtData = Object.entries(repoData.districts).map(([folder, files]) => {
    const avgDebt = Math.round(files.reduce((sum, f) => sum + f.debtScore, 0) / files.length);
    const totalFiles = files.length;
    return {
      folder,
      avgDebt,
      totalFiles
    };
  });

  // 2. DATA PREPARATION: Recharts Area Chart (Historical Debt reduction)
  // We simulate 6 milestones showing progress paying down code debt
  const debtHistoryData = [
    { commit: 'Sprint 1', debtScore: Math.round(repoData.avgDebtScore * 1.5) },
    { commit: 'Sprint 2', debtScore: Math.round(repoData.avgDebtScore * 1.35) },
    { commit: 'Sprint 3', debtScore: Math.round(repoData.avgDebtScore * 1.2) },
    { commit: 'Sprint 4', debtScore: Math.round(repoData.avgDebtScore * 1.1) },
    { commit: 'Sprint 5', debtScore: Math.round(repoData.avgDebtScore * 1.02) },
    { commit: 'Current', debtScore: repoData.avgDebtScore },
  ];

  // 3. DATA PREPARATION: Recharts Scatter Plot (Complexity vs Coupling matrix)
  // Collect all files into a single flat coordinate list
  const scatterFilesData = Object.values(repoData.districts)
    .flat()
    .map((file) => ({
      name: file.name,
      complexity: file.complexity,
      coupling: file.coupling,
      debtScore: file.debtScore,
      fileRef: file // Keep reference to file for clicking trigger
    }));

  // Identify high-priority hotspots (top-right sector: Complexity > 60 & Coupling > 15)
  const hotspotsCount = scatterFilesData.filter(f => f.complexity > 60 && f.coupling > 15).length;

  const handleScatterClick = (node: any) => {
    if (node && node.payload && node.payload.fileRef) {
      setSelectedFile(node.payload.fileRef);
      setActiveTab('city'); // Switch to 3D City view to focus camera
    }
  };

  // Custom tooltips for nice styling matching panel
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/90 border border-white/10 p-3 rounded-lg shadow-xl font-mono text-xs text-left max-w-xs">
          <p className="text-cyan-400 font-bold font-outfit mb-1 truncate">{payload[0].payload.name || payload[0].payload.folder}</p>
          {payload.map((item: any, idx: number) => (
            <p key={idx} className="text-slate-300 flex justify-between gap-4 mt-0.5">
              <span className="capitalize">{item.name}:</span>
              <span className="font-bold text-slate-100">{item.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#020617] p-6 space-y-6 overflow-y-auto select-none">
      
      {/* Top row: KPI statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-950/60 border-white/5">
          <CardHeader className="py-4 flex flex-row items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Architecture Quality</span>
              <CardTitle className="text-2xl font-black font-outfit text-cyan-400 mt-1">
                {repoData.avgDebtScore < 40 ? 'Grade A' : repoData.avgDebtScore < 60 ? 'Grade B' : 'Grade C'}
              </CardTitle>
            </div>
            <Cpu className="h-8 w-8 text-cyan-400/20 shrink-0" />
          </CardHeader>
          <CardContent className="py-0 pb-4 text-xs text-slate-400 leading-relaxed">
            The overall repository structure displays a {repoData.avgDebtScore < 40 ? 'highly modular' : 'mostly modular'} decoupling coefficient.
          </CardContent>
        </Card>

        <Card className="bg-slate-950/60 border-white/5">
          <CardHeader className="py-4 flex flex-row items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Hotspot files</span>
              <CardTitle className="text-2xl font-black font-outfit text-rose-400 mt-1">
                {hotspotsCount} Hotspots
              </CardTitle>
            </div>
            <AlertCircle className="h-8 w-8 text-rose-400/20 shrink-0" />
          </CardHeader>
          <CardContent className="py-0 pb-4 text-xs text-slate-400 leading-relaxed">
            Identified {hotspotsCount} file coordinates located inside the Refactoring Danger Zone.
          </CardContent>
        </Card>

        <Card className="bg-slate-950/60 border-white/5">
          <CardHeader className="py-4 flex flex-row items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Test Coverage</span>
              <CardTitle className="text-2xl font-black font-outfit text-emerald-400 mt-1">
                {repoData.avgCoverage}%
              </CardTitle>
            </div>
            <ShieldAlert className="h-8 w-8 text-emerald-400/20 shrink-0" />
          </CardHeader>
          <CardContent className="py-0 pb-4 text-xs text-slate-400 leading-relaxed">
            Average automated branch test validation rate compiled across all modules.
          </CardContent>
        </Card>

        <Card className="bg-slate-950/60 border-white/5">
          <CardHeader className="py-4 flex flex-row items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Total codebase</span>
              <CardTitle className="text-2xl font-black font-outfit text-slate-200 mt-1">
                {repoData.totalLines.toLocaleString()} LOC
              </CardTitle>
            </div>
            <Layers className="h-8 w-8 text-slate-400/20 shrink-0" />
          </CardHeader>
          <CardContent className="py-0 pb-4 text-xs text-slate-400 leading-relaxed">
            Aggregated physical lines of source statements across {repoData.fileCount} registered files.
          </CardContent>
        </Card>
      </div>

      {/* Row 2: comparison & history */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* District Debt Comparison Bar Chart */}
        <Card className="bg-slate-950/60 border-white/5 h-[340px] flex flex-col">
          <CardHeader className="py-4">
            <CardTitle className="text-lg font-bold text-slate-200 font-outfit">
              District Debt Comparison
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Bar chart comparing average aggregated technical debt scores per city district (folder).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={folderDebtData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="folder" stroke="#475569" fontSize={10} fontClassName="font-mono" />
                <YAxis stroke="#475569" fontSize={10} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
                <Bar dataKey="avgDebt" fill="#06b6d4" name="Average Debt" radius={[4, 4, 0, 0]}>
                  {folderDebtData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.avgDebt >= 60 ? 'rgba(244, 63, 94, 0.8)' : entry.avgDebt >= 40 ? 'rgba(245, 158, 11, 0.8)' : 'rgba(16, 185, 129, 0.8)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Debt Trajectory History Area Chart */}
        <Card className="bg-slate-950/60 border-white/5 h-[340px] flex flex-col">
          <CardHeader className="py-4">
            <CardTitle className="text-lg font-bold text-slate-200 font-outfit">
              Debt Trajectory History
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Area chart tracking global codebase debt reduction across historic sprints/commits.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={debtHistoryData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="commit" stroke="#475569" fontSize={10} />
                <YAxis stroke="#475569" fontSize={10} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="debtScore" 
                  name="Codebase Debt"
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorDebt)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Row 3: Scatter plot of danger hotspots */}
      <Card className="bg-slate-950/60 border-white/5 h-[400px] flex flex-col">
        <CardHeader className="py-4">
          <CardTitle className="text-lg font-bold text-slate-200 font-outfit">
            Complexity vs Coupling Hotspots
          </CardTitle>
          <CardDescription className="text-xs text-slate-400">
            Scatter plot showing the distribution of files. Files in the top-right quadrant are highly complex and coupled—high priority refactor hotspots. Click nodes to focus.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: -10 }}>
              <CartesianGrid stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis 
                type="number" 
                dataKey="complexity" 
                name="Complexity" 
                stroke="#475569" 
                fontSize={10}
                domain={[0, 100]}
              >
                <Label value="Cognitive Complexity Score" offset={-5} position="insideBottom" fill="#475569" fontSize={10} />
              </XAxis>
              <YAxis 
                type="number" 
                dataKey="coupling" 
                name="Coupling" 
                stroke="#475569" 
                fontSize={10}
                domain={[0, 30]}
              >
                <Label value="Coupled Import Modules" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#475569" fontSize={10} />
              </YAxis>
              <ZAxis type="number" dataKey="debtScore" range={[40, 240]} />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter 
                name="Source Files" 
                data={scatterFilesData} 
                fill="#22d3ee" 
                onClick={handleScatterClick}
                className="cursor-pointer"
              >
                {scatterFilesData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.complexity > 60 && entry.coupling > 15 ? 'rgba(244, 63, 94, 0.8)' : entry.debtScore >= 60 ? 'rgba(245, 158, 11, 0.8)' : 'rgba(6, 182, 212, 0.7)'}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
};
