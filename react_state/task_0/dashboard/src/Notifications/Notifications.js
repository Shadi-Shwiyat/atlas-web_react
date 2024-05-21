import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem.js';
import { StyleSheet, css } from 'aphrodite';
import NotificationItemShape from './NotificationItemShape';

const opacityKeyframes = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 }
};

const bounceKeyframes = {
  '0%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-5px)' },
  '100%': { transform: 'translateY(5px)' }
};

const styles = StyleSheet.create({
  menuItem: {
    position: 'fixed',
    top: 0,
    right: 0,
    marginTop: '10px',
    marginRight: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 30,
    ':hover': {
      animationName: [opacityKeyframes, bounceKeyframes],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3, 3',
      animationTimingFunction: 'ease-in-out, ease-in-out'
    }
  },
  notifications: {
    position: 'fixed',
    border: '1px dashed #E0354B',
    backgroundColor: '#fff8f8',
    padding: '10px',
    top: '60px',
    right: '20px',
    zIndex: '33',
    '@media (max-width: 900px)': {
      top: '20px',
      left: '0px',
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
    zIndex: '39',
    '@media (max-width: 900px)': {
      top: '-19px',
      right: '6px'
    }
  }
});

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: props.displayDrawer,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.displayDrawer !== prevState.displayDrawer) {
      return { displayDrawer: nextProps.displayDrawer };
    }
    return null;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Check if the length of the new listNotifications is greater than the previous one
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length ||
      nextState.displayDrawer !== this.state.displayDrawer
    );
  }

  render() {
    const { listNotifications = [] } = this.props;
    const { displayDrawer } = this.state;
    const { handleDisplayDrawer, handleHideDrawer } = this.props;

    return (
      <>
        <div className={css(styles.menuItem)} id='menuItem' onClick={handleDisplayDrawer}>
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)} id='notifications'>
            <button
              className={css(styles.notificationButton)}
              aria-label="Close"
              onClick={handleHideDrawer}
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
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

export default Notifications;
