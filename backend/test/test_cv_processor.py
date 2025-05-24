import os
import sys, json
from dotenv import load_dotenv

load_dotenv()

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from src.services.cv_processor import CVProcessor


def test_cv_processor():
    file_path = "uploads/cv_test/cv_senior_python.pdf"
    processor = CVProcessor(file_path)
    print("Đang extract thông tin từ CV...")
    result = processor.process()
    print("Đã extract xong thông tin từ CV")
    with open("test/result_jsons/result_cv_test.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    test_cv_processor()
