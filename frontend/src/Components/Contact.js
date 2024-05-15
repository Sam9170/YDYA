import React, { useState } from 'react';
import { MdOutlineForwardToInbox } from "react-icons/md";

function ContactPage() {
    const wordlimit = 500;
    const [count, setCount] = useState(wordlimit);
    const [message, setMessage] = useState('');

    function handleCount(event) {
        const inputMessage = event.target.value;
        const wordCount = inputMessage.trim().length;
        const remainingCount = wordlimit - wordCount;
        
        if (remainingCount >= 0) {
            setCount(remainingCount);
            setMessage(inputMessage);
        } else {
            // If the limit is exceeded, trim the message to the allowed length
            setCount(0);
            setMessage(inputMessage.slice(0, wordlimit));
        }
    }

    return (
        <div id='contactbody'>
            <div id='contactform'>
                <h3>Contact US</h3>
                <input id='mailid' type='mail' placeholder='Email :- xyz@gmail.com' autoComplete='off' autoFocus/>
                <textarea id='usermsg' placeholder='Type here....' rows={20} cols={100} value={message} onChange={handleCount} />
                <span id='count'>{count}</span>
                <button id='msg_send_btn'><MdOutlineForwardToInbox size={20} /></button>
            </div>
        </div>
    );
}

export default ContactPage;
