import React from 'react';
import { shallow } from 'enzyme';
import { UnconnectedLogin as Login } from './Login';
import { StyleSheetTestUtils } from 'aphrodite';

describe('Login Component', () => {
  let user;
  
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    user = {
      email: '',
      password: '',
      isLoggedIn: false,
    }
  });

  it('renders without crashing', () => {
    shallow(<Login user={user} logIn={() => {}} />);
  });

  it('renders 2 input and 2 label tags', () => {
    const wrapper = shallow(<Login user={user} logIn={() => {}} />);
    expect(wrapper.find('input#email').length).toEqual(1);
    expect(wrapper.find('input#password').length).toEqual(1);
    expect(wrapper.find('label').length).toEqual(2);
  });

  it('submit button is disabled by default', () => {
    const wrapper = shallow(<Login user={user} logIn={() => {}} />);
    const submitButton = wrapper.find('input#submit-button');
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('submit button is enabled after changing the value of the two inputs', () => {
    const wrapper = shallow(<Login user={user} logIn={() => {}} />);
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');

    // Simulate user input for email and password
    emailInput.simulate('change', { target: { value: 'test@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password123' } });

    // Check if the submit button is enabled
    const submitButton = wrapper.find('input#submit-button');
    expect(submitButton.prop('disabled')).toBe(false);
  });
});
