from typing import List, Optional

from pydantic import BaseModel, Field


class MatchRequest(BaseModel):
    job_id: str
    candidate_ids: Optional[List[str]] = Field(default=None)


class MatchResult(BaseModel):
    candidate_id: str
    filename: str
    score: float


class MatchResponse(BaseModel):
    job_id: str
    results: List[MatchResult]

