import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from "./uiActionTypes";

export function login(email, password) {
  return {
    type: LOGIN,
    user: {
      email,
      password,
    }
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}

export function loginRequest(email, password) {
  return async dispatch => {
    dispatch(login(email, password)); // Dispatching the login action
    
    try {
      const response = await fetch('/login-success.json');
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const data = await response.json();
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
}

export function displayNotificationDrawer() {
  return {
    type: DISPLAY_NOTIFICATION_DRAWER,
  };
}

export function hideNotificationDrawer() {
  return {
    type: HIDE_NOTIFICATION_DRAWER,
  };
}
