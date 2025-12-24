import React from "react";

export default function MentionModal({ users, onSelect, position }) {
  return (
    <div
      className="mention-modal"
      style={{ top: position.top, left: position.left }}
    >
      {users.length === 0 ? (
        <p className="empty-text">No users found</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            className="mention-user"
            onClick={() => onSelect(user)}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="mention-avatar"
            />
            <span className="mention-name">{user.name}</span>
          </div>
        ))
      )}
    </div>
  );
}
