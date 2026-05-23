# CV Checker AI Project

## Overview

CV Checker is an AI-powered recruitment assistance system that evaluates candidate resumes against a job description and selects the most suitable candidate.

Unlike traditional ATS systems that only match keywords, this project uses:

- Semantic similarity (Embeddings)
- AI reasoning (LLM)
- Candidate ranking
- Resume understanding

The system acts like an intelligent recruiter that can analyze:
- Skills
- Experience
- Projects
- Education
- Relevance to job requirements

---

# Project Goals

The main goals of this project are:

- Learn AI engineering
- Learn FastAPI backend development
- Learn NLP and embeddings
- Learn LLM integration
- Learn vector similarity search
- Build an intelligent resume matching system

This is a learning-focused project and not intended for enterprise production use.

---

# Core Features

## Phase 1 Features

- Upload CVs (PDF/DOCX)
- Upload Job Description
- Extract text from resumes
- Generate embeddings
- Calculate similarity score
- Rank candidates

---

## Phase 2 Features

- AI-based candidate evaluation
- LLM reasoning
- Candidate strengths & weaknesses
- Hiring recommendations

---

## Future Features

- Recruiter dashboard
- AI interview questions
- Skill gap analysis
- Candidate summaries
- Chatbot assistant
- Multi-language support

---

# Tech Stack

| Layer | Technology |
|---|---|
| Backend Framework | FastAPI |
| NLP | Sentence Transformers |
| LLM | OpenAI GPT |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| Vector Search | pgvector |
| PDF Parsing | pdfplumber |
| DOCX Parsing | docx2txt |

---

# Recommended Project Structure

```bash
backend/
│
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── cv.py
│   │   │   ├── jobs.py
│   │   │   └── matching.py
│   │
│   ├── services/
│   │   ├── parser.py
│   │   ├── embeddings.py
│   │   ├── ranking.py
│   │   ├── scoring.py
│   │   └── llm_decision.py
│   │
│   ├── database/
│   │   ├── connection.py
│   │   └── models.py
│   │
│   ├── schemas/
│   │
│   ├── utils/
│   │
│   └── main.py
│
├── uploads/
│
├── requirements.txt
│
└── .env
```

---

# AI System Architecture

```text
CV Upload
    ↓
Text Extraction
    ↓
Text Cleaning
    ↓
Embedding Generation
    ↓
Vector Similarity Search
    ↓
Candidate Ranking
    ↓
LLM Evaluation
    ↓
Final Recommendation
```

---

# Backend Development Phases

# Phase 1 — FastAPI Setup

## Goals

- Setup FastAPI server
- Create routes
- Test APIs

## Initial APIs

### Health Check

```http
GET /health
```

### Upload CV

```http
POST /upload-cv
```

### Create Job Description

```http
POST /jobs
```

### Match Candidates

```http
POST /match
```

---

# Phase 2 — Resume Parsing

## Objective

Extract readable text from resumes.

## Libraries

### PDF Parsing

```python
pdfplumber
```

### DOCX Parsing

```python
docx2txt
```

## Flow

```text
PDF/DOCX → Raw Text → Clean Text
```

---

# Phase 3 — Embeddings

## Objective

Convert text into vectors for semantic comparison.

## Model

```python
all-MiniLM-L6-v2
```

## Example

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

embedding = model.encode(text)
```

---

# Phase 4 — Similarity Matching

## Objective

Compare candidate resumes with the job description.

## Method

Cosine Similarity

## Formula

```text
similarity(A,B) = (A · B) / (|A| |B|)
```

## Output Example

```json
[
  {
    "candidate": "Ali",
    "score": 91
  },
  {
    "candidate": "Ahmed",
    "score": 84
  }
]
```

---

# Phase 5 — LLM Decision Layer

## Objective

Use an LLM to make the final hiring recommendation.

The LLM evaluates:
- Technical suitability
- Experience quality
- Project relevance
- Communication indicators
- Growth potential

---

# Example Prompt

```text
You are an expert technical recruiter.

Job Description:
[JOB DESCRIPTION]

Candidates:
1. Candidate A
2. Candidate B
3. Candidate C

Evaluate:
- technical suitability
- project quality
- experience relevance
- strengths
- weaknesses

Return:
- best candidate
- ranking
- reasons
- hiring recommendation
```

---

# Database Design

# Table: candidates

| Column | Type |
|---|---|
| id | Integer |
| name | String |
| email | String |
| skills | JSON |
| experience | Text |
| education | Text |
| embedding | Vector |
| resume_path | String |

---

# Table: jobs

| Column | Type |
|---|---|
| id | Integer |
| title | String |
| description | Text |
| embedding | Vector |

---

# requirements.txt

```txt
fastapi
uvicorn
sentence-transformers
pdfplumber
docx2txt
python-multipart
numpy
scikit-learn
openai
sqlalchemy
psycopg2-binary
pydantic
```

---

# Environment Variables

Create a `.env` file:

```env
OPENAI_API_KEY=your_api_key
DATABASE_URL=your_database_url
```

---

# Running the Project

## Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## Run Server

```bash
uvicorn app.main:app --reload
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API calls to `http://localhost:8000`.

---

# MVP Goal

The first working version should:

```text
Upload CV
→ Extract Text
→ Generate Embeddings
→ Compare with Job Description
→ Return Match Score
```

---

# Important Learning Concepts

This project teaches:

- FastAPI
- NLP
- Embeddings
- Vector Databases
- LLM Integration
- Semantic Search
- AI Pipelines
- Prompt Engineering
- AI System Design

---

# Recommended Development Order

## Step 1
FastAPI setup

## Step 2
CV upload

## Step 3
PDF parsing

## Step 4
Embedding generation

## Step 5
Similarity scoring

## Step 6
Candidate ranking

## Step 7
LLM reasoning layer

## Step 8
Frontend dashboard

---

# Important Notes

## Do NOT Start With:
- Docker
- Microservices
- Kubernetes
- Complex authentication

## Focus First On:
- AI pipeline
- Resume understanding
- Matching logic
- LLM reasoning

---

# Future Improvements

- Recruiter analytics dashboard
- Candidate comparison charts
- AI-generated interview questions
- Bias detection
- Resume feedback system
- Real-time chat assistant

---

# Final Vision

The final system should behave like an intelligent AI recruiter capable of:

- Understanding resumes
- Understanding job requirements
- Ranking candidates intelligently
- Explaining hiring decisions
- Providing recruiter-style recommendations

---
