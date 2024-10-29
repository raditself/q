import React, { useState } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');

    // TODO: Replace with actual AI service call
    const aiResponse = await mockAIResponse(input);
    setMessages(prevMessages => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
  };

  // Mock AI response function (replace with actual API call later)
  const mockAIResponse = async (message) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    return `AI response to: "${message}"`;
  };

  return (
    <div className="chat-interface">
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
