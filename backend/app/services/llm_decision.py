import json
import os
from typing import Any, Dict, List

from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def evaluate_candidates(
    job_title: str,
    job_description: str,
    candidates: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """
    Evaluate candidates using OpenAI LLM with expert recruiter perspective.
    
    Args:
        job_title: Job position title
        job_description: Full job description
        candidates: List of matched candidates with scores and resume text
    
    Returns:
        Dictionary containing evaluations and recommendation
    """
    
    candidates_text = "\n\n".join([
        f"Candidate {i+1}: {c['filename']}\n"
        f"Match Score: {c['score']}%\n"
        f"Resume:\n{c['text'][:2000]}..."
        for i, c in enumerate(candidates)
    ])
    
    prompt = f"""You are an expert technical recruiter with 20 years of experience evaluating candidates.
    
Your task is to evaluate the following candidates for the job position and provide detailed assessments.

JOB POSITION: {job_title}

JOB DESCRIPTION:
{job_description}

CANDIDATES:
{candidates_text}

For EACH candidate, provide a detailed evaluation in JSON format with:
- technical_suitability: Assessment of technical skills match (1-10 scale with brief explanation)
- experience_quality: Assessment of experience relevance (1-10 scale with brief explanation)
- project_relevance: How relevant their projects are (1-10 scale with brief explanation)
- communication: Communication skills indicators (1-10 scale with brief explanation)
- growth_potential: Future growth potential (1-10 scale with brief explanation)
- strengths: List of 3-5 key strengths
- weaknesses: List of 2-3 areas for improvement
- overall_assessment: Brief summary of fit for the role

Then provide:
- recommendation: Your overall recommendation (STRONG_YES, YES, MAYBE, NO)
- recommended_candidate: Which candidate should be hired (use the filename)
- reasoning: Detailed explanation for your recommendation

Return ONLY valid JSON, no other text. Structure:
{{
  "evaluations": [
    {{
      "candidate": "filename",
      "technical_suitability": "8 - Strong Python and cloud experience",
      "experience_quality": "9 - 6 years relevant industry experience",
      "project_relevance": "8 - Built similar systems at previous company",
      "communication": "7 - Clear CV, good written communication",
      "growth_potential": "9 - Shows progression and learning",
      "strengths": ["Strong technical foundation", "Relevant experience", "Clear communication"],
      "weaknesses": ["Limited leadership experience", "No team management background"],
      "overall_assessment": "Excellent fit for the role with strong technical skills and relevant experience."
    }}
  ],
  "recommendation": "STRONG_YES",
  "recommended_candidate": "filename_here",
  "reasoning": "This candidate stands out due to..."
}}"""

    try:
        response = client.chat.completions.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4"),
            messages=[
                {"role": "system", "content": "You are an expert technical recruiter. Return ONLY valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=float(os.getenv("EVALUATION_TEMPERATURE", "0.7")),
            max_tokens=4000,
        )
        
        result_text = response.choices[0].message.content.strip()
        result = json.loads(result_text)
        return result
        
    except json.JSONDecodeError as e:
        raise ValueError(f"LLM returned invalid JSON: {e}")
    except Exception as e:
        raise RuntimeError(f"LLM evaluation failed: {e}")
