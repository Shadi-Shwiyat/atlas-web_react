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

export const boundMarkAsRead = bindActionCreators(markAsRead);
export const boundSetNotificationFilter = bindActionCreators(setNotificationFilter);
