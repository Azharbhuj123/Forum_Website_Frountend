import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ChatArea  ({ conversation, messages }){
    const [messageInput, setMessageInput] = useState('');
    const navigate = useNavigate();

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div onClick={()=>navigate('/profile')} className="user-info">
          <img src={conversation.avatar} alt={conversation.name} />
          <div className="user-details">
            <h3>{conversation.name}</h3>
            <span className="statuss">Active now</span>
          </div>
        </div>
        <button className="more-btn">⋮</button>
      </div>

      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.sender === 'me' ? 'sent' : 'received'}`}>
            {msg.sender !== 'me' && (
              <img src={conversation.avatar} alt={conversation.name} className="msg-avatar" />
            )}
            <div className={`message-bubble ${msg.sender === 'me' ? 'my-message' : 'their-message'}`}>
              {msg.text}
            {msg.time && <div className="msg-time">{msg.time}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className="send-btn" onClick={handleSendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
}