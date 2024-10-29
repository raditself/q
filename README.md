
# AI-Powered Assistant with Code Execution and GitHub Integration

This project is an AI-powered assistant that can chat with users, provide code completion and explanation, and offer GitHub command suggestions and explanations using Ollama.

## Features

- AI-powered chat for GitHub-related queries
- AI-assisted code completion and explanation
- AI-enhanced GitHub command suggestions and explanations
- Modern, responsive UI

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

- Python 3.7+
- Flask
- Ollama (for local AI model execution)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/raditself/q.git
   cd q
   ```

2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

3. Set up the Ollama endpoint:
   - Make sure Ollama is running on your local machine or specify the correct endpoint in the ChatInterface, CodeEditor, and Terminal classes.

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

## Customization

The UI can be further customized by modifying the `templates/index.html` file. The current design is based on a modern, responsive layout that works well on both desktop and mobile devices.

## License

This project is licensed under the MIT License.
