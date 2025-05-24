import json
from typing import List, Dict
from src.extract.llm_extractor import LLMExtractor


class BaseInformationExtractor:
    def __init__(self):
        self.llm_extractor = LLMExtractor()

    def extract(self, cv_text: str) -> List[Dict[str, str]]:
        prompt = """
            Dưới đây là nội dung một CV. Hãy trích xuất thông tin cá nhân cơ bản (base_infomation) thành một danh sách các mục, mỗi mục gồm:
            - fullname: tên đầy đủ của ứng viên
            - email: email của ứng viên
            - gender: giới tính của ứng viên
            - date_of_birth: ngày sinh của ứng viên(định dạng thành ngày-tháng-năm hoặc tháng-năm hoặc năm nếu không có thì để trống)
            - phone: số điện thoại của ứng viên
            - address: địa chỉ của ứng viên
            - summary: tóm tắt về ứng viên, phần này tôi muốn nó sẽ bao gồm cả mục tiêu nghề nghiệp của ứng viên(hãy suy nghĩ và đánh giá về thái độ, nhận thức của ứng viên 1 cách chính xác nhất(không cần dịch ra tiếng Việt) lưu ý là phần này sẽ cố định qua từng lần extract)
            Trả về kết quả dạng JSON, ví dụ:
            [
            {{
                "fullname": "...",
                "email": "...",
                "gender": "...",
                "date_of_birth": "...",
                "phone": "...",
                "address": "...",
                "summary": "..."
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
