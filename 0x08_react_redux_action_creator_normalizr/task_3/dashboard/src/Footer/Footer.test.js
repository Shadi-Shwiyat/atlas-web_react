import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from '../Footer/Footer';
import AppContext from '../App/AppContext';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    shallow(<Footer />);
  });

  it('renders the text "Copyright"', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.text()).toContain('Copyright');
  });

  it('does not display the "Contact us" link when the user is logged out', () => {
    const contextValue = {
      user: { email: '', password: '', isLoggedIn: false },
      logOut: jest.fn(),
    };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('displays the "Contact us" link when the user is logged in', () => {
    const contextValue = {
      user: { email: 'user@example.com', password: 'password', isLoggedIn: true },
      logOut: jest.fn(),
    };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a').text()).toBe('Contact us');
  });
});
