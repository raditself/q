
import requests
from typing import List, Dict

class Terminal:
    def __init__(self, ollama_endpoint: str = "http://localhost:11434"):
        self.ollama_endpoint = ollama_endpoint

    def get_command_suggestion(self, user_input: str) -> str:
        url = f"{self.ollama_endpoint}/api/generate"
        payload = {
            "model": "github-copilot",
            "prompt": f"Suggest a GitHub command based on this input: {user_input}",
            "max_tokens": 50
        }
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()["response"]
        else:
            return "Error: Unable to get command suggestion."

    def get_command_explanation(self, command: str) -> str:
        url = f"{self.ollama_endpoint}/api/generate"
        payload = {
            "model": "github-copilot",
            "prompt": f"Explain the following GitHub command: {command}",
            "max_tokens": 100
        }
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()["response"]
        else:
            return "Error: Unable to get command explanation."

# Example usage
terminal = Terminal()
user_input = "I want to create a new branch and switch to it"
suggestion = terminal.get_command_suggestion(user_input)
print(f"Command Suggestion: {suggestion}")

command = "git checkout -b feature-branch"
explanation = terminal.get_command_explanation(command)
print(f"Command Explanation: {explanation}")
