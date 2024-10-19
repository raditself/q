
# StableLM Chat Application

This is a simple chat application that uses the StableLM 2 1.6B model for generating responses.

## Project Structure

```
.
├── README.md
├── index.html
├── script.js
├── style.css
├── run_app.sh
└── backend/
    └── app.py
```

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/raditself/q.git
   cd q
   ```

2. Install the required packages:
   ```
   pip install flask flask-cors ctransformers requests
   ```

3. Download the model:
   The StableLM 2 1.6B model file is not included in this repository due to its large size. It will be automatically downloaded when you run the application for the first time.

4. Run the application:
   ```
   chmod +x run_app.sh
   ./run_app.sh
   ```

5. Open `http://localhost:5000` in your web browser to start chatting.

## Features

- Simple web interface for chatting
- Uses StableLM 2 1.6B model for generating responses
- Automatic model download on first run

## Note

This application is for demonstration purposes only and should not be used in production environments without proper security measures.

## Troubleshooting

If you encounter any issues with downloading or running the model, please check the Hugging Face model page for the most up-to-date download link and instructions:
https://huggingface.co/Crataco/stablelm-2-1_6b-chat-imatrix-GGUF

## Development

To make changes to the application:

1. Modify the backend code in `backend/app.py`
2. Update the frontend files: `index.html`, `script.js`, and `style.css`
3. Test your changes locally by running the application
4. Commit your changes and push to GitHub:
   ```
   git add .
   git commit -m "Description of your changes"
   git push origin main
   ```

Enjoy chatting with StableLM!
