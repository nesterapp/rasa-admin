import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatDetails from './ChatDetails';
import MessageInput from './MessageInput';
import RasaAdminAPI from './RasaAdminAPI'
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

      {/* Render ConversationList component */}
      <ChatList
      chats={chats}
      selectedChat={selectedChat}
      onSelectChat={handleChatClick} />

      <div className="middle-section">
        {/* Render ChatDetails component */}
        <ChatDetails chat={selectedChatDetails} />
        {selectedChatDetails && <MessageInput onSendMessage={handleSendMessage} />}
      </div>

      <div className="right-panel"></div>

    </div>
  );
}

export default App;
