import uiReducer from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER, LOGIN, LOGOUT } from '../actions/uiActionTypes';
import { Map } from 'immutable';

describe('uiReducer', () => {
  const initialState = Map({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: Map(),
  });

  it('should return the initial state when no action is passed', () => {
    const state = uiReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should return the initial state when the action SELECT_COURSE is passed', () => {
    const state = uiReducer(undefined, { type: 'SELECT_COURSE' });
    expect(state).toEqual(initialState);
  });

  it('should change isNotificationDrawerVisible to true when the action DISPLAY_NOTIFICATION_DRAWER is passed', () => {
    const state = uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.get('isNotificationDrawerVisible')).toBe(true);
  });

  it('should set the user when the action LOGIN is passed', () => {
    const user = { email: 'test@example.com', name: 'Test User' };
    const state = uiReducer(initialState, { type: LOGIN, user });
    expect(state.get('user').toJS()).toEqual(user);
  });

  it('should set the user to null when the action LOGOUT is passed', () => {
    const user = { email: 'test@example.com', name: 'Test User' };
    const loggedInState = initialState
      .set('isUserLoggedIn', true)
      .set('user', Map(user));
    
    const state = uiReducer(loggedInState, { type: LOGOUT });
    expect(state.get('isUserLoggedIn')).toBe(false);
    expect(state.get('user').toJS()).toEqual({});
  });
});
