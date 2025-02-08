import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const Chatting = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map(msg => {
      return { firstName: msg?.senderId?.firstName, lastName: msg?.senderId?.lastName, text: msg?.text };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

    socket.on('messageRecieved', ({ firstName, lastName, text }) => {
      setMessages((prevMessages) => [...prevMessages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit('sendMessage', { firstName: user.firstName, lastName: user.lastName, userId, targetUserId, text: newMessage });
    setNewMessage('');
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-teal-400 to-blue-400 flex justify-center items-center'>
      <div className='w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
        {/* Chat Header */}
        <h1 className='bg-indigo-700 text-white py-4 text-center text-2xl font-bold'>
          Chat with {user.firstName === targetUserId ? "Yourself" : "User"}
        </h1>

        {/* Messages Section */}
        <div className='p-4 overflow-y-auto h-[70vh] space-y-4'>
          {messages.map((msg, index) => {
            return (
              <div key={index} className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
                <div className="chat-header font-semibold text-lg text-indigo-800">
                  {msg.firstName + " " + msg.lastName}
                </div>
                <div className="chat-bubble bg-indigo-100 p-4 rounded-lg shadow-md text-black">
                  {msg.text}
                </div>
                <div className="chat-footer text-xs opacity-50">
                  {/* You can add time or seen status here */}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Section */}
        <div className='p-4 border-t border-gray-300 flex gap-3 items-center'>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className='flex-1 p-3 rounded-full border-2 border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none'
            placeholder="Type your message here..."
          />
          <button
            onClick={sendMessage}
            className='bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
