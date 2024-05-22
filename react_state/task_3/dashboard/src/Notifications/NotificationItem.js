import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create({
  notificationItem: {
    '@media (max-width: 900px)': {
      fontSize: '20px',
      listStyleType: 'none',
      margin: 0,
      padding: '10px 8px',
      width: '100vw',
      borderBottom: '1px solid black',
    }
  },
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  }
})

class NotificationItem extends PureComponent {
  handleClick = () => {
    const { id, markNotificationAsRead } = this.props;
    if (markNotificationAsRead) {
      markNotificationAsRead(id);
      // console.log("MARK NOTIFICATION AS READ IS CLICKED");
      console.log('handleClick called with id:', id);
    }
  };

  render() {
    const { id, type = 'default', html, value } = this.props;

    return (
      <li className={css(type == 'default' ? styles.default : styles.urgent, styles.notificationItem)} data-priority={type} dangerouslySetInnerHTML={html ? { __html: html.__html} : null} onClick={this.handleClick}>
        {value}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  value: PropTypes.string,
  markNotificationAsRead: PropTypes.func
};

export default NotificationItem;
