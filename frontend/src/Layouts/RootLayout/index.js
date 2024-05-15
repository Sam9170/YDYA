import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import LoginPage from '../../Components/Login'
import HomePage from '../../Components/Home'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {

    const [flag, setflag] = useState(true);

    return (
        <div style={{ minHeight: "100vh" }}>
            <Navbar fun={setflag}/>
            <div><Outlet /></div>
        </div>
    )
}


export default RootLayout