import React, { useState } from 'react'
import './Components.css'
import Loading from './Loading';

import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  function Login(username, password) {
    if (username.length >= 5 && password.length >= 3) {
      console.log(username.length);
      console.log(password.length);
      setLoading(true);
      const data = {
        username: username,
        password: password
      };

      fetch('/login', {
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
            navigate("/chat")
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
      Login(username, password);
    }
  };

  function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
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
          <div id='txt2'>Login</div>
        </div>
        <div id='loginbox'>
          <input className='inptag' type='text' id='username' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyPress} required autoFocus autoComplete='off' />
          <div className='pswd_inp'>
            <input className='inptag' type='password' id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyPress} required />
            <button onClick={togglePasswordVisibility} id="toggleButton">👁️</button>
          </div>
          <div id='extra_options'>
            <a id='new_reg_btn' onClick={()=>navigate('/signup')}>New ! Register here</a>
            <hr id='hr' />
            <a id='forgot_pswd_btn' onClick={()=>navigate('/forgot')}>Forgot password</a>
          </div>
          <div id='submit_btn'>
            <FaArrowAltCircleRight size={30} onClick={() => Login(username, password)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
