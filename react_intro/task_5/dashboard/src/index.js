import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import Notifications from './Notifications/Notifications.js';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <div className='root-notifications'>
        <Notifications />
      </div>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);