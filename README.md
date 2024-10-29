
# AI-Powered Assistant with Code Execution and GitHub Integration

This project is an AI-powered assistant that can chat with users, execute Python code in a secure sandbox environment, and provide GitHub-related assistance using Ollama.

## Features

- User registration and authentication
- AI-powered chat using Ollama's GitHub-focused model
- Secure code execution in a Docker sandbox
- AI-assisted code completion and explanation
- AI-enhanced GitHub command suggestions and explanations
- Rate limiting to prevent abuse
- Containerized application for easy deployment
- Web-based user interface for interacting with AI components

## AI-Powered Components

### ChatInterface
- Provides context-aware responses for GitHub-related queries
- Maintains conversation context for more coherent interactions

### CodeEditor
- Offers AI-assisted code completion for GitHub-related code
- Provides AI-generated explanations for GitHub-related code snippets

### Terminal
- Suggests GitHub commands based on user input
- Explains GitHub commands to help users understand their functionality

## Prerequisites

- Docker
- Docker Compose
- Ollama (for local AI model execution)
- Python 3.7+
- Flask

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/raditself/q.git
   cd q
   ```

2. Create a `.env` file in the project root and add your Ollama endpoint:
   ```
   OLLAMA_ENDPOINT=http://localhost:11434
   ```

3. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```
   python app.py
   ```

5. Open a web browser and navigate to `http://localhost:5000` to use the AI-powered assistant.

## Usage

1. Chat Interface: Enter your GitHub-related questions and receive AI-powered responses.
2. Code Editor: Input code snippets for completion or explanation.
3. Terminal: Enter command descriptions or actual commands for suggestions or explanations.

## Development

To run the application in development mode:

1. Set the Flask environment to development:
   ```
   export FLASK_ENV=development
   ```

2. Run the Flask development server:
   ```
   flask run
   ```

## Testing

To run the unit tests:

```
python -m unittest discover tests
```

## Docker Deployment

1. Build the Docker image:
   ```
   docker build -t ai-powered-assistant .
   ```

2. Run the Docker container:
   ```
   docker run -p 5000:5000 ai-powered-assistant
   ```

## License

This project is licensed under the MIT License.
