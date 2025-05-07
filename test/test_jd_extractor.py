import os
import sys, json

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from src.services.jd_processor import JDProcessor


def test_jd_extractor():
    api_key = os.getenv("GITHUB_TOKEN")
    endpoint = "https://models.github.ai/inference"
    model = "openai/gpt-4.1-mini"

    file_path = "uploads\jd_test\python_middle_jd.docx"

    processor = JDProcessor(file_path, api_key, endpoint, model)
    result = processor.process()
    with open("test/result_jsons/result_jd_test.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    test_jd_extractor()
