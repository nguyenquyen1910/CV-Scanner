import json
from typing import List, Dict
from src.extract.llm_extractor import LLMExtractor


class CertificateExtractor:
    def __init__(self, api_key: str, endpoint: str, model: str):
        self.llm_extractor = LLMExtractor(api_key, endpoint, model)

    def extract(self, cv_text: str) -> List[Dict[str, str]]:
        prompt = """
            Dưới đây là nội dung một CV. Hãy trích xuất thông tin chứng chỉ (certificates) thành một danh sách các mục, mỗi mục gồm:
            - name: tên chứng chỉ
            - organization: tổ chức cấp           
            - issue_date: ngày cấp(bạn hãy cố gắng định dạng thành ngày-tháng-năm hoặc tháng-năm hoặc năm nếu không có thì để trống(ví dụ như jan-2024 thì bạn hãy đưa về 01-01-2024) tức là nếu chỉ chỉ có tháng-năm thì bạn hãy cứ định nghĩa là ngày 01 cho tôi)
            - description: mô tả thêm (nếu có)
            Trả về kết quả dạng JSON, ví dụ:
            [
            {{
                "name": "...",
                "organization": "...",
                "issue_date": "...",
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
