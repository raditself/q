
import requests
from typing import List, Dict

class ChatInterface:
    def __init__(self, ollama_endpoint: str = "http://localhost:11434"):
        self.ollama_endpoint = ollama_endpoint

    def get_context_aware_response(self, user_input: str, context: List[Dict[str, str]]) -> str:
        url = f"{self.ollama_endpoint}/api/chat"
        payload = {
            "model": "github-copilot",  # Assuming a GitHub-focused model
            "messages": context + [{"role": "user", "content": user_input}]
        }
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()["message"]["content"]
        else:
            return "Error: Unable to get a response from the AI."

    def add_to_context(self, role: str, content: str, context: List[Dict[str, str]]) -> List[Dict[str, str]]:
        context.append({"role": role, "content": content})
        return context[-5:]  # Keep only the last 5 messages for context

# Example usage
chat = ChatInterface()
context = []
user_input = "How do I create a new branch in Git?"
context = chat.add_to_context("user", user_input, context)
response = chat.get_context_aware_response(user_input, context)
print(f"AI: {response}")
context = chat.add_to_context("assistant", response, context)
