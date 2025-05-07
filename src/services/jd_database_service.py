from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import datetime
from typing import List, Optional
from src.models.jd import JD


class JDDatabaseService:
    def __init__(self, db: Session):
        self.db = db

    def save_jd(self, jd_data: dict):
        jd = JD(
            title=jd_data.get("title", ""),
            company=jd_data.get("company", ""),
            description=jd_data.get("description", ""),
            requirements=jd_data.get("requirements", ""),
            education_requirements=jd_data.get("education_requirements", ""),
            experience_requirements=jd_data.get("experience_requirements", ""),
            skill_requirements=jd_data.get("skill_requirements", ""),
            raw_text=jd_data.get("raw_text", ""),
            created_at=datetime.now(),
        )
        self.db.add(jd)
        self.db.commit()
        self.db.refresh(jd)
        return jd

    def get_jd_by_id(self, jd_id: int) -> Optional[JD]:
        return self.db.query(JD).filter(JD.id == jd_id).first()

    def get_jd_by_title(self, title: str) -> Optional[JD]:
        return self.db.query(JD).filter(JD.title == title).first()

    def get_all_jd(self):
        return self.db.query(JD).all()
