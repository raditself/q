import React, { useState, useEffect } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [personality, setPersonality] = useState('friendly');
  const [expertiseLevel, setExpertiseLevel] = useState('intermediate');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');
      setIsSearching(true);

      try {
        // Simulating AI response and web search
        const aiResponse = await getAIResponse(input, personality, expertiseLevel);
        setMessages(prevMessages => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I encountered an error.', sender: 'ai' }]);
      }

      setIsSearching(false);
    }
  };

  const getAIResponse = async (userInput, personality, expertiseLevel) => {
    // Simulating API call to AI service
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `AI response to "${userInput}" (Personality: ${personality}, Expertise: ${expertiseLevel})`;
  };

  return (
    <div className="chat-interface">
      <div className="chat-controls">
        <select value={personality} onChange={(e) => setPersonality(e.target.value)}>
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
          <option value="humorous">Humorous</option>
        </select>
        <select value={expertiseLevel} onChange={(e) => setExpertiseLevel(e.target.value)}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {isSearching && <div className="message ai">Searching and thinking...</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatInterface;
