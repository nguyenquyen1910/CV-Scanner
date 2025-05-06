from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base import Base


class CV(Base):
    __tablename__ = "cvs"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    gender = Column(String, nullable=True)
    date_of_birth = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    address = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.now())

    educations = relationship("Education", back_populates="cv")
    experiences = relationship("Experience", back_populates="cv")
    skills = relationship("Skill", back_populates="cv")
    certificates = relationship("Certificate", back_populates="cv")
    projects = relationship("Project", back_populates="cv")
    analyst_results = relationship("AnalystResult", back_populates="cv")
