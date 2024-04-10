import React from 'react';

function ChatDetailsHeader({ chatHeader }) {
  const senderId = chatHeader?.sender_id 
  return (
    <div className="chat-details-header">
      <h2>Chat</h2>
      <p>{senderId ? `Sender ID: ${senderId}` : 'Select a chat'}</p>
    </div>
  );
}

export default ChatDetailsHeader;
