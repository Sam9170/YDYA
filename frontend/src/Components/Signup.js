import React, { useState } from 'react'
import './Components.css'
import Loading from './Loading';

import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  function Signup(username, password1,password2) {
    if (username.length >= 5 && password1.length >= 3 && password2.length >= 3 && password1===password2) {
      console.log(username.length);
      console.log(password1.length);
      console.log(password2.length);
      setLoading(true);
      const data = {
        username: username,
        password1: password1,
        password2:password2
      };

      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Response from Flask:', data);
          if (data.auth === "1") {
            navigate("/login")
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      Signup(username, password1);
    }
  };

  function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password1");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }


  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div id="body">
      <div id='left'></div>
      <div id='right'>
        <div id='txt'>
          <span id='txt1'>YDYA</span>
          <div id='txt2'>Signup</div>
        </div>
        <div id='loginbox'>
          <input className='inptag' type='text' id='username' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyPress} required autoFocus autoComplete='off' />
          
          <div className='pswd_inp'>
            <input className='inptag' type='password' id='password1' placeholder='Password' value={password1} onChange={(e) => setPassword1(e.target.value)} onKeyDown={handleKeyPress} required />
            <button onClick={togglePasswordVisibility} id="toggleButton">👁️</button>
          </div>
          
          <div className='pswd_inp'>
            <input className='inptag' type='password' id='password2' placeholder='Verify Password' value={password2} onChange={(e) => setPassword2(e.target.value)} onKeyDown={handleKeyPress} required />
            {/* <button onClick={togglePasswordVisibility} id="toggleButton">👁️</button> */}
          </div>
          
          <div id='submit_btn'>
            <FaArrowAltCircleRight size={30} onClick={() => Signup(username, password1,password2)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
