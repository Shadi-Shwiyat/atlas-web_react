import React from 'react';
import logo from '../assets/logo.jpg';
import './Header.css';

function Header() {
  return (
    <div className="App-header">
      <img src={logo} alt='logo.jpg' className='logo'></img>
      <h1>School dashboard</h1>
    </div>
  );
}

export default Header;
