import React from 'react';
import './styles/Notifications.css';
import { getLatestNotification } from './utils';

const Notifications = () => {
  const handleButtonClick = () => {
    console.log('Close button has been clicked');
  };

  return (
    <div className="Notifications">
      <button
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '5px',
          paddingRight: '10px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          appearance: 'none', /* Remove browser specific styles */
          outline: 'none', /* Remove outline on focus */
        }}
        aria-label="Close"
        onClick={handleButtonClick}
      >
        x
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
      </ul>
    </div>
  );
}
  
export default Notifications;
