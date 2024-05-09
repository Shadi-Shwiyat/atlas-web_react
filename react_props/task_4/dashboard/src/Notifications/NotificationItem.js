import React from 'react';
import './Notifications.css';

const NotificationItem = ({ type, html, value }) => {
  return (
    <li data-priority={type} dangerouslySetInnerHTML={html ? { __html: html } : null}>
      {value}
    </li>
  );
}

export default NotificationItem;
