import json
from typing import Dict, List
from src.extract.llm_extractor import LLMExtractor


class ExperienceExtractor:
    def __init__(self, api_key: str, endpoint: str, model: str):
        self.llm_extractor = LLMExtractor(api_key, endpoint, model)

    def extract(self, cv_text: str) -> List[Dict[str, str]]:
        prompt = """
            Dưới đây là nội dung một CV. Hãy trích xuất thông tin(không cần dịch ra tiếng Việt và chuyển hết về chữ thường) kinh nghiệm làm việc (work experience) thành một danh sách các mục, mỗi mục gồm:
            - company: tên công ty
            - position: chức danh/vị trí
            - start_date: ngày bắt đầu(bạn hãy cố gắng định dạng thành ngày-tháng-năm hoặc tháng-năm hoặc năm nếu không có thì để trống(ví dụ như jan-2024 thì bạn hãy đưa về 01-01-2024) tức là nếu chỉ chỉ có tháng-năm thì bạn hãy cứ định nghĩa là ngày 01 cho tôi)
            - end_date: ngày kết thúc(bạn hãy cố gắng định dạng thành ngày-tháng-năm hoặc tháng-năm hoặc năm nếu không có thì để trống(ví dụ như jun-2024 thì bạn hãy đưa về 06-06-2024) tức là nếu chỉ chỉ có tháng-năm thì bạn hãy cứ định nghĩa là ngày 01 cho tôi) (nếu ứng viên để là Present hoặc Now thì điền vào là Present nhé)
            - description: mô tả công việc, thành tích (nếu có)
            Trả về kết quả dạng JSON, ví dụ:
            [
            {{
                "company": "...",
                "position": "...",
                "start_date": "...",
                "end_date": "...",
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
        # if llm not return list, return empty list
        return result if isinstance(result, list) else []
