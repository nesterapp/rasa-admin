import React, { useState, useEffect } from 'react'
import RasaAdminAPI from './network';

function ChatList({ selectedConversation, onSelectConversation }) {

  const [ chats, setChats ] = useState([])

  useEffect(() => {
    // Fetch chat collection
    RasaAdminAPI.getChats().then(data => setChats(data))
  }, [])

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {chats.map((chat, index) => (
          <li
            key={index}
            className={selectedConversation === chat.sender_id ? "selected" : ""}
            onClick={() => onSelectConversation(chat.sender_id)}
          >
            {chat.sender_id}
          </li>
        ))}
      </ul>
    </div>
  );}

export default ChatList;
