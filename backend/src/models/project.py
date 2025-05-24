from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    cv_id = Column(Integer, ForeignKey("cvs.id"))
    name = Column(String, nullable=False)
    role = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    technologies = Column(String, nullable=True)
    start_date = Column(String, nullable=True)
    end_date = Column(String, nullable=True)
    url = Column(String, nullable=True)

    cv = relationship("CV", back_populates="projects")
