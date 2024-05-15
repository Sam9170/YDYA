import React from 'react'
import { useNavigate } from 'react-router-dom';

function HomePage(props) {
    const navigate = useNavigate();

    return (
        <div id='home_body'>
            <button className='home_btn' onClick={()=>{;navigate('/login')}}>Login</button>
            <button className='home_btn' onClick={()=>{navigate('/signup')}}>Sign Up</button>
        </div>
    )
}

export default HomePage