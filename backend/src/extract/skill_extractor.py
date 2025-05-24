import json
from typing import List, Dict
from src.extract.llm_extractor import LLMExtractor


class SkillExtractor:
    def __init__(self):
        self.llm_extractor = LLMExtractor()

    def extract(self, cv_text: str) -> List[Dict[str, str]]:
        prompt = """
            Dưới đây là nội dung một CV. Hãy trích xuất thông tin(chỉ trích xuất những thông tin có trong CV đừng cố gắng suy nghĩ thêm những thông tin khác) kỹ năng (skills) thành một danh sách các mục, mỗi mục gồm:
            - skill_name: tên kỹ năng(chỉ ghi tên kĩ năng)
            - level: mức độ (nếu có, ví dụ: Beginner, Intermediate, Advanced)
            - description: mô tả thêm (tất cả những phần còn lại nếu có)
            Trả về kết quả dạng JSON, ví dụ:
            [
            {{
                "skill_name": "...",
                "level": "...",
                "description": "..."
            }}
            ]
            CV:
            {cv_text}
        """
        result = self.llm_extractor.extract(prompt, cv_text)
        if isinstance(result, list) and all(isinstance(item, dict) for item in result):
            return result
        if isinstance(result, str):
            try:
                return json.loads(result)
            except Exception:
                pass
        return result if isinstance(result, list) else []
