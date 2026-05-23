from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.schemas.cv import CandidateResponse
from app.services import embeddings, parser
from app.storage import add_candidate
from app.utils.files import save_upload

router = APIRouter()


@router.post("/upload-cv", response_model=CandidateResponse)
async def upload_cv(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="File name is required.")

    suffix = Path(file.filename).suffix.lower()
    if suffix not in {".pdf", ".docx"}:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")

    contents = await file.read()
    await file.close()
    if not contents:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    saved_path = save_upload(contents, file.filename)
    extracted_text = parser.extract_text(saved_path)
    if not extracted_text:
        raise HTTPException(status_code=400, detail="No text could be extracted from the resume.")

    embedding = embeddings.embed_text(extracted_text)
    candidate = add_candidate(file.filename, extracted_text, embedding)

    return CandidateResponse(
        candidate_id=candidate.id,
        filename=candidate.filename,
        text_length=len(extracted_text),
    )

