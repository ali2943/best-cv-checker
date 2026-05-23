from functools import lru_cache

import numpy as np
from sentence_transformers import SentenceTransformer


@lru_cache(maxsize=1)
def _model() -> SentenceTransformer:
    return SentenceTransformer("all-MiniLM-L6-v2")


def embed_text(text: str) -> np.ndarray:
    embedding = _model().encode(text)
    return np.asarray(embedding, dtype=np.float32)

