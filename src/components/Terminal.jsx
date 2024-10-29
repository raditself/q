import React, { useState } from 'react';

function Terminal() {
  const [output, setOutput] = useState('');

  const executeCommand = (command) => {
    // TODO: Implement command execution logic
    setOutput(output + '\n> ' + command);
  };

  return (
    <div className="terminal">
      <div className="terminal-output">{output}</div>
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            executeCommand(e.target.value);
            e.target.value = '';
          }
        }}
        placeholder="Enter command..."
      />
    </div>
  );
}

export default Terminal;
