import React, { useState } from 'react';
import { VscThreeBars } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div id='navbar'>
      <div id='logo'>
        <img src='logo.png' alt='logo' />
        <span>YDYA</span>
      </div>
      <div id='threebar'>
        <div id='baricon' onClick={toggleMenu}><VscThreeBars /></div>
      </div>
      <div id='profile'><img src='logo.png' alt='logo' /></div>

      {menuOpen && (
        <div id='options'>
          <div id="menuOptions">
            <div className='opt' id='opt1' onClick={()=>{navigate("/")}}>Home</div>
            <div className='opt' id='opt2' >Account</div>
            <div className='opt' id='opt3'>About</div>
            <div className='opt' id='opt4' onClick={()=>{navigate("/contact")}}>Contact US</div>
            <div className='opt' id='opt5' >Log out</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
