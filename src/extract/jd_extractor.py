import json
from typing import List, Dict
from src.extract.llm_extractor import LLMExtractor


class JDExtractor:
    def __init__(self, api_key: str, endpoint: str, model: str):
        self.llm_extractor = LLMExtractor(api_key, endpoint, model)

    def extract(self, jd_text: str) -> Dict[str, str]:
        prompt = """
            Dưới đây là nội dung một tin tuyển dụng. Hãy trích xuất thông tin(đừng cố gắng suy nghĩ thêm những thông tin khác) các mục sau:
                - title: tiêu đề của tin tuyển dụng
                - company: tên công ty
                - description: mô tả công việc
                - requirements: yêu cầu công việc
                - education_requirements: yêu cầu về trình độ học vấn(phần này bạn có thể tư duy trong yêu cầu của toàn bộ tin tuyển dụng để điền vào mục này nếu trong tin tuyển dụng có yêu cầu về trình độ học vấn còn nếu không thì để trống)
                - experience_requirements: yêu cầu về kinh nghiệm(phần này bạn có thể tư duy trong yêu cầu của toàn bộ tin tuyển dụng để điền vào mục này nếu trong tin tuyển dụng có yêu cầu về kinh nghiệm còn nếu không thì để trống hoặc nhà tuyển dụng viết không yêu cầu kinh nghiệm thì cứ điền vào là "Không yêu cầu")
                - skill_requirements: yêu cầu về kỹ năng(phần này bạn có thể tư duy trong yêu cầu của toàn bộ tin tuyển dụng để điền vào mục này)
            Trả về kết quả dạng JSON, ví dụ:
            {{
                "title": "...",
                "company": "...",
                "description": "...",
                "requirements": "...",
                "education_requirements": "...",
                "experience_requirements": "...",
                "skill_requirements": "..."
            }}  
            Nội dung tin tuyển dụng:
            {jd_text}
        """
        result = self.llm_extractor.extract_jd(prompt, jd_text)

        # Xử lý kết quả trả về
        if isinstance(result, dict):
            return result
        elif (
            isinstance(result, list) and len(result) > 0 and isinstance(result[0], dict)
        ):
            return result[0]
        elif isinstance(result, str):
            try:
                return json.loads(result)
            except json.JSONDecodeError:
                return {}
        else:
            return {}
