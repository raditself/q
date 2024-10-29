import React, { useState } from 'react';

function CodeEditor() {
  const [code, setCode] = useState('');

  return (
    <div className="code-editor">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
      />
    </div>
  );
}

export default CodeEditor;
