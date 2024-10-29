

import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setOutput((prev) => [...prev, { type: 'input', content: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/execute-terminal-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: input }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput((prev) => [...prev, { type: 'output', content: data.output }]);
      } else {
        setOutput((prev) => [...prev, { type: 'error', content: data.error }]);
      }
    } catch (error) {
      console.error('Error executing command:', error);
      setOutput((prev) => [...prev, { type: 'error', content: 'An error occurred while executing the command' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="terminal bg-gray-900 text-white p-4 rounded-lg">
      <div className="terminal-output mb-4 h-64 overflow-y-auto">
        {output.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type} mb-1`}>
            {item.type === 'input' ? '$ ' : ''}<span className={item.type === 'error' ? 'text-red-400' : ''}>{item.content}</span>
          </div>
        ))}
        {isLoading && <div className="terminal-line loading text-yellow-400">Executing command...</div>}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <div className="flex items-center">
          <span className="mr-2 text-green-400">$</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow bg-transparent outline-none"
            ref={inputRef}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default Terminal;

