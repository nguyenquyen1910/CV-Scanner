from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from src.database.database import get_db
from src.services.cv_database_service import CVDatabaseService
from src.models.cv import CV
from src.models.education import Education
from src.models.experience import Experience
from src.models.skill import Skill
from src.models.certificate import Certificate
from src.models.project import Project

router = APIRouter()


@router.post("/save-cv")
async def save_cv(cv_data: dict, db: Session = Depends(get_db)):
    try:
        cv_service = CVDatabaseService(db)
        cv_id = cv_service.save_cv(cv_data)
        return {"message": "CV saved successfully", "cv_id": cv_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{cv_id}")
async def get_cv(cv_id: int, db: Session = Depends(get_db)):
    try:
        cv_service = CVDatabaseService(db)
        cv = cv_service.get_cv_by_id(cv_id)
        if not cv:
            raise HTTPException(status_code=404, detail="CV not found")
        return cv
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
async def list_cvs(
    db: Session = Depends(get_db),
):
    try:
        cv_service = CVDatabaseService(db)
        cvs = cv_service.get_all_cvs()
        return cvs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{cv_id}")
async def delete_cv(cv_id: int, db: Session = Depends(get_db)):
    try:
        cv_service = CVDatabaseService(db)
        success = cv_service.delete_cv(cv_id)
        if not success:
            raise HTTPException(status_code=404, detail="CV not found")
        return {"message": "CV deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
