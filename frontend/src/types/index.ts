export interface Job {
  job_id: string;
  title: string;
  description: string;
}

export interface JobResponse {
  job_id: string;
  title: string;
}

export interface Candidate {
  candidate_id: string;
  filename: string;
  text_length: number;
}

export interface MatchResult {
  candidate_id: string;
  filename: string;
  score: number;
}

export interface MatchResponse {
  job_id: string;
  results: MatchResult[];
}

export interface CandidateEvaluation {
  candidate_id: string;
  filename: string;
  match_score: number;
  technical_suitability: string;
  experience_quality: string;
  project_relevance: string;
  communication: string;
  growth_potential: string;
  strengths: string[];
  weaknesses: string[];
  overall_assessment: string;
}

export interface EvaluationResponse {
  job_id: string;
  evaluations: CandidateEvaluation[];
  recommendation: string;
  recommended_candidate_id: string;
  reasoning: string;
}

export interface AppContextType {
  currentJob: Job | null;
  setCurrentJob: (job: Job) => void;
  candidates: Candidate[];
  setCandidates: (candidates: Candidate[]) => void;
  matchResults: MatchResponse | null;
  setMatchResults: (results: MatchResponse) => void;
  evaluationResults: EvaluationResponse | null;
  setEvaluationResults: (results: EvaluationResponse) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}
