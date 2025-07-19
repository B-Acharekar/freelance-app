import React, { useState, useEffect } from 'react';

const ChatBox = ({ currentUserId, receiverId, projectId, onSend }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // TODO: fetch previous messages if needed
  }, [projectId, receiverId]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      sender: currentUserId.toString().trim(),
      receiver: receiverId.toString().trim(),
      message: message.trim(),
      projectId: projectId.toString().trim(),
    };

    // Send via callback
    if (onSend) onSend(newMessage);

    // Add to local messages immediately
    setMessages(prev => [...prev, newMessage]);

    setMessage('');
  };

  return (
    <div className="d-flex flex-column h-100 border rounded p-3 bg-light">
      <div className="flex-grow-1 overflow-auto mb-3">
        {messages.map((msg, index) => {
          // Check if currentUser sent the message
          const isCurrentUser = msg.sender.toString().trim() === currentUserId.toString().trim();

          return (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${
                isCurrentUser
                  ? 'bg-primary text-white text-end'
                  : 'bg-success text-white text-start'
              }`}
            >
              {msg.message}
            </div>
          );
        })}
      </div>

      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
