import { create } from 'zustand';
import { RepoData, FileNode, FilterSettings, AnalysisStatus, ProgressLog } from '../types';

interface AppState {
  // Data State
  repoData: RepoData | null;
  selectedFile: FileNode | null;
  
  // Settings & Filters
  filterSettings: FilterSettings;
  activeTab: 'city' | 'dashboard' | 'refactor' | 'about';
  
  // Async API & Parsing State
  analysisStatus: AnalysisStatus;
  jobId: string | null;
  progressLogs: ProgressLog[];
  currentProgressPercent: number;

  // Actions
  setRepoData: (data: RepoData | null) => void;
  setSelectedFile: (file: FileNode | null) => void;
  updateFilterSettings: (settings: Partial<FilterSettings>) => void;
  setActiveTab: (tab: 'city' | 'dashboard' | 'refactor' | 'about') => void;
  setAnalysisStatus: (status: AnalysisStatus) => void;
  setJobId: (id: string | null) => void;
  setProgressLogs: (logs: ProgressLog[]) => void;
  updateProgressPercent: (percent: number) => void;
  resetStore: () => void;
}

const initialFilterSettings: FilterSettings = {
  minDebt: 0,
  minComplexity: 0,
  searchQuery: '',
  selectedLanguage: 'all',
};

export const useStore = create<AppState>((set) => ({
  repoData: null,
  selectedFile: null,
  
  filterSettings: initialFilterSettings,
  activeTab: 'city',
  
  analysisStatus: 'idle',
  jobId: null,
  progressLogs: [],
  currentProgressPercent: 0,

  setRepoData: (data) => set({ repoData: data }),
  setSelectedFile: (file) => set({ selectedFile: file }),
  updateFilterSettings: (settings) => 
    set((state) => ({ filterSettings: { ...state.filterSettings, ...settings } })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setAnalysisStatus: (status) => set({ analysisStatus: status }),
  setJobId: (id) => set({ jobId: id }),
  setProgressLogs: (logs) => set({ progressLogs: logs }),
  updateProgressPercent: (percent) => set({ currentProgressPercent: percent }),
  
  resetStore: () => set({
    repoData: null,
    selectedFile: null,
    filterSettings: initialFilterSettings,
    activeTab: 'city',
    analysisStatus: 'idle',
    jobId: null,
    progressLogs: [],
    currentProgressPercent: 0,
  }),
}));
