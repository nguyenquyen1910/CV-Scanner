from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class Education(Base):
    __tablename__ = "educations"
    id = Column(Integer, primary_key=True, index=True)
    cv_id = Column(Integer, ForeignKey("cvs.id"))
    school = Column(String, nullable=False)
    degree = Column(String, nullable=True)
    major = Column(String, nullable=True)
    start_year = Column(String, nullable=True)
    end_year = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    grade = Column(String, nullable=True)

    cv = relationship("CV", back_populates="educations")
