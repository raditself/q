
import requests
from typing import List, Dict

class CodeEditor:
    def __init__(self, ollama_endpoint: str = "http://localhost:11434"):
        self.ollama_endpoint = ollama_endpoint

    def get_code_completion(self, code_context: str) -> str:
        url = f"{self.ollama_endpoint}/api/generate"
        payload = {
            "model": "github-copilot",
            "prompt": f"Complete the following GitHub-related code:
{code_context}",
            "max_tokens": 100
        }
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()["response"]
        else:
            return "Error: Unable to get code completion."

    def get_code_explanation(self, code: str) -> str:
        url = f"{self.ollama_endpoint}/api/generate"
        payload = {
            "model": "github-copilot",
            "prompt": f"Explain the following GitHub-related code:
{code}",
            "max_tokens": 200
        }
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()["response"]
        else:
            return "Error: Unable to get code explanation."

# Example usage
editor = CodeEditor()
code_context = "def create_branch(repo, branch_name):"
completion = editor.get_code_completion(code_context)
print(f"Code Completion:
{completion}")

code_to_explain = '''
import git

def create_branch(repo_path, branch_name):
    repo = git.Repo(repo_path)
    current = repo.create_head(branch_name)
    current.checkout()
'''
explanation = editor.get_code_explanation(code_to_explain)
print(f"Code Explanation:
{explanation}")
