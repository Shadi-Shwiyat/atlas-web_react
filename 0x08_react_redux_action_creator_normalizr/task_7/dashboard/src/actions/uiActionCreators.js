import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from "./uiActionTypes";
import { bindActionCreators } from 'redux';

export function login(email, password) {
  return {
    type: LOGIN,
    user: {
      email,
      password,
    }
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function displayNotificationDrawer() {
  return {
    type: DISPLAY_NOTIFICATION_DRAWER,
  }
}

export function hideNotificationDrawer() {
  return {
    type: HIDE_NOTIFICATION_DRAWER,
  }
}

export const boundLogin = bindActionCreators(login);
export const boundLogout = bindActionCreators(logout);
export const boundDisplayNotificationDrawer = bindActionCreators(displayNotificationDrawer);
export const boundHideNotificationDrawer = bindActionCreators(hideNotificationDrawer);
