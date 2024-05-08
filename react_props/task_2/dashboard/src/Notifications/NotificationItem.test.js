import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

describe('NotificationItem Component', () => {
  it('renders without crashing', () => {
    shallow(<NotificationItem />);
  });

  it('renders the correct html with type and value props', () => {
    const type = 'default';
    const value = 'test';
    const wrapper = shallow(<NotificationItem type={type} value={value} />);
    expect(wrapper.find(`li[data-notification-type="${type}"]`).text()).toEqual(value);
  });

  it('renders the correct html with html prop', () => {
    const html = { __html: '<u>test</u>' };
    const wrapper = shallow(<NotificationItem html={html} />);
    expect(wrapper.html()).toContain(html.__html);
  });
});
