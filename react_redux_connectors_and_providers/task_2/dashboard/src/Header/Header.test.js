import React from 'react';
import { shallow } from 'enzyme';
import { UnconnectedHeader as Header } from '../Header/Header';
import { StyleSheetTestUtils } from 'aphrodite';

describe('Header Component', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  it('renders without crashing', () => {
    shallow(<Header isUserLoggedIn={false} user={{}} logout={() => {}} />);
  });

  it('renders img and h1 tags', () => {
    const wrapper = shallow(<Header isUserLoggedIn={false} user={{}} logout={() => {}} />);
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('does not render logout section with default props', () => {
    const wrapper = shallow(<Header isUserLoggedIn={false} user={{}} logout={() => {}} />);
    expect(wrapper.find('#logoutSection').exists()).toBe(false);
  });

  it('renders logout section when isUserLoggedIn is true and email is set', () => {
    const user = {
      email: 'test@example.com',
    };

    const wrapper = shallow(<Header isUserLoggedIn={true} user={user} logout={() => {}} />);
    expect(wrapper.find('#logoutSection').exists()).toBe(true);
  });

  it('calls logout function when logout link is clicked', () => {
    const user = {
      email: 'test@example.com',
    };
    const logoutSpy = jest.fn();
    const wrapper = shallow(<Header isUserLoggedIn={true} user={user} logout={logoutSpy} />);
    wrapper.find('#logoutLink').simulate('click');
    expect(logoutSpy).toHaveBeenCalled();
  });
});
