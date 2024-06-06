import { Map, fromJS } from 'immutable';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_LOADING_STATE,
} from '../actions/notificationActionTypes';

const initialState = Map({
  notifications: fromJS([]),
  filter: 'DEFAULT',
  loading: false,
});

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return state.set('notifications', fromJS(action.data)).set('loading', false);

    case MARK_AS_READ:
      // console.log('Updating state for MARK_AS_READ with index:', action.index);
      const updatedState = state.updateIn(['notifications'], notifications =>
        notifications.map(notification =>
          notification.get('id') === action.index
            ? notification.set('isRead', true)
            : notification
        )
      );
      // console.log('Updated state:', updatedState.toJS());
      return updatedState;

    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);

    case SET_LOADING_STATE:
      return state.set('loading', action.isLoading);

    default:
      return state;
  }
};

export default notificationReducer;
