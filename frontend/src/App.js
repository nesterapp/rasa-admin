import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatDetails from './ChatDetails';
import MessageInput from './MessageInput';
import RasaAdminAPI from './network'
import './App.css';


function App() {
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [selectedChatDetails, setSelectedChatDetails] = useState(undefined);
  const [chats, setChats ] = useState([])

  const handleChatClick = (selectedChat) => {
    setSelectedChat(selectedChat);
    setSelectedChatDetails(undefined)

    RasaAdminAPI.getChat(selectedChat.sender_id).then(data => {
      setSelectedChatDetails(data);
    });
  };

  const handleSendMessage = (text) => {
    console.log(`send message: ${text} to ${selectedChat.sender_id}`)
    RasaAdminAPI.sendMessage(selectedChat.sender_id, text)
  };

  useEffect(() => {
    // Fetch chat collection
    RasaAdminAPI.getChats().then(data => setChats(data))
  }, [])

  return (
    <div className="chat-app">

      <div className="chat-list">
        {/* Render ConversationList component */}
        <ChatList
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={handleChatClick} />
      </div>

      <div className="middle-section">
        <div className="chat-details">
          {/* Render your ChatDetails component */}
          <ChatDetails chat={selectedChatDetails} />
        </div>

        <div className="message-input">
        {selectedChatDetails && <MessageInput onSendMessage={handleSendMessage} />}
        </div>
      </div>

      <div className="right-panel"></div>

    </div>
  );
}

export default App;
