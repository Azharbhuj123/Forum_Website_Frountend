import React from 'react'

export default function ChatScreen() {
  return (
    <div>
      <button className="back-button" onClick={() => window.history.back()}>
          <span className="back-arrow">‹</span> Back
        </button>
    </div>
  )
}
