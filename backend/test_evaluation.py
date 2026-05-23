"""
Quick test script for Phase 5 LLM evaluation.
Run this after setting OPENAI_API_KEY in .env

Usage:
  python -m pytest backend/tests/test_evaluation.py -v
  
Or manually test endpoints:
  1. POST /upload-cv with sample.pdf
  2. POST /jobs with job title and description
  3. POST /match with job_id
  4. POST /evaluate with matching results
"""

import asyncio
from pathlib import Path

# Example usage (manual testing)
SAMPLE_JOB = {
    "title": "Senior Python Engineer",
    "description": """
    We are looking for a Senior Python Engineer with 5+ years of experience.
    
    Requirements:
    - Expert Python programming
    - FastAPI or Django experience
    - PostgreSQL and database design
    - Cloud deployment (AWS/GCP/Azure)
    - RESTful API design
    - Docker and containerization
    - Unit testing and CI/CD
    
    Nice to have:
    - Machine Learning background
    - Vector databases (pgvector)
    - NLP experience
    """
}

SAMPLE_CANDIDATES = [
    {
        "candidate_id": "test-1",
        "filename": "john_doe.pdf",
        "score": 85.5,
        "text": """
        John Doe
        Senior Python Developer
        john@example.com
        
        Summary: 7 years of Python development experience with expertise in FastAPI, PostgreSQL, and AWS.
        
        Experience:
        - Senior Developer at TechCorp (2022-Present): Led team of 5 developers, built microservices using FastAPI
        - Python Developer at StartupXYZ (2019-2022): Developed data pipelines, worked with PostgreSQL, AWS Lambda
        - Junior Developer at WebCo (2017-2019): Built REST APIs, database design
        
        Skills: Python, FastAPI, Django, PostgreSQL, AWS, Docker, Git, Redis
        
        Education: BS Computer Science from State University
        """
    },
    {
        "candidate_id": "test-2",
        "filename": "jane_smith.pdf",
        "score": 72.3,
        "text": """
        Jane Smith
        Full Stack Developer
        jane@example.com
        
        Summary: 4 years developing web applications with Python and JavaScript.
        
        Experience:
        - Full Stack Developer at WebApps Inc (2021-Present): Built REST APIs with Flask, React frontends
        - Junior Developer at StartupABC (2020-2021): Python backend development
        
        Skills: Python, Flask, JavaScript, MongoDB, Docker, GCP
        
        Education: Bootcamp Graduate, Web Development
        """
    },
]

# Example evaluation request format:
EVALUATION_REQUEST = {
    "job_id": "job-123",
    "job_title": SAMPLE_JOB["title"],
    "job_description": SAMPLE_JOB["description"],
    "matched_candidates": [
        {
            "candidate_id": c["candidate_id"],
            "score": c["score"],
            "text": c["text"]
        }
        for c in SAMPLE_CANDIDATES
    ]
}

if __name__ == "__main__":
    print("Phase 5 LLM Evaluation Test Setup")
    print("=" * 50)
    print("\nSample data is defined in this file.")
    print("\nTo test the API:")
    print("1. Start the server: uvicorn app.main:app --reload")
    print("2. Set OPENAI_API_KEY in .env")
    print("3. Upload CVs via POST /upload-cv")
    print("4. Create job via POST /jobs")
    print("5. Match candidates via POST /match")
    print("6. Evaluate via POST /evaluate with the matching results")
    print("\nExample /evaluate payload structure:")
    import json
    print(json.dumps(EVALUATION_REQUEST, indent=2))
