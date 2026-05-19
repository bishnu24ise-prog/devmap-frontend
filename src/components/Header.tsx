import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from './ui/Button';
import { Tabs, TabsList, TabsTrigger } from './ui/Tabs';
import { RefreshCw, LayoutDashboard, Binary, ShieldAlert, BarChart3, HelpCircle, User, Award, BookOpen } from 'lucide-react';
import { Dialog } from './ui/Dialog';

export const Header: React.FC = () => {
  const repoData = useStore((state) => state.repoData);
  const activeTab = useStore((state) => state.activeTab);
  const setActiveTab = useStore((state) => state.setActiveTab);
  const resetStore = useStore((state) => state.resetStore);

  if (!repoData) return null;

  // Formatting average score color
  const getDebtScoreColor = (score: number) => {
    if (score < 40) return 'text-emerald-400 glow-text-emerald';
    if (score < 70) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <header className="w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 z-40 relative">
      {/* Brand & Repository Name */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={resetStore}>
          <span className="text-2xl">🏙️</span>
          <h1 className="text-2xl font-extrabold tracking-tight font-outfit bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            DebtMap
          </h1>
        </div>
        <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Current Repo</span>
          <span className="text-sm font-semibold font-outfit text-slate-200">{repoData.repoName}</span>
        </div>
      </div>

      {/* Main Aggregated Stats Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm">
        <div className="flex items-center gap-2 bg-slate-900/60 border border-white/5 px-3 py-1.5 rounded-lg">
          <Binary className="h-4 w-4 text-cyan-400" />
          <span className="text-slate-400">Files:</span>
          <span className="font-bold text-slate-200 font-mono">{repoData.fileCount}</span>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-900/60 border border-white/5 px-3 py-1.5 rounded-lg">
          <ShieldAlert className="h-4 w-4 text-amber-400" />
          <span className="text-slate-400">Avg Debt Score:</span>
          <span className={`font-bold font-mono ${getDebtScoreColor(repoData.avgDebtScore)}`}>
            {repoData.avgDebtScore}/100
          </span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/60 border border-white/5 px-3 py-1.5 rounded-lg">
          <LayoutDashboard className="h-4 w-4 text-emerald-400" />
          <span className="text-slate-400">Avg Coverage:</span>
          <span className="font-bold text-slate-200 font-mono">{repoData.avgCoverage}%</span>
        </div>
      </div>

      {/* Tab Selectors & Swap Buttons */}
      <div className="flex items-center gap-4">
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-[360px] md:w-[440px]">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="city" className="flex items-center justify-center gap-1.5">
              <span>3D City</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center justify-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="refactor" className="flex items-center justify-center gap-1.5">
              <span>AI Refactor</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center justify-center gap-1.5">
              <span>About</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" size="icon" title="Analyze New Repository" onClick={resetStore}>
          <RefreshCw className="h-4 w-4 text-slate-300" />
        </Button>
      </div>
    </header>
  );
};
