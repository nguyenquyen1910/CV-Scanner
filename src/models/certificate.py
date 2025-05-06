from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class Certificate(Base):
    __tablename__ = "certificates"
    id = Column(Integer, primary_key=True, index=True)
    cv_id = Column(Integer, ForeignKey("cvs.id"))
    name = Column(String, nullable=False)
    organization = Column(String, nullable=True)
    issued_date = Column(String, nullable=True)
    description = Column(String, nullable=True)

    cv = relationship("CV", back_populates="certificates")
