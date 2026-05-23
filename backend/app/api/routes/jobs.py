from fastapi import APIRouter, HTTPException

from app.schemas.jobs import JobCreate, JobResponse
from app.services import embeddings
from app.storage import add_job

router = APIRouter()


@router.post("/jobs", response_model=JobResponse)
def create_job(job: JobCreate):
    description = job.description.strip()
    if not description:
        raise HTTPException(status_code=400, detail="Job description cannot be empty.")

    embedding = embeddings.embed_text(description)
    created = add_job(job.title.strip(), description, embedding)

    return JobResponse(job_id=created.id, title=created.title)

