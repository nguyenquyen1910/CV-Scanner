from pypdf import PdfReader
import os, re
import pdfplumber
from typing import Dict, List
from src.extract.education_extractor import EducationExtractor
from src.extract.experience_extractor import ExperienceExtractor
from src.extract.skill_extractor import SkillExtractor
from src.extract.certificate_extractor import CertificateExtractor
from src.extract.project_extractor import ProjectExtractor
from src.extract.base_information_extractor import BaseInformationExtractor


class CVProcessor:
    def __init__(self, file_path):
        self.file_path = file_path
        self.education_extractor = EducationExtractor()
        self.experience_extractor = ExperienceExtractor()
        self.skill_extractor = SkillExtractor()
        self.certificate_extractor = CertificateExtractor()
        self.project_extractor = ProjectExtractor()
        self.base_information_extractor = BaseInformationExtractor()

    def extract_text(self) -> Dict[str, str]:
        # Extract text from pdf
        try:
            file_extension = os.path.splitext(self.file_path)[1].lower()

            if file_extension == ".pdf":
                return self.extract_text_from_pdf()
            else:
                raise ValueError("Unsupported file type")
        except Exception as e:
            raise ValueError(f"Error extracting text: {str(e)}")

    def extract_text_from_pdf(self) -> str:
        reader = PdfReader(self.file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text

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

            print("Đang extract thông tin học vấn từ CV...")
            education_list = self.education_extractor.extract(clean_text)
            print("Đã extract xong thông tin học vấn từ CV")
            print(education_list)
            print("Đang extract thông tin kinh nghiệm từ CV...")
            experience_list = self.experience_extractor.extract(clean_text)
            print("Đã extract xong thông tin kinh nghiệm từ CV")
            print(experience_list)
            print("Đang extract thông tin kỹ năng từ CV...")
            skill_list = self.skill_extractor.extract(clean_text)
            print("Đã extract xong thông tin kỹ năng từ CV")
            print("Đang extract thông tin chứng chỉ từ CV...")
            certificate_list = self.certificate_extractor.extract(clean_text)
            print("Đã extract xong thông tin chứng chỉ từ CV")
            print(certificate_list)
            print("Đang extract thông tin dự án từ CV...")
            project_list = self.project_extractor.extract(clean_text)
            print("Đã extract xong thông tin dự án từ CV")
            print("Đang extract thông tin thông tin cơ bản từ CV...")
            base_information = self.base_information_extractor.extract(clean_text)
            print("Đã extract xong thông tin thông tin cơ bản từ CV")
            print(base_information)
            result = {
                "education": education_list,
                "experience": experience_list,
                "skill": skill_list,
                "certificate": certificate_list,
                "project": project_list,
                "base_information": base_information,
            }
            return result
        except Exception as e:
            raise ValueError(f"Error processing CV: {str(e)}")
