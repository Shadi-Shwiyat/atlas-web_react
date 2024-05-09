import React from 'react';
import NotificationItem from './NotificationItem.js';
import './Notifications.css';
import { getLatestNotification } from '../utils/utils.js';

const Notifications = () => {
  const handleButtonClick = () => {
    console.log('Close button has been clicked');
  };

  const latestNotification = getLatestNotification();

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
        <NotificationItem type="default" value="New course available" />
        <NotificationItem type="urgent" value="New resume available" />
        <NotificationItem type="urgent" html={latestNotification} />
      </ul>
    </div>
  );
}

export default Notifications;
