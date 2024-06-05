import { MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';
import { bindActionCreators } from 'redux';

export function markAsRead(index) {
  return {
    type: MARK_AS_READ,
    index
  };
}

export function setNotificationFilter(filter) {
  return {
    type: SET_TYPE_FILTER,
    filter
  };
}

export function fetchNotificationsSuccess(data) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data
  };
}

export function setLoadingState (isLoading) {
  return {
    type: 'SET_LOADING_STATE',
    isLoading
  };
}

export function setNotifications (data) {
  return {
    type: 'FETCH_NOTIFICATIONS_SUCCESS',
    data
  };
}

export function fetchNotifications() {
  return async (dispatch) => {
    // Set loading state to true
    dispatch(setLoadingState(true));

    try {
      // Fetch notifications
      const response = await fetch('/notifications.json');
      const data = await response.json();

      // Dispatch setNotifications with fetched data
      dispatch(setNotifications(data));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      // Set loading state to false
      dispatch(setLoadingState(false));
    }
  };
}

export const boundMarkAsRead = bindActionCreators(markAsRead);
export const boundSetNotificationFilter = bindActionCreators(setNotificationFilter);
