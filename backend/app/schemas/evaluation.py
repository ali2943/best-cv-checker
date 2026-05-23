from typing import List

from pydantic import BaseModel


class CandidateEvaluation(BaseModel):
    candidate_id: str
    filename: str
    match_score: float
    technical_suitability: str
    experience_quality: str
    project_relevance: str
    communication: str
    growth_potential: str
    strengths: List[str]
    weaknesses: List[str]
    overall_assessment: str


class EvaluationRequest(BaseModel):
    job_id: str
    matched_candidates: List[dict]
    job_title: str
    job_description: str


class EvaluationResponse(BaseModel):
    job_id: str
    evaluations: List[CandidateEvaluation]
    recommendation: str
    recommended_candidate_id: str
    reasoning: str
