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
  },
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
        <div className={css(styles.menuItem)}>
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
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
                appearance: 'none',
                outline: 'none',
              }}
              aria-label="Close"
              onClick={this.handleButtonClick}
            >
              x
            </button>
            <p>Here is the list of notifications</p>
            <ul>
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
