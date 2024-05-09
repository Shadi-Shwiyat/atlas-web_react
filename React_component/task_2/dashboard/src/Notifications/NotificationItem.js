import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

const NotificationItem = ({ id, type = 'default', html, value, markAsRead }) => {
  const handleClick = () => {
    if (markAsRead) {
      markAsRead(id);
    }
  };

  return (
    <li data-priority={type} dangerouslySetInnerHTML={html ? { __html: html.__html} : null} onClick={handleClick}>
      {value}
    </li>
  );
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
