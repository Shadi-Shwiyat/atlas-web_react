import React from 'react';
import { shallow } from 'enzyme';
import { UnconnectedFooter as Footer } from '../Footer/Footer';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    shallow(<Footer isUserLoggedIn={false} user={{}} />);
  });

  it('renders the text "Copyright"', () => {
    const wrapper = shallow(<Footer isUserLoggedIn={false} user={{}} />);
    expect(wrapper.text()).toContain('Copyright');
  });

  it('does not display the "Contact us" link when the user is logged out', () => {
    const wrapper = shallow(<Footer isUserLoggedIn={false} user={{}} />);
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('displays the "Contact us" link when the user is logged in', () => {
    const wrapper = shallow(<Footer isUserLoggedIn={true} user={{ email: 'user@example.com' }} />);
    expect(wrapper.find('a').text()).toBe('Contact us');
  });
});
