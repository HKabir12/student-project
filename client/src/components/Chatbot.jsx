import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chatbot({ user }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
          console.log('Notification permission denied');
        }
      });
    }
  }, []);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      if (Notification.permission === 'granted') {
        new Notification(`Message from ${data.sender}`, { body: data.message });
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const data = { sender: user.name, receiver: "teacher", message };
      socket.emit('sendMessage', data);
      setMessages((prevMessages) => [...prevMessages, data]);
      setMessage('');
    }
  };

  return (
    <div className="chatbox p-4 border rounded shadow-lg">
      <div className="messages mb-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="message p-2 bg-gray-200 my-2 rounded">
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="input-box flex items-center gap-2">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
