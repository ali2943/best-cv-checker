from fastapi import APIRouter, HTTPException

from app.schemas.evaluation import CandidateEvaluation, EvaluationRequest, EvaluationResponse
from app.services import llm_decision
from app.storage import get_candidate, get_job

router = APIRouter()


@router.post("/evaluate", response_model=EvaluationResponse)
def evaluate_candidates(request: EvaluationRequest):
    """
    Evaluate matched candidates using LLM reasoning.
    Takes matching results and provides AI-powered hiring recommendations.
    """
    
    job = get_job(request.job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found.")
    
    if not request.matched_candidates:
        raise HTTPException(status_code=400, detail="No matched candidates provided.")
    
    candidates_data = []
    for match in request.matched_candidates:
        candidate = get_candidate(match["candidate_id"])
        if not candidate:
            raise HTTPException(status_code=404, detail=f"Candidate {match['candidate_id']} not found.")
        
        candidates_data.append({
            "candidate_id": candidate.id,
            "filename": candidate.filename,
            "score": match["score"],
            "text": candidate.text,
        })
    
    try:
        llm_result = llm_decision.evaluate_candidates(
            job_title=request.job_title,
            job_description=request.job_description,
            candidates=candidates_data,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM evaluation failed: {str(e)}")
    
    evaluations = []
    for i, eval_data in enumerate(llm_result.get("evaluations", [])):
        candidate_id = candidates_data[i]["candidate_id"]
        match_score = candidates_data[i]["score"]
        
        evaluation = CandidateEvaluation(
            candidate_id=candidate_id,
            filename=eval_data.get("candidate", candidates_data[i]["filename"]),
            match_score=match_score,
            technical_suitability=eval_data.get("technical_suitability", ""),
            experience_quality=eval_data.get("experience_quality", ""),
            project_relevance=eval_data.get("project_relevance", ""),
            communication=eval_data.get("communication", ""),
            growth_potential=eval_data.get("growth_potential", ""),
            strengths=eval_data.get("strengths", []),
            weaknesses=eval_data.get("weaknesses", []),
            overall_assessment=eval_data.get("overall_assessment", ""),
        )
        evaluations.append(evaluation)
    
    return EvaluationResponse(
        job_id=request.job_id,
        evaluations=evaluations,
        recommendation=llm_result.get("recommendation", "MAYBE"),
        recommended_candidate_id=_find_candidate_id_by_filename(
            llm_result.get("recommended_candidate", ""),
            candidates_data
        ),
        reasoning=llm_result.get("reasoning", ""),
    )


def _find_candidate_id_by_filename(filename: str, candidates_data: list) -> str:
    """Helper to find candidate ID by filename from LLM response."""
    for candidate in candidates_data:
        if candidate["filename"] == filename:
            return candidate["candidate_id"]
    return candidates_data[0]["candidate_id"] if candidates_data else ""
