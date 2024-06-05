import React from 'react';
import { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import { StyleSheetTestUtils } from 'aphrodite';
import { UnconnectedApp as App, mapStateToProps } from './App.js';
import { Map } from 'immutable';

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
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    expect(wrapper.find('Notifications').length).toEqual(1);
  });

  it('contains the Header component', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    expect(wrapper.find('#app-header').length).toEqual(1);
  });

  it('contains the Footer component', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    expect(wrapper.find('#app-footer').length).toEqual(1);
  });

  it('does not contain the CourseList component by default', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    expect(wrapper.find('CourseList').length).toEqual(0);
  });

  describe('When isLoggedIn is true', () => {
    it('does not contain the Login component when user is logged in', () => {
      const wrapper = shallow(<App isLoggedIn={true} displayDrawer={false} user={{}} />);
      expect(wrapper.find('Login').length).toEqual(0);
    });

    it('contains the CourseList component', () => {
      const wrapper = shallow(<App isLoggedIn={true} displayDrawer={false} user={{}} />);
      expect(wrapper.find('CourseList').length).toEqual(1);
    });
  });

  // Test for displayDrawer state
  it('has default displayDrawer state as false', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    expect(wrapper.find('Notifications').prop('displayDrawer')).toBe(false);
  });

  it('sets displayDrawer to true when the action to display the drawer is dispatched', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    wrapper.setProps({ displayDrawer: true });
    wrapper.update();
    expect(wrapper.find('Notifications').prop('displayDrawer')).toBe(true);
  });

  it('sets displayDrawer to false when the action to hide the drawer is dispatched', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={true} user={{}} />);
    wrapper.setProps({ displayDrawer: false });
    wrapper.update();
    expect(wrapper.find('Notifications').prop('displayDrawer')).toBe(false);
  });

  // Test for markNotificationAsRead
  it('markNotificationAsRead updates state correctly', () => {
    const wrapper = shallow(<App isLoggedIn={false} displayDrawer={false} user={{}} />);
    const appInstance = wrapper.instance();
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
      user: Map(),
    });
    const expectedProps = {
      isLoggedIn: true,
      displayDrawer: false,
      user: state.get('user').toJS(),
    };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
