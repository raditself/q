import React from 'react'
import './App.css'
import ChatInterface from './components/ChatInterface'
import CodeEditor from './components/CodeEditor'
import Terminal from './components/Terminal'

function App() {
  return (
    <div className="App">
      <h1>BLACKBOXAI</h1>
      <div className="container">
        <div className="left-panel">
          <ChatInterface />
        </div>
        <div className="right-panel">
          <CodeEditor />
          <Terminal />
        </div>
      </div>
    </div>
  )
}

export default App
