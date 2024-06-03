import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { StyleSheetTestUtils } from 'aphrodite';
import App, { mapStateToProps } from './App.js';
import { Map } from 'immutable';
import { displayNotificationDrawer, hideNotificationDrawer } from '../actions/uiActionCreators';

// Create a mock store
const mockStore = configureStore([]);
const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: Map(),
});
const store = mockStore(initialState);

describe('App Component', () => {
  // Disable style injection before running the tests
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  // Re-enable style injection after the tests have run
  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('contains the Notifications component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('Notifications').length).toEqual(1);
  });

  it('contains the Header component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('Header').length).toEqual(1);
  });

  it('contains the Footer component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('Footer').length).toEqual(1);
  });

  it('does not contain the CourseList component by default', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('CourseList').length).toEqual(0);
  });

  describe('When isLoggedIn is true', () => {
    it('does not contain the Login component when user is logged in', () => {
      const loggedInState = fromJS({
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false,
      });
      const loggedInStore = mockStore(loggedInState);
      const wrapper = mount(
        <Provider store={loggedInStore}>
          <App />
        </Provider>
      );
      expect(wrapper.find('Login').length).toEqual(0);
    });

    it('contains the CourseList component', () => {
      const loggedInState = fromJS({
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false,
      });
      const loggedInStore = mockStore(loggedInState);
      const wrapper = mount(
        <Provider store={loggedInStore}>
          <App />
        </Provider>
      );
      expect(wrapper.find('CourseList').length).toEqual(1);
    });
  });

  // Test for displayDrawer state
  it('has default displayDrawer state as false', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('Notifications').prop('displayDrawer')).toBe(false);
  });

  it('sets displayDrawer to true when the action to display the drawer is dispatched', () => {
    const updatedState = initialState.set('isNotificationDrawerVisible', true);
    const updatedStore = mockStore(updatedState);
    
    const wrapper = mount(
      <Provider store={updatedStore}>
        <App />
      </Provider>
    );
    
    wrapper.setProps({ store: updatedStore });
    wrapper.update();
    
    expect(wrapper.find('Notifications').prop('displayDrawer')).toBe(true);
  });

  it('sets displayDrawer to false when the action to hide the drawer is dispatched', () => {
    const visibleState = initialState.set('isNotificationDrawerVisible', true);
    const visibleStore = mockStore(visibleState);

    const wrapper = mount(
      <Provider store={visibleStore}>
        <App />
      </Provider>
    );

    const updatedState = initialState.set('isNotificationDrawerVisible', false);
    const updatedStore = mockStore(updatedState);
    
    wrapper.setProps({ store: updatedStore });
    wrapper.update();
    
    expect(wrapper.find('Notifications').prop('displayDrawer')).toBe(false);
  });

  // Test for markNotificationAsRead
  it('markNotificationAsRead updates state correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const appInstance = wrapper.find('App').instance();
    const initialNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: "<strong>Urgent requirement</strong>" } }
    ];

    // Set initial state with notifications
    appInstance.setState({ listNotifications: initialNotifications });

    // Call the method to mark the notification as read
    appInstance.markNotificationAsRead(2);
    wrapper.update(); // Force update to reflect state changes

    // Get the updated state
    const updatedNotifications = appInstance.state.listNotifications;

    // Check that the notification with id 2 has been removed
    expect(updatedNotifications).toEqual([
      { id: 1, type: "default", value: "New course available" },
      { id: 3, type: "urgent", html: { __html: "<strong>Urgent requirement</strong>" } }
    ]);
  });
});

// Test suite for mapStateToProps
describe('mapStateToProps', () => {
  it('should return the correct state', () => {
    const state = fromJS({
      isUserLoggedIn: true,
      isNotificationDrawerVisible: false,
    });
    const expectedProps = {
      isLoggedIn: true,
      displayDrawer: false,
    };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
