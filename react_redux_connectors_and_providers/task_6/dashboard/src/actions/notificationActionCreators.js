import { MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS, SET_LOADING_STATE } from './notificationActionTypes';
import { bindActionCreators } from 'redux';

export function markAsRead(index) {
  // console.log('Dispatching MARK_AS_READ with index:', index);
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

export function setLoadingState(isLoading) {
  return {
    type: SET_LOADING_STATE,
    isLoading
  };
}

export function fetchNotifications() {
  return async (dispatch) => {
    dispatch(setLoadingState(true));
    try {
      const response = await fetch('/notifications.json');
      const data = await response.json();
      dispatch(fetchNotificationsSuccess(data));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      dispatch(setLoadingState(false));
    }
  };
}