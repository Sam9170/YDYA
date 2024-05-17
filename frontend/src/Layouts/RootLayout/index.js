import React from 'react'
import Navbar from '../../Components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {

    return (
        <div style={{ minHeight: "100vh" }}>
            <Navbar/>
            <div><Outlet /></div>
        </div>
    )
}


export default RootLayout