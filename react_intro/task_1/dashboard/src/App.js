import React from 'react';
import { getFullYear, getFooterCopy } from './utils';
import './styles/App.css';
import logo from './assets/logo.jpg';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} alt='logo.jpg' className='logo'></img>
        <h1>School dashboard</h1>
      </div>
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
      </div>
      <div className='App-footer'>
        <p>{getFooterCopy(true)} - {getFullYear()}</p>
      </div>
    </div>
  );
}

export default App;
