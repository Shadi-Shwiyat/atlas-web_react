import React from 'react';
import { shallow } from 'enzyme';
import App from './App.js';

describe('App Component', () => {
  let alertMock;
  beforeEach(() => {
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    alertMock.mockRestore();
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

  describe('Keydown event', () => {
    it('calls logOut function and displays alert when ctrl and h keys are pressed', () => {
      const logOutMock = jest.fn();

      const wrapper = shallow(<App logOut={logOutMock} />);
      const event = new KeyboardEvent('keydown', { key: 'h', ctrlKey: true });
      document.dispatchEvent(event);

      expect(logOutMock).toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalledWith('Logging you out');
    });
  });
});
