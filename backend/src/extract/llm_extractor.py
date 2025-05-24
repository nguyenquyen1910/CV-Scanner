from openai import OpenAI
import json
import os
from dotenv import load_dotenv

load_dotenv()


class LLMExtractor:
    def __init__(self):
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=os.getenv("OPENROUTER_API_KEY"),
        )
        self.model = os.getenv("OPENROUTER_MODEL")

    def extract(self, prompt: str, cv_text: str) -> dict:
        full_prompt = prompt.format(cv_text=cv_text)
        response = self.client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "CV Scanner",
            },
            model=self.model,
            messages=[
                {"role": "system", "content": "Bạn là một AI chuyên phân tích CV."},
                {"role": "user", "content": full_prompt},
            ],
            temperature=0.8,
            top_p=0.9,
        )

        content = response.choices[0].message.content
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            return {
                "raw_response": content,
            }

    def extract_jd(self, prompt: str, jd_text: str) -> dict:
        full_prompt = prompt.format(jd_text=jd_text)
        response = self.client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "CV Scanner",
            },
            model=self.model,
            messages=[
                {"role": "system", "content": "Bạn là một AI chuyên phân tích JD."},
                {"role": "user", "content": full_prompt},
            ],
            temperature=0.8,
            top_p=0.9,
        )

        content = response.choices[0].message.content
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            return {
                "raw_response": content,
            }

    def analyst_result(self, prompt: str, cv_text: str, jd_text: str) -> dict:
        full_prompt = prompt.format(cv_text=cv_text, jd_text=jd_text)
        response = self.client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "CV Scanner",
            },
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": "Bạn là một trợ lý AI chuyên đánh giá CV ứng viên theo Mô tả công việc (JD) để xác định mức độ phù hợp. CV và JD được cung cấp dưới định dạng JSON, chứa dữ liệu có cấu trúc về thông tin cơ bản, học vấn, kỹ năng, kinh nghiệm, dự án và chứng chỉ. Nhiệm vụ của bạn là so sánh các trường này, tính điểm cho học vấn, kinh nghiệm, kỹ năng và chứng chỉ, rồi trả về kết quả dạng JSON với điểm số và nhận xét ngắn gọn.",
                },
                {"role": "user", "content": full_prompt},
            ],
            temperature=1,
            top_p=0.9,
        )

        content = response.choices[0].message.content

        try:
            result = json.loads(content)
            return {
                "education_score": result.get("education_score", 0),
                "experience_score": result.get("experience_score", 0),
                "skill_score": result.get("skill_score", 0),
                "certificate_score": result.get("certificate_score", 0),
                "total_score": result.get("total_score", 0),
                "comment": result.get("comment", ""),
            }
        except json.JSONDecodeError:
            return {
                "education_score": 0,
                "experience_score": 0,
                "skill_score": 0,
                "certificate_score": 0,
                "total_score": 0,
                "comment": "Error parsing AI response",
            }
        except Exception as e:
            return {
                "education_score": 0,
                "experience_score": 0,
                "skill_score": 0,
                "certificate_score": 0,
                "total_score": 0,
                "comment": f"Error: {str(e)}",
            }
