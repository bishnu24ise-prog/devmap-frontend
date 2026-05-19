import React from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { X, FileCode2, ShieldAlert, Zap, AlertTriangle, CheckSquare } from 'lucide-react';

export const BuildingPanel: React.FC = () => {
  const selectedFile = useStore((state) => state.selectedFile);
  const setSelectedFile = useStore((state) => state.setSelectedFile);
  const setActiveTab = useStore((state) => state.setActiveTab);

  if (!selectedFile) return null;

  // SVG Circular Gauge Calculations
  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (selectedFile.debtScore / 100) * circumference;

  // Resolving severity styling parameters
  const getSeverityBadgeClass = (sev: 'low' | 'medium' | 'high') => {
    switch (sev) {
      case 'high': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'low': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
  };

  const handleLaunchRefactor = () => {
    setActiveTab('refactor');
  };

  return (
    <div className="w-[380px] h-[calc(100vh-80px)] border-l border-white/5 bg-slate-950/80 backdrop-blur-2xl flex flex-col z-30 shadow-2xl relative animate-in slide-in-from-right duration-300">
      
      {/* Panel Title & Close Binds */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/40">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-5 w-5 text-cyan-400" />
          <h2 className="font-bold text-slate-100 font-outfit text-sm truncate max-w-[260px]">
            {selectedFile.name}
          </h2>
        </div>
        <button 
          onClick={() => setSelectedFile(null)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Main Panel Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* District folder breadcrumbs */}
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Location Sector</span>
          <p className="text-xs text-slate-300 font-mono break-all bg-slate-900/30 p-2 rounded border border-white/5">
            {selectedFile.path}
          </p>
        </div>

        {/* Aggregated Debt Score SVG Dial Gauge */}
        <div className="flex items-center gap-4 bg-slate-900/40 border border-white/5 p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            {/* SVG circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="stroke-slate-800"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="stroke-cyan-400 transition-all duration-1000 ease-out"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.5))' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black font-mono text-cyan-400">{selectedFile.debtScore}</span>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider">DEBT Score</span>
            </div>
          </div>
          
          <div className="space-y-1.5 font-sans">
            <h3 className="font-bold text-slate-200 font-outfit text-sm">Aggregated Index</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This score aggregates cyclomatic path complexities and imports coupling, modulated by test coverage coefficients.
            </p>
          </div>
        </div>

        {/* Metrics Grid breakdown */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900/30 border border-white/5 p-3 rounded-lg flex flex-col font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase">Complexity (Height)</span>
            <span className="text-slate-200 font-bold text-lg mt-1">{selectedFile.complexity}</span>
            <span className="text-[9px] text-slate-400 mt-0.5">Cyclomatic Nodes</span>
          </div>

          <div className="bg-slate-900/30 border border-white/5 p-3 rounded-lg flex flex-col font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase">Coupling (Width)</span>
            <span className="text-slate-200 font-bold text-lg mt-1">{selectedFile.coupling}</span>
            <span className="text-[9px] text-slate-400 mt-0.5">Import dependencies</span>
          </div>

          <div className="bg-slate-900/30 border border-white/5 p-3 rounded-lg flex flex-col font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase">Test Coverage</span>
            <span className={`font-bold text-lg mt-1 ${
              selectedFile.coverage >= 80 ? 'text-emerald-400' : selectedFile.coverage >= 40 ? 'text-amber-400' : 'text-rose-400'
            }`}>{selectedFile.coverage}%</span>
            <span className="text-[9px] text-slate-400 mt-0.5">Tested branches</span>
          </div>

          <div className="bg-slate-900/30 border border-white/5 p-3 rounded-lg flex flex-col font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase">Lines of Code</span>
            <span className="text-slate-200 font-bold text-lg mt-1">{selectedFile.lineCount}</span>
            <span className="text-[9px] text-slate-400 mt-0.5">Source statements</span>
          </div>
        </div>

        {/* Diagnostic Issues Check list */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4 text-rose-500" />
            <h3 className="font-bold text-slate-200 font-outfit text-xs uppercase tracking-wider">
              Diagnostic Health Checks
            </h3>
          </div>
          
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {selectedFile.issues.length === 0 ? (
              <div className="text-center py-6 bg-slate-900/20 border border-dashed border-white/5 rounded-lg text-xs text-slate-500 font-mono">
                ✅ 0 diagnostic warnings detected in file!
              </div>
            ) : (
              selectedFile.issues.map((issue, index) => (
                <div 
                  key={index}
                  className="p-3 bg-slate-950/60 border border-white/5 rounded-lg space-y-1.5 flex flex-col items-start"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-slate-200 font-bold font-outfit text-[11px]">
                      {issue.type}
                    </span>
                    <span className={`px-1.5 py-0.5 border text-[9px] rounded font-mono font-bold uppercase tracking-wider ${getSeverityBadgeClass(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {issue.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Panel Bottom Sticky Refactor Button */}
      <div className="p-4 border-t border-white/5 bg-slate-900/30 flex flex-col w-full shrink-0">
        <Button 
          variant="glow" 
          className="w-full h-11 flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          onClick={handleLaunchRefactor}
        >
          <Zap className="h-4 w-4 text-cyan-400 group-hover:scale-125 transition-transform" />
          <span>Launch AI Refactor Suggestion</span>
        </Button>
      </div>

    </div>
  );
};
