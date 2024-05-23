import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { login, logout, displayNotificationDrawer, hideNotificationDrawer, loginRequest } from './uiActionCreators';
import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginRequest', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches LOGIN and LOGIN_SUCCESS actions when login succeeds', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const responseData = { user: 'testUser' };
    fetchMock.postOnce('/login-success.json', {
      body: responseData,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: LOGIN, user: { email, password } },
      { type: LOGIN_SUCCESS, data: responseData }
    ];

    const store = mockStore({});

    await store.dispatch(loginRequest(email, password));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches LOGIN and LOGIN_FAILURE actions when login fails', async () => {
    const email = 'test@example.com';
    const password = 'password';
    fetchMock.postOnce('/login-success.json', 500);

    const expectedActions = [
      { type: LOGIN, user: { email, password } },
      { type: LOGIN_FAILURE }
    ];

    const store = mockStore({});

    await store.dispatch(loginRequest(email, password));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('UI Action Creators', () => {
  it('should create an action to login', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const expectedAction = {
      type: LOGIN,
      user: { email, password }
    };
    expect(login(email, password)).toEqual(expectedAction);
  });

  it('should create an action to logout', () => {
    const expectedAction = {
      type: LOGOUT
    };
    expect(logout()).toEqual(expectedAction);
  });

  it('should create an action to display the notification drawer', () => {
    const expectedAction = {
      type: DISPLAY_NOTIFICATION_DRAWER
    };
    expect(displayNotificationDrawer()).toEqual(expectedAction);
  });

  it('should create an action to hide the notification drawer', () => {
    const expectedAction = {
      type: HIDE_NOTIFICATION_DRAWER
    };
    expect(hideNotificationDrawer()).toEqual(expectedAction);
  });
});
