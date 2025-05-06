from fastapi import APIRouter, UploadFile, File, HTTPException
from src.services.cv_processor import CVProcessor
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
        cv_processor = CVProcessor(
            file_path=file_path,
            api_key=os.getenv("GITHUB_TOKEN"),
            endpoint="https://models.github.ai/inference",
            model="openai/gpt-4.1-mini",
        )
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
