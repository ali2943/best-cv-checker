from fastapi import FastAPI

from app.api.routes import cv, jobs, matching

app = FastAPI(title="CV Checker AI")


@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(cv.router)
app.include_router(jobs.router)
app.include_router(matching.router)

