import { Map, fromJS } from 'immutable';
import notificationReducer from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE, SET_NOTIFICATIONS } from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

describe('notificationReducer', () => {
  const initialState = Map({
    notifications: Map(),
    filter: "DEFAULT",
    loading: false,
  });

  it('should return the default state', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", value: "New data available" },
      ],
    };
    const normalizedData = notificationsNormalizer(action.data);
    const expectedState = Map({
      filter: "DEFAULT",
      loading: false,
      notifications: fromJS(normalizedData.entities.notifications).map(notification => 
        notification.set('isRead', false)
      ),
    });
    expect(notificationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle MARK_AS_READ', () => {
    const initialState = Map({
      filter: "DEFAULT",
      loading: false,
      notifications: fromJS({
        1: { id: 1, isRead: false, type: "default", value: "New course available" },
        2: { id: 2, isRead: false, type: "urgent", value: "New resume available" },
        3: { id: 3, isRead: false, type: "urgent", value: "New data available" },
      }),
    });
    const action = {
      type: MARK_AS_READ,
      index: 2,
    };
    const expectedState = initialState.setIn(['notifications', '2', 'isRead'], true);
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_TYPE_FILTER', () => {
    const initialState = Map({
      filter: "DEFAULT",
      loading: false,
      notifications: fromJS({
        1: { id: 1, isRead: false, type: "default", value: "New course available" },
        2: { id: 2, isRead: false, type: "urgent", value: "New resume available" },
        3: { id: 3, isRead: false, type: "urgent", value: "New data available" },
      }),
    });
    const action = {
      type: SET_TYPE_FILTER,
      filter: "URGENT",
    };
    const expectedState = initialState.set('filter', action.filter);
    expect(notificationReducer(initialState, action).toJS()).toEqual(expectedState);
  });

  it('should handle SET_LOADING_STATE', () => {
    const action = {
      type: SET_LOADING_STATE,
      loading: true,
    };
    const expectedState = initialState.set('loading', true);
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_NOTIFICATIONS', () => {
    const action = {
      type: SET_NOTIFICATIONS,
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
      ],
    };
    const expectedState = initialState.set(
      'notifications',
      fromJS(action.notifications)
    );
    expect(notificationReducer(initialState, action).toJS()).toEqual(expectedState);
  });
});
