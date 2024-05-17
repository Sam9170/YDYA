import React, { useState, useEffect, useRef } from 'react';
import './Components.css';
import Sentmsg from './Sentmsg';
import Receivedmsg from './Receivedmsg';

import { FaHourglassEnd } from "react-icons/fa6";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendMessage, setSendMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (newMessage.trim() !== '') {
      const data = {
        query: newMessage
      };
      console.log(newMessage)
      setNewMessage('');
      setLoading(true);

      fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          console.log("Network error")
          setMessages(prevMessages => [...prevMessages, "Network error"]);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from Flask:', data);
        setMessages(prevMessages => [...prevMessages, data.ans]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
    }
  }, [sendMessage]);

  const HandleMessageSubmit = () => {
    if (newMessage.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setSendMessage(!sendMessage);
     
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      HandleMessageSubmit();
    }
  };

  return (
    <div id='chatbody'>
      <h6 id='heading'></h6><br />
      <div id='display'>

        {messages.map((str, index) => {
          if (str && typeof(str) === "string" && str.length > 0) {
            if ((index + 1) % 2 !== 0) {
              return <Sentmsg key={index} msg={str} />;
            } else {
              return <Receivedmsg key={index} msg={str} />;
            }
          } else {
            return null;
          }
        })}
        
        <div ref={messagesEndRef} />

      </div>

      <div id='inp_box'>
        <input id='inp_field' placeholder='Ask here ...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleKeyPress} autoFocus autoComplete='false' />
        {loading ? <div id='send_btn'><FaHourglassEnd size={20} /></div> : <div id='send_btn' onClick={HandleMessageSubmit}><FaHourglassEnd size={20} /></div>}
      </div>
    </div>
  );
}

export default ChatPage;
