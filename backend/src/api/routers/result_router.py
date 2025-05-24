from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.database import get_db
from src.services.analyst_matching_service import AnalystMatchingService
import os
from src.models.cv import CV
from src.models.jd import JobDescription
from src.models.education import Education
from src.models.experience import Experience
from src.models.skill import Skill
from src.models.certificate import Certificate

router = APIRouter()


@router.get("/analyst-matching")
async def analyze_matching(cv_id: int, jd_id: int, db: Session = Depends(get_db)):
    try:
        analyze_matching_service = AnalystMatchingService(db)
        result = analyze_matching_service.analyze_cv_jd(cv_id, jd_id)

        cv = db.query(CV).filter(CV.id == cv_id).first()
        jd = db.query(JobDescription).filter(JobDescription.id == jd_id).first()
        education_list = db.query(Education).filter(Education.cv_id == cv_id).all()
        experience_list = db.query(Experience).filter(Experience.cv_id == cv_id).all()
        skill_list = db.query(Skill).filter(Skill.cv_id == cv_id).all()
        certificate_list = (
            db.query(Certificate).filter(Certificate.cv_id == cv_id).all()
        )

        cv_details = {
            "id": cv.id,
            "name": cv.full_name,
            "email": cv.email,
            "phone": cv.phone,
            "location": cv.address,
            "education": [
                {
                    "school": edu.school,
                    "degree": edu.degree,
                    "year": f"{edu.start_year} - {edu.end_year}",
                }
                for edu in education_list
            ],
            "experience": [
                {
                    "company": exp.company,
                    "position": exp.position,
                    "duration": f"{exp.start_date} - {exp.end_date}",
                    "description": exp.description,
                }
                for exp in experience_list
            ],
            "skills": [skill.skill_name for skill in skill_list],
            "certificates": [cert.name for cert in certificate_list],
        }

        jd_details = {
            "id": jd.id,
            "title": jd.title,
            "company": jd.company,
            "requirements": jd.requirements,
            "education_requirement": jd.education_requirements,
            "experience_requirement": jd.experience_requirements,
            "skills_requirement": jd.skill_requirements,
        }

        response_data = {
            "analysis": {
                "id": result.id,
                "education_score": result.education_score,
                "experience_score": result.experience_score,
                "skill_score": result.skill_score,
                "certificate_score": result.certificate_score,
                "total_score": result.total_score,
                "comment": result.comment,
            },
            "cv_details": cv_details,
            "jd_details": jd_details,
        }

        return {"ok": True, "status": "success", "data": response_data}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
