from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from src.models.base import Base

SQLALCHEMY_DATABASE_URL = "postgresql://usercv:Nvquyen%40123@localhost:5432/cvscanner"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    print("Starting to create tables...")
    print("Models to create:", Base.metadata.tables.keys())
    Base.metadata.create_all(bind=engine)
    print("Tables created!")
