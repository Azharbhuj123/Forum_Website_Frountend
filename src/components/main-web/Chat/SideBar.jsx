import React from 'react'
import Search_Svg from '../../Svg_components/Search_Svg';


 

export default function ChatSideBar({conversations, activeConversation, onSelectConversation}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Messages</h2>
      </div>
      <div className="search-box">
       <Search_Svg />
        <input type="text" placeholder="Search conversations..." />
      </div>
      <div className="conversations-list">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`conversation-item ${activeConversation === conv.id ? 'active' : ''}`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <img src={conv.avatar} alt={conv.name} />
            <div className="conversation-info">
              <div className="conversation-header">
                <span className="name">{conv.name}</span>
                <span className="time">{conv.time}</span>
              </div>
              <div className="conversation-preview">
                <span className="preview">{conv.preview}</span>
                {conv.unread > 0 && (
                  <span className="unread-badge">{conv.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
