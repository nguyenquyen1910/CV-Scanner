import json
from typing import List, Dict
from src.extract.llm_extractor import LLMExtractor


class ProjectExtractor:
    def __init__(self):
        self.llm_extractor = LLMExtractor()

    def extract(self, cv_text: str) -> List[Dict[str, str]]:
        prompt = """
            Dưới đây là nội dung một CV. Hãy trích xuất thông tin(đừng cố gắng suy nghĩ thêm những thông tin khác) các dự án (projects) thành một danh sách các mục, mỗi mục gồm:
            - name: tên dự án
            - role: vai trò trong dự án
            - start_date: ngày bắt đầu(bạn hãy cố gắng định dạng thành tháng-năm hoặc năm nếu không có thì để trống(ví dụ như jan-2024 thì bạn hãy đưa về 01-2024) tức là nếu chỉ chỉ có tháng-năm thì bạn hãy cứ định nghĩa là ngày 01)
            - end_date: ngày kết thúc(bạn hãy cố gắng định dạng thành tháng-năm hoặc năm nếu không có thì để trống(ví dụ như jun-2024 thì bạn hãy đưa về 01-06-2024) tức là nếu chỉ chỉ có tháng-năm thì bạn hãy cứ định nghĩa là ngày 01)(nếu ứng viên để là Present hoặc Now thì điền vào là Present nhé)
            - description: mô tả dự án, thành tích, công nghệ sử dụng (nếu có)
            - technologies: công nghệ sử dụng (nếu ứng viên ghi trực tiếp mục này hoặc bạn có thể tư duy và điền nó thông qua mô tả mà ứng viên có viết trong toàn bộ project đó của ứng viên rồi điền tất cả công nghệ sử dụng vào mục này và cách nhau bởi dấu ",")
            - url: link dự án(có thể là link deploy hoặc link github hoặc nếu có cả hai thì lấy link deploy thôi) (nếu có)
            Trả về kết quả dạng JSON, ví dụ:
            [
            {{
                "name": "...",
                "role": "...",
                "start_date": "...",
                "end_date": "...",
                "description": "...",
                "technologies": "...",
                "url": "..."
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
