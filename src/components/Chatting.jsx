import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const Chatting = () => {

  const { targetUserId } = useParams();
  const[messages, setMessages] = useState([]);
  const[newMessage, setNewMessage] = useState('');
  const user = useSelector((store) => store.user);
  const userId = user?._id;

const fetchChatMessages = async() =>{
  const chat = await axios.get(BASE_URL+ "/chat/" + targetUserId, {
    withCredentials: true,
  }); 

  console.log(chat?.data?.messages);

  const chatMessages = chat?.data?.messages.map(msg => {
    return {firstName: msg?.senderId?.firstName, lastName: msg?.senderId?.lastName, text: msg?.text};
  });
  setMessages(chatMessages);

};

useEffect(()=>{
  fetchChatMessages();
}, []);

  useEffect(() => {

    if(!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {firstName: user.firstName ,userId, targetUserId}); 

    socket.on('messageRecieved', ({firstName, lastName ,text}) => {
  console.log(firstName + " " + text);
  setMessages((prevMessages) => [...prevMessages, {firstName, lastName ,text}]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);


  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit('sendMessage', {firstName: user.firstName, lastName: user.lastName ,userId, targetUserId, text: newMessage});
    setNewMessage('');
  };
  
  return (
    <div className='w-1/2 mx-auto mt-14 bg-gray-900 rounded-lg shadow-2xl text-white flex flex-col border border-gray-600 h-[70vh]'>
    <h1 className='p-5 text-center font-bold border-b border-gray-600 text-2xl '>Chat</h1> 
    <div className='flex-1 p-5 overflow-y-auto'>
         {messages.map((msg, index) => {
            return (
              <div key={index} className = {"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start") }>
  <div class="chat-header">
    {msg.firstName + " " +msg.lastName}
    {/* <time class="text-xs opacity-50">2 hours ago</time> */}
  </div>
  <div className="chat-bubble">{msg.text}</div>
  <div className="chat-footer opacity-50">Seen</div>
</div>
            );
         })}
    </div>
    <div className='p-5 border-t border-gray-600 flex gap-3'>
      <input  value={newMessage} onChange={(e)=> setNewMessage(e.target.value)} className='flex-1 border text-black border-gray-500'/>
      <button onClick={sendMessage} className='btn btn-secondary'>Send</button>  
    </div> 
    </div>
  );
}

export default Chatting


