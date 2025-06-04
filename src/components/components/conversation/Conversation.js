import React, { useState } from "react";
import "./Conversation.css";

function ChatComponent() {
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your onboarding assistant. How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages([...messages, { text: inputValue, sender: "user" }]);
    setInputValue("");

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I can help you understand how to use this platform. What specifically would you like to know?", 
        sender: "bot" 
      }]);
    }, 1000);
  };

  return (
    <div className="left-card">
      <div className="conversation-box">
        <h2 className="card-title">Welcome to ProfileFinder</h2>
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="message-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatComponent;