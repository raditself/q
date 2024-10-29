
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

## New AI-Powered Components

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

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/raditself/x.git
   cd x
   ```

2. Create a `.env` file in the project root and add your Ollama endpoint:
   ```
   OLLAMA_ENDPOINT=http://localhost:11434
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

3. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

4. The application will be available at `http://localhost:5000`

## Usage

1. Register a new user account
2. Log in with your credentials
3. Start chatting with the AI assistant for GitHub-related queries
4. Use the code editor to write, complete, and explain GitHub-related code
5. Use the terminal to get GitHub command suggestions and explanations

## Security Notes

- The code execution is performed in a sandboxed Docker container with limited resources and network access.
- User passwords are hashed before being stored in the database.
- Rate limiting is implemented to prevent abuse of the AI chat and code execution features.

## Development

To run the application in development mode:

1. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

2. Set up the environment variables:
   ```
   export FLASK_APP=app.py
   export FLASK_ENV=development
   export OLLAMA_ENDPOINT=http://localhost:11434
   export DATABASE_URL=postgresql://username:password@host:port/database
   ```

3. Run the Flask development server:
   ```
   flask run
   ```

## Testing

To run the unit tests:

```
python -m unittest discover tests
```

## License

This project is licensed under the MIT License.
