import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem.js';
import {StyleSheet, css} from 'aphrodite';
import NotificationItemShape from './NotificationItemShape';

const styles = StyleSheet.create({
  menuItem: {
    position: 'fixed',
    top: 0,
    right: 0,
    marginTop: '10px',
    marginRight: '20px',
  },
  notifications: {
    position: 'fixed',
    border: '1px dashed #E0354B',
    padding: '10px',
    top: '60px',
    right: '20px',
    '@media (max-width: 900px)': {
      top: '20px',
      left: '0px',
      zIndex: '33',
      width: '100vw',
      height: '100vh',
      border: 'none',
      padding: '0px',
      backgroundColor: 'white',
    }
  },
  notificationsUl: {
    '@media (max-width: 900px)': {
      padding: 0
    }
  },
  notificationsP: {
    '@media (max-width: 900px)': {
      fontSize: '20px',
      margin: '0',
      padding: '0'
    }
  },
  notificationButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '5px',
    paddingRight: '10px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    appearance: 'none',
    outline: 'none',
    zIndex: '36',
    '@media (max-width: 900px)': {
      top: '-19px',
      right: '6px'
    }
  }
});

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // Check if the length of the new listNotifications is greater than the previous one
    return nextProps.listNotifications.length > this.props.listNotifications.length;
  }

  handleButtonClick() {
    console.log('Close button has been clicked');
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, listNotifications = [] } = this.props;

    return (
      <>
        <div className={css(styles.menuItem)} id='menuItem'>
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)} id='notifications'>
            <button
              className={css(styles.notificationButton)}
              aria-label="Close"
              onClick={this.handleButtonClick}
            >
              x
            </button>
            <p className={css(styles.notificationsP)}>Here is the list of notifications</p>
            <ul className={css(styles.notificationsUl)}>
              {listNotifications.length === 0 ? (
                <NotificationItem type="default" value="No new notification for now" />
              ) : (
                listNotifications.map(notification => (
                  <NotificationItem key={notification.id} {...notification} markAsRead={this.markAsRead} />
                ))
              )}
            </ul>
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool.isRequired,
  listNotifications: PropTypes.arrayOf(NotificationItemShape)
};

export default Notifications;
