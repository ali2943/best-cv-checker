from dataclasses import dataclass
from typing import Dict, List, Optional
from uuid import uuid4

import numpy as np


@dataclass
class Candidate:
    id: str
    filename: str
    text: str
    embedding: np.ndarray


@dataclass
class Job:
    id: str
    title: str
    description: str
    embedding: np.ndarray


_candidates: Dict[str, Candidate] = {}
_jobs: Dict[str, Job] = {}


def add_candidate(filename: str, text: str, embedding: np.ndarray) -> Candidate:
    candidate = Candidate(id=str(uuid4()), filename=filename, text=text, embedding=embedding)
    _candidates[candidate.id] = candidate
    return candidate


def add_job(title: str, description: str, embedding: np.ndarray) -> Job:
    job = Job(id=str(uuid4()), title=title, description=description, embedding=embedding)
    _jobs[job.id] = job
    return job


def get_candidate(candidate_id: str) -> Optional[Candidate]:
    return _candidates.get(candidate_id)


def list_candidates() -> List[Candidate]:
    return list(_candidates.values())


def get_job(job_id: str) -> Optional[Job]:
    return _jobs.get(job_id)

