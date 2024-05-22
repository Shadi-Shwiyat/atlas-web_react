import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from '../Header/Header';
import { StyleSheetTestUtils } from 'aphrodite';
import AppContext from '../App/AppContext';

describe('Header Component', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  it('renders without crashing', () => {
    shallow(<Header />);
  });

  it('renders img and h1 tags', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('does not render logout section with default context value', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('.logoutSection').exists()).toBe(false);
  });

  it('renders logout section when isLoggedIn is true and email is set', () => {
    const user = {
      isLoggedIn: true,
      email: 'test@example.com',
    };
    const logOut = jest.fn(); // Mocking logOut function

    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <Header />
      </AppContext.Provider>
    );

    expect(wrapper.find('#logoutSection').exists()).toBe(true);
  });

it('calls spy when logout link is clicked', () => {
  const user = {
    isLoggedIn: true,
    email: 'test@example.com',
  };
  const logoutSpy = jest.fn();
  const wrapper = mount(
    <AppContext.Provider value={{ user, logOut: logoutSpy }}>
      <Header />
    </AppContext.Provider>
  );
  wrapper.find('#logoutLink').simulate('click');
  expect(logoutSpy).toHaveBeenCalled();
});
});
