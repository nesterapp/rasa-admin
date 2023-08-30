import React from 'react'

const ALLOWED_TYPES = ['user', 'bot']; // action, slot, user_featurization

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

function ChatDetails({ chat }) {

  const filter_events = (chat) => {
    const filteredEvents = chat.events.filter(event => ALLOWED_TYPES.includes(event.type_name));
    return filteredEvents.slice().reverse()
  }

  return (
    <div className="chat-details">
      <h2>Chat</h2>
      {chat ? (
        <div className="messages">
          <h3>{chat.sender_id}</h3>
          {filter_events(chat).map((event, index) => (
            <div key={index} className={`message ${event.type_name}`}>
              <p className="timestamp">{formatTimestamp(event.timestamp)}</p>
              <p className={`message-body ${event.type_name}`}>{event.data.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Select a conversation</p>
      )}
    </div>
  );
}

export default ChatDetails;
