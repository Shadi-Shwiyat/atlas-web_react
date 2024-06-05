import { Map, fromJS } from 'immutable';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_LOADING_STATE,
} from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

// Define the initial state as an Immutable Map
const initialState = Map({
  notifications: Map(),
  filter: 'DEFAULT',
  loading: false,
});

// Notification Reducer
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS: {
      const normalizedData = notificationsNormalizer(action.data);
      // Convert normalized data to Immutable.js Map and merge with the state
      const notifications = fromJS(normalizedData.entities.notifications).map(notification => 
        notification.set('isRead', false)
      );
      return state.mergeDeep({
        notifications,
        loading: false,
      });
    }

    case MARK_AS_READ: {
      return state.setIn(['notifications', action.index.toString(), 'isRead'], true);
    }

    case SET_TYPE_FILTER: {
      return state.set('filter', action.filter);
    }

    case SET_LOADING_STATE: {
      return state.set('loading', action.isLoading);
    }

    default:
      return state;
  }
};

export default notificationReducer;
