import axios from 'axios';
import { JobResponse, Candidate, MatchResponse, EvaluationResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  health: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  createJob: async (title: string, description: string): Promise<JobResponse> => {
    const response = await api.post('/jobs', { title, description });
    return response.data;
  },

  uploadCV: async (file: File): Promise<Candidate> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload-cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  matchCandidates: async (jobId: string, candidateIds?: string[]): Promise<MatchResponse> => {
    const response = await api.post('/match', {
      job_id: jobId,
      candidate_ids: candidateIds || null,
    });
    return response.data;
  },

  evaluateCandidates: async (
    jobId: string,
    jobTitle: string,
    jobDescription: string,
    matchedCandidates: Array<{ candidate_id: string; score: number }>
  ): Promise<EvaluationResponse> => {
    const response = await api.post('/evaluate', {
      job_id: jobId,
      job_title: jobTitle,
      job_description: jobDescription,
      matched_candidates: matchedCandidates,
    });
    return response.data;
  },
};
