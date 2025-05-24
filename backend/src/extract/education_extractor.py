import json
from typing import Dict, List
from src.extract.llm_extractor import LLMExtractor


class EducationExtractor:
    def __init__(self):
        self.llm_extractor = LLMExtractor()

    def extract(self, cv_text: str) -> List[Dict[str, str]]:
        prompt = """
            Dưới đây là nội dung một CV. Hãy trích xuất thông tin(không cần dịch ra tiếng Việt và chuyển hết về chữ thường) học vấn (education) thành một danh sách các mục, mỗi mục gồm:
            - school: tên trường
            - degree: bằng cấp
            - major: chuyên ngành
            - start_year: năm bắt đầu(bạn hãy cố gắng định dạng thành ngày-tháng-năm hoặc tháng-năm hoặc năm nếu không có thì để trống(ví dụ như jan-2024 thì bạn hãy đưa về 01-01-2024) tức là nếu chỉ chỉ có tháng-năm thì bạn hãy cứ định nghĩa là ngày 01 cho tôi)
            - end_year: năm kết thúc(nếu là Now thì trả về Present, nếu là 1 thời gian cụ thể thì định dạng thành ngày-tháng-năm hoặc tháng-năm hoặc năm, nếu không có thì để trống)(nếu ứng viên để là Present hoặc Now thì điền vào là Present nhé)
            - description: mô tả thêm (nếu có)
            - grade: điểm trung bình(nếu có)
            Trả về kết quả dạng JSON, ví dụ:
            [
            {{
                "school": "...",
                "degree": "...",
                "major": "...",
                "start_year": "...",
                "end_year": "...",
                "description": "...",
                "grade": "..."
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
        # if llm not return list, return empty list
        return result if isinstance(result, list) else []
