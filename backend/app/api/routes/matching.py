from fastapi import APIRouter, HTTPException

from app.schemas.matching import MatchRequest, MatchResponse, MatchResult
from app.services import ranking, scoring
from app.storage import get_candidate, get_job, list_candidates

router = APIRouter()


@router.post("/match", response_model=MatchResponse)
def match_candidates(payload: MatchRequest):
    job = get_job(payload.job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found.")

    if payload.candidate_ids:
        candidates = []
        for candidate_id in payload.candidate_ids:
            candidate = get_candidate(candidate_id)
            if not candidate:
                raise HTTPException(status_code=404, detail=f"Candidate {candidate_id} not found.")
            candidates.append(candidate)
    else:
        candidates = list_candidates()

    if not candidates:
        raise HTTPException(status_code=404, detail="No candidates available for matching.")

    results = []
    for candidate in candidates:
        similarity = scoring.cosine_similarity(job.embedding, candidate.embedding)
        score = scoring.to_percentage(similarity)
        results.append(
            MatchResult(
                candidate_id=candidate.id,
                filename=candidate.filename,
                score=score,
            )
        )

    ranked = ranking.rank_results(results)
    return MatchResponse(job_id=job.id, results=ranked)

