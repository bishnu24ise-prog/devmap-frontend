export interface FileIssue {
  type: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface FileNode {
  name: string;
  path: string;
  folder: string; // The folder name (district)
  complexity: number; // Building Height
  coupling: number; // Building Width/Depth
  coverage: number; // Test coverage percentage (0 - 100)
  lineCount: number;
  language: string;
  issues: FileIssue[];
  code: string;
  refactoredCode: string;
  refactorPlan: string;
  debtScore: number; // Combined score derived from complexity and coupling modulated by coverage
}

export interface RepoData {
  repoName: string;
  fileCount: number;
  totalLines: number;
  avgCoverage: number;
  avgDebtScore: number;
  districts: Record<string, FileNode[]>; // Grouped by folder
}

export interface FilterSettings {
  minDebt: number;
  minComplexity: number;
  searchQuery: string;
  selectedLanguage: string;
}

export type AnalysisStatus = 'idle' | 'loading' | 'done' | 'error';

export interface ProgressLog {
  step: string;
  status: 'pending' | 'running' | 'success' | 'error';
  percent: number;
}
