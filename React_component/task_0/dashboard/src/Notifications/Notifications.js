import React from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem.js';
import './Notifications.css';
import NotificationItemShape from './NotificationItemShape';

const Notifications = ({ displayDrawer, listNotifications = [] }) => {
  const handleButtonClick = () => {
    console.log('Close button has been clicked');
  };

  return (
    <>
      <div className="menuItem">
        <p>Your notifications</p>
      </div>
      {displayDrawer && (
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
            {listNotifications.length === 0 ? (
              <NotificationItem type="default" value="No new notification for now" />
            ) : (
              listNotifications.map(notification => (
                <NotificationItem key={notification.id} {...notification} />
              ))
            )}
          </ul>
        </div>
      )}
    </>
  );
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool.isRequired,
  listNotifications: PropTypes.arrayOf(NotificationItemShape)
};

export default Notifications;
