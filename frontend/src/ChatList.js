import React from 'react'

function ChatList({ chats, selectedChat, onSelectChat }) {

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {chats.map((chat, index) => (
          <li
            key={index}
            className={selectedChat && chat.sender_id === selectedChat.sender_id ? "selected" : ""}
            onClick={() => onSelectChat(chat)}
          >
            {chat.sender_id}
          </li>
        ))}
      </ul>
    </div>
  );}

export default ChatList;
