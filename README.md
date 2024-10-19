
# StableLM Chat Application

This is a simple chat application that uses the StableLM 2 1.6B model for generating responses.

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
   The StableLM 2 1.6B model file is not included in this repository due to its large size. You need to download it separately:
   ```
   wget https://huggingface.co/Crataco/stablelm-2-1_6b-chat-imatrix-GGUF/resolve/main/stablelm-2-1_6b-chat.Q4_K_M.imx.gguf
   ```

4. Run the application:
   ```
   python app.py
   ```

5. Open `index.html` in your web browser to start chatting.

## Features

- Simple web interface for chatting
- Uses StableLM 2 1.6B model for generating responses
- Automatic model loading on first run

## Note

This application is for demonstration purposes only and should not be used in production environments without proper security measures.

## Troubleshooting

If you encounter any issues with downloading or running the model, please check the Hugging Face model page for the most up-to-date download link and instructions:
https://huggingface.co/Crataco/stablelm-2-1_6b-chat-imatrix-GGUF
