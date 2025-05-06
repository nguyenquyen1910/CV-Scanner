from sqlalchemy import Column, Integer, String, Text, DateTime
from src.models.base import Base
from sqlalchemy.orm import relationship
from datetime import datetime


class JobDescription(Base):
    __tablename__ = "job_descriptions"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    company = Column(String(255))
    description = Column(Text)
    requirements = Column(Text)
    education_requirements = Column(Text)
    experience_requirements = Column(Text)
    skill_requirements = Column(Text)
    created_at = Column(DateTime, default=datetime.now)

    analyst_results = relationship("AnalystResult", back_populates="jd")
