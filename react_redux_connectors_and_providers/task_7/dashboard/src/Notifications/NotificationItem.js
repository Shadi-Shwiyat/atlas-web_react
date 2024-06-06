import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  notificationItem: {
    '@media (max-width: 900px)': {
      fontSize: '20px',
      listStyleType: 'none',
      margin: 0,
      padding: '10px 8px',
      width: '100vw',
      borderBottom: '1px solid black',
    },
    ":hover": {
      cursor: 'pointer',
    }
  },
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  }
});

class NotificationItem extends PureComponent {
  handleClick = () => {
    const { id, markAsRead, context } = this.props;
    if (markAsRead) {
      console.log('handleClick called with id:', id, 'and markAsRead:', context.isRead);
      markAsRead(id);
    }
  };

  render() {
    const { id, context = {}, html = context.html, value } = this.props;

    return (
      <li className={css(context.type === 'default' ? styles.default : styles.urgent, styles.notificationItem)} data-priority={context.type} dangerouslySetInnerHTML={html ? { __html: html.__html } : null} onClick={this.handleClick}>
        {value || context.value}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  value: PropTypes.string,
  context: PropTypes.shape({
    value: PropTypes.string
  }),
  markNotificationAsRead: PropTypes.func
};

export default NotificationItem;
