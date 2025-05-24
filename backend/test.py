from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

completion = client.chat.completions.create(
    extra_headers={
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "CV Scanner",
    },
    extra_body={},
    model="qwen/qwen3-235b-a22b",
    messages=[
        {
            "role": "user",
            "content": "Bạn xử lý tốt nhất trong phần nào ?",
        }
    ],
)
print(completion.choices[0].message.content)
