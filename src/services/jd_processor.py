from pypdf import PdfReader
import os, re
import pdfplumber
from typing import Dict, List
from src.extract.jd_extractor import JDExtractor
import docx


class JDProcessor:
    def __init__(self, file_path, api_key, endpoint, model):
        self.file_path = file_path
        self.jd_extractor = JDExtractor(api_key, endpoint, model)

    def extract_text(self) -> Dict[str, str]:
        try:
            file_extension = os.path.splitext(self.file_path)[1].lower()

            if file_extension == ".pdf":
                return self.extract_text_from_pdf()
            elif file_extension == ".docx":
                return self.extract_text_from_docx()
            else:
                raise ValueError("Unsupported file type")
        except Exception as e:
            raise ValueError(f"Error extracting text from {self.file_path}: {e}")

    def extract_text_from_pdf(self) -> str:
        try:
            reader = PdfReader(self.file_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            return text
        except Exception as e:
            raise ValueError(f"Error extracting text from {self.file_path}: {e}")

    def extract_text_from_docx(self) -> str:
        try:
            doc = docx.Document(self.file_path)
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text
        except Exception as e:
            raise ValueError(f"Error extracting text from {self.file_path}: {e}")

    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        # Remove special characters
        text = re.sub(r'[^\w\sÀ-ỹ.,;:!?@#$%&*()\'"-]', " ", text)

        # Remove consecutive spaces
        text = re.sub(r"\s+", " ", text)

        # Remove leading and trailing spaces
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        text = "\n".join(lines)

        return text.strip()

    def process(self) -> Dict[str, str]:
        try:
            raw_text = self.extract_text()
            clean_text = self.clean_text(raw_text)

            jd_data = self.jd_extractor.extract(clean_text)
            if not isinstance(jd_data, dict):
                jd_data = {}

            result = {
                "title": jd_data.get("title", ""),
                "company": jd_data.get("company", ""),
                "description": jd_data.get("description", ""),
                "requirements": jd_data.get("requirements", ""),
                "education_requirements": jd_data.get("education_requirements", ""),
                "experience_requirements": jd_data.get("experience_requirements", ""),
                "skill_requirements": jd_data.get("skill_requirements", ""),
            }
            return result

        except Exception as e:
            raise ValueError(f"Error processing JD: {e}")
