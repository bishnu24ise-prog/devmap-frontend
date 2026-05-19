import { RepoData } from '../types';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Start Analysis API
export async function startAnalysis(repoUrl: string, isZip: boolean = false) {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ repo_url: repoUrl, is_zip: isZip })
  });
  
  const data = await response.json();
  if (data.job_id) {
    // Save to localStorage so subsequent pages/calls can load it easily
    localStorage.setItem('active_job_id', data.job_id);
  }
  return data; // { job_id: "..." }
}

// Fetch Results API
export const getAnalysisResults = async (jobId: string): Promise<RepoData> => {
  const response = await fetch(`${API_BASE_URL}/api/results/${jobId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch analysis results');
  }
  return response.json();
};

// Fetch AI Refactoring Suggestion API
export const getRefactorPlan = async (fileId: string): Promise<{ plan: string; dirtyCode: string; cleanCode: string }> => {
  const jobId = localStorage.getItem('active_job_id');
  if (!jobId) throw new Error('No active job ID found in localStorage');
  
  const response = await fetch(`${API_BASE_URL}/api/refactor?jobId=${jobId}&filePath=${encodeURIComponent(fileId)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch file refactor plan');
  }
  return response.json();
};

// Progress helper (remains client-side for rendering loading statuses)
export const getAnalysisProgress = (percent: number) => {
  const steps = [
    { step: 'Cloning repository structure...', min: 0, max: 20 },
    { step: 'Building Abstract Syntax Trees (AST)...', min: 20, max: 45 },
    { step: 'Parsing module exports & counting couplings...', min: 45, max: 70 },
    { step: 'Mapping coverage reports onto source grid...', min: 70, max: 90 },
    { step: 'Compiling interactive 3D virtual districts...', min: 90, max: 100 }
  ];

  return steps.map((s) => {
    let status: 'pending' | 'running' | 'success' = 'pending';
    if (percent >= s.max) {
      status = 'success';
    } else if (percent > s.min && percent < s.max) {
      status = 'running';
    }
    return {
      step: s.step,
      status,
      percent: percent >= s.max ? 100 : percent <= s.min ? 0 : Math.round(((percent - s.min) / (s.max - s.min)) * 100)
    };
  });
};
