from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
import json


class LLMExtractor:
    def __init__(self, api_key: str, endpoint: str, model: str):
        self.api_key = api_key
        self.endpoint = endpoint
        self.model = model
        self.client = ChatCompletionsClient(
            endpoint=self.endpoint,
            credential=AzureKeyCredential(self.api_key),
        )

    def extract(self, prompt: str, cv_text: str) -> dict:
        full_prompt = prompt.format(cv_text=cv_text)
        response = self.client.complete(
            messages=[
                SystemMessage("Bạn là một AI chuyên phân tích CV."),
                UserMessage(full_prompt),
            ],
            temperature=1,
            top_p=0.9,
            model=self.model,
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
        response = self.client.complete(
            messages=[
                SystemMessage("Bạn là một AI chuyên phân tích JD."),
                UserMessage(full_prompt),
            ],
            temperature=0.7,
            top_p=0.9,
            model=self.model,
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
        response = self.client.complete(
            messages=[
                SystemMessage(
                    "You are an AI assistant tasked with evaluating the suitability of a candidate's CV against a Job Description (JD) to determine how well the candidate matches the job requirements. The CV and JD are provided in JSON format, containing information about skills, experience, projects, and certificates. Your goal is to compare the relevant fields, calculate a suitability score, and provide a detailed analysis of the match."
                ),
                UserMessage(full_prompt),
            ],
            temperature=0.8,
            top_p=0.9,
            model=self.model,
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
