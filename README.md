# AI-Powered Ollama UI

This is an AI-powered user interface that integrates with Ollama, featuring a chat interface, code editor, and terminal component.

## Project Structure

```
.
├── README.md
├── index.html
├── src/
│   ├── App.vue
│   ├── main.js
│   └── components/
│       ├── ChatInterface.vue
│       ├── CodeEditor.vue
│       └── Terminal.vue
├── public/
├── vite.config.js
├── package.json
└── backend/
    └── app.py
```

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/raditself/q.git
   cd q
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open the URL provided by the development server in your web browser (usually http://localhost:5173).

## Features

- Chat interface powered by Ollama
- Code editor with syntax highlighting
- Terminal component for command execution
- Vue.js-based frontend for reactive UI

## Development

To make changes to the application:

1. Modify the Vue components in the `src/components/` directory
2. Update the main App.vue file in `src/App.vue`
3. Test your changes locally by running the development server
4. Commit your changes and push to GitHub:
   ```
   git add .
   git commit -m "Description of your changes"
   git push origin main
   ```

## Backend Integration

The backend integration with Ollama is handled in the `backend/app.py` file. Make sure you have Ollama set up and running locally for the chat functionality to work.

## Note

This application is for demonstration purposes and may require additional setup and security measures for production use.

Enjoy your AI-powered development environment!
