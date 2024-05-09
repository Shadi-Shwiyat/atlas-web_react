import React from 'react';
import PropTypes from 'prop-types'; // Import prop-types library
import './Notifications.css';

const NotificationItem = ({ type = 'default', html, value }) => {
  return (
    <li data-priority={type} dangerouslySetInnerHTML={html ? { __html: html.__html} : null}>
      {value}
    </li>
  );
}

// Define prop types for the NotificationItem component
NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  value: PropTypes.string
};

export default NotificationItem;
