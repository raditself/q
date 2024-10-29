
from flask import Flask, render_template, request, jsonify
from chat_interface import ChatInterface
from code_editor import CodeEditor
from terminal import Terminal

app = Flask(__name__)

chat = ChatInterface()
editor = CodeEditor()
terminal = Terminal()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat_response():
    user_input = request.json['message']
    context = request.json.get('context', [])
    response = chat.get_context_aware_response(user_input, context)
    new_context = chat.add_to_context("user", user_input, context)
    new_context = chat.add_to_context("assistant", response, new_context)
    return jsonify({"response": response, "context": new_context})

@app.route('/code_complete', methods=['POST'])
def code_complete():
    code_context = request.json['code']
    completion = editor.get_code_completion(code_context)
    return jsonify({"completion": completion})

@app.route('/code_explain', methods=['POST'])
def code_explain():
    code = request.json['code']
    explanation = editor.get_code_explanation(code)
    return jsonify({"explanation": explanation})

@app.route('/command_suggest', methods=['POST'])
def command_suggest():
    user_input = request.json['input']
    suggestion = terminal.get_command_suggestion(user_input)
    return jsonify({"suggestion": suggestion})

@app.route('/command_explain', methods=['POST'])
def command_explain():
    command = request.json['command']
    explanation = terminal.get_command_explanation(command)
    return jsonify({"explanation": explanation})

if __name__ == '__main__':
    app.run(debug=True)
