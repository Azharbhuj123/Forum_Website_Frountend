import React from "react";
import Search_Svg from "../../Svg_components/Search_Svg";

export default function ChatSideBar({
  conversations,
  activeConversation,
  onSelectConversation,
  setSearch
}) {
  // utils/formatTime.js
  function formatTime(isoTime) {
    if (!isoTime) return ""; // handle null/undefined
    return new Date(isoTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 12-hour format with AM/PM
    });
  }

  // console.log(conv.id,"conv.id");

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Messages</h2>
      </div>
      <div className="search-box">
        <Search_Svg />
        <input type="text" placeholder="Search conversations..." onChange={(e)=>setSearch(e.target.value)} />
      </div>
      <div className="conversations-list">
        {conversations?.map((conv) => (
          <div
            key={conv.userId}
            className={`conversation-item ${
              activeConversation === conv.userId ? "active" : ""
            }`}
            onClick={() => {
              console.log(conv, "activeConversation");

              onSelectConversation(conv.userId);
            }}
          >
            <img src={conv.avatar} alt={conv.name} />
            <div className="conversation-info">
              <div className="conversation-header">
                <span className="name">{conv.name}</span>
                <span className="time">{formatTime(conv.time)}</span>
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
