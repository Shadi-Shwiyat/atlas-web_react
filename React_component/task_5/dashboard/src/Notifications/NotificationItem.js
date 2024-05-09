import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

class NotificationItem extends PureComponent {
  handleClick = () => {
    const { id, markAsRead } = this.props;
    if (markAsRead) {
      markAsRead(id);
    }
  };

  render() {
    const { id, type = 'default', html, value } = this.props;

    return (
      <li data-priority={type} dangerouslySetInnerHTML={html ? { __html: html.__html} : null} onClick={this.handleClick}>
        {value}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  value: PropTypes.string,
  markAsRead: PropTypes.func
};

export default NotificationItem;
