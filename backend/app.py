
import os
import requests
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ctransformers import AutoModelForCausalLM

app = Flask(__name__, static_folder='..', static_url_path='')
CORS(app)

MODEL_URL = "https://huggingface.co/Crataco/stablelm-2-1_6b-chat-imatrix-GGUF/resolve/main/stablelm-2-1_6b-chat.Q4_K_M.imx.gguf?download=true"
MODEL_PATH = "stablelm-2-1_6b-chat.Q4_K_M.imx.gguf"

def download_model():
    if not os.path.exists(MODEL_PATH):
        print("Downloading model...")
        response = requests.get(MODEL_URL, stream=True)
        with open(MODEL_PATH, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        print("Model downloaded successfully.")
    else:
        print("Model already exists.")

model = None

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/chat', methods=['POST'])
def chat():
    global model
    if model is None:
        download_model()
        model = AutoModelForCausalLM.from_pretrained(MODEL_PATH, model_type="stablelm")
    
    data = request.json
    user_input = data['message']
    
    response = model(f"Human: {user_input}\nAssistant:", max_new_tokens=100)
    
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
