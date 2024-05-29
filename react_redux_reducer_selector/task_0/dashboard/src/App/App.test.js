import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import App from './App.js';

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
    const wrapper = shallow(<App />);
    expect(wrapper.find('Notifications').length).toEqual(1);
  });

  it('contains the Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Header').length).toEqual(1);
  });

  it('contains the Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Footer').length).toEqual(1);
  });

  it('does not contain the CourseList component by default', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('CourseList').length).toEqual(0);
  });

  describe('When isLoggedIn is true', () => {
    it('does not contain the Login component when user is logged in', () => {
      const wrapper = shallow(<App />);
      // Set user as logged in
      wrapper.setState({ user: { isLoggedIn: true } });
      // Expect Login component not to be rendered
      expect(wrapper.find('Login').length).toEqual(0);
    });    

    it('contains the CourseList component', () => {
      const wrapper = shallow(<App />);
      // Set user as logged in
      wrapper.setState({ user: { isLoggedIn: true } });
      expect(wrapper.find('CourseList').length).toEqual(1);
    });
  });

  // New tests for displayDrawer state
  it('has default displayDrawer state as false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('sets displayDrawer to true when handleDisplayDrawer is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state('displayDrawer')).toBe(true);
  });

  it('sets displayDrawer to false when handleHideDrawer is called', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ displayDrawer: true });
    wrapper.instance().handleHideDrawer();
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  // Test for markNotificationAsRead
  it('markNotificationAsRead updates state correctly', () => {
    const wrapper = shallow(<App />);
    const initialNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: "<strong>Urgent requirement</strong>" } }
    ];
    
    // Set initial state with notifications
    wrapper.setState({ listNotifications: initialNotifications });

    // Call the method to mark the notification as read
    wrapper.instance().markNotificationAsRead(2);

    // Get the updated state
    const updatedNotifications = wrapper.state('listNotifications');

    // Check that the notification with id 2 has been removed
    expect(updatedNotifications).toEqual([
      { id: 1, type: "default", value: "New course available" },
      { id: 3, type: "urgent", html: { __html: "<strong>Urgent requirement</strong>" } }
    ]);
  });
});
