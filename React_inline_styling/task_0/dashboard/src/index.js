import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import './styles/styles.css'

ReactDOM.render(
  <React.StrictMode>
    <div className='app'>
      <App loggedIn={true} />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);