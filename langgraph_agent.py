from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
import json

chat_model = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0.2
)

def agent(user_input: str) -> dict:
    system_prompt = """
You are an assistant that extracts structured data from sales interactions.

Return ONLY valid JSON in this format:
{
  "attendees": "",
  "topics_discussed": "",
  "materials_shared": "",
  "summary": "",
  "sentiment": ""
}
"""

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_input)
    ]

    response = chat_model.invoke(messages).content

    try:
        return json.loads(response)
    except Exception:
        return {
            "attendees": "",
            "topics_discussed": "",
            "materials_shared": "",
            "summary": response,
            "sentiment": "Neutral"
        }
