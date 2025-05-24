import os
from fastapi import UploadFile


class FileUploadService:
    def __init__(self, upload_dir="uploads"):
        self.upload_dir = upload_dir
        os.makedirs(self.upload_dir, exist_ok=True)

    def save_upload_file(self, file: UploadFile) -> str:
        file_path = os.path.join(self.upload_dir, file.filename)
        with open(file_path, "wb") as f:
            f.write(file.file.read())
        return file_path

    def remove_file(self, file_path: str):
        if os.path.exists(file_path):
            os.remove(file_path)
