import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';

const ChatComponent = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Establish a WebSocket connection using SockJS
    const socket = new SockJS('http://localhost:8080/ws'); // Replace with your WebSocket server URL
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setStompClient(client);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      // Subscribe to a STOMP topic for receiving messages
      stompClient.subscribe('/topic/public', (response) => {
        const newMessage = JSON.parse(response.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [stompClient]);

  const sendMessage = () => {
    if (stompClient && messageInput.trim() !== '') {
      const message = { content: messageInput };
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
      setMessageInput('');
    }
  };

  return (
    <div>
      <h2>Chat Interface</h2>
      <div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index}>{msg.content}</div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
