import React, { useState, useEffect } from 'react'
import RasaAdminAPI from './network'

const ALLOWED_TYPES = ['user', 'bot']; // action, slot, user_featurization

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString(); // Customize the format as needed
}

function ChatDetails({ selectedConversation }) {

  const [ events, setEvents ] = useState([])
  useEffect(() => {
    if (selectedConversation) {
      RasaAdminAPI.getChat(selectedConversation).then(data => {
        // Filter events based on allowed types
        const filteredEvents = data.events.filter(event => ALLOWED_TYPES.includes(event.type_name));
        setEvents(filteredEvents);
      });
    }
  }, [selectedConversation]);

  return (
    <div className="chat-details">
      <h2>Chat</h2>
      {selectedConversation ? (
        <div className="messages">
          <h3>{selectedConversation}</h3>

          {events.slice().reverse().map((event, index) => (
            <div key={index} className={`message ${event.type_name}`}>
              <p className="timestamp">{formatTimestamp(event.timestamp)}</p>
              <p className={`message-body ${event.type_name}`}>{event.data.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Select a conversation from the left.</p>
      )}
    </div>
  );
}

export default ChatDetails;
