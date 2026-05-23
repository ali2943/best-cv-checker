from pathlib import Path

import docx2txt
import pdfplumber


def extract_text(file_path: Path) -> str:
    suffix = file_path.suffix.lower()
    if suffix == ".pdf":
        return _extract_pdf(file_path)
    if suffix == ".docx":
        return _extract_docx(file_path)
    raise ValueError("Unsupported file type.")


def _extract_pdf(file_path: Path) -> str:
    pages = []
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            pages.append(page.extract_text() or "")
    return _clean_text("\n".join(pages))


def _extract_docx(file_path: Path) -> str:
    text = docx2txt.process(str(file_path)) or ""
    return _clean_text(text)


def _clean_text(text: str) -> str:
    return " ".join(text.split())

