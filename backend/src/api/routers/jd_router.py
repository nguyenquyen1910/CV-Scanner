from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.database import get_db
from src.services.jd_database_service import JDDatabaseService
from src.models.jd import JobDescription

router = APIRouter()


@router.post("/save-jd")
async def save_jd(jd_data: dict, db: Session = Depends(get_db)):
    try:
        jd_service = JDDatabaseService(db)
        jd_id = jd_service.save_jd(jd_data)
        return {"message": "JD saved successfully", "jd_id": jd_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/all_jds")
async def get_all_jds(db: Session = Depends(get_db)):
    try:
        jd_service = JDDatabaseService(db)
        jds = jd_service.get_all_jd()
        return jds
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{jd_id}")
async def get_jd(jd_id: int, db: Session = Depends(get_db)):
    try:
        jd_service = JDDatabaseService(db)
        jd = jd_service.get_jd_by_id(jd_id)
        if not jd:
            raise HTTPException(status_code=404, detail="JD not found")
        return jd
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/by-title")
async def get_jd_by_title(title: str, db: Session = Depends(get_db)):
    try:
        jd_service = JDDatabaseService(db)
        jd = jd_service.get_jd_by_title(title)
        if not jd:
            raise HTTPException(status_code=404, detail="JD not found")
        return jd
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
