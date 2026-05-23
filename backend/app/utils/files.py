from pathlib import Path
from uuid import uuid4


_BASE_DIR = Path(__file__).resolve().parents[2]
_UPLOADS_DIR = _BASE_DIR / "uploads"


def save_upload(contents: bytes, original_name: str) -> Path:
    _UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    suffix = Path(original_name).suffix.lower()
    target = _UPLOADS_DIR / f"{uuid4()}{suffix}"
    target.write_bytes(contents)
    return target

