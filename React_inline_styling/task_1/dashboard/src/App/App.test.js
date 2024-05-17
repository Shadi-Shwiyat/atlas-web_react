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
    it('does not contain the Login component', () => {
      const wrapper = shallow(<App loggedIn={true} />);
      expect(wrapper.find('Login').length).toEqual(0);
    });

    it('contains the CourseList component', () => {
      const wrapper = shallow(<App loggedIn={true} />);
      expect(wrapper.find('CourseList').length).toEqual(1);
    });
  });
});
