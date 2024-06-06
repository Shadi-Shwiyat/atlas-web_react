import { createSelector } from 'reselect';

// Selector to get the notifications state
const getNotificationsState = (state) => state.notifications;

// Selector to get the filter type
export const filterTypeSelected = (state) => getNotificationsState(state).get('filter');

// Selector to get the notifications list
export const getNotifications = (state) => getNotificationsState(state).get('notifications');

// Selector to get unread notifications by type
export const getUnreadNotificationsByType = createSelector(
  [getNotifications, filterTypeSelected],
  (notifications, filter) => {
    const unreadNotifications = notifications.filter(notification => !notification.get('isRead'));

    if (filter === 'URGENT') {
      return unreadNotifications.filter(notification => notification.get('type') === 'urgent');
    }

    return unreadNotifications;
  }
);
