import { MARK_AS_READ, SET_TYPE_FILTER } from './notificationActionTypes';
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

export const boundMarkAsRead = bindActionCreators(markAsRead);
export const boundSetNotificationFilter = bindActionCreators(setNotificationFilter);
