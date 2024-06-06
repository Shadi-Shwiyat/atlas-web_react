import { createSelector } from 'reselect';

// Selector to get the notifications state
const getNotificationsState = (state) => state.notifications;

// Selector to get the filter type
export const filterTypeSelected = (state) => getNotificationsState(state).get('filter');

// Selector to get the notifications list
export const getNotifications = (state) => getNotificationsState(state).get('notifications');

// Selector to get the unread notifications
export const getUnreadNotifications = createSelector(
  [getNotifications],
  (notifications) => notifications.filter(notification => !notification.get('isRead'))
);
