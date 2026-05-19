import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { startAnalysis, getAnalysisProgress, getAnalysisResults, getRefactorPlan } from '../api/mockApi';
import { useStore } from '../store/useStore';
import { useEffect, useRef } from 'react';

// 1. Analyze Repo Mutation (POST /api/analyze)
export const useAnalyzeMutation = () => {
  const queryClient = useQueryClient();
  const setJobId = useStore((state) => state.setJobId);
  const setAnalysisStatus = useStore((state) => state.setAnalysisStatus);
  const setProgressLogs = useStore((state) => state.setProgressLogs);
  const updateProgressPercent = useStore((state) => state.updateProgressPercent);

  return useMutation({
    mutationFn: async ({ repoUrl, isZip }: { repoUrl: string; isZip: boolean }) => {
      setAnalysisStatus('loading');
      updateProgressPercent(0);
      setProgressLogs(getAnalysisProgress(0));
      const res = await startAnalysis(repoUrl, isZip);
      return res.job_id;
    },
    onSuccess: (jobId) => {
      setJobId(jobId);
      queryClient.invalidateQueries({ queryKey: ['results', jobId] });
    },
    onError: () => {
      setAnalysisStatus('error');
    }
  });
};

// 2. Status Polling Hook (GET /api/status/:id)
// We simulate status polling on the client side with a robust high-performance refetching effect
export const useStatusPolling = () => {
  const jobId = useStore((state) => state.jobId);
  const analysisStatus = useStore((state) => state.analysisStatus);
  const setAnalysisStatus = useStore((state) => state.setAnalysisStatus);
  const setProgressLogs = useStore((state) => state.setProgressLogs);
  const updateProgressPercent = useStore((state) => state.updateProgressPercent);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (analysisStatus === 'loading' && jobId) {
      if (timerRef.current) clearInterval(timerRef.current);

      const poll = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/jobs/${jobId}`);
          if (!response.ok) return;
          const data = await response.json();

          updateProgressPercent(data.progress);
          setProgressLogs(getAnalysisProgress(data.progress));

          if (data.status === 'completed') {
            if (timerRef.current) clearInterval(timerRef.current);
            setTimeout(() => {
              setAnalysisStatus('done');
            }, 500);
          } else if (data.status === 'failed') {
            if (timerRef.current) clearInterval(timerRef.current);
            setAnalysisStatus('error');
          }
        } catch (error) {
          console.error('Error polling status:', error);
        }
      };

      // Poll every 1000ms
      timerRef.current = setInterval(poll, 1000);
      poll(); // initial check
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [analysisStatus, jobId, setAnalysisStatus, setProgressLogs, updateProgressPercent]);
};

// 3. Get Analysis Results (GET /api/results/:id)
export const useRepoResults = () => {
  const jobId = useStore((state) => state.jobId);
  const analysisStatus = useStore((state) => state.analysisStatus);
  const setRepoData = useStore((state) => state.setRepoData);

  return useQuery({
    queryKey: ['results', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('No active job ID found');
      const data = await getAnalysisResults(jobId);
      setRepoData(data);
      return data;
    },
    enabled: analysisStatus === 'done' && !!jobId,
    staleTime: Infinity,
  });
};

// 4. Get AI Refactoring Suggestion (GET /api/refactor/:fileId)
export const useFileRefactor = (fileId: string | null) => {
  return useQuery({
    queryKey: ['refactor', fileId],
    queryFn: async () => {
      if (!fileId) throw new Error('No file selected for refactoring');
      return getRefactorPlan(fileId);
    },
    enabled: !!fileId,
    staleTime: 1000 * 60 * 15, // Cache refactor recommendations for 15 minutes
  });
};
