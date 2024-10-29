
import React from 'react';
import CodeEditor from '../components/CodeEditor';
import Terminal from '../components/Terminal';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Code Editor and Terminal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Code Editor</h2>
          <CodeEditor />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Terminal</h2>
          <Terminal />
        </div>
      </div>
    </div>
  );
};

export default Home;

