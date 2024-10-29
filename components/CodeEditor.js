

import React, { useState, useRef } from 'react';
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const executeCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, code }),
      });

      if (!response.ok) {
        throw new Error('Failed to execute code');
      }

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error executing code:', error);
      setError('An error occurred while executing the code');
      setOutput('');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  return (
    <div className="code-editor bg-gray-800 text-white p-4 rounded-lg">
      <div className="mb-4 flex items-center">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 bg-gray-700 text-white rounded mr-2"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <button
          onClick={executeCode}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Executing...' : 'Execute Code'}
        </button>
        <button
          onClick={formatCode}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Format Code
        </button>
      </div>
      <Editor
        height="400px"
        language={language}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          formatOnPaste: true,
          formatOnType: true,
          autoIndent: 'full',
          theme: 'vs-dark',
        }}
      />
      <div className="mt-4 p-4 bg-gray-700 rounded">
        <h3 className="font-bold mb-2">Output:</h3>
        {isLoading && <p className="text-yellow-400">Executing code...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!isLoading && !error && <pre className="whitespace-pre-wrap">{output}</pre>}
      </div>
    </div>
  );
};

export default CodeEditor;


