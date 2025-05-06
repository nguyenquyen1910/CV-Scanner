from src.models.cv import CV
from src.models.education import Education
from src.models.experience import Experience
from src.models.skill import Skill
from src.models.certificate import Certificate
from src.models.project import Project
from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import datetime
from typing import List, Optional


class CVDatabaseService:
    def __init__(self, db: Session):
        self.db = db

    def save_cv(self, cv_data: dict):
        base_info = cv_data.get("base_information", [{}])[0]
        cv = CV(
            full_name=base_info.get("fullname", ""),
            email=base_info.get("email", ""),
            gender=base_info.get("gender", ""),
            date_of_birth=base_info.get("date_of_birth", ""),
            phone=base_info.get("phone", ""),
            address=base_info.get("address", ""),
            summary=base_info.get("summary", ""),
            created_at=datetime.now(),
        )
        self.db.add(cv)
        self.db.commit()
        self.db.refresh(cv)

        # Lưu thông tin học vấn
        if "education" in cv_data:
            for edu in cv_data["education"]:
                education = Education(
                    cv_id=cv.id,
                    school=edu.get("school", ""),
                    degree=edu.get("degree", ""),
                    major=edu.get("major", ""),
                    start_year=edu.get("start_year", ""),
                    end_year=edu.get("end_year", ""),
                    grade=edu.get("grade", ""),
                    description=edu.get("description", ""),
                )
                self.db.add(education)

        # Lưu thông tin kinh nghiệm
        if "experience" in cv_data:
            for exp in cv_data["experience"]:
                experience = Experience(
                    cv_id=cv.id,
                    company=exp.get("company", ""),
                    position=exp.get("position", ""),
                    start_date=exp.get("start_date", ""),
                    end_date=exp.get("end_date", ""),
                    description=exp.get("description", ""),
                )
                self.db.add(experience)

        # Lưu thông tin kỹ năng
        if "skill" in cv_data:
            for skill in cv_data["skill"]:
                skill_obj = Skill(
                    cv_id=cv.id,
                    skill_name=skill.get("skill_name", ""),
                    level=skill.get("level", ""),
                )
                self.db.add(skill_obj)

        # Lưu thông tin chứng chỉ
        if "certificate" in cv_data:
            for cert in cv_data["certificate"]:
                certificate = Certificate(
                    cv_id=cv.id,
                    name=cert.get("name", ""),
                    organization=cert.get("organization", ""),
                    issued_date=cert.get("issued_date", ""),
                    description=cert.get("description", ""),
                )
                self.db.add(certificate)

        # Lưu thông tin dự án
        if "project" in cv_data:
            for proj in cv_data["project"]:
                project = Project(
                    cv_id=cv.id,
                    name=proj.get("name", ""),
                    role=proj.get("role", ""),
                    start_date=proj.get("start_date", ""),
                    end_date=proj.get("end_date", ""),
                    description=proj.get("description", ""),
                    technologies=proj.get("technologies", ""),
                    url=proj.get("url", ""),
                )
                self.db.add(project)

        self.db.commit()
        return cv.id

    def get_cv_by_id(self, cv_id: int):
        return self.db.query(CV).filter(CV.id == cv_id).first()
