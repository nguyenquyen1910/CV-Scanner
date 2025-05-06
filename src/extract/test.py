import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1-mini"
token = os.environ["GITHUB_TOKEN"]

client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
)

response = client.complete(
    messages=[
        SystemMessage(""),
        UserMessage("Xin chào, bạn hãy cho tôi biết về tất cả bộ suit của Spider-man!"),
    ],
    temperature=1,
    top_p=1,
    max_tokens=2048,
    model=model,
)

print(response.choices[0].message.content)
