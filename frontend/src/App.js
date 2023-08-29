import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatDetails from './ChatDetails';
import './App.css';

function App() {
  const [selectedConversation, setSelectedConversation] = useState(undefined);

  const handleConversationClick = (senderId) => {
    setSelectedConversation(senderId);
  };

  return (
    <div className="chat-app">

      <div className="chat-list">
        {/* Render ConversationList component */}
        <ChatList 
        selectedConversation={selectedConversation}
        onSelectConversation={handleConversationClick} />
      </div>

      <div className="chat-details">
        {/* Render ChatDetails component */}
        <ChatDetails selectedConversation={selectedConversation} />
      </div>

      <div className="right-panel"></div>

    </div>
  );
}

export default App;

