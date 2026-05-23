import React, { createContext, useContext, useState } from 'react';
import { Job, Candidate, MatchResponse, EvaluationResponse, AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [matchResults, setMatchResults] = useState<MatchResponse | null>(null);
  const [evaluationResults, setEvaluationResults] = useState<EvaluationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: AppContextType = {
    currentJob,
    setCurrentJob,
    candidates,
    setCandidates,
    matchResults,
    setMatchResults,
    evaluationResults,
    setEvaluationResults,
    loading,
    setLoading,
    error,
    setError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
