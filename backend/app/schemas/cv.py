from pydantic import BaseModel


class CandidateResponse(BaseModel):
    candidate_id: str
    filename: str
    text_length: int

