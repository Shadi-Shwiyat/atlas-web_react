// Selector to get the filter type
export const filterTypeSelected = (state) => state.get('filter');

// Selector to get the notifications
export const getNotifications = (state) => state.get('notifications');

// Selector to get the unread notifications
export const getUnreadNotifications = (state) => {
  const notifications = state.get('notifications');
  return notifications.filter(notification => !notification.get('isRead'));
};
