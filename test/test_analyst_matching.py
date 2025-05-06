import os
import sys
import pytest
import json
from datetime import datetime

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from src.services.analyst_matching_service import AnalystMatchingService
from src.database.database import get_db


def test_analyze_cv_jd():
    db = next(get_db())
    api_key = os.getenv("GITHUB_TOKEN")
    endpoint = "https://models.github.ai/inference"
    model = "openai/gpt-4.1"

    service = AnalystMatchingService(db, api_key, endpoint, model)

    try:
        result = service.analyze_cv_jd(cv_id=2, jd_id=3)

        # Kiểm tra kết quả trả về
        assert result is not None, "Kết quả phân tích không được trả về"
        assert isinstance(result.education_score, int), "Điểm học vấn phải là số nguyên"
        assert isinstance(
            result.experience_score, int
        ), "Điểm kinh nghiệm phải là số nguyên"
        assert isinstance(result.skill_score, int), "Điểm kỹ năng phải là số nguyên"
        assert isinstance(result.total_score, int), "Tổng điểm phải là số nguyên"
        assert isinstance(result.comment, str), "Nhận xét phải là chuỗi"

        # Kiểm tra giá trị điểm
        assert 0 <= result.education_score <= 100, "Điểm học vấn phải từ 0-100"
        assert 0 <= result.experience_score <= 100, "Điểm kinh nghiệm phải từ 0-100"
        assert 0 <= result.skill_score <= 100, "Điểm kỹ năng phải từ 0-100"
        assert 0 <= result.total_score <= 100, "Tổng điểm phải từ 0-100"
        assert len(result.comment) > 0, "Nhận xét không được để trống"

        result_dict = {
            "education_score": result.education_score,
            "experience_score": result.experience_score,
            "skill_score": result.skill_score,
            "total_score": result.total_score,
            "comment": result.comment,
            "analyzed_at": datetime.now().isoformat(),
        }

        with open(
            "test/result_jsons/result_analyst_test.json", "w", encoding="utf-8"
        ) as f:
            json.dump(result_dict, f, ensure_ascii=False, indent=2)
    except Exception as e:
        pytest.fail(f"Test thất bại với lỗi: {str(e)}")


if __name__ == "__main__":
    test_analyze_cv_jd()
