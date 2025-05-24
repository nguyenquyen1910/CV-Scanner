from fastapi import APIRouter, UploadFile, File, HTTPException
from src.services.cv_processor import CVProcessor
from src.services.jd_processor import JDProcessor
import os
import shutil
from src.services.file_upload_service import FileUploadService

router = APIRouter()
file_upload_service = FileUploadService()

UPLOAD_DIR = "uploads"


@router.post("/upload-cv/")
async def upload_cv(file: UploadFile = File(...)):
    try:
        # Checking the type
        if file.content_type not in [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]:
            raise HTTPException(status_code=400, detail="Invalid file type")

        # Create upload folder
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        # Save file
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # Extract text from CV
        cv_processor = CVProcessor(file_path=file_path)
        cv_data = cv_processor.process()

        # Remove uploaded file
        os.remove(file_path)

        return {
            "filename": file.filename,
            "message": "File uploaded successfully",
            "file_path": file_path,
            "data": cv_data,
        }

    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Error uploading CV: {str(e)}")


@router.post("/upload-jd/")
async def upload_jd(file: UploadFile = File(...)):
    try:
        if file.content_type not in [
            "application/pdf",
            "text/plain",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]:
            raise HTTPException(status_code=400, detail="Invalid file type")

        os.makedirs(UPLOAD_DIR, exist_ok=True)
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        jd_processor = JDProcessor(file_path=file_path)
        jd_data = jd_processor.process()

        os.remove(file_path)

        return {
            "filename": file.filename,
            "message": "JD uploaded successfully",
            "file_path": file_path,
            "data": jd_data,
        }

    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Error uploading JD: {str(e)}")
