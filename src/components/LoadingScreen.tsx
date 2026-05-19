import React from 'react';
import { useStore } from '../store/useStore';
import { Progress } from './ui/Progress';
import { Card, CardContent } from './ui/Card';
import { Loader2, Terminal, ShieldAlert } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const progressLogs = useStore((state) => state.progressLogs);
  const percent = useStore((state) => state.currentProgressPercent);

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80" />

      {/* Cybernetic Spinning Radar Grid */}
      <div className="relative w-48 h-48 mb-12 flex items-center justify-center z-10">
        
        {/* Outer Glowing Circle */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)]" />
        
        {/* Middle Dotted Ring */}
        <div className="absolute w-40 h-40 rounded-full border-2 border-dashed border-cyan-500/10 animate-[spin_60s_linear_infinite]" />
        
        {/* Inner Scan Circle */}
        <div className="absolute w-32 h-32 rounded-full border border-cyan-500/30 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-cyan-500/5" />
          
          {/* Radar sweep hand */}
          <div className="absolute top-1/2 left-1/2 w-16 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent origin-left animate-[spin_2s_linear_infinite] -mt-[1px]" />
          
          {/* Central flashing processor icon */}
          <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
        </div>

        {/* Small blip elements inside radar */}
        <div className="absolute top-10 left-16 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
        <div className="absolute bottom-12 right-14 w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
      </div>

      {/* Progress & Log Card */}
      <div className="max-w-xl w-full z-10 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-outfit text-slate-100 uppercase tracking-wider">
            Compiling Digital Metropolis
          </h2>
          <p className="text-xs text-cyan-400 font-mono tracking-widest uppercase">
            Parsing Codebase metrics &bull; {percent}% Complete
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-4">
          <Progress value={percent} className="h-3 shadow-[0_0_15px_rgba(6,182,212,0.1)] border border-cyan-500/10" />
        </div>

        {/* Console Log Panel */}
        <Card className="border-white/5 bg-slate-950/90 glass-panel shadow-2xl overflow-hidden">
          <div className="bg-slate-900/60 border-b border-white/5 px-4 py-3 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Telemetry Diagnostics Log
            </span>
          </div>
          <CardContent className="p-4 space-y-2 max-h-[220px] overflow-y-auto font-mono text-xs">
            {progressLogs.map((log, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-2 rounded transition-colors ${
                  log.status === 'running' 
                    ? 'bg-cyan-500/5 text-cyan-400 border-l border-cyan-500' 
                    : log.status === 'success' 
                    ? 'text-slate-400' 
                    : 'text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px]">
                    {log.status === 'success' ? '⚡' : log.status === 'running' ? '⏳' : '📥'}
                  </span>
                  <span>{log.step}</span>
                </div>
                
                <span className={`font-bold tracking-wider uppercase text-[10px] ${
                  log.status === 'success' 
                    ? 'text-emerald-400' 
                    : log.status === 'running' 
                    ? 'text-cyan-400 animate-pulse' 
                    : 'text-slate-600'
                }`}>
                  {log.status === 'success' 
                    ? 'DONE' 
                    : log.status === 'running' 
                    ? 'RUNNING' 
                    : 'QUEUED'}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
