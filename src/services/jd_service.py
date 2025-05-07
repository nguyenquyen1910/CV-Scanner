from src.models.jd import JobDescription
from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import datetime


class JDService:
    def __init__(self, db: Session):
        self.db = db

    def save_jd(self, jd_data: dict):
        jd = JobDescription(
            title=jd_data.get("title", ""),
            company=jd_data.get("company", ""),
            description=jd_data.get("description", ""),
            requirements=jd_data.get("requirements", ""),
            education_requirements=jd_data.get("education_requirements", ""),
            experience_requirements=jd_data.get("experience_requirements", ""),
            skill_requirements=jd_data.get("skill_requirements", ""),
            created_at=datetime.now(),
        )
        self.db.add(jd)
        self.db.commit()
        self.db.refresh(jd)

    def get_all_jd(self):
        return self.db.query(JobDescription).all()

    def get_jd_by_id(self, jd_id: int):
        return self.db.query(JobDescription).filter(JobDescription.id == jd_id).first()
