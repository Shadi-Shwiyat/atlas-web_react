import React from 'react';
import { getFullYear, getFooterCopy } from './utils';
import './styles/App.css';
import logo from './assets/logo.jpg';

function App() {
  const handleLabelClick = (inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.focus();
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} alt='logo.jpg' className='logo'></img>
        <h1>School dashboard</h1>
      </div>
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
        <div className='sign-in'>
          <label htmlFor="email" onClick={() => handleLabelClick("email")}>Email:</label>
          <input type="email" id="email" name="email" />
          <br />
          <label htmlFor="password" onClick={() => handleLabelClick("password")}>Password:</label>
          <input type="password" id="password" name="password" />
          <br />
          <button>OK</button>
        </div>
      </div>
      <div className='App-footer'>
        <p>{getFooterCopy(true)} - {getFullYear()}</p>
      </div>
    </div>
  );
}

export default App;
