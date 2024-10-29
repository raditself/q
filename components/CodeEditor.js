import React, { useState } from 'react';
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  return (
    <div className="code-editor">
      <Editor
        height="400px"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default CodeEditor;
