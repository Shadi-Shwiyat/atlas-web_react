import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem.js';
import { StyleSheet, css } from 'aphrodite';
import { fetchNotifications, markAsRead, setNotificationFilter } from '../actions/notificationActionCreators';
import { connect } from 'react-redux';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';

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
    marginLeft: '20px',
    zIndex: '33',
    '@media (max-width: 900px)': {
      top: '20px',
      left: '0px',
      marginLeft: '0px',
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
  },
  filterButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0'
  },
  filterButton: {
    cursor: 'pointer',
    padding: '5px 10px',
    border: '1px solid #E0354B',
    backgroundColor: '#fff8f8',
    borderRadius: '3px'
  }
});

class Notifications extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: props.displayDrawer,
    };
  }

  componentDidMount() {
    this.props.fetchNotifications();
  }

  handleClick = () => {
    const { listNotifications, handleDisplayDrawer } = this.props;
    handleDisplayDrawer();
    console.log(listNotifications);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.displayDrawer !== prevState.displayDrawer) {
      return { displayDrawer: nextProps.displayDrawer };
    }
    return null;
  }

  render() {
    const { listNotifications = [], markAsRead, handleDisplayDrawer, handleHideDrawer, setNotificationFilter } = this.props;
    const { displayDrawer } = this.state;

    return (
      <>
        <div className={css(styles.menuItem)} id='menuItem' onClick={this.handleClick}>
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
            <div className={css(styles.filterButtons)}>
              <button className={css(styles.filterButton)} onClick={() => setNotificationFilter('URGENT')}>
                ‼️
              </button>
              <button className={css(styles.filterButton)} onClick={() => setNotificationFilter('DEFAULT')}>
                ?
              </button>
            </div>
            <ul className={css(styles.notificationsUl)}>
              {listNotifications.length === 0 ? (
                <NotificationItem type="default" value="No new notification for now" />
              ) : (
                listNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    {...notification}
                    markAsRead={() => markAsRead(notification.id)}
                  />
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
  listNotifications: PropTypes.array,
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markAsRead: PropTypes.func,
  fetchNotifications: PropTypes.func,
  setNotificationFilter: PropTypes.func
};

Notifications.defaultProps = {
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markAsRead: () => {},
  setNotificationFilter: () => {}
};

const mapStateToProps = (state) => ({
  listNotifications: getUnreadNotificationsByType(state).toJS(),
});

const mapDispatchToProps = {
  fetchNotifications,
  markAsRead,
  setNotificationFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
