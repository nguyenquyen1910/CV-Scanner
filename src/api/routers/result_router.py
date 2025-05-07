from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.database import get_db
from src.services.analyst_matching_service import AnalystMatchingService
import os

router = APIRouter()


api_key = os.getenv("GITHUB_TOKEN")
endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1"


@router.get("/")
async def get_all_results(db: Session = Depends(get_db)):
    try:
        result_service = AnalystMatchingService(db, api_key, endpoint, model)
        results = result_service.get_all_analyst_results()
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
