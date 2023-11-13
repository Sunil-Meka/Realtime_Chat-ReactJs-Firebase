// ChatHeader.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../config';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,getDoc,doc
} from 'firebase/firestore';

const ChatHeader = () => {
  const { recipient } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [stateUser] = useState(auth.currentUser) ;
  const currentUser = stateUser || JSON.parse(localStorage.getItem('currentUser'))
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
let displayName = null
  useEffect(() => {
    const fetchMessages = async () => {

      try {
        if (currentUser?.email && recipient) {
          const q = query(
            collection(firestore, 'messages'),
            orderBy('time', 'asc'),
            where('sender', 'in', [currentUser?.email, recipient]),
            where('receiver', 'in', [currentUser?.email, recipient])
          );

          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messagesData = querySnapshot.docs.map((doc) => doc.data());
            setMessages(messagesData);
            scrollToBottom();
            setLoading(false);
          });

          return () => unsubscribe();
        }else{
            console.log("no current user and recipeint found",currentUser,recipient)
        }
      } catch (error) {
        console.error('Error fetching messages:', error.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [recipient, currentUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === '') return;

    try {
      if (currentUser?.email && recipient) {
        await addDoc(collection(firestore, 'messages'), {
          msg: newMessage,
          sender: currentUser?.email,
          receiver: recipient,
          time: serverTimestamp(),
        });

        setNewMessage('');
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', textAlign: 'center' }}>
        <div className="go-back" style={{ padding: '10px', fontSize: '24px' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>
            <span
              style={{ fontSize: '24px', cursor: 'pointer' }}
              onClick={() => navigate(-1)}
            >
              ←
            </span>
          </Link>
        </div>
        <div className="profile-icon" style={{ flex: '1' }}>
          <h3 style={{ margin: 0 }}>{displayName ?? recipient}</h3>
        </div>
      </div>

      <div className="message-list" style={{ flex: '1', overflowY: 'auto', maxHeight: '530px', padding: '10px' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          messages.map((message, index) => (
            <div key={index} style={{ marginBottom: '8px', display: 'flex', justifyContent: message.sender === currentUser?.email ? 'flex-end' : 'flex-start' }}>
              <div
                className={`message-card ${message.sender === currentUser?.email ? 'sent-message' : 'received-message'}`}
                style={{ background: message.sender === currentUser?.email ? 'green' : 'grey', color: 'white', display: 'inline-block', margin: '4px', padding: '8px' }}
              >
                <p style={{ margin: 0 }}>{message.msg}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input" style={{ padding: '10px', width: '98%', position: 'fixed', bottom: 0 }}>
        <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ flex: '1', marginRight: '10px', borderRadius: '4px', padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatHeader;
