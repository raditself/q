import React, { useState } from 'react';
import styles from './ChatInterface.module.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');

    const history = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, history, model }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiMessage = { text: data.response, sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className={styles.chatInterface}>
      <div className={styles.modelSelector}>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
        </select>
      </div>
      <div className={styles.messageList}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.button}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
