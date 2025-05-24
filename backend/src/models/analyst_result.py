from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base import Base


class AnalystResult(Base):
    __tablename__ = "analyst_results"
    id = Column(Integer, primary_key=True, index=True)
    cv_id = Column(Integer, ForeignKey("cvs.id"))
    jd_id = Column(Integer, ForeignKey("job_descriptions.id"))
    education_score = Column(Integer, nullable=False)
    experience_score = Column(Integer, nullable=False)
    skill_score = Column(Integer, nullable=False)
    certificate_score = Column(Integer, nullable=False)
    total_score = Column(Integer, nullable=False)
    comment = Column(Text, nullable=False)
    created_at = Column(DateTime, default=func.now())

    cv = relationship("CV", back_populates="analyst_results")
    jd = relationship("JobDescription", back_populates="analyst_results")
