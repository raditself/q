import React from 'react';
import ChatInterface from '../components/ChatInterface';
import CodeEditor from '../components/CodeEditor';
import Terminal from '../components/Terminal';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h1>BLACKBOXAI</h1>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div style={{ width: '50%', padding: '10px' }}>
          <h2>Chat Interface</h2>
          <ChatInterface />
        </div>
        <div style={{ width: '50%', padding: '10px' }}>
          <h2>Code Editor</h2>
          <CodeEditor />
          <h2>Terminal</h2>
          <Terminal />
        </div>
      </div>
    </div>
  );
};

export default Home;
